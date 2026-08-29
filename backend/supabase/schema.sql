-- ==========================================================
-- IVORY SILK ATELIER - SUPABASE DIRECT DATABASE SCHEMA
-- Execute this SQL script directly in the Supabase SQL Editor
-- ==========================================================

-- 1. COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    creator TEXT DEFAULT 'Atelier Ivory Silk',
    category TEXT NOT NULL,
    collection_name TEXT,
    fabric TEXT NOT NULL,
    sizes TEXT[] NOT NULL DEFAULT '{}',
    price NUMERIC(10, 2) NOT NULL,
    compare_at_price NUMERIC(10, 2),
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    is_bestseller BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    includes JSONB DEFAULT '[]'::jsonb,
    care JSONB DEFAULT '[]'::jsonb,
    fit TEXT,
    model_info TEXT,
    image TEXT NOT NULL,
    hover_image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    colors JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_email TEXT NOT NULL,
    customer_first_name TEXT NOT NULL,
    customer_last_name TEXT NOT NULL,
    customer_phone TEXT,
    customer_country TEXT NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'PENDING',
    payment_status TEXT DEFAULT 'UNPAID',
    payment_provider TEXT DEFAULT 'PAYSTACK',
    payment_reference TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    size TEXT NOT NULL,
    color TEXT,
    quantity INT NOT NULL DEFAULT 1,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR INSTANT SUPABASE QUERIES
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_collection ON public.products(collection_name);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_reference ON public.orders(payment_reference);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- POLICIES: PUBLIC READ ACCESS FOR PRODUCTS & COLLECTIONS
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public read collections" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert order_items" ON public.order_items FOR INSERT WITH CHECK (true);
