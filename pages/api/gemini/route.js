import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
// import kbtuData from '../../../data/kbtuData.json'; // Данные KBTU
import universitiesData from '../../../data/universities.json'; // Данные всех университетов

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

  const { question, uniName } = req.body;

  if (!question || !uniName) {
    return res.status(400).json({ error: 'Question and uniName are required' });
  }

  const university = universitiesData.find(uni => uni.name === uniName);
  const context = university 
    ? `Here is some information about ${university.name}:\n${JSON.stringify(university, null, 2)}\n\n`
    : `Here is some information about Kazakh-British Technical University (KBTU):\n${JSON.stringify(kbtuData, null, 2)}\n\n`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are a knowledgeable assistant with detailed information about ${university ? university.name : "KBTU"}. Answer the questions based on the following data. If the answer requires listing items, present them as a bulleted list or numbered list. Respond in the language the user talks, translate the data to the user's language such as 12 Января to 12th January or Казахско-Британский to Kazakh-British. Stay professional and polite`,
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
