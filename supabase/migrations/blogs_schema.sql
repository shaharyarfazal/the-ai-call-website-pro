-- Create blogs table
CREATE TABLE public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
    featured_image_url TEXT,
    video_url TEXT,
    author_id UUID REFERENCES auth.users(id),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published blogs
CREATE POLICY "Public can view published blogs" ON public.blogs
    FOR SELECT USING (status = 'published');

-- Allow authenticated users to view all their blogs (including drafts)
CREATE POLICY "Authenticated users can view all blogs" ON public.blogs
    FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to insert blogs
CREATE POLICY "Authenticated users can insert blogs" ON public.blogs
    FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated users to update their own blogs
CREATE POLICY "Authenticated users can update their own blogs" ON public.blogs
    FOR UPDATE TO authenticated USING (auth.uid() = author_id);

-- Allow authenticated users to delete their own blogs
CREATE POLICY "Authenticated users can delete their own blogs" ON public.blogs
    FOR DELETE TO authenticated USING (auth.uid() = author_id);
