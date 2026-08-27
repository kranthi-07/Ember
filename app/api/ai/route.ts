import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";

// Ensure the API key exists
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Strict validation of the expected output
const userPreferencesSchema = z.object({
  spicy: z.boolean().nullable().optional().transform(v => v ?? null),
  vegetarian: z.boolean().nullable().optional().transform(v => v ?? null),
  maxPrice: z.number().nullable().optional().transform(v => v ?? null),
  servings: z.number().nullable().optional().transform(v => v ?? null),
  categories: z.array(z.string()).nullable().optional().transform(v => v ?? []),
  preferences: z.array(z.string()).nullable().optional().transform(v => v ?? []),
});

export async function POST(req: Request) {
  if (!ai) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  let prompt = "";
  try {
    const body = await req.json();
    prompt = body.prompt;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `You are the intelligence layer for a premium restaurant called EMBER.
Your job is to understand natural language food requests and output ONLY valid JSON.
Extract dietary needs, price limits, servings, menu categories (Starters, Main Course, Rice, Breads, Desserts, Drinks), and flavor keywords.

Rules:
- DO NOT hallucinate or invent numbers. If a price limit or serving size is not explicitly mentioned by the user, you MUST return null for maxPrice and servings.
- Categories MUST perfectly match the defined list if mentioned.
- Keywords should go into the "preferences" array (e.g. "light", "chicken", "refreshing"). ALWAYS extract the main ingredient/food name they typed and put it in preferences!

User Request: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            spicy: { type: Type.BOOLEAN, nullable: true },
            vegetarian: { type: Type.BOOLEAN, nullable: true },
            maxPrice: { type: Type.NUMBER, nullable: true },
            servings: { type: Type.NUMBER, nullable: true },
            categories: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              nullable: true,
            },
            preferences: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              nullable: true,
            },
          },
        },
      },
    });

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    const rawData = JSON.parse(response.text);
    const validatedData = userPreferencesSchema.parse(rawData);

    // Fallback: If AI extracted nothing at all, use their exact query as a keyword
    const hasAnyFilter = 
      validatedData.spicy !== null || 
      validatedData.vegetarian !== null || 
      validatedData.maxPrice !== null || 
      validatedData.categories.length > 0 || 
      validatedData.preferences.length > 0;
      
    if (!hasAnyFilter && prompt.trim().length > 0) {
       validatedData.preferences = [prompt.trim()];
    }

    return NextResponse.json(validatedData);
  } catch (error) {
    console.warn("AI Route Error/Timeout, falling back to local parser:", error);
    
    // PHASE 8: Lightweight local fallback parser
    const fallbackData = {
      spicy: prompt.toLowerCase().includes("spicy") ? true : null,
      vegetarian: prompt.toLowerCase().includes("veg") ? true : null,
      maxPrice: null,
      servings: null,
      categories: [],
      preferences: prompt.trim() ? [prompt.trim()] : []
    };

    return NextResponse.json(fallbackData);
  }
}
