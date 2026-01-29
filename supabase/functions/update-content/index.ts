import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are a local news writer for Tongass News, serving Southeast Alaska including Juneau, Ketchikan, Sitka, Wrangell, Petersburg, Haines, and Skagway. 

Write in a fun, encouraging, adventurous, safety-first style. Be warm and community-focused. Include practical advice, local context, and references to specific Tongass region locations.

Topics to cover:
- Inside Passage ferry schedules and conditions
- Mendenhall Glacier viewing updates
- Tongass National Forest recreation
- Commercial fishing fleet news (salmon, halibut, crab)
- Cruise ship arrivals and tourism updates
- Community events in regional towns
- Southeast Alaska weather and marine forecasts
- Wildlife: whales, bears, eagles, sea lions
- Totem pole and cultural heritage events
- Ice field and glacier conditions

Always be accurate about local geography and conditions. Reference real places like Gastineau Channel, Stephens Passage, Icy Strait, Lynn Canal, and other local waterways.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Generate new content
    const contentPrompt = `Generate fresh content for Tongass News. Create the following:

1. A news article about something happening in Southeast Alaska today. Include a compelling title, brief excerpt (1-2 sentences), and full content (2-3 paragraphs). Choose from topics like: ferry schedules, glacier conditions, fishing reports, wildlife sightings, community events, weather impacts, or cultural happenings.

2. One weather/safety alert relevant to the Inside Passage region. This could be about marine conditions, avalanche danger, ferry delays, or weather advisories.

3. Two ticker messages about current conditions - one about fishing and one about community events.

Respond in JSON format:
{
  "article": {
    "title": "string",
    "excerpt": "string",
    "content": "string",
    "category": "string (Wildlife, Transportation, Culture, Fishing, Weather, Local, or Community)"
  },
  "alert": {
    "message": "string",
    "severity": "info | warning | critical"
  },
  "tickers": [
    {"label": "FISHING", "message": "string"},
    {"label": "EVENTS", "message": "string"}
  ]
}`;

    console.log('Generating content with AI...');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: contentPrompt }
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = JSON.parse(aiData.choices[0].message.content);

    console.log('Generated content:', content);

    // Insert new article
    if (content.article) {
      const { error: articleError } = await supabase
        .from('news_articles')
        .insert({
          title: content.article.title,
          excerpt: content.article.excerpt,
          content: content.article.content,
          category: content.article.category,
        });

      if (articleError) {
        console.error('Error inserting article:', articleError);
      } else {
        console.log('Article inserted successfully');
      }
    }

    // Insert new alert (deactivate old ones first)
    if (content.alert) {
      // Deactivate old alerts
      await supabase
        .from('alerts')
        .update({ active: false })
        .lt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      const { error: alertError } = await supabase
        .from('alerts')
        .insert({
          message: content.alert.message,
          severity: content.alert.severity,
          active: true,
        });

      if (alertError) {
        console.error('Error inserting alert:', alertError);
      } else {
        console.log('Alert inserted successfully');
      }
    }

    // Insert new ticker messages
    if (content.tickers && content.tickers.length > 0) {
      // Deactivate old ticker messages
      await supabase
        .from('ticker_messages')
        .update({ active: false })
        .lt('created_at', new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString());

      for (const ticker of content.tickers) {
        const { error: tickerError } = await supabase
          .from('ticker_messages')
          .insert({
            label: ticker.label,
            message: ticker.message,
            active: true,
          });

        if (tickerError) {
          console.error('Error inserting ticker:', tickerError);
        }
      }
      console.log('Tickers inserted successfully');
    }

    return new Response(JSON.stringify({ success: true, content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in update-content:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
