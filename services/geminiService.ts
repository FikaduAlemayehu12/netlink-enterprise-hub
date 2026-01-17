
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the NetLink Assistant, an AI representative of NetLink General Solutions PLC.
Your goal is to help users learn about the company, its services, and its leadership.

Company Info:
- Founded in 2024 by Mr. Fikadu Alemayehu.
- Headquartered in Addis Ababa, Ethiopia.
- Services: Enterprise Networking, Software Development, System Integration, Cybersecurity, Data Centers, Smart Infrastructure.
- Mission: Drive technological advancement in Ethiopia and Africa.
- CEO: Mr. Fikadu Alemayehu.
- CTO: Mr. Feyisa Bekele.

Be professional, helpful, and concise. If you don't know an answer, suggest they contact the company at +251 910 340 909 or visit the Contact page.
`;

export async function getChatResponse(message: string, history: { role: 'user' | 'assistant', content: string }[]) {
  try {
    // Correct initialization with direct process.env.API_KEY reference as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
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
    
    // Access response.text property (not a method)
    return response.text || "I'm sorry, I'm having trouble connecting to the network right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error. Please try again or contact our support team directly.";
  }
}
