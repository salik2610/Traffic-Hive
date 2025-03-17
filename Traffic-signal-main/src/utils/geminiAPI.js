import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyCxoJBIObPLrGv9K_xSuzOcENBiY3_sCBs');
export async function analyzeTrafficImage(imageData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    const base64Data = imageData.split(',')[1];
    
    const imageParts = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg"
      },
    };

    const prompt = `Analyze this traffic scene and provide detailed information in the following JSON format. 
For traffic signals, follow these rules:
- If current signal is red, next signal should be green
- If current signal is green, next signal should be yellow
- If current signal is yellow, next signal should be red
Provide the analysis in this format:
{
  "trafficDensity": {
    "level": "low/medium/high",
    "description": "brief description of traffic conditions"
  },
  "vehicleAnalysis": {
    "totalCount": number,
    "composition": "description of vehicle types present"
  },
  "safetyAssessment": {
    "riskLevel": "low/medium/high",
    "concerns": "detailed safety concerns if any",
    "recommendations": "safety recommendations"
  },
  "trafficFlow": {
    "status": "flowing/moderate/congested",
    "suggestedSignal": "red/yellow/green",
    "waitTime": "estimated wait time in minutes",
    "nextSignal": {
      "color": "red/yellow/green",
      "timeUntilChange": "estimated time in seconds until next signal change",
      "duration": "estimated duration of next signal in seconds"
    }
  }
}`;

    const result = await model.generateContent([prompt, imageParts]);
    const response = await result.response;
    
    const responseText = response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Invalid response format from API");
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error analyzing traffic image:", error);
    throw error;
  }
}