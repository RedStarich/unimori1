import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import kbtuData from '../../../kbtuData.json'; // Предположим, ваши данные находятся в этом файле

dotenv.config();

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
if (!apiKey) {
  throw new Error('API_KEY is not defined in the environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const context = `Here is some information about Kazakh-British Technical University (KBTU):\n${JSON.stringify(kbtuData, null, 2)}\n\n`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are a knowledgeable assistant with detailed information about KBTU. Answer the questions based on the following data. If the answer requires listing items, present them as a bulleted list or numbered list.`,
    });
    
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: `${context} ${question}` }],
        },
      ],
    });

    const result = await chatSession.sendMessage(question);
    console.log("API Response:", result); // Debugging line

    res.status(200).json({ answer: result.response.text() });
  } catch (error) {
    console.error("Error generating response:", error); // Debugging line
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
}
