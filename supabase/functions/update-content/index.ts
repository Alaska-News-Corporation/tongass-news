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

Always be accurate about local geography and conditions. Reference real places like Gastineau Channel, Stephens Passage, Icy Strait, Lynn Canal, and other local waterways.

IMPORTANT: All content is authored by "Tongass News" - never use individual author names.`;

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

    // Get current hour to determine what to generate
    const currentHour = new Date().getUTCHours();
    
    // Determine content type based on schedule
    // 6x daily updates (every 4 hours) for: alerts, tickers, weather, advisories, charts
    // Rolling informational pieces: 10-12 daily means ~2 per update cycle
    const isInformationalCycle = [0, 4, 8, 12, 16, 20].includes(currentHour);
    
    // Generate content - 2 informational pieces per cycle to reach 10-12 daily
    const contentPrompt = `Generate fresh content for Tongass News. Create the following:

1. TWO informational pieces (400-600 words each) about current happenings in Southeast Alaska. Each should include a compelling title, brief excerpt (1-2 sentences), and full detailed content. Focus on quality over quantity.
   
   Choose from topics like: ferry schedules & conditions, glacier viewing updates, fishing reports, wildlife sightings, community events, weather impacts, cultural happenings, harbor conditions, trail reports, or maritime safety.

2. One weather/safety ADVISORY (use red/critical styling) relevant to the Inside Passage region. This could be about marine conditions, avalanche danger, ferry delays, storm warnings, or safety advisories. ALL ADVISORIES ARE CRITICAL.

3. Three ticker messages about current conditions:
   - One about fishing/harbor conditions
   - One about community events  
   - One about weather/safety

Respond in JSON format:
{
  "informational_pieces": [
    {
      "title": "string",
      "excerpt": "string (1-2 sentences)",
      "content": "string (400-600 words, detailed and informative)",
      "category": "string (Wildlife, Transportation, Culture, Fishing, Weather, Local, Community, Maritime, or Recreation)"
    },
    {
      "title": "string",
      "excerpt": "string (1-2 sentences)", 
      "content": "string (400-600 words, detailed and informative)",
      "category": "string"
    }
  ],
  "advisory": {
    "message": "string (urgent safety advisory)",
    "severity": "critical"
  },
  "tickers": [
    {"label": "HARBOR", "message": "string"},
    {"label": "EVENTS", "message": "string"},
    {"label": "WEATHER", "message": "string"}
  ]
}`;

    console.log('Generating content with AI (6x daily cycle)...');

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
      
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required - please add credits' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = JSON.parse(aiData.choices[0].message.content);

    console.log('Generated content:', content);

    // Insert informational pieces (2 per cycle = ~12 daily)
    if (content.informational_pieces && content.informational_pieces.length > 0) {
      for (const piece of content.informational_pieces) {
        const { error: articleError } = await supabase
          .from('news_articles')
          .insert({
            title: piece.title,
            excerpt: piece.excerpt,
            content: piece.content,
            category: piece.category,
          });

        if (articleError) {
          console.error('Error inserting informational piece:', articleError);
        } else {
          console.log('Informational piece inserted:', piece.title);
        }
      }
    }

    // Insert new advisory (deactivate old ones first)
    if (content.advisory) {
      // Deactivate alerts older than 4 hours (one cycle)
      await supabase
        .from('alerts')
        .update({ active: false })
        .lt('created_at', new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString());

      const { error: alertError } = await supabase
        .from('alerts')
        .insert({
          message: content.advisory.message,
          severity: 'critical', // All advisories are red/critical
          active: true,
        });

      if (alertError) {
        console.error('Error inserting advisory:', alertError);
      } else {
        console.log('Advisory inserted successfully');
      }
    }

    // Insert new ticker messages (refresh every cycle)
    if (content.tickers && content.tickers.length > 0) {
      // Deactivate ticker messages older than 4 hours
      await supabase
        .from('ticker_messages')
        .update({ active: false })
        .lt('created_at', new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString());

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

    // Clean up old informational pieces (keep rolling 48 hours worth)
    const { error: cleanupError } = await supabase
      .from('news_articles')
      .delete()
      .lt('created_at', new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString());
    
    if (cleanupError) {
      console.error('Error cleaning up old content:', cleanupError);
    } else {
      console.log('Old content cleaned up successfully');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      content,
      schedule: '6x daily (every 4 hours)',
      pieces_per_cycle: 2,
      estimated_daily_pieces: '10-12'
    }), {
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
