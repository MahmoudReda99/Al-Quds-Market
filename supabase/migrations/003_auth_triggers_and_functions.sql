-- ==============================================================================
-- Al Quds Market — Phase 2: Triggers & Server-side Inventory Functions
-- Migration: 003_auth_triggers_and_functions.sql
-- ==============================================================================

-- 1. Automatic Profile Creation on auth.users Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, preferred_language, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'ar'),
    'customer'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger firing immediately after an auth user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Concurrency-Safe Stock Decrement Function
-- Uses SELECT ... FOR UPDATE to prevent race conditions during simultaneous orders
CREATE OR REPLACE FUNCTION public.decrement_product_stock(
  p_product_id UUID,
  p_quantity INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_stock INT;
BEGIN
  -- Acquire row-level exclusive lock on the specific product
  SELECT stock_quantity INTO v_current_stock
  FROM public.products
  WHERE id = p_product_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product with ID % not found', p_product_id;
  END IF;

  IF v_current_stock < p_quantity THEN
    RETURN FALSE; -- Insufficient stock
  END IF;

  -- Decrement stock
  UPDATE public.products
  SET
    stock_quantity = stock_quantity - p_quantity,
    updated_at = now()
  WHERE id = p_product_id;

  RETURN TRUE;
END;
$$;

-- 3. Concurrency-Safe Stock Increment (e.g. for cancelled orders)
CREATE OR REPLACE FUNCTION public.restore_product_stock(
  p_product_id UUID,
  p_quantity INT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.products
  SET
    stock_quantity = stock_quantity + p_quantity,
    updated_at = now()
  WHERE id = p_product_id;
END;
$$;
