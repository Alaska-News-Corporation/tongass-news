-- News Articles
CREATE TABLE public.news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'local',
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Public read access for all articles
CREATE POLICY "Anyone can read news articles"
ON public.news_articles
FOR SELECT
USING (true);

-- Alerts (weather, safety, community)
CREATE TABLE public.alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  severity TEXT DEFAULT 'info', -- info, warning, critical
  active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Public read access for active alerts only
CREATE POLICY "Anyone can read active alerts"
ON public.alerts
FOR SELECT
USING (active = true);

-- Ticker Messages
CREATE TABLE public.ticker_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL, -- WEATHER, FISHING, EVENTS, etc.
  message TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ticker_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for active ticker messages only
CREATE POLICY "Anyone can read active ticker messages"
ON public.ticker_messages
FOR SELECT
USING (active = true);