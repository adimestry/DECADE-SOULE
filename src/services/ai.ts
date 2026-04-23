import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface DecadeResult {
  decade: string;
  title: string;
  description: string;
  cultural_refs: string[];
  why_you_match: string;
  colorScheme: {
    primary: string;
    accent: string;
    bg: string;
  };
}

export async function analyzeQuizResults(answers: { question: string; answer: string }[]): Promise<DecadeResult> {
  const prompt = `Analyze these 10 personality quiz answers and determine which 20th or early 21st century decade (1920s to 2010s) the person's soul most matches.
  
  Answers:
  ${answers.map((a, i) => `${i + 1}. Q: ${a.question}, A: ${a.answer}`).join('\n')}
  
  Return a structured cultural breakdown. The description should be evocative and era-accurate.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          decade: { type: Type.STRING, description: "The decade identifier (e.g., '1960s')" },
          title: { type: Type.STRING, description: "A catchy title for the result" },
          description: { type: Type.STRING, description: "Extended era-accurate description" },
          cultural_refs: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of 3-4 key cultural icons/references from that era"
          },
          why_you_match: { type: Type.STRING, description: "Why their specific answers led to this decade" },
          colorScheme: {
            type: Type.OBJECT,
            properties: {
              primary: { type: Type.STRING, description: "Hex color for primary elements" },
              accent: { type: Type.STRING, description: "Hex color for accent elements" },
              bg: { type: Type.STRING, description: "Hex color for page background" }
            },
            required: ['primary', 'accent', 'bg']
          }
        },
        required: ['decade', 'title', 'description', 'cultural_refs', 'why_you_match', 'colorScheme']
      }
    }
  });

  const result = JSON.parse(response.text || '{}');
  return result as DecadeResult;
}
