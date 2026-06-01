-- Fix critical security issues: Enable RLS on tables that have policies
-- This fixes the "Policy Exists RLS Disabled" errors

ALTER TABLE public.agent1_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent2_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent3_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.n8n_chat_histories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;

-- Enable RLS on other public tables without policies to fix "RLS Disabled in Public" errors
ALTER TABLE public.email_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enriched_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrichment_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kn_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.linkedin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.linkedin_query ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phone_call_post_call_analysis_duplicate ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sms_campaign ENABLE ROW LEVEL SECURITY;

-- Create admin-only policies for tables without policies
CREATE POLICY "Admin only access to email_data" ON public.email_data
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin only access to enriched_contacts" ON public.enriched_contacts
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin only access to enrichment_contacts" ON public.enrichment_contacts
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin only access to kn_base" ON public.kn_base
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin only access to linkedin_profiles" ON public.linkedin_profiles
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin only access to linkedin_query" ON public.linkedin_query
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin only access to phone_call_analysis" ON public.phone_call_post_call_analysis_duplicate
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin only access to sms_campaign" ON public.sms_campaign
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));