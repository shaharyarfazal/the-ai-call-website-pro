import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Save, Plus, Edit, Trash2, Webhook } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface WebsiteSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  setting_type: string;
  category: string;
  description: string | null;
}

interface WebhookData {
  id: string;
  name: string;
  url: string;
  events: string[];
  is_active: boolean;
}

// Fallback settings if nothing exists in database
const fallbackSettings = {
  site_name: 'My AI Assistant Platform',
  site_tagline: 'Empowering businesses with intelligent automation',
  contact_email: 'contact@example.com',
  contact_phone: '+1 (555) 123-4567',
  site_logo: '/placeholder.svg',
  linkedin_url: 'https://linkedin.com/company/yourcompany',
  facebook_url: 'https://facebook.com/yourcompany'
};

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<WebsiteSetting[]>([]);
  const [webhooks, setWebhooks] = useState<WebhookData[]>([]);
  const [webhookName, setWebhookName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookEvents, setWebhookEvents] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // State for current form values
  const [currentValues, setCurrentValues] = useState({
    site_name: '',
    site_tagline: '',
    contact_email: '',
    contact_phone: '',
    site_logo: '',
    linkedin_url: '',
    facebook_url: ''
  });

  useEffect(() => {
    fetchSettings();
    fetchWebhooks();
  }, []);

  useEffect(() => {
    if (settingsLoaded) {
      // Optimized settings loading
      // Update current values when settings are loaded
      const newValues = {
        site_name: getSettingValue('site_name'),
        site_tagline: getSettingValue('site_tagline'),
        contact_email: getSettingValue('contact_email'),
        contact_phone: getSettingValue('contact_phone'),
        site_logo: getSettingValue('site_logo'),
        linkedin_url: getSettingValue('linkedin_url'),
        facebook_url: getSettingValue('facebook_url')
      };
      // Extract new values
      setCurrentValues(newValues);
    }
  }, [settings, settingsLoaded]);

  const fetchSettings = async () => {
    try {
      // Fetching settings from database
      const { data, error } = await supabase
        .from('website_settings' as any)
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        console.error('Error fetching settings:', error);
        return;
      }

      // Settings loaded successfully
      setSettings((data as unknown as WebsiteSetting[]) || []);
      setSettingsLoaded(true);
    } catch (error) {
      console.error('Error:', error);
      setSettingsLoaded(true);
    }
  };

  const fetchWebhooks = async () => {
    try {
      const { data, error } = await supabase
        .from('webhooks' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching webhooks:', error);
        return;
      }

      setWebhooks((data as unknown as WebhookData[]) || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateSetting = async (settingKey: string, value: any) => {
    if (!user) return;

    // Updating setting in database

    try {
      // First check if setting exists
      const { data: existingSetting } = await supabase
        .from('website_settings' as any)
        .select('*')
        .eq('setting_key', settingKey)
        .single();

      if (existingSetting) {
        // Update existing setting
        const { error } = await supabase
          .from('website_settings' as any)
          .update({ 
            setting_value: value,
            updated_by: user.id,
            updated_at: new Date().toISOString()
          })
          .eq('setting_key', settingKey);

        if (error) {
          console.error('Error updating setting:', error);
          toast({
            title: "Error",
            description: "Failed to update setting",
            variant: "destructive"
          });
          return;
        }
      } else {
        // Create new setting
        const { error } = await supabase
          .from('website_settings' as any)
          .insert([{
            setting_key: settingKey,
            setting_value: value,
            updated_by: user.id
          }]);

        if (error) {
          console.error('Error creating setting:', error);
          toast({
            title: "Error",
            description: "Failed to create setting",
            variant: "destructive"
          });
          return;
        }
      }

      toast({
        title: "Success",
        description: "Setting updated successfully"
      });

      fetchSettings();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddWebhook = async () => {
    if (!user || !webhookName || !webhookUrl) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const events = webhookEvents.split(',').map(e => e.trim()).filter(e => e.length > 0);
      
      const { error } = await supabase
        .from('webhooks' as any)
        .insert([{
          name: webhookName,
          url: webhookUrl,
          events: events,
          created_by: user.id
        }]);

      if (error) {
        console.error('Error adding webhook:', error);
        toast({
          title: "Error",
          description: "Failed to add webhook",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Webhook added successfully"
      });

      setWebhookName('');
      setWebhookUrl('');
      setWebhookEvents('');
      fetchWebhooks();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to add webhook",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWebhook = async (webhookId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('webhooks' as any)
        .update({ is_active: isActive })
        .eq('id', webhookId);

      if (error) {
        console.error('Error updating webhook:', error);
        toast({
          title: "Error",
          description: "Failed to update webhook",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: `Webhook ${isActive ? 'activated' : 'deactivated'}`
      });

      fetchWebhooks();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteWebhook = async (webhookId: string) => {
    try {
      const { error } = await supabase
        .from('webhooks' as any)
        .delete()
        .eq('id', webhookId);

      if (error) {
        console.error('Error deleting webhook:', error);
        toast({
          title: "Error",
          description: "Failed to delete webhook",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Webhook deleted successfully"
      });

      fetchWebhooks();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getSettingValue = (key: string): string => {
    if (!settingsLoaded) return '';
    
    const setting = settings.find(s => s.setting_key === key);
    if (!setting) {
      return fallbackSettings[key as keyof typeof fallbackSettings] || '';
    }

    // Handle the setting value - it might be JSON-encoded or plain text
    let value = setting.setting_value;
    
    // If it's a string that starts and ends with quotes, it's JSON-encoded
    if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      try {
        value = JSON.parse(value);
      } catch {
        // If JSON parsing fails, remove the quotes manually
        value = value.slice(1, -1);
      }
    }
    
    // Get setting value
    return value || fallbackSettings[key as keyof typeof fallbackSettings] || '';
  };

  const handleFieldChange = (field: string, value: string) => {
    // Field changed
    setCurrentValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFieldBlur = (field: string, value: string) => {
    const currentDbValue = getSettingValue(field);
    // Field blur event
    
    if (value && value !== currentDbValue) {
      // Updating setting
      updateSetting(field, value);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  value={currentValues.site_name}
                  placeholder={getSettingValue('site_name')}
                  onChange={(e) => handleFieldChange('site_name', e.target.value)}
                  onBlur={(e) => handleFieldBlur('site_name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="site-tagline">Site Tagline</Label>
                <Input
                  id="site-tagline"
                  value={currentValues.site_tagline}
                  placeholder={getSettingValue('site_tagline')}
                  onChange={(e) => handleFieldChange('site_tagline', e.target.value)}
                  onBlur={(e) => handleFieldBlur('site_tagline', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={currentValues.contact_email}
                  placeholder={getSettingValue('contact_email')}
                  onChange={(e) => handleFieldChange('contact_email', e.target.value)}
                  onBlur={(e) => handleFieldBlur('contact_email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input
                  id="contact-phone"
                  value={currentValues.contact_phone}
                  placeholder={getSettingValue('contact_phone')}
                  onChange={(e) => handleFieldChange('contact_phone', e.target.value)}
                  onBlur={(e) => handleFieldBlur('contact_phone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Branding & Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site-logo">Site Logo</Label>
                <div className="flex items-center gap-4">
                  <img 
                    src={currentValues.site_logo || getSettingValue('site_logo')} 
                    alt="Site Logo" 
                    className="h-16 w-16 object-contain border rounded" 
                  />
                  <div className="flex-1">
                    <Input
                      id="site-logo"
                      value={currentValues.site_logo}
                      placeholder={getSettingValue('site_logo')}
                      onChange={(e) => handleFieldChange('site_logo', e.target.value)}
                      onBlur={(e) => handleFieldBlur('site_logo', e.target.value)}
                    />
                  </div>
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
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded border"></div>
                    <Input value="#0ea5e9" readOnly />
                  </div>
                </div>
                <div>
                  <Label>Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-secondary rounded border"></div>
                    <Input value="#f1f5f9" readOnly />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Social Media</h3>
                <div>
                  <Label htmlFor="linkedin-url">LinkedIn URL</Label>
                  <Input
                    id="linkedin-url"
                    value={currentValues.linkedin_url}
                    placeholder={getSettingValue('linkedin_url')}
                    onChange={(e) => handleFieldChange('linkedin_url', e.target.value)}
                    onBlur={(e) => handleFieldBlur('linkedin_url', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="facebook-url">Facebook URL</Label>
                  <Input
                    id="facebook-url"
                    value={currentValues.facebook_url}
                    placeholder={getSettingValue('facebook_url')}
                    onChange={(e) => handleFieldChange('facebook_url', e.target.value)}
                    onBlur={(e) => handleFieldBlur('facebook_url', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Analytics</h3>
                <div>
                  <Label htmlFor="google-analytics">Google Analytics ID</Label>
                  <Input
                    id="google-analytics"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Email Service</h3>
                <div>
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp-username">SMTP Username</Label>
                    <Input
                      id="smtp-username"
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <Input
                      id="smtp-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Webhook Management</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Webhook</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="webhook-name">Webhook Name</Label>
                    <Input
                      id="webhook-name"
                      value={webhookName}
                      onChange={(e) => setWebhookName(e.target.value)}
                      placeholder="AI Agent Integration"
                    />
                  </div>
                  <div>
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://api.example.com/webhook"
                    />
                  </div>
                  <div>
                    <Label htmlFor="webhook-events">Events (comma-separated)</Label>
                    <Textarea
                      id="webhook-events"
                      value={webhookEvents}
                      onChange={(e) => setWebhookEvents(e.target.value)}
                      placeholder="booking.created, contact.submitted"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleAddWebhook} className="w-full" disabled={isLoading}>
                    <Webhook className="h-4 w-4 mr-2" />
                    Add Webhook
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Webhooks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell className="font-medium">{webhook.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{webhook.url}</TableCell>
                      <TableCell>{webhook.events.join(', ')}</TableCell>
                      <TableCell>
                        <Switch 
                          checked={webhook.is_active} 
                          onCheckedChange={(checked) => toggleWebhook(webhook.id, checked)}
                        />
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Edit Webhook",
                              description: "Edit webhook feature coming soon"
                            });
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteWebhook(webhook.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
