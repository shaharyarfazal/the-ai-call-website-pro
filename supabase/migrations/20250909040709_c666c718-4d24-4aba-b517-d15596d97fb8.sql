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

CREATE POLICY "Admin can manage tags" ON public.tags
FOR INSERT, UPDATE, DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Secure chat histories (users can only see their own session)
CREATE POLICY "Users can view their own chat sessions" ON public.n8n_chat_histories
FOR SELECT TO authenticated
USING (session_id IN (
  SELECT unnest(ARRAY[auth.uid()::text, (auth.jwt()->>'session_id')::text])
));

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

-- Security Fix 2: Fix SECURITY DEFINER functions to use proper search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'  -- Explicit schema to prevent search_path attacks
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Update other SECURITY DEFINER functions
CREATE OR REPLACE FUNCTION public.log_contact_activity(
  _contact_id uuid, 
  _activity_type text, 
  _title text, 
  _description text DEFAULT NULL::text, 
  _metadata jsonb DEFAULT NULL::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'  -- Explicit schema
AS $function$
BEGIN
  INSERT INTO public.contact_activities (
    contact_id, activity_type, title, description, metadata, user_id, created_by
  ) VALUES (
    _contact_id, _activity_type, _title, _description, _metadata, 
    COALESCE(
      (SELECT user_id FROM public.contact WHERE contact_id = _contact_id),
      auth.uid()
    ),
    auth.uid()
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.mark_visited(_id smallint)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'  -- Explicit schema
AS $function$
BEGIN
  UPDATE public.queries
  SET visited_r = TRUE
  WHERE id = _id;
END;
$function$;