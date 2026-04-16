import { GoogleGenerativeAI } from "@google/generative-ai";
import { portfolioData } from "./ai/portfolioData";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `
You are the AI assistant for Bhaskar T (bhaskar2004).
You are helpful, practical, and slightly enthusiastic — with a strong focus on real-world software development and testing.

WHO IS BHASKAR T?
- ${portfolioData.bio.about}
- Key Projects: ${portfolioData.projects.map(p => p.title).join(', ')}
- Technical Skills: ${portfolioData.skills.technical.join(', ')}

GUIDELINES:
- Answer questions based on the portfolio data provided.
- Emphasize Bhaskar's **testing mindset + real-world development experience**.
- Keep responses very concise, helpful, and human-like (under 2-3 small paragraphs).
- If something is unknown, say you'll ask Bhaskar to get back to them.
`;

export async function askBhaskarAI(userMessage, context = "") {
    if (!API_KEY || API_KEY === 'your_actual_key_here') {
        return "I'm sorry, Bhaskar hasn't set up my API key yet! Please contact him directly at bhaskart.dev@gmail.com.";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-preview" });
        
        let contextualPrompt = SYSTEM_PROMPT;
        if (context) {
            contextualPrompt += `\nCURRENT PAGE CONTEXT: ${context}\nPlease focus your response on this context if relevant.`;
        }

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: contextualPrompt }] },
                { role: "model", parts: [{ text: "Understood. I am Bhaskar's AI assistant with full context of his portfolio. Ready to help!" }] },
            ],
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Oops! I hit a snag while thinking. Feel free to try again!";
    }
}

/**
 * Command Palette Processor
 * Converts natural language into specific site actions.
 */
export async function processCommand(input) {
    if (!API_KEY) return null;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-preview" });
        const prompt = `
        You are a command processor for Bhaskar T's portfolio.
        Convert the following user input into a JSON command.
        
        AVAILABLE ACTIONS:
        1. "navigate": Used for moving to site sections. THE PAYLOAD MUST BE THE EXACT LITERAL 'path' FROM THE LIST BELOW.
        2. "search": Used for finding projects. THE PAYLOAD MUST BE THE EXACT LITERAL 'id' FROM THE PROJECTS LIST BELOW.
        3. "action": Internal triggers like "clear_chat" or "toggle_theme".
        4. "chat": If the user is just asking a question.

        SECTIONS (Use 'path' for payload): ${JSON.stringify(portfolioData.sections)}
        PROJECTS (Use 'id' for payload): ${JSON.stringify(portfolioData.projects.map(p => ({ id: p.id, title: p.title })))}

        USER INPUT: "${input}"

        RETURN ONLY VALID JSON in this format:
        { "type": "navigate" | "search" | "action" | "chat", "payload": "the_literal_path_or_id", "label": "Human readable summary of the result" }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        // Clean markdown backticks if present
        const text = response.text().replace(/```json|```/g, "").trim();
        return JSON.parse(text);
    } catch (error) {
        console.error("Command Processing Error:", error);
        return { type: "chat", payload: input, label: "Ask AI" };
    }
}

/**
 * Resume Job Matcher
 * Analyzes a Job Description against Bhaskar's Resume.
 */
export async function generateJobMatch(jdText) {
    if (!API_KEY) return null;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-preview" });
        const prompt = `
        Compare BHASKAR T's RESUME against this JOB DESCRIPTION.
        
        RESUME: ${JSON.stringify(portfolioData)}
        
        JOB DESCRIPTION: "${jdText}"
        
        Identify the top 3-5 matching skills and top 1 relevant project.
        Provide a concise "Matching Score" as a percentage.
        
        RETURN ONLY VALID JSON in this format:
        { 
          "score": number, 
          "matchingSkills": ["Skill 1", "Skill 2"], 
          "topProject": "Project Title",
          "summary": "1-sentence summary of why he's a fit."
        }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json|```/g, "").trim();
        return JSON.parse(text);
    } catch (error) {
        console.error("Job Match Error:", error);
        return null;
    }
}

export async function generateSmartDraft(instructions) {
    if (!API_KEY) return null;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-preview" });
        const prompt = `Based on these short notes: "${instructions}", draft a professional and polite email/message to Bhaskar T. 
        Keep it concise (1-3 paragraphs) and professional. 
        Only provide the email text, no subject line or extra fluff.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Draft Error:", error);
        return null;
    }
}
