
// Message types
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

// Saree recommendation types
export interface SareeRecommendation {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  color: string;
  material: string;
  occasion: string;
  link: string;
}

// Filter types
export interface SareeFilters {
  colors: string[];
  materials: string[];
  occasions: string[];
  priceRange: [number, number];
  designers: string[];
}