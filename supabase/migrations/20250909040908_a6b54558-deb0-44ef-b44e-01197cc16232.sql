-- Critical Security Fix: Remove public access to sensitive data
-- Drop overly permissive policies that allow public access

DROP POLICY IF EXISTS "Public access to agent1_records" ON public.agent1_records;
DROP POLICY IF EXISTS "Public access to agent2_records" ON public.agent2_records;
DROP POLICY IF EXISTS "Public access to agent3_records" ON public.agent3_records;
DROP POLICY IF EXISTS "Public access to contact_attempts" ON public.contact_attempts;
DROP POLICY IF EXISTS "Public access to leads" ON public.leads;
DROP POLICY IF EXISTS "Public access to lead_tags" ON public.lead_tags;
DROP POLICY IF EXISTS "Public access to tags" ON public.tags;
DROP POLICY IF EXISTS "Public access to n8n_chat_histories" ON public.n8n_chat_histories;
DROP POLICY IF EXISTS "Public access to queries" ON public.queries;

-- Secure agent records (admin only access)
CREATE POLICY "Admin only access to agent1_records" ON public.agent1_records
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin only access to agent2_records" ON public.agent2_records  
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin only access to agent3_records" ON public.agent3_records
FOR ALL TO authenticated  
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Secure contact attempts and leads (admin only for now)
CREATE POLICY "Admin access to contact_attempts" ON public.contact_attempts
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin access to leads" ON public.leads
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

CREATE POLICY "Admin access to lead_tags" ON public.lead_tags
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Secure tags (admin only)
CREATE POLICY "Admin access to tags" ON public.tags
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Secure chat histories (admin only for now)
CREATE POLICY "Admin access to chat_histories" ON public.n8n_chat_histories
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Secure queries (admin only)
CREATE POLICY "Admin access to queries" ON public.queries
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));