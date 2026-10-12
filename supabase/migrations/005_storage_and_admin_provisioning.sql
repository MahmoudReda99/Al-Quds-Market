-- ==============================================================================
-- Al Quds Market — Phase 2: Storage Buckets & Secure Admin Provisioning
-- Migration: 005_storage_and_admin_provisioning.sql
-- ==============================================================================

-- 1. Create Public Storage Bucket for Product and Category Images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5 MB limit per image
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

-- 2. Storage Row Level Security Policies
-- Anyone can view images in the product-images bucket
CREATE POLICY "Public Read Access for Product Images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');

-- Only verified admins can upload product images
CREATE POLICY "Admin Upload Access for Product Images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND public.is_admin()
  );

-- Only verified admins can update product images
CREATE POLICY "Admin Update Access for Product Images"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'product-images'
    AND public.is_admin()
  );

-- Only verified admins can delete product images
CREATE POLICY "Admin Delete Access for Product Images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'product-images'
    AND public.is_admin()
  );

-- 3. Secure Admin Provisioning Function
-- Can only be called by superusers / service_role (SECURITY DEFINER with strict access)
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(p_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Look up user by email in auth.users
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = LOWER(TRIM(p_email));

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No user found with email %', p_email;
  END IF;

  -- Update role in public.profiles
  UPDATE public.profiles
  SET
    role = 'admin',
    updated_at = now()
  WHERE id = v_user_id;

  RETURN TRUE;
END;
$$;

-- Restrict execution: only service_role (and database owner) can execute this function
REVOKE ALL ON FUNCTION public.promote_user_to_admin(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.promote_user_to_admin(TEXT) FROM anon;
REVOKE ALL ON FUNCTION public.promote_user_to_admin(TEXT) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.promote_user_to_admin(TEXT) TO service_role;
