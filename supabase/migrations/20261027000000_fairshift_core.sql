-- ==============================================================================
-- FAIRSHIFT MASTER DATABASE SCHEMA & RLS POLICIES
-- Supporting UN SDG 8: Decent Work and Economic Growth
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ORGANIZATIONS
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    sector TEXT NOT NULL CHECK (sector IN ('construction', 'college', 'hospital', 'factory')),
    tagline TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. PROFILES (extends Supabase auth.users or standalone demo)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'en',
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. SITES / DEPARTMENTS
CREATE TABLE IF NOT EXISTS sites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    geofence_radius_meters INTEGER DEFAULT 250,
    qr_secret TEXT NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. ORGANIZATION MEMBERSHIPS
CREATE TABLE IF NOT EXISTS organization_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('worker', 'employer', 'supervisor', 'admin')),
    job_title TEXT NOT NULL,
    primary_site_id UUID REFERENCES sites(id),
    base_wage_type TEXT NOT NULL DEFAULT 'daily' CHECK (base_wage_type IN ('daily', 'hourly', 'monthly')),
    base_wage_rate NUMERIC(10, 2) NOT NULL DEFAULT 800.00,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(org_id, user_id)
);

-- 6. SHIFTS & ROSTERS
CREATE TABLE IF NOT EXISTS shifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    scheduled_start TIMESTAMPTZ NOT NULL,
    scheduled_end TIMESTAMPTZ NOT NULL,
    nominal_hours NUMERIC(4, 2) NOT NULL DEFAULT 8.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. CHECKINS & ATTENDANCE
CREATE TABLE IF NOT EXISTS checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_uuid TEXT UNIQUE,
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    site_id UUID REFERENCES sites(id),
    shift_id UUID REFERENCES shifts(id),
    check_in_time TIMESTAMPTZ NOT NULL,
    check_out_time TIMESTAMPTZ,
    verification_method TEXT NOT NULL CHECK (verification_method IN ('qr', 'location', 'manual', 'supervisor_fallback')),
    gps_lat DOUBLE PRECISION,
    gps_lng DOUBLE PRECISION,
    break_duration_minutes INTEGER DEFAULT 0,
    total_hours NUMERIC(5, 2) DEFAULT 0.0,
    regular_hours NUMERIC(5, 2) DEFAULT 0.0,
    overtime_hours NUMERIC(5, 2) DEFAULT 0.0,
    approval_status TEXT NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'disputed', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. ATTENDANCE CORRECTIONS (AUDIT TRAIL)
CREATE TABLE IF NOT EXISTS attendance_corrections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checkin_id UUID NOT NULL REFERENCES checkins(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES profiles(id),
    original_checkin_time TIMESTAMPTZ,
    original_checkout_time TIMESTAMPTZ,
    corrected_checkin_time TIMESTAMPTZ,
    corrected_checkout_time TIMESTAMPTZ,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    resolved_by UUID REFERENCES profiles(id),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. PAYSLIPS & DISPUTES
CREATE TABLE IF NOT EXISTS payslips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    base_salary NUMERIC(10, 2) NOT NULL DEFAULT 0.0,
    approved_days INTEGER NOT NULL DEFAULT 0,
    regular_hours NUMERIC(6, 2) NOT NULL DEFAULT 0.0,
    overtime_hours NUMERIC(6, 2) NOT NULL DEFAULT 0.0,
    overtime_rate NUMERIC(10, 2) NOT NULL DEFAULT 0.0,
    overtime_pay NUMERIC(10, 2) NOT NULL DEFAULT 0.0,
    allowances NUMERIC(10, 2) NOT NULL DEFAULT 0.0,
    bonuses NUMERIC(10, 2) NOT NULL DEFAULT 0.0,
    deductions NUMERIC(10, 2) NOT NULL DEFAULT 0.0,
    net_payable NUMERIC(10, 2) NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'approved' CHECK (payment_status IN ('draft', 'approved', 'paid', 'disputed')),
    explanation_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(org_id, user_id, period_start, period_end)
);

CREATE TABLE IF NOT EXISTS payslip_disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payslip_id UUID NOT NULL REFERENCES payslips(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    dispute_category TEXT NOT NULL CHECK (dispute_category IN ('overtime_missing', 'wrong_deduction', 'incorrect_days', 'rate_mismatch', 'other')),
    details TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'resolved', 'rejected')),
    resolution_notes TEXT,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. VOICE & TEXT HAZARD REPORTS
CREATE TABLE IF NOT EXISTS hazard_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number TEXT UNIQUE NOT NULL,
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    site_id UUID REFERENCES sites(id),
    category TEXT NOT NULL,
    description TEXT,
    audio_storage_path TEXT,
    has_audio BOOLEAN NOT NULL DEFAULT false,
    image_storage_path TEXT,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'acknowledged', 'investigating', 'action_taken', 'resolved', 'employee_confirmed')),
    assigned_to UUID REFERENCES profiles(id),
    employer_response TEXT,
    resolution_notes TEXT,
    employee_contested BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS report_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES hazard_reports(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES profiles(id),
    event_type TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. ANONYMOUS TWO-WAY FEEDBACK (STRICT ZERO-PII ARCHITECTURE)
-- NOTE: Absolutely NO user_id, profile foreign keys, or GPS coordinates!
CREATE TABLE IF NOT EXISTS feedback_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    hashed_token TEXT UNIQUE NOT NULL, -- SHA-256 of private token held by worker only
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'responded', 'resolved')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feedback_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL REFERENCES feedback_threads(id) ON DELETE CASCADE,
    sender_role TEXT NOT NULL CHECK (sender_role IN ('worker_anonymous', 'employer')),
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. PORTABLE SKILL PASSPORT
CREATE TABLE IF NOT EXISTS skill_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    issuing_authority TEXT NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    certificate_id TEXT,
    evidence_url TEXT,
    verification_status TEXT NOT NULL DEFAULT 'self_declared' CHECK (verification_status IN ('self_declared', 'pending_verification', 'verified', 'rejected')),
    verified_by UUID REFERENCES profiles(id),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skill_shares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    share_token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT false,
    selected_skill_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. EXPLAINABLE FATIGUE ALERTS
CREATE TABLE IF NOT EXISTS fatigue_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    rule_id TEXT NOT NULL CHECK (rule_id IN ('shift_over_12h', 'weekly_over_48h', 'rest_gap_under_11h', 'consecutive_days_over_6')),
    rule_threshold TEXT NOT NULL,
    actual_value TEXT NOT NULL,
    explanation_text TEXT NOT NULL,
    checkin_ref_id UUID REFERENCES checkins(id),
    status TEXT NOT NULL DEFAULT 'flagged' CHECK (status IN ('flagged', 'contested', 'reviewed', 'cleared')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fatigue_appeals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    flag_id UUID NOT NULL REFERENCES fatigue_flags(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    worker_explanation TEXT NOT NULL,
    employer_notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_corrections ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslip_disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE hazard_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE fatigue_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE fatigue_appeals ENABLE ROW LEVEL SECURITY;

-- Anonymous feedback public token lookup function (Strict security definer)
CREATE OR REPLACE FUNCTION verify_and_get_feedback_thread(input_hashed_token TEXT)
RETURNS TABLE (
    thread_id UUID,
    org_id UUID,
    category TEXT,
    status TEXT,
    created_at TIMESTAMPTZ
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT t.id, t.org_id, t.category, t.status, t.created_at
    FROM feedback_threads t
    WHERE t.hashed_token = input_hashed_token;
END;
$$;
