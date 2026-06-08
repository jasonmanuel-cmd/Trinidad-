-- Trippy Head Stash Delivery - Supabase Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  date_of_birth TEXT,
  is_vip BOOLEAN DEFAULT false,
  vip_credits NUMERIC(10,2) DEFAULT 0,
  delivery_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Products
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL DEFAULT 'Trippy',
  category TEXT NOT NULL,
  subcategory TEXT,
  price NUMERIC(10,2) NOT NULL,
  thc TEXT,
  type TEXT NOT NULL DEFAULT 'flower',
  description TEXT,
  image_url TEXT,
  is_preorder BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify products"
  ON public.products FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only admins can update products"
  ON public.products FOR UPDATE
  USING (auth.role() = 'service_role');

CREATE POLICY "Only admins can delete products"
  ON public.products FOR DELETE
  USING (auth.role() = 'service_role');

-- 3. Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'regular' CHECK (type IN ('regular', 'preorder')),
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'dispatched', 'delivered', 'cancelled')),
  payment_method TEXT NOT NULL DEFAULT 'cod' CHECK (payment_method IN ('cod')),
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address JSONB NOT NULL,
  delivery_date DATE,
  is_vip_order BOOLEAN DEFAULT false,
  vip_credit_used NUMERIC(10,2) DEFAULT 0,
  notes TEXT,
  cancellation_reason TEXT,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (auth.role() = 'service_role');

-- 4. Order Status History
CREATE TABLE IF NOT EXISTS public.order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  changed_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order history"
  ON public.order_status_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_id AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all history"
  ON public.order_status_history FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Admins can insert history"
  ON public.order_status_history FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- 5. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage notifications"
  ON public.notifications FOR ALL
  USING (auth.role() = 'service_role');

-- Auto-update updated_at on orders
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed products from mock data
INSERT INTO public.products (name, brand, category, price, thc, type, description, is_preorder, featured, in_stock) VALUES
('Trippy Truffles', 'Trippy', 'Edibles', 30.00, NULL, 'edible', 'Premium cannabis-infused chocolate truffles. Rich, decadent, and perfectly dosed.', false, true, true),
('Golden Goat', 'Trippy', 'Flower', 40.00, '22%', 'flower', 'Uplifting sativa-dominant hybrid with a sweet, citrus aroma. Perfect for daytime use.', false, true, true),
('Midnight Kush', 'Trippy', 'Flower', 35.00, '25%', 'flower', 'Heavy indica for deep relaxation. Earthy notes with a smooth finish.', false, true, true),
('Sour Diesel', 'Trippy', 'Flower', 38.00, '24%', 'flower', 'Classic sativa with that diesel punch. Energizing and euphoric.', false, true, true),
('Blue Dream', 'Trippy', 'Flower', 35.00, '21%', 'flower', 'Balanced hybrid. Sweet berry aroma meets gentle cerebral effects.', false, true, true),
('Granddaddy Purple', 'Trippy', 'Flower', 40.00, '26%', 'flower', 'Legendary indica. Grape and berry notes with full-body relaxation.', false, true, true),
('Strawberry Cough', 'Trippy', 'Flower', 36.00, '20%', 'flower', 'Sweet strawberry flavor with a legendary energizing effect.', false, true, true),
('OG Kush', 'Trippy', 'Flower', 42.00, '27%', 'flower', 'West coast legend. Pine and lemon fuel aroma with balanced effects.', false, true, true),
('Gelato 45', 'Trippy', 'Flower', 45.00, '28%', 'flower', 'Dessert strain with creamy, fruity profile. Potent and long-lasting.', false, true, true),
('Mango Haze', 'Trippy', 'Flower', 34.00, '18%', 'flower', 'Tropical sativa. Bright, energetic, and creatively inspiring.', false, true, true),
('Northern Lights', 'Trippy', 'Flower', 38.00, '23%', 'flower', 'Pure indica classic. Spicy, sweet aroma with powerful body effects.', false, true, true),
('Runtz', 'Trippy', 'Flower', 44.00, '29%', 'flower', 'Candy-flavored hybrid. Bag appeal meets knockout potency.', false, true, true),
('Cosmic Brownie', 'Trippy', 'Edibles', 25.00, NULL, 'edible', 'Fudgy cosmic brownie. Each piece is precisely dosed for a consistent experience.', false, true, true),
('Sour Gummy Worms', 'Trippy', 'Edibles', 20.00, NULL, 'edible', 'Tangy and sweet gummy worms. Perfect for microdosing or a full journey.', false, true, true),
('Live Resin Sugar', 'Trippy', 'Concentrates', 55.00, '78%', 'concentrate', 'Full-spectrum live resin sugar. Terpene-rich with exceptional flavor.', false, true, true),
('THCa Diamonds', 'Trippy', 'Concentrates', 65.00, '92%', 'concentrate', 'Pure THCa diamonds with a touch of sauce for flavor. Maximum potency.', false, true, true),
('Mango Tangie Vape', 'Trippy', 'Vapes', 35.00, '85%', 'vape', 'Live resin mango tangie cart. Zesty citrus with tropical mango sweetness.', false, true, true),
('Strawnana Blast Vape', 'Trippy', 'Vapes', 35.00, '88%', 'vape', 'Strawberry banana distillate cart. Smooth, flavorful, and consistent.', false, true, true),
('Pre-Roll Pack', 'Trippy', 'Pre-Rolls', 25.00, NULL, 'preroll', '5-pack of premium flower pre-rolls. Rotating strain selection.', false, true, true),
('Kosher Kush Pre-Roll', 'Trippy', 'Pre-Rolls', 12.00, '24%', 'preroll', 'Single kosher kush pre-roll. Earthy, relaxing, perfectly rolled.', false, true, true);

-- Preorder products
INSERT INTO public.products (name, brand, category, price, thc, type, description, is_preorder, featured, in_stock) VALUES
('Exotic Gas (California Drop)', 'Trippy', 'Flower', 55.00, '30%', 'flower', 'Coming from California. Premium exotic grown under California sun. Limited batch.', true, false, true),
('LA Kush Cake (California Drop)', 'Trippy', 'Flower', 55.00, '28%', 'flower', 'Coming from California. Kush cake bred in LA. Expect dessert terps.', true, false, true),
('Stiizy Pod - Blueberry AK (California Drop)', 'Trippy', 'Vapes', 40.00, '90%', 'vape', 'Coming from California. Authentic Stiizy pod, blueberry AK strain.', true, false, true),
('Stiizy Pod - Gelato (California Drop)', 'Trippy', 'Vapes', 40.00, '88%', 'vape', 'Coming from California. Authentic Stiizy pod, gelato strain.', true, false, true);
