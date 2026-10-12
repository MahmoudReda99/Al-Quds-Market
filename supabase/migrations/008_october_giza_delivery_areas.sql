-- ==============================================================================;
-- Migration 008: 6th of October City (Giza) Delivery Areas Configuration
-- Sets up districts of 6th of October City & Sheikh Zayed with specific delivery fees
-- ==============================================================================;

-- 1. Deactivate any previous delivery areas to prevent breaking existing foreign key constraints
UPDATE public.delivery_areas
SET is_active = false
WHERE is_active = true;

-- 2. Insert 6th of October City (Giza) districts
INSERT INTO public.delivery_areas (name_ar, name_en, fee, free_delivery_threshold, sort_order, is_active) VALUES
  ('الحي المتميز - 6 أكتوبر', 'Al Motamayez District - 6th of October', 15.00, 150.00, 1, true),
  ('غرب سوميد - 6 أكتوبر', 'West Somid - 6th of October', 15.00, 150.00, 2, true),
  ('ميدان الحصري والمحور المركزي', 'Al Hosary Square & Central Axis', 12.00, 120.00, 3, true),
  ('الأحياء السكنية (الأول إلى الخامس)', 'Residential Districts (1st to 5th)', 12.00, 120.00, 4, true),
  ('الأحياء السكنية (السادس إلى الثاني عشر)', 'Residential Districts (6th to 12th)', 15.00, 150.00, 5, true),
  ('جنوب الأحياء', 'South Residential Districts', 18.00, 180.00, 6, true),
  ('التوسعات الشمالية', 'Northern Expansions', 20.00, 200.00, 7, true),
  ('حدائق أكتوبر', 'October Gardens (Hadayek October)', 20.00, 200.00, 8, true),
  ('الشيخ زايد', 'Sheikh Zayed City', 25.00, 250.00, 9, true),
  ('المنطقة الصناعية - 6 أكتوبر', '6th of October Industrial Zone', 25.00, 250.00, 10, true)
ON CONFLICT DO NOTHING;
