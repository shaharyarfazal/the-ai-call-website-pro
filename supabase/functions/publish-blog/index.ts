import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function uploadMediaFile(supabase: any, file: File, folder: string): Promise<string> {
  const fileExt = file.name.split('.').pop() || 'bin'
  const fileName = `${crypto.randomUUID()}.${fileExt}`
  const filePath = `${folder}/${fileName}`
  
  // Convert standard file object to a Uint8Array byte array for bulletproof upload compatibility
  const arrayBuffer = await file.arrayBuffer()
  const fileBody = new Uint8Array(arrayBuffer)
  
  const { data, error } = await supabase.storage
    .from('blog-media')
    .upload(filePath, fileBody, {
      contentType: file.type,
      upsert: true
    })
    
  if (error) {
    throw new Error(`Failed to upload ${file.name}: ${error.message}`)
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('blog-media')
    .getPublicUrl(filePath)
    
  return publicUrl
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing environment variables.')
    }

    // Use service role key to bypass RLS policies for webhook and storage actions
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    let title = ''
    let content = ''
    let excerpt = ''
    let featured_image_url = ''
    let video_url = ''
    let slug = ''
    let author_id = null
    let status = 'published'

    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      // Parse as Form Data (for direct file uploads)
      const formData = await req.formData()
      
      title = formData.get('title') as string || ''
      content = formData.get('content') as string || ''
      excerpt = formData.get('excerpt') as string || ''
      featured_image_url = formData.get('featured_image_url') as string || ''
      video_url = formData.get('video_url') as string || ''
      slug = formData.get('slug') as string || ''
      status = formData.get('status') as string || 'published'
      
      const rawAuthorId = formData.get('author_id')
      if (rawAuthorId) {
        author_id = rawAuthorId as string
      }

      // Ensure storage bucket exists
      try {
        await supabase.storage.createBucket('blog-media', {
          public: true,
          fileSizeLimit: 104857600 // 100MB
        })
      } catch (e) {
        // Ignored if bucket already exists
      }

      // Check if featured_image file binary is uploaded
      const featuredImageFile = formData.get('featured_image') as File | null
      if (featuredImageFile && featuredImageFile.size > 0) {
        featured_image_url = await uploadMediaFile(supabase, featuredImageFile, 'images')
      }

      // Check if video file binary is uploaded
      const videoFile = formData.get('video') as File | null
      if (videoFile && videoFile.size > 0) {
        video_url = await uploadMediaFile(supabase, videoFile, 'videos')
      }

    } else {
      // Parse as standard JSON
      const payload = await req.json()
      title = payload.title
      content = payload.content
      excerpt = payload.excerpt || ''
      featured_image_url = payload.featured_image_url || null
      video_url = payload.video_url || null
      slug = payload.slug || ''
      author_id = payload.author_id || null
      status = payload.status || 'published'
    }

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: 'Title and Content are required.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Slugification helper
    const slugify = (text: string) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // remove non-word characters except space/hyphen
        .replace(/[\s_-]+/g, '-') // collapse spaces/underscores/hyphens into a single hyphen
        .replace(/^-+|-+$/g, '')   // trim leading/trailing hyphens
    }

    // Determine target slug
    let targetSlug = slug.trim() ? slugify(slug) : slugify(title)
    if (!targetSlug) {
      targetSlug = 'untitled-post'
    }

    // Collision check - make slug unique if it already exists
    let uniqueSlug = targetSlug
    const { data: existing } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', targetSlug)
      .maybeSingle()

    if (existing) {
      const shortId = crypto.randomUUID().split('-')[0]
      uniqueSlug = `${targetSlug}-${shortId}`
    }

    // Insert blog post metadata
    const blogData = {
      title,
      slug: uniqueSlug,
      content,
      excerpt: excerpt || '',
      featured_image_url: featured_image_url || null,
      video_url: video_url || null,
      author_id: author_id || null,
      status: status || 'published',
      published_at: status === 'published' ? new Date().toISOString() : null,
      created_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('blogs')
      .insert([blogData])
      .select()

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ 
        message: 'Blog post published successfully', 
        data,
        uploaded_media: {
          featured_image_url: featured_image_url || null,
          video_url: video_url || null
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
