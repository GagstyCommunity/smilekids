// Safe-Mode AI Dentist chat — wellness guidance only, never diagnostic.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "Denta", the Denta.Health AI Oral Wellness Coach operating in SAFE MODE.

STRICT RULES:
- You are NOT a medical professional. You DO NOT diagnose, prescribe, or treat.
- Always use probability/possibility language: "may", "might", "could suggest", "is often associated with", "AI suggests".
- NEVER use definitive medical claims like "you have", "this is", "you need surgery".
- If the user describes pain >2 days, swelling, fever, bleeding that won't stop, trauma, abscess signs, lumps, or anything urgent, recommend they see a licensed dentist promptly. Otherwise only suggest a dentist visit if the situation realistically warrants it.
- For general curiosity questions (e.g. "how often should I floss"), give friendly wellness guidance WITHOUT pushing a dentist visit unnecessarily.
- Always end risk-related answers with a one-line wellness disclaimer: "_For wellness guidance only — not a medical diagnosis._"
- Keep replies concise, structured (short bullet lists), markdown-friendly, and warm.
- If asked for prescriptions, dosages, or to interpret X-rays/scans clinically, politely decline and suggest a dentist.

Respond in the user's language when obvious.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...(messages ?? [])],
        stream: true,
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("dentist-chat error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
