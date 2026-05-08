// Wellness-only AI teeth scan — accepts a base64 image, returns a wellness assessment.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are Denta.Health's wellness photo analyzer. You analyze a user-uploaded photo of teeth and return ONLY structured wellness observations. You are NOT a diagnostic system.

Rules:
- Use probability language ("may", "could suggest", "appears to").
- Never claim a cavity, infection, or disease exists.
- Risk levels are limited to "low" | "medium" | "high" and reflect wellness habit attention only.
- Highlighted zones are approximate visual focus areas as percentages of the image (x, y, width, height in 0-100), used as friendly overlays. Provide 2-4 zones max.
- Always include a clear wellness disclaimer.

Return ONLY a tool call.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { imageBase64, mimeType } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "imageBase64 is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const dataUrl = `data:${mimeType || "image/jpeg"};base64,${imageBase64}`;

    const body = {
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this teeth photo for wellness only. Return the structured assessment via the tool." },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "wellness_assessment",
            description: "Return a wellness assessment of the teeth photo.",
            parameters: {
              type: "object",
              properties: {
                score: { type: "number", description: "Overall wellness score 0-100 (higher is better)" },
                overallRisk: { type: "string", enum: ["low", "medium", "high"] },
                summary: { type: "string", description: "1-2 sentence friendly summary using probability language." },
                areas: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      risk: { type: "string", enum: ["low", "medium", "high"] },
                      description: { type: "string" },
                    },
                    required: ["name", "risk", "description"],
                  },
                },
                zones: {
                  type: "array",
                  description: "Approximate highlight rectangles over the image (percentages 0-100).",
                  items: {
                    type: "object",
                    properties: {
                      label: { type: "string" },
                      risk: { type: "string", enum: ["low", "medium", "high"] },
                      x: { type: "number" }, y: { type: "number" },
                      width: { type: "number" }, height: { type: "number" },
                    },
                    required: ["label", "risk", "x", "y", "width", "height"],
                  },
                },
                recommendations: { type: "array", items: { type: "string" } },
                disclaimer: { type: "string" },
              },
              required: ["score", "overallRisk", "summary", "areas", "zones", "recommendations", "disclaimer"],
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "wellness_assessment" } },
    };

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (r.status === 429 || r.status === 402) {
      return new Response(JSON.stringify({ error: r.status === 429 ? "Rate limit exceeded." : "AI credits exhausted." }), {
        status: r.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!r.ok) {
      const t = await r.text();
      console.error("scan-teeth gateway error", r.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const json = await r.json();
    const toolCall = json.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "No structured response" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const args = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(args), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("scan-teeth error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
