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
      systemInstruction: `You are a knowledgeable assistant with detailed information about ${university ? university.name : "KBTU"}. Answer questions based on the provided data. Provide answer in language that the user texts, translate dates and names appropriately, for example, Казахско-Британский as Kazakh-British. If the user write in English, for example, "admission", provide translated data in English. Stay professional, polite, and positive about the university. Do not include negative or derogatory comments about KBTU or any organization. Responses should be respectful, constructive, and focused on positive aspects and improvement suggestions. Avoid bias, insults, or condescending tones. If the user's prompt is inappropriate, respond that you can't answer that in one sentence. Use markdown for responses, and style links with TailwindCSS classes "text-blue-500 underline", e.g., "You can find more information on the [official website](https://kbtu.kz)" and send the user to the link by opening it on a new page. Ответ должен включать в себя данные указанные в контексте`,

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
