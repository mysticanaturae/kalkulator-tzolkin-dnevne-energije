import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generatePremiumText(prompt) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini", // ali drug model, ki ga želiš
    messages: [
      { role: "system", content: "Ti si mistični Tzolkin vodič, ki ustvarja premium astrološke razlage." },
      { role: "user", content: prompt }
    ],
    max_tokens: 1000
  });

  return response.choices[0].message.content;
}
