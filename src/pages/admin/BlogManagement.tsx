
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, Save, Eye, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: string;
  scheduled_at: string | null;
  published_at: string | null;
  featured_image_url: string | null;
  created_at: string;
}

export default function BlogManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState('draft');
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [featuredImage, setFeaturedImage] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
        return;
      }

      setBlogs((data as unknown as Blog[]) || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const blogData = {
        title,
        content,
        excerpt,
        status: 'draft',
        featured_image_url: featuredImage || null,
        author_id: user.id,
        scheduled_at: null,
        published_at: null
      };

      const { error } = await supabase
        .from('blogs' as any)
        .insert([blogData]);

      if (error) {
        console.error('Error saving blog:', error);
        toast({
          title: "Error",
          description: "Failed to save blog post",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Blog post saved as draft"
      });

      // Reset form
      setTitle('');
      setContent('');
      setExcerpt('');
      setFeaturedImage('');
      setStatus('draft');
      setScheduledDate(undefined);
      
      // Refresh blogs list
      fetchBlogs();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const blogData = {
        title,
        content,
        excerpt,
        status: 'published',
        featured_image_url: featuredImage || null,
        author_id: user.id,
        scheduled_at: null,
        published_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('blogs' as any)
        .insert([blogData]);

      if (error) {
        console.error('Error publishing blog:', error);
        toast({
          title: "Error",
          description: "Failed to publish blog post",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Blog post published successfully"
      });

      // Reset form
      setTitle('');
      setContent('');
      setExcerpt('');
      setFeaturedImage('');
      setStatus('draft');
      setScheduledDate(undefined);
      
      // Refresh blogs list
      fetchBlogs();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to publish blog post",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSchedule = async () => {
    if (!user || !scheduledDate) return;
    
    setIsLoading(true);
    try {
      const blogData = {
        title,
        content,
        excerpt,
        status: 'scheduled',
        featured_image_url: featuredImage || null,
        author_id: user.id,
        scheduled_at: scheduledDate.toISOString(),
        published_at: null
      };

      const { error } = await supabase
        .from('blogs' as any)
        .insert([blogData]);

      if (error) {
        console.error('Error scheduling blog:', error);
        toast({
          title: "Error",
          description: "Failed to schedule blog post",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Blog post scheduled successfully"
      });

      // Reset form
      setTitle('');
      setContent('');
      setExcerpt('');
      setFeaturedImage('');
      setStatus('draft');
      setScheduledDate(undefined);
      
      // Refresh blogs list
      fetchBlogs();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to schedule blog post",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Button onClick={() => {
          setTitle('');
          setContent('');
          setExcerpt('');
          setFeaturedImage('');
          setStatus('draft');
          setScheduledDate(undefined);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Write Your Blog Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog post title..."
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of your post..."
                  rows={3}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="content">Content</Label>
                <div className="bg-background">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder="Write your blog post content here..."
                    className="h-64 mb-12"
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['link', 'image', 'video'],
                        ['clean']
                      ]
                    }}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="featured-image">Featured Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="featured-image"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Upload Feature",
                      description: "Image upload feature coming soon"
                    });
                  }}>
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {status === 'scheduled' && (
                <div>
                  <Label>Schedule Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !scheduledDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={scheduledDate}
                        onSelect={setScheduledDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              <div className="space-y-2">
                <Button onClick={handleSave} className="w-full" disabled={isLoading || !title.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button onClick={handlePublish} variant="default" className="w-full" disabled={isLoading || !title.trim()}>
                  <Eye className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
                {status === 'scheduled' && (
                  <Button onClick={handleSchedule} variant="secondary" className="w-full" disabled={isLoading || !title.trim() || !scheduledDate}>
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Schedule Post
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {blogs.length > 0 ? (
                <div className="space-y-2">
                  {blogs.slice(0, 5).map((blog) => (
                    <div key={blog.id} className="text-sm p-2 border rounded">
                      <div className="font-medium truncate">{blog.title}</div>
                      <div className="text-muted-foreground text-xs">
                        {blog.status} - {new Date(blog.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No posts yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
