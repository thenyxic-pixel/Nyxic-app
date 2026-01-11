
import { GoogleGenAI } from "@google/genai";

// Strictly using process.env.API_KEY as required by guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCaption = async (imagePrompt?: string, imageData?: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    let contents: any = "Write a creative, engaging, and modern Instagram-style caption for a social media post. Use relevant emojis and hashtags. Make it feel trendy and youthful.";

    if (imageData) {
      contents = {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: imageData } },
          { text: "Write a short, engaging Instagram-style caption for this image. Include emojis and trendy hashtags." }
        ]
      };
    } else if (imagePrompt) {
      contents = `Write an Instagram-style caption for a photo described as: "${imagePrompt}". Use emojis and hashtags.`;
    }

    const response = await ai.models.generateContent({
      model,
      contents,
    });

    // response.text is a getter property, correct usage
    return response.text || "Just another day in paradise! ✨ #blessed #vibes";
  } catch (error) {
    console.error("Gemini Caption Error:", error);
    return "Exploring the wonders of the world! 🌍 #adventure #nyxic";
  }
};

export const generateImageWithAI = async (prompt: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash-image';
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    // Iterating through all parts to find the image part as per guidelines
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Gemini Image Error:", error);
    throw error;
  }
};
