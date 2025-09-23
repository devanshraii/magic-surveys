import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const { topic } = await request.json();

    const prompt = `
      You are an expert survey creator. Your task is to generate a list of 5 concise, high-quality multiple-choice questions based on the following topic: "${topic}".

      You MUST adhere to these rules:
      1. Generate exactly 5 questions.
      2. Each question must have exactly 4 options.
      3. The options should be clear and distinct.
      4. You MUST respond ONLY with a valid JSON array of objects in the following format. Do not include any other text, explanations, or markdown formatting like \`\`\`json.

      The required JSON format is:
      [
        {
          "questionText": "Your generated question here",
          "options": ["Option A", "Option B", "Option C", "Option D"]
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    responseText = responseText.replace(/```json|```/g, "").trim();

    
    const questions = JSON.parse(responseText);

    return NextResponse.json({
      success: true,
      questions,
    });

  } catch (error) {
    console.error('AI generation failed:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate questions. Please try again.' },
      { status: 500 }
    );
  }
}