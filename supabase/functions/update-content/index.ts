import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cron-secret',
};

// Valid categories for content
const VALID_CATEGORIES = ['Wildlife', 'Maritime', 'Community', 'Fishing', 'Weather', 'Recreation'] as const;
const VALID_SEVERITIES = ['info', 'warning', 'critical'] as const;
const VALID_LABELS = ['HARBOR', 'EVENTS', 'WEATHER', 'FISHING', 'FERRY', 'COMMUNITY'] as const;

// Input validation functions
function validateString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > maxLength) return null;
  // Sanitize: remove script tags and dangerous patterns
  return trimmed
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

function validateCategory(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const category = VALID_CATEGORIES.find(c => c.toLowerCase() === value.toLowerCase());
  return category || null;
}

function validateSeverity(value: unknown): string {
  if (typeof value !== 'string') return 'info';
  const severity = VALID_SEVERITIES.find(s => s.toLowerCase() === value.toLowerCase());
  return severity || 'info';
}

function validateLabel(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const label = VALID_LABELS.find(l => l.toLowerCase() === value.toLowerCase());
  return label || value.toUpperCase().slice(0, 20);
}

function validateArticle(piece: unknown): { title: string; excerpt: string; content: string; category: string } | null {
  if (!piece || typeof piece !== 'object') return null;
  const p = piece as Record<string, unknown>;
  
  const title = validateString(p.title, 200);
  const excerpt = validateString(p.excerpt, 500);
  const content = validateString(p.content, 10000);
  const category = validateCategory(p.category);
  
  if (!title || !excerpt || !content || !category) return null;
  return { title, excerpt, content, category };
}

function validateAdvisory(advisory: unknown): { message: string; severity: string } | null {
  if (!advisory || typeof advisory !== 'object') return null;
  const a = advisory as Record<string, unknown>;
  
  const message = validateString(a.message, 500);
  const severity = validateSeverity(a.severity);
  
  if (!message) return null;
  return { message, severity };
}

function validateTicker(ticker: unknown): { label: string; message: string } | null {
  if (!ticker || typeof ticker !== 'object') return null;
  const t = ticker as Record<string, unknown>;
  
  const label = validateLabel(t.label);
  const message = validateString(t.message, 300);
  
  if (!label || !message) return null;
  return { label, message };
}

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
    // Authentication: Verify this is a legitimate cron job call
    const authHeader = req.headers.get('Authorization');
    const cronSecret = req.headers.get('x-cron-secret');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
    const CRON_SECRET = Deno.env.get('CRON_SECRET');
    
    // Allow calls from: 
    // 1. Cron job with matching secret
    // 2. Internal Supabase calls with valid anon key in Authorization header
    const isValidCronCall = CRON_SECRET && cronSecret === CRON_SECRET;
    const isValidInternalCall = authHeader && SUPABASE_ANON_KEY && authHeader.includes(SUPABASE_ANON_KEY);
    
    if (!isValidCronCall && !isValidInternalCall) {
      console.log('Unauthorized access attempt');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing required environment configuration');
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Categories to rotate through - ensures all sections get fresh content
    const categories = VALID_CATEGORIES;
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
      console.error('AI service error:', aiResponse.status);
      
      // Return generic error messages to clients
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: 'Service busy. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: 'Service temporarily unavailable.' }), {
          status: 503,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({ error: 'Content generation failed.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiData = await aiResponse.json();
    
    let content;
    try {
      content = JSON.parse(aiData.choices[0].message.content);
    } catch {
      console.error('Failed to parse AI response');
      return new Response(JSON.stringify({ error: 'Content generation failed.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let insertedArticles = 0;
    let insertedAlerts = 0;
    let insertedTickers = 0;

    // Validate and insert informational pieces
    if (Array.isArray(content.informational_pieces)) {
      for (const piece of content.informational_pieces) {
        const validatedArticle = validateArticle(piece);
        if (!validatedArticle) {
          console.log('Skipping invalid article');
          continue;
        }

        const { error: articleError } = await supabase
          .from('news_articles')
          .insert(validatedArticle);

        if (articleError) {
          console.error('Database error inserting article');
        } else {
          insertedArticles++;
          console.log('Inserted article:', validatedArticle.category);
        }
      }
    }

    // Validate and insert new advisory (deactivate old ones first)
    if (content.advisory) {
      const validatedAdvisory = validateAdvisory(content.advisory);
      if (validatedAdvisory) {
        await supabase
          .from('alerts')
          .update({ active: false })
          .lt('created_at', new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString());

        const { error: alertError } = await supabase
          .from('alerts')
          .insert({
            message: validatedAdvisory.message,
            severity: validatedAdvisory.severity,
            active: true,
          });

        if (alertError) {
          console.error('Database error inserting alert');
        } else {
          insertedAlerts++;
          console.log('Advisory inserted');
        }
      }
    }

    // Validate and insert new ticker messages
    if (Array.isArray(content.tickers)) {
      await supabase
        .from('ticker_messages')
        .update({ active: false })
        .lt('created_at', new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString());

      for (const ticker of content.tickers) {
        const validatedTicker = validateTicker(ticker);
        if (!validatedTicker) {
          console.log('Skipping invalid ticker');
          continue;
        }

        const { error: tickerError } = await supabase
          .from('ticker_messages')
          .insert({
            label: validatedTicker.label,
            message: validatedTicker.message,
            active: true,
          });

        if (tickerError) {
          console.error('Database error inserting ticker');
        } else {
          insertedTickers++;
        }
      }
      console.log('Tickers inserted:', insertedTickers);
    }

    // Clean up old content (keep rolling 72 hours worth)
    const { error: cleanupError } = await supabase
      .from('news_articles')
      .delete()
      .lt('created_at', new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString());
    
    if (cleanupError) {
      console.error('Cleanup error');
    } else {
      console.log('Old content cleaned up');
    }

    // Return minimal success response (don't expose generated content)
    return new Response(JSON.stringify({ 
      success: true, 
      inserted: {
        articles: insertedArticles,
        alerts: insertedAlerts,
        tickers: insertedTickers
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    // Log error server-side only, return generic message to client
    console.error('Internal error:', error instanceof Error ? error.message : 'Unknown');
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
