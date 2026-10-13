-- ==============================================================================
-- Al Quds Market — Phase 2: Default Administrator & Operator Account
-- Migration: 011_create_default_admin_account.sql
-- ==============================================================================
-- Safe & 100% Idempotent script to provision the default Admin & Operator account
-- Email:    admin@alqudsmarket.com
-- Password: Admin@AlQuds2026!
-- Role:     admin
-- ==============================================================================

-- 1. Ensure pgcrypto extension is available for bcrypt hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- 2. Create or update default admin user in auth.users & public.profiles
DO $$
DECLARE
  v_user_id UUID;
  v_encrypted_pw TEXT;
BEGIN
  -- Hash password 'Admin@AlQuds2026!' using bcrypt
  v_encrypted_pw := extensions.crypt('Admin@AlQuds2026!', extensions.gen_salt('bf', 10));

  -- Check if user already exists in auth.users
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@alqudsmarket.com';

  IF v_user_id IS NULL THEN
    v_user_id := gen_random_uuid();
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
      created_at,
      updated_at,
      confirmation_token
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
      now(),
      now(),
      ''
    );
  ELSE
    -- If user already exists, ensure password and confirmation are set
    UPDATE auth.users
    SET
      encrypted_password = v_encrypted_pw,
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      raw_user_meta_data = '{"full_name":"مدير النظام والتشغيل","phone":"+20 111 089 1114","preferred_language":"ar"}'::jsonb,
      updated_at = now()
    WHERE id = v_user_id;
  END IF;

  -- Ensure profile exists in public.profiles and has role 'admin'
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

-- 3. Confirm elevation via stored procedure if present
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'promote_user_to_admin') THEN
    PERFORM public.promote_user_to_admin('admin@alqudsmarket.com');
  END IF;
END $$;
