import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import { getMatchingMenuItems } from "./lib/match-utils";
import { menuData } from "./lib/menu-data";

const userPreferencesSchema = z.object({
  spicy: z.boolean().nullable().optional().transform(v => v ?? null),
  vegetarian: z.boolean().nullable().optional().transform(v => v ?? null),
  maxPrice: z.number().nullable().optional().transform(v => v ?? null),
  servings: z.number().nullable().optional().transform(v => v ?? null),
  categories: z.array(z.string()).default([]),
  preferences: z.array(z.string()).default([]),
});

async function runTest(query: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set. Cannot run AI tests.");
    return;
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log(`\n--- Testing: "${query}" ---`);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `You are the intelligence layer for a premium restaurant called EMBER.
Your job is to understand natural language food requests and output ONLY valid JSON.
Extract dietary needs, price limits, servings, menu categories (Starters, Main Course, Rice, Breads, Desserts, Drinks), and flavor keywords.

Rules:
- If a value is unknown, use null.
- Categories MUST perfectly match the defined list if mentioned.
- Keywords should go into the "preferences" array (e.g. "light", "chicken", "refreshing").

User Request: "${query}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            spicy: { type: Type.BOOLEAN },
            vegetarian: { type: Type.BOOLEAN },
            maxPrice: { type: Type.NUMBER },
            servings: { type: Type.NUMBER },
            categories: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            preferences: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    const parsed = userPreferencesSchema.parse(JSON.parse(response.text!));
    console.log("Extracted Preferences:", JSON.stringify(parsed, null, 2));

    const matches = getMatchingMenuItems(parsed, menuData);
    console.log("Matching Menu Items:", matches.map(m => `${m.name} (₹${m.price})`));

  } catch (error) {
    console.error("Test failed:", error);
  }
}

async function main() {
  const tests = [
    "spicy dinner for two under ₹800",
    "I'm vegetarian and want something light under ₹500",
    "chicken",
    "I have a sweet tooth, what desserts do you have?",
    "just give me something to eat"
  ];

  for (const test of tests) {
    await runTest(test);
  }
}

main();
