import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, noteContent } = await req.json();

    const systemPrompt = `You are a helpful AI assistant integrated into a note-taking app. 
The user is currently writing or viewing a note. Use the following note content for context to answer the user's questions.

Note Content:
"""
${noteContent || "(Empty note)"}
"""`;

    const result = streamText({
      model: google('gemini-2.5-flash'), 
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("AI Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}


