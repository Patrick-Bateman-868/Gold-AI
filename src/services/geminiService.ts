import { GoogleGenAI } from "@google/genai";
import { MentorRole, Language } from "../types";

const CONTEXT_KAZAKHSTAN = `
Context: You are working with students in rural regions of Kazakhstan (auls). 
There is a severe shortage of qualified teachers and mentors there. 
You are NOT just a chatbot; you are their PRIMARY TEACHER and LIVE MENTOR. 
Be encouraging, patient, and explain everything from scratch if needed. 
Adapt to the student's level.
`;

const YOUTUBE_INSTRUCTION = `
IMPORTANT: To help the student understand the lesson better, you MUST provide relevant YouTube links for online lessons or tutorials related to the topic being discussed. 
Format the links clearly.
`;

const DIAGRAM_INSTRUCTION = `
IMPORTANT: You can draw diagrams and schemes using Mermaid.js syntax. 
When explaining hardware connections, code flow, or team structures, always include a Mermaid diagram.
Wrap the mermaid code in triple backticks with 'mermaid' language identifier.
`;

const REGULATOR_INSTRUCTION = `
YOU ARE A LEARNING REGULATOR. 
Your task is to guide the student through the levels defined in their roadmap.
1. Start by assessing their current knowledge for the active level.
2. Provide theory, then practice, then a project task.
3. DO NOT move to the next level until you are sure the student has mastered the current one.
4. When you are satisfied that the student has completed a level, you MUST include the tag [LEVEL_COMPLETE: X] in your response, where X is the level ID.
5. If the student completes Level 3, congratulate them and tell them to "Head to the Hub for greater knowledge!".
`;

const SYSTEM_PROMPTS: Record<MentorRole, string> = {
  programming: `You are the Programming Mentor for Gold Students Club. 
Your goal is to teach students how to code for robotics (Java for FTC/FRC, C++ for Arduino/VEX).
${CONTEXT_KAZAKHSTAN}
${YOUTUBE_INSTRUCTION}
${DIAGRAM_INSTRUCTION}
${REGULATOR_INSTRUCTION}
Focus on:
- Coding logic and algorithms.
- Specific libraries for robotics (FTC SDK, WPILib).
- Debugging and best practices.`,

  robotics: `You are the Robotics & Engineering Mentor for Gold Students Club.
Your goal is to teach students about robot construction, mechanics, and electronics.
${CONTEXT_KAZAKHSTAN}
${YOUTUBE_INSTRUCTION}
${DIAGRAM_INSTRUCTION}
${REGULATOR_INSTRUCTION}
Focus on:
- Mechanical design (gears, chassis, manipulators).
- Sensors and electronics (encoders, gyros, wiring).
- Physics of robotics.`,

  team: `You are the Team & Management Mentor for Gold Students Club.
Your goal is to help students organize their teams and distribute roles effectively.
${CONTEXT_KAZAKHSTAN}
Focus on:
- Role distribution (Captain, Lead Programmer, Builder, Outreach).
- Project management (Engineering Notebook, timelines).
- Conflict resolution and leadership.`,

  career: `You are the Career Growth Mentor for Gold Students Club.
Your goal is to guide students towards a successful future in STEM.
${CONTEXT_KAZAKHSTAN}
Focus on:
- Internships, scholarships, and universities.
- Building a portfolio and resume.
- Soft skills and networking.`
};

const LANGUAGE_INSTRUCTION: Record<Language, string> = {
  ru: "Please respond in Russian.",
  kk: "Please respond in Kazakh.",
  en: "Please respond in English."
};

export async function getMentorResponse(
  role: MentorRole, 
  language: Language,
  message: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[] = []
) {
  // Vite's 'define' will replace process.env.GEMINI_API_KEY with the string value from .env
  let apiKey = process.env.GEMINI_API_KEY;
  
  // Fallback to import.meta.env if defined (standard Vite way)
  if (!apiKey || apiKey === "undefined") {
    apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.GEMINI_API_KEY;
  }

  // Clean the key
  const finalKey = String(apiKey || "").trim().replace(/^["']|["']$/g, '');
  
  console.log("[Gemini Service] API Key detected:", !!finalKey && finalKey !== "undefined" && finalKey !== "MY_GEMINI_API_KEY");

  if (!finalKey || finalKey === "undefined" || finalKey === "" || finalKey === "MY_GEMINI_API_KEY") {
    throw new Error("ОШИБКА: API ключ не найден в системе. Убедитесь, что файл .env создан, содержит GEMINI_API_KEY=ваш_ключ и вы ПЕРЕЗАПУСТИЛИ сервер (npm run dev).");
  }

  const ai = new GoogleGenAI({ apiKey: finalKey });
  // Using the most standard name for maximum compatibility
  const model = "gemini-1.5-flash";
  
  try {
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: `${SYSTEM_PROMPTS[role]}\n\n${LANGUAGE_INSTRUCTION[language]}`,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    
    if (!result || !result.text) {
      throw new Error("ОШИБКА: ИИ вернул пустой ответ.");
    }
    
    return result.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    const errorMsg = error?.message || "";
    const status = error?.status || error?.status_code || "Unknown";
    
    // Fallback logic if the primary model is not found
    if (errorMsg.includes("model not found") || status === 404) {
      console.log("[Gemini Service] Falling back to gemini-1.5-flash-latest...");
      try {
        const fallbackChat = ai.chats.create({
          model: "gemini-1.5-flash-latest",
          config: {
            systemInstruction: `${SYSTEM_PROMPTS[role]}\n\n${LANGUAGE_INSTRUCTION[language]}`,
          },
          history: history,
        });
        const fallbackResult = await fallbackChat.sendMessage({ message });
        return fallbackResult.text;
      } catch (fallbackError: any) {
        throw new Error(`ОШИБКА (404): Модель не найдена. Попробуйте использовать другой API ключ или проверьте регион вашего аккаунта. (Тех. детали: ${fallbackError.message})`);
      }
    }
    
    if (errorMsg.includes("API_KEY_INVALID") || status === 403) {
      throw new Error(`ОШИБКА (403): Неверный API ключ. Проверьте его в Google AI Studio. Ключ начинается на: ${finalKey.substring(0, 4)}...`);
    }
    
    if (errorMsg.includes("quota") || status === 429) {
      throw new Error("ОШИБКА (429): Лимит запросов исчерпан. Подождите минуту.");
    }

    throw new Error(`ОШИБКА ИИ [${status}]: ${errorMsg || "Ошибка связи с сервером Google."}`);
  }
}
