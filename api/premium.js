import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generatePremiumText({fullName, birthDate, tzolkinDay}) {
  const prompt = `
Ti si mistični Tzolkin vodič in astrološki svetovalec. Ustvari obsežno, premium razlago za uporabnika, ki vključuje:
1. Kolektivno energijo dneva na osnovi Tzolkin dneva (${tzolkinDay})
2. Dnevni ritual, ki uporabniku pomaga uskladiti zavest z energijo dneva
3. Refleksivno vprašanje ali misel za osebno rast
4. Subtilno povabilo k VIP opciji za izračun individualne energije na podlagi rojstnega dne (${birthDate}) in dneve Tzolkin energije ali KIN-a
5. Mističen, poetičen in navdihujoč stil, kot bi govoril starodavni Tzolkin vodič

Ime uporabnika: ${fullName}
Datum rojstva: ${birthDate}
Tzolkin dan: ${tzolkinDay}

Rezultat naj bo dolg vsaj 400 besed, strukturiran v odstavkih, jasen in berljiv.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Ti si mistični Tzolkin vodič, ki ustvarja premium astrološke razlage." },
      { role: "user", content: prompt }
    ],
    max_tokens: 1200
  });

  return response.choices[0].message.content;
}
