import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are a local news writer for Tongass News, serving Southeast Alaska including Juneau, Ketchikan, Sitka, Wrangell, Petersburg, Haines, and Skagway. 

Write in a fun, encouraging, adventurous, safety-first style. Be warm and community-focused. Include practical advice, local context, and references to specific Tongass region locations.

CATEGORY-SPECIFIC GUIDANCE:

WILDLIFE: Cover whales (humpback, orca), bears (black, brown), eagles, sea otters, sea lions, salmon runs, and seasonal migrations. Reference specific locations like Icy Strait, Point Adolphus, Chilkat Valley, Pack Creek, Anan Creek.

MARITIME: Cover ferry schedules, cruise arrivals, harbor conditions, Coast Guard activity, vessel traffic, marine weather. Reference Alaska Marine Highway, specific ports, shipping lanes, and maritime safety.

COMMUNITY: Cover cultural events, tribal celebrations, festivals, arts, local business news, school events. Reference Celebration, Native heritage, totem carving, and community gatherings.

FISHING: Cover commercial fishing (salmon, halibut, crab, shrimp, herring), sport fishing, fish processing, regulations. Reference specific fisheries, seasons, quotas, and fishing communities.

WEATHER: Cover marine forecasts, storm systems, precipitation, avalanche conditions, seasonal patterns. Reference specific weather stations and local microclimates.

RECREATION: Cover hiking trails, skiing at Eaglecrest, kayaking, camping, Forest Service cabins, glacier viewing. Reference Tongass National Forest recreation opportunities.

Always be accurate about local geography. Reference real places like Gastineau Channel, Stephens Passage, Icy Strait, Lynn Canal, Frederick Sound, Chatham Strait, and other local waterways.

IMPORTANT: All content is authored by "Tongass News" - never use individual author names.
Each informational piece should be 400-600 words with substantive detail.`;

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

    // Categories to rotate through - ensures all sections get fresh content
    const categories = ['Wildlife', 'Maritime', 'Community', 'Fishing', 'Weather', 'Recreation'];
    const currentHour = new Date().getUTCHours();
    
    // Select 2 categories per cycle based on time (rotates through all categories daily)
    const cycleIndex = Math.floor(currentHour / 4); // 0-5 for 6 cycles
    const primaryCategory = categories[cycleIndex % categories.length];
    const secondaryCategory = categories[(cycleIndex + 3) % categories.length];
    
    console.log(`Cycle ${cycleIndex}: Generating content for ${primaryCategory} and ${secondaryCategory}`);

    const contentPrompt = `Generate fresh content for Tongass News. Create the following:

1. TWO informational pieces (400-600 words each) about current happenings in Southeast Alaska:
   - First piece in category: ${primaryCategory}
   - Second piece in category: ${secondaryCategory}
   
   Each piece should include a compelling title, brief excerpt (1-2 sentences), and full detailed content. Focus on timely, seasonal, and locally relevant information.

2. One CRITICAL safety ADVISORY (severity: critical) for the Inside Passage region. This should be a genuine safety concern like:
   - Marine weather warnings
   - Avalanche danger
   - Wildlife safety alerts  
   - Ferry service disruptions
   - Storm warnings
   - Ice conditions

3. Three ticker messages about current conditions:
   - One about harbor/maritime conditions
   - One about community events
   - One about weather or safety

Respond in JSON format:
{
  "informational_pieces": [
    {
      "title": "string",
      "excerpt": "string (1-2 sentences)",
      "content": "string (400-600 words, detailed and informative)",
      "category": "${primaryCategory}"
    },
    {
      "title": "string",
      "excerpt": "string (1-2 sentences)", 
      "content": "string (400-600 words, detailed and informative)",
      "category": "${secondaryCategory}"
    }
  ],
  "advisory": {
    "message": "string (urgent safety advisory, specific to current conditions)",
    "severity": "critical"
  },
  "tickers": [
    {"label": "HARBOR", "message": "string"},
    {"label": "EVENTS", "message": "string"},
    {"label": "WEATHER", "message": "string"}
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

    console.log('Generated content:', JSON.stringify(content, null, 2));

    // Insert informational pieces
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
          console.log('Inserted:', piece.category, '-', piece.title);
        }
      }
    }

    // Insert new advisory (deactivate old ones first)
    if (content.advisory) {
      await supabase
        .from('alerts')
        .update({ active: false })
        .lt('created_at', new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString());

      const { error: alertError } = await supabase
        .from('alerts')
        .insert({
          message: content.advisory.message,
          severity: 'critical',
          active: true,
        });

      if (alertError) {
        console.error('Error inserting advisory:', alertError);
      } else {
        console.log('Advisory inserted successfully');
      }
    }

    // Insert new ticker messages
    if (content.tickers && content.tickers.length > 0) {
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
      .lt('created_at', new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString());
    
    if (cleanupError) {
      console.error('Error cleaning up old content:', cleanupError);
    } else {
      console.log('Old content cleaned up');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      cycle: cycleIndex,
      categories: [primaryCategory, secondaryCategory],
      content,
      schedule: '6x daily (every 4 hours)',
      estimated_daily_pieces: '12 (2 per cycle)'
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
