-- Add RLS policies to deny direct writes from clients
-- The edge function uses service_role which bypasses RLS

-- Deny INSERT on news_articles for anon/authenticated users
CREATE POLICY "Deny direct inserts to news_articles"
ON public.news_articles
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- Deny UPDATE on news_articles for anon/authenticated users
CREATE POLICY "Deny direct updates to news_articles"
ON public.news_articles
FOR UPDATE
TO anon, authenticated
USING (false);

-- Deny DELETE on news_articles for anon/authenticated users  
CREATE POLICY "Deny direct deletes to news_articles"
ON public.news_articles
FOR DELETE
TO anon, authenticated
USING (false);

-- Deny INSERT on alerts for anon/authenticated users
CREATE POLICY "Deny direct inserts to alerts"
ON public.alerts
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- Deny UPDATE on alerts for anon/authenticated users
CREATE POLICY "Deny direct updates to alerts"
ON public.alerts
FOR UPDATE
TO anon, authenticated
USING (false);

-- Deny DELETE on alerts for anon/authenticated users
CREATE POLICY "Deny direct deletes to alerts"
ON public.alerts
FOR DELETE
TO anon, authenticated
USING (false);

-- Deny INSERT on ticker_messages for anon/authenticated users
CREATE POLICY "Deny direct inserts to ticker_messages"
ON public.ticker_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- Deny UPDATE on ticker_messages for anon/authenticated users
CREATE POLICY "Deny direct updates to ticker_messages"
ON public.ticker_messages
FOR UPDATE
TO anon, authenticated
USING (false);

-- Deny DELETE on ticker_messages for anon/authenticated users
CREATE POLICY "Deny direct deletes to ticker_messages"
ON public.ticker_messages
FOR DELETE
TO anon, authenticated
USING (false);