import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { kin, ton, sign, date } = req.body;

  const prompt = `
Ustvari premium Tzolkin dnevno razlago za kolektivno zavest.

Dan:
- Datum: ${date}
- Ton: ${ton}
- Znamenje: ${sign}
- KIN: ${kin}

Vključi:
- globok opis energije dneva
- vpliv na zavest in podzavest
- ritual dneva
- vprašanje za refleksijo
- mističen, ne-new-age slog
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Si starodavni Tzolkin vodnik zavesti." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1200
    });

    res.status(200).json({
      text: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: "AI error" });
  }
}
