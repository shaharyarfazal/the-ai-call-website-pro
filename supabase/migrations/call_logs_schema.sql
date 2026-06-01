-- ============================================================
-- DEMO LEADS TABLE
-- Stores form submissions from the callback form
-- ============================================================
CREATE TABLE IF NOT EXISTS public.demo_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT NOT NULL,
    call_id TEXT,                        -- Retell AI call_id returned after triggering
    call_status TEXT DEFAULT 'initiated', -- initiated | completed | failed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.demo_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (form submissions from the website)
CREATE POLICY "Anyone can submit demo lead" ON public.demo_leads
    FOR INSERT WITH CHECK (true);

-- Only authenticated users (admins) can view leads
CREATE POLICY "Admins can view demo leads" ON public.demo_leads
    FOR SELECT TO authenticated USING (true);


-- ============================================================
-- CALL LOGS TABLE  
-- Stores the full Retell AI post-call webhook data
-- ============================================================
CREATE TABLE IF NOT EXISTS public.call_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    call_id TEXT UNIQUE NOT NULL,
    agent_id TEXT,
    from_number TEXT,
    to_number TEXT,
    call_type TEXT,
    call_status TEXT,
    direction TEXT,
    duration_ms INTEGER,
    transcript TEXT,
    recording_url TEXT,
    public_log_url TEXT,
    disconnection_reason TEXT,
    -- Call analysis fields
    call_summary TEXT,
    user_sentiment TEXT,
    call_successful BOOLEAN,
    in_voicemail BOOLEAN,
    -- Store full raw payload for reference
    raw_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ended_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admins) can view logs
CREATE POLICY "Admins can view call logs" ON public.call_logs
    FOR SELECT TO authenticated USING (true);

-- Service role (used by edge functions) can insert
CREATE POLICY "Service role can insert call logs" ON public.call_logs
    FOR INSERT WITH CHECK (true);

-- Service role can update (e.g. update status when webhook arrives)
CREATE POLICY "Service role can update call logs" ON public.call_logs
    FOR UPDATE USING (true);
