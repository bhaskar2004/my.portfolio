import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function test() {
    console.log("Testing API Key:", API_KEY?.substring(0, 5) + "...");
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    try {
        console.log("Attempting with gemini-3-flash-preview...");
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const result = await model.generateContent("Explain how AI works in a few words");
        const response = await result.response;
        console.log("Success! AI Response:", response.text());
    } catch (error) {
        console.error("Call Failed!");
        console.error("Error Message:", error.message);
        if (error.status) console.error("Status Code:", error.status);
    }
}

test();
