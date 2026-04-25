import handler from '../api/ai.js';
import dotenv from 'dotenv';

dotenv.config();

const mockReq = {
    method: 'POST',
    body: {
        action: 'chat',
        payload: {
            message: 'Tell me about yourself',
            context: 'User is on the home page'
        }
    }
};

const mockRes = {
    status: (code) => ({
        json: (data) => {
            console.log(`[STATUS ${code}]`, JSON.stringify(data, null, 2));
        }
    })
};

console.log("Testing Vercel Serverless Function Proxy...");
handler(mockReq, mockRes).catch(err => {
    console.error("Test Failed:", err);
});
