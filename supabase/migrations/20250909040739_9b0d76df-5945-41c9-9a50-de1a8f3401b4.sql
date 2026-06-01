-- Security Fix 1: Restrict public access to sensitive tables
-- Remove overly permissive public access policies

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Public access to agent1_records" ON public.agent1_records;
DROP POLICY IF EXISTS "Public access to agent2_records" ON public.agent2_records;
DROP POLICY IF EXISTS "Public access to agent3_records" ON public.agent3_records;
DROP POLICY IF EXISTS "Public access to contact_attempts" ON public.contact_attempts;
DROP POLICY IF EXISTS "Public access to leads" ON public.leads;
DROP POLICY IF EXISTS "Public access to lead_tags" ON public.lead_tags;
DROP POLICY IF EXISTS "Public access to tags" ON public.tags;
DROP POLICY IF EXISTS "Public access to n8n_chat_histories" ON public.n8n_chat_histories;
DROP POLICY IF EXISTS "Public access to queries" ON public.queries;

-- Create secure RLS policies for agent records (admin only)
CREATE POLICY "Admin can manage agent1_records" ON public.agent1_records
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin can manage agent2_records" ON public.agent2_records
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin can manage agent3_records" ON public.agent3_records
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Secure contact attempts (users can only see their own via contact ownership)
CREATE POLICY "Users can view contact attempts for their contacts" ON public.contact_attempts
FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.contact c 
  WHERE c.lead_id = contact_attempts.lead_id 
  AND c.user_id = auth.uid()
));

CREATE POLICY "Admin can manage all contact attempts" ON public.contact_attempts
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Secure leads (users can only see leads associated with their contacts)
CREATE POLICY "Users can view leads for their contacts" ON public.leads
FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.contact c 
  WHERE c.lead_id = leads.lead_id 
  AND c.user_id = auth.uid()
));

CREATE POLICY "Admin can manage all leads" ON public.leads
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Secure lead tags (same as leads)
CREATE POLICY "Users can view lead tags for their contacts" ON public.lead_tags
FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.contact c 
  WHERE c.lead_id = lead_tags.lead_id 
  AND c.user_id = auth.uid()
));

CREATE POLICY "Admin can manage all lead tags" ON public.lead_tags
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Secure tags (admin only for management, users can view)
CREATE POLICY "Users can view tags" ON public.tags
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admin can insert tags" ON public.tags
FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin can update tags" ON public.tags
FOR UPDATE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin can delete tags" ON public.tags
FOR DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Secure chat histories (users can only see their own session)
CREATE POLICY "Users can view their own chat sessions" ON public.n8n_chat_histories
FOR SELECT TO authenticated
USING (session_id = auth.uid()::text);

CREATE POLICY "Admin can manage all chat histories" ON public.n8n_chat_histories
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Secure queries (admin only)
CREATE POLICY "Admin can manage queries" ON public.queries
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));