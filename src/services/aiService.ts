
import { SareeRecommendation } from '../types';
import { mockSareeRecommendations } from '../data/mockData';

// This is a mock AI service that simulates what would be done with OpenAI in production
export const analyzeQuery = async (query: string): Promise<{
  responseText: string;
  recommendations: SareeRecommendation[];
}> => {
  // In a real app, this would call OpenAI API
  // For now, we'll use simple keyword matching
  
  const queryLower = query.toLowerCase();
  let filteredSarees = [...mockSareeRecommendations];
  let responseText = '';
  
  // Filter by color
  const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'black', 'white', 'gold', 'silver', 'beige', 'teal', 'lavender'];
  let colorMatched = false;
  for (const color of colors) {
    if (queryLower.includes(color)) {
      filteredSarees = filteredSarees.filter(saree => 
        saree.color.toLowerCase() === color
      );
      colorMatched = true;
      break;
    }
  }
  
  // Filter by material
  const materials = ['silk', 'cotton', 'georgette', 'chiffon', 'linen', 'organza', 'chanderi', 'banarasi', 'kanjivaram', 'patola', 'bhagalpuri'];
  let materialMatched = false;
  for (const material of materials) {
    if (queryLower.includes(material)) {
      filteredSarees = filteredSarees.filter(saree => 
        saree.material.toLowerCase().includes(material)
      );
      materialMatched = true;
      break;
    }
  }
  
  // Filter by occasion
  const occasions = ['wedding', 'festival', 'casual', 'party', 'office', 'reception', 'puja', 'engagement', 'daily'];
  let occasionMatched = false;
  for (const occasion of occasions) {
    if (queryLower.includes(occasion)) {
      filteredSarees = filteredSarees.filter(saree => 
        saree.occasion.toLowerCase().includes(occasion)
      );
      occasionMatched = true;
      break;
    }
  }
  
  // If no specific filters matched or no results, return all recommendations
  if (filteredSarees.length === 0) {
    filteredSarees = mockSareeRecommendations.slice(0, 5);
    responseText = "I couldn't find exact matches for your request. Here are some popular saree options you might like. You can be more specific about color, material, or occasion for more tailored results.";
  } else if (!colorMatched && !materialMatched && !occasionMatched) {
    responseText = "Here are some popular saree recommendations. You can be more specific about color, material, or occasion for more tailored results.";
  } else {
    const filters = [];
    if (colorMatched) filters.push("color");
    if (materialMatched) filters.push("material");
    if (occasionMatched) filters.push("occasion");
    
    responseText = `Here are ${filteredSarees.length} saree recommendations based on your ${filters.join(' and ')} preferences. I've selected options that match your requirements.`;
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    responseText,
    recommendations: filteredSarees
  };
};

// In a real app, this would be integrated with OpenAI
// Example OpenAI integration (commented out as we're using mock data for now)
/*
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeQueryWithAI = async (query: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { 
        role: "system", 
        content: "You are an AI assistant that helps users find sarees. Analyze the user query and extract information about color, material, occasion, price range, and any other relevant details."
      },
      { role: "user", content: query }
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
};
*/