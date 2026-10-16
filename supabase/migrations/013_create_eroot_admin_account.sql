-- ==============================================================================
-- Al Quds Market — Default Admin Account: eroot
-- Migration: 013_create_eroot_admin_account.sql
-- ==============================================================================
-- Username / Email: eroot (eroot@alqudsmarket.com)
-- Password:         Qwerty@123
-- Role:             admin
-- ==============================================================================

-- 1. Ensure pgcrypto extension is active
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- 2. Remove any previous conflict to prevent GoTrue token errors
DELETE FROM auth.identities WHERE provider = 'email' AND (identity_data->>'email' = 'eroot@alqudsmarket.com' OR provider_id = 'eroot@alqudsmarket.com');
DELETE FROM auth.users WHERE email = 'eroot@alqudsmarket.com';

-- 3. Provision complete authenticated admin user with matching identity & profile
DO $$
DECLARE
  v_user_id UUID := gen_random_uuid();
  v_encrypted_pw TEXT;
BEGIN
  -- Generate bcrypt hash for 'Qwerty@123'
  v_encrypted_pw := extensions.crypt('Qwerty@123', extensions.gen_salt('bf', 10));

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
    'eroot@alqudsmarket.com',
    v_encrypted_pw,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"مسؤول النظام (eroot)","preferred_language":"ar"}'::jsonb,
    false,
    now(),
    now()
  );

  -- Insert into auth.identities (Required by GoTrue to avoid schema errors)
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
    v_user_id,
    v_user_id,
    jsonb_build_object('sub', v_user_id::text, 'email', 'eroot@alqudsmarket.com'),
    'email',
    'eroot@alqudsmarket.com',
    now(),
    now(),
    now()
  );

  -- Insert or update public.profiles with role = 'admin'
  INSERT INTO public.profiles (id, email, full_name, preferred_language, role)
  VALUES (
    v_user_id,
    'eroot@alqudsmarket.com',
    'مسؤول النظام (eroot)',
    'ar',
    'admin'
  )
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    full_name = 'مسؤول النظام (eroot)',
    updated_at = now();

END $$;

-- 4. Ensure promotion procedure verifies admin role
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'promote_user_to_admin') THEN
    PERFORM public.promote_user_to_admin('eroot@alqudsmarket.com');
  END IF;
END $$;
