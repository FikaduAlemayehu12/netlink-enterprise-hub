
import { GoogleGenAI } from "@google/genai";
// Fix: Import ChatMessage from the shared types file
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are the NetLink Assistant, an AI representative of NetLink General Solutions PLC.
Your goal is to help users learn about the company, its services, and its leadership.

Company Info:
- Founded in 2024 by Mr. Fikadu Alemayehu.
- Headquartered in Addis Ababa, Ethiopia.
- Services: Enterprise Networking, Software Development (Web, Mobile, Government Systems), CCTV (Hikvision Partner), Electrical & Finishing, Cybersecurity, Data Centers.
- Mission: Drive technological advancement in Ethiopia and Africa.
- CEO: Mr. Fikadu Alemayehu.
- CTO: Mr. Feyisa Bekele.

Be professional, helpful, and concise. If you don't know an answer, suggest they contact the company at +251 910 340 909 or visit the Contact page.
`;

/**
 * Communicates with Gemini API to provide intelligent responses for the NetLink Assistant.
 * Uses ChatMessage type to handle conversation history consistently.
 */
export async function getChatResponse(message: string, history: ChatMessage[]) {
  try {
    // Fix: Initialize GoogleGenAI correctly using the named parameter apiKey
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        // Map application roles to Gemini SDK roles ('user' and 'model')
        ...history.map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
    
    // Fix: Access response.text property directly as a property, not a method, per SDK guidelines
    return response.text || "I'm sorry, I encountered an issue generating a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please try again or reach us at fikadualemayehu1437@gmail.com.";
  }
}
