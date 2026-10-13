-- ==============================================================================
-- Al Quds Market — Phase 2: Default Administrator & Operator Account
-- Migration: 011_create_default_admin_account.sql
-- ==============================================================================
-- Safe, 100% idempotent provisioning script compatible with Supabase GoTrue Auth
-- Creates the user in auth.users AND auth.identities to prevent schema errors.
--
-- Email:    admin@alqudsmarket.com
-- Password: Admin@AlQuds2026!
-- Role:     admin
-- ==============================================================================

-- 1. Ensure pgcrypto extension is available
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- 2. Clean up any previous partial or corrupted entry to avoid "Database error querying schema"
DELETE FROM auth.identities WHERE provider = 'email' AND (identity_data->>'email' = 'admin@alqudsmarket.com' OR provider_id = 'admin@alqudsmarket.com');
DELETE FROM auth.users WHERE email = 'admin@alqudsmarket.com';

-- 3. Provision complete authenticated user with linked identity
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_encrypted_pw TEXT;
BEGIN
  -- Generate bcrypt hash for password 'Admin@AlQuds2026!'
  v_encrypted_pw := extensions.crypt('Admin@AlQuds2026!', extensions.gen_salt('bf', 10));

  -- Insert into auth.users with all required GoTrue attributes
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    v_user_id,
    'authenticated',
    'authenticated',
    'admin@alqudsmarket.com',
    v_encrypted_pw,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"مدير النظام والتشغيل","phone":"+20 111 089 1114","preferred_language":"ar"}'::jsonb,
    false,
    now(),
    now()
  );

  -- Insert into auth.identities (Required by Supabase Studio to prevent schema errors)
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    v_user_id::text,
    v_user_id,
    jsonb_build_object('sub', v_user_id::text, 'email', 'admin@alqudsmarket.com'),
    'email',
    'admin@alqudsmarket.com',
    now(),
    now(),
    now()
  );

  -- Insert into public.profiles with role = 'admin'
  INSERT INTO public.profiles (id, email, full_name, phone, preferred_language, role)
  VALUES (
    v_user_id,
    'admin@alqudsmarket.com',
    'مدير النظام والتشغيل',
    '+20 111 089 1114',
    'ar',
    'admin'
  )
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    full_name = 'مدير النظام والتشغيل',
    phone = '+20 111 089 1114',
    updated_at = now();

END $$;

-- 4. Verify promotion procedure
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'promote_user_to_admin') THEN
    PERFORM public.promote_user_to_admin('admin@alqudsmarket.com');
  END IF;
END $$;
