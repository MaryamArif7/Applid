/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set correctly. Mock responses will be used.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, targetCompany, pastAnswers } = body;

    if (!prompt || !targetCompany) {
      return NextResponse.json(
        { error: 'New essay prompt and target company are required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const hasValidKey = apiKey && apiKey !== 'MY_GEMINI_API_KEY';

    if (!hasValidKey) {
      // Return a simulated high-quality draft if no key is supplied
      const simulatedText = `[Simulated Applid AI Draft for ${targetCompany}]

Dear Admissions/Hiring Committee at ${targetCompany},

Based on my previous responses detailing my track record:
- Past experience: "${pastAnswers && pastAnswers[0] ? pastAnswers[0].slice(0, 80) + '...' : 'Building reliable automated systems and user-centric workflows.'}"
- Core values: "${pastAnswers && pastAnswers[1] ? pastAnswers[1].slice(0, 80) + '...' : 'Driving high accountability and quiet efficiency.'}"

I am excited to address this prompt: "${prompt}". My unique blend of background experiences enables me to approach this problem with a balance of silent execution and clear structured logs. At ${targetCompany}, I prioritize automating workflows to deliver quiet, high-impact results, matching the high standard of your team. This allows me to scale operations while ensuring zero data loss and flawless team synchronization.`;

      return NextResponse.json({ result: simulatedText, simulated: true });
    }

    const ai = getGeminiClient();
    const contextText = pastAnswers && pastAnswers.length > 0 
      ? pastAnswers.map((ans: string, i: number) => `Past Answer #${i+1}: "${ans}"`).join('\n\n')
      : 'No past answers provided as reference context.';

    const systemPrompt = `You are a helpful and extremely professional writing advisor for Applid, an automatic application tracking browser extension.
Your target is to draft a fully-formed, professional, polished essay answer to the applicant's prompt for "${targetCompany}".
You must synthesize the user's historical responses (voice, phrasing, details) and adapt them directly to answer the new prompt seamlessly.
Do NOT sound lazy, and do NOT use fluff or overly dramatic buzzwords. Keep it elegant, clear, and tailored.`;

    const userMessage = `Target Organization/Company: ${targetCompany}
New Prompt to Answer: "${prompt}"

Applicant's Past Answers for context/tone reference:
${contextText}

Please write a highly customized, robust response for this prompt.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    console.error('Error in API suggest-answer:', error);
    return NextResponse.json(
      { error: 'Failed to generate answer. ' + (error.message || '') },
      { status: 500 }
    );
  }
}
