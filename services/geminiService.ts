
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getHint = async (problem: string, incorrectAnswer: string): Promise<string> => {
  const prompt = `
    You are a friendly and encouraging teacher helping a 7-year-old child with a math problem in a game.
    The problem is in Indonesian. Please respond ONLY in Indonesian.
    The problem: "${problem}"
    The child's incorrect answer: "${incorrectAnswer}"
    
    Give a very simple, one-sentence hint to guide the child.
    Do NOT give the final answer.
    Focus on the first step or the concept.
    
    Example hint for addition: "Coba hitung satu per satu dulu, pelan-pelan saja."
    Example hint for subtraction: "Uang kembalian itu sisa dari uang yang dibayar. Coba dihitung selisihnya."
    Example hint for multiplication: "Ingat, perkalian itu seperti penjumlahan berulang, lho!"
    Example hint for division: "Pembagian itu seperti membagi sama rata. Coba bayangkan kamu punya permen sebanyak itu."
    
    Make the hint sound cheerful and supportive.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching hint from Gemini:", error);
    return "Oops! Sepertinya ada sedikit masalah. Coba lagi ya!";
  }
};
