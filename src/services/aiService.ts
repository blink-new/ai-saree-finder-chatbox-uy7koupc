
import { SareeRecommendation } from '../types';
import { mockSareeRecommendations } from '../data/mockData';

// This is a mock AI service that simulates what would be done with DeepSeek in production
export const analyzeQuery = async (query: string): Promise<{
  responseText: string;
  recommendations: SareeRecommendation[];
}> => {
  try {
    // In a real implementation, we would use the DeepSeek API directly
    // For now, we'll simulate the DeepSeek API call with our own logic
    
    console.log("Using DeepSeek API simulation for query:", query);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Use our keyword matching as a simulation of what DeepSeek would do
    return simulateDeepSeekResponse(query);
  } catch (error) {
    console.error("Error in DeepSeek API simulation:", error);
    // Fallback to simple keyword matching
    return fallbackAnalysis(query);
  }
};

// Function to simulate what a DeepSeek API response would look like
const simulateDeepSeekResponse = (query: string): {
  responseText: string;
  recommendations: SareeRecommendation[];
} => {
  const queryLower = query.toLowerCase();
  let filteredSarees = [...mockSareeRecommendations];
  let responseText = '';
  
  // More sophisticated matching (simulating AI understanding)
  // Color matching
  const colorMapping = {
    'red': ['red', 'crimson', 'maroon', 'ruby'],
    'blue': ['blue', 'navy', 'azure', 'indigo'],
    'green': ['green', 'emerald', 'olive', 'jade'],
    'yellow': ['yellow', 'gold', 'amber', 'mustard'],
    'pink': ['pink', 'rose', 'fuchsia', 'magenta'],
    'purple': ['purple', 'violet', 'lavender', 'mauve'],
    'orange': ['orange', 'peach', 'coral', 'tangerine'],
    'black': ['black', 'ebony', 'jet', 'onyx'],
    'white': ['white', 'ivory', 'cream', 'pearl'],
    'beige': ['beige', 'tan', 'khaki', 'sand'],
    'teal': ['teal', 'turquoise', 'aqua', 'cyan'],
    'lavender': ['lavender', 'lilac', 'periwinkle', 'wisteria']
  };
  
  // Material matching
  const materialMapping = {
    'silk': ['silk', 'pure silk', 'raw silk', 'mulberry silk'],
    'cotton': ['cotton', 'handloom cotton', 'organic cotton', 'khadi cotton'],
    'georgette': ['georgette', 'pure georgette', 'crepe georgette'],
    'chiffon': ['chiffon', 'pure chiffon', 'silk chiffon'],
    'linen': ['linen', 'pure linen', 'linen blend', 'linen cotton'],
    'organza': ['organza', 'silk organza', 'tissue organza'],
    'chanderi': ['chanderi', 'chanderi silk', 'chanderi cotton'],
    'banarasi': ['banarasi', 'banarasi silk', 'pure banarasi'],
    'kanjivaram': ['kanjivaram', 'kanjeevaram', 'kanchipuram', 'pure kanjivaram'],
    'patola': ['patola', 'patola silk', 'patan patola'],
    'bhagalpuri': ['bhagalpuri', 'bhagalpuri silk', 'bhagalpur silk']
  };
  
  // Occasion matching
  const occasionMapping = {
    'wedding': ['wedding', 'marriage', 'bridal', 'bride', 'shaadi'],
    'festival': ['festival', 'festive', 'celebration', 'diwali', 'pongal', 'navratri', 'durga puja'],
    'casual': ['casual', 'daily', 'everyday', 'regular', 'simple'],
    'party': ['party', 'evening', 'cocktail', 'reception', 'function'],
    'office': ['office', 'work', 'formal', 'professional', 'business'],
    'reception': ['reception', 'engagement', 'ceremony', 'function'],
    'puja': ['puja', 'prayer', 'temple', 'religious', 'worship'],
    'engagement': ['engagement', 'roka', 'ceremony', 'pre-wedding']
  };
  
  // Check for color matches
  let matchedColor = null;
  for (const [color, synonyms] of Object.entries(colorMapping)) {
    if (synonyms.some(synonym => queryLower.includes(synonym))) {
      matchedColor = color;
      break;
    }
  }
  
  // Check for material matches
  let matchedMaterial = null;
  for (const [material, synonyms] of Object.entries(materialMapping)) {
    if (synonyms.some(synonym => queryLower.includes(synonym))) {
      matchedMaterial = material;
      break;
    }
  }
  
  // Check for occasion matches
  let matchedOccasion = null;
  for (const [occasion, synonyms] of Object.entries(occasionMapping)) {
    if (synonyms.some(synonym => queryLower.includes(synonym))) {
      matchedOccasion = occasion;
      break;
    }
  }
  
  // Apply filters based on matches
  if (matchedColor) {
    filteredSarees = filteredSarees.filter(saree => 
      saree.color.toLowerCase() === matchedColor.toLowerCase()
    );
  }
  
  if (matchedMaterial) {
    filteredSarees = filteredSarees.filter(saree => 
      saree.material.toLowerCase().includes(matchedMaterial.toLowerCase())
    );
  }
  
  if (matchedOccasion) {
    filteredSarees = filteredSarees.filter(saree => 
      saree.occasion.toLowerCase().includes(matchedOccasion.toLowerCase())
    );
  }
  
  // Generate response text based on matches
  if (filteredSarees.length === 0) {
    filteredSarees = mockSareeRecommendations.slice(0, 5);
    responseText = "I couldn't find exact matches for your request. Here are some popular saree options you might like. You can be more specific about color, material, or occasion for more tailored results.";
  } else {
    const matches = [];
    if (matchedColor) matches.push(`${matchedColor} color`);
    if (matchedMaterial) matches.push(`${matchedMaterial} material`);
    if (matchedOccasion) matches.push(`${matchedOccasion} occasion`);
    
    if (matches.length > 0) {
      responseText = `Here are ${filteredSarees.length} saree recommendations that match your request for ${matches.join(' and ')}. I've selected these based on your preferences.`;
    } else {
      // If no specific filters matched but we still have results (unlikely but possible)
      responseText = "Here are some saree recommendations that might interest you. You can be more specific about color, material, or occasion for more tailored results.";
    }
  }
  
  // Add some variety to responses to simulate AI
  const responseVariations = [
    `I found ${filteredSarees.length} beautiful sarees that match your preferences. Take a look!`,
    `Based on your request, I've selected ${filteredSarees.length} sarees that you might love.`,
    `Here are ${filteredSarees.length} stunning sarees that align with what you're looking for.`,
    `I've curated ${filteredSarees.length} sarees that match your criteria perfectly.`
  ];
  
  if (filteredSarees.length > 0 && matches && matches.length > 0) {
    // Use a random variation 50% of the time
    if (Math.random() > 0.5) {
      responseText = responseVariations[Math.floor(Math.random() * responseVariations.length)];
    }
  }
  
  return {
    responseText,
    recommendations: filteredSarees
  };
};

// Fallback function that uses simple keyword matching (original implementation)
const fallbackAnalysis = (query: string): Promise<{
  responseText: string;
  recommendations: SareeRecommendation[];
}> => {
  return new Promise((resolve) => {
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
    setTimeout(() => {
      resolve({
        responseText,
        recommendations: filteredSarees
      });
    }, 1000);
  });
};