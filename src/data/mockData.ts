
import { SareeRecommendation } from '../types';

// Mock data for saree recommendations
export const mockSareeRecommendations: SareeRecommendation[] = [
  {
    id: '1',
    name: 'Banarasi Silk Saree',
    description: 'Traditional Banarasi silk saree with intricate gold zari work, perfect for wedding ceremonies.',
    price: '₹12,999',
    image: 'https://images.unsplash.com/photo-1610189020382-9a4a4a5fdfc9?q=80&w=400&auto=format&fit=crop',
    color: 'Red',
    material: 'Silk',
    occasion: 'Wedding',
    link: '#'
  },
  {
    id: '2',
    name: 'Kanjivaram Silk Saree',
    description: 'Pure Kanjivaram silk saree with traditional temple border and rich pallu design.',
    price: '₹15,499',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop',
    color: 'Purple',
    material: 'Silk',
    occasion: 'Festival',
    link: '#'
  },
  {
    id: '3',
    name: 'Cotton Handloom Saree',
    description: 'Lightweight cotton handloom saree with contemporary prints, ideal for daily wear.',
    price: '₹2,499',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop',
    color: 'Blue',
    material: 'Cotton',
    occasion: 'Casual',
    link: '#'
  },
  {
    id: '4',
    name: 'Georgette Printed Saree',
    description: 'Lightweight georgette saree with modern floral prints and sequin embellishments.',
    price: '₹3,999',
    image: 'https://images.unsplash.com/photo-1610189020382-9a4a4a5fdfc9?q=80&w=400&auto=format&fit=crop',
    color: 'Green',
    material: 'Georgette',
    occasion: 'Party',
    link: '#'
  },
  {
    id: '5',
    name: 'Patola Silk Saree',
    description: 'Traditional Gujarati Patola silk saree with geometric patterns and vibrant colors.',
    price: '₹18,999',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop',
    color: 'Yellow',
    material: 'Silk',
    occasion: 'Wedding',
    link: '#'
  },
  {
    id: '6',
    name: 'Linen Saree',
    description: 'Breathable pure linen saree with minimal design, perfect for summer office wear.',
    price: '₹4,299',
    image: 'https://images.unsplash.com/photo-1610189020382-9a4a4a5fdfc9?q=80&w=400&auto=format&fit=crop',
    color: 'Beige',
    material: 'Linen',
    occasion: 'Office',
    link: '#'
  },
  {
    id: '7',
    name: 'Chiffon Embroidered Saree',
    description: 'Elegant chiffon saree with delicate embroidery work and pearl embellishments.',
    price: '₹6,799',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop',
    color: 'Pink',
    material: 'Chiffon',
    occasion: 'Reception',
    link: '#'
  },
  {
    id: '8',
    name: 'Chanderi Silk Saree',
    description: 'Lightweight Chanderi silk saree with gold border and traditional motifs.',
    price: '₹7,999',
    image: 'https://images.unsplash.com/photo-1610189020382-9a4a4a5fdfc9?q=80&w=400&auto=format&fit=crop',
    color: 'Teal',
    material: 'Chanderi Silk',
    occasion: 'Festival',
    link: '#'
  },
  {
    id: '9',
    name: 'Bhagalpuri Silk Saree',
    description: 'Bhagalpuri silk saree with nature-inspired prints and contrast border.',
    price: '₹5,499',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop',
    color: 'Orange',
    material: 'Bhagalpuri Silk',
    occasion: 'Puja',
    link: '#'
  },
  {
    id: '10',
    name: 'Organza Saree',
    description: 'Sheer organza saree with sequin work and contemporary design for modern look.',
    price: '₹8,299',
    image: 'https://images.unsplash.com/photo-1610189020382-9a4a4a5fdfc9?q=80&w=400&auto=format&fit=crop',
    color: 'Lavender',
    material: 'Organza',
    occasion: 'Party',
    link: '#'
  }
];

// Available filter options
export const filterOptions = {
  colors: ['Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Black', 'White', 'Gold', 'Silver', 'Beige', 'Teal', 'Lavender'],
  materials: ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Linen', 'Organza', 'Chanderi Silk', 'Bhagalpuri Silk', 'Banarasi Silk', 'Kanjivaram Silk', 'Patola Silk'],
  occasions: ['Wedding', 'Festival', 'Casual', 'Party', 'Office', 'Reception', 'Puja', 'Engagement', 'Daily Wear'],
  designers: ['Sabyasachi', 'Manish Malhotra', 'Ritu Kumar', 'Tarun Tahiliani', 'Anita Dongre', 'Raw Mango', 'Gaurang Shah']
};