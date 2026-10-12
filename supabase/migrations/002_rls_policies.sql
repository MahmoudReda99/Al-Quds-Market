-- ==============================================================================
-- Al Quds Market — Phase 2: Row Level Security Policies
-- Migration: 002_rls_policies.sql
-- ==============================================================================

-- 1. Helper function: is_admin()
-- Uses SECURITY DEFINER to securely inspect the user's role without trigger loops
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. Enable RLS on every single table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- PROFILES POLICIES
-- ==============================================================================
-- Users can view their own profile; admins can view all
CREATE POLICY "Users can view own profile or admin can view all"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

-- Users can update their own profile; admins can update all
CREATE POLICY "Users can update own profile or admin can update all"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (auth.uid() = id OR public.is_admin());

-- Profile insertion is handled via trigger, but allow user self-insert if needed
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ==============================================================================
-- CATEGORIES POLICIES
-- ==============================================================================
-- Anyone can view active categories; admins can view all
CREATE POLICY "Anyone can view active categories"
  ON public.categories
  FOR SELECT
  USING (is_active = true OR public.is_admin());

-- Admin full control
CREATE POLICY "Admins can manage categories"
  ON public.categories
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==============================================================================
-- PRODUCTS POLICIES
-- ==============================================================================
-- Anyone can view active products; admins can view all
CREATE POLICY "Anyone can view active products"
  ON public.products
  FOR SELECT
  USING (is_active = true OR public.is_admin());

-- Admin full control
CREATE POLICY "Admins can manage products"
  ON public.products
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==============================================================================
-- DELIVERY AREAS POLICIES
-- ==============================================================================
-- Anyone can view active delivery areas
CREATE POLICY "Anyone can view active delivery areas"
  ON public.delivery_areas
  FOR SELECT
  USING (is_active = true OR public.is_admin());

-- Admin full control
CREATE POLICY "Admins can manage delivery areas"
  ON public.delivery_areas
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==============================================================================
-- PROMOTIONS POLICIES
-- ==============================================================================
-- Only admins can view and manage all promotions
CREATE POLICY "Admins can manage promotions"
  ON public.promotions
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Customers can view active promotions by code during checkout
CREATE POLICY "Customers can lookup active promotions"
  ON public.promotions
  FOR SELECT
  USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));

-- ==============================================================================
-- ORDERS POLICIES
-- ==============================================================================
-- Customers can view their own orders; admins can view all
CREATE POLICY "Customers can view own orders"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = profile_id OR public.is_admin());

-- Customers can insert orders for themselves
CREATE POLICY "Customers can create own orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

-- Admins can update orders (e.g. status transition)
CREATE POLICY "Admins can update orders"
  ON public.orders
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ==============================================================================
-- ORDER ITEMS POLICIES
-- ==============================================================================
-- Customers can view items belonging to their own orders; admins can view all
CREATE POLICY "Customers can view own order items"
  ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
        AND (orders.profile_id = auth.uid() OR public.is_admin())
    )
  );

-- Customers can insert order items into their own newly created orders
CREATE POLICY "Customers can insert own order items"
  ON public.order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
        AND orders.profile_id = auth.uid()
    )
  );

-- ==============================================================================
-- FAVORITES POLICIES
-- ==============================================================================
CREATE POLICY "Users can manage own favorites"
  ON public.favorites
  FOR ALL
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);
