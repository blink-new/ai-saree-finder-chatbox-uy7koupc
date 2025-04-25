
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';

export interface SareeItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  similarity: number;
  description: string;
  shopUrl: string;
}

interface SareeCardProps {
  saree: SareeItem;
}

export function SareeCard({ saree }: SareeCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <img 
          src={saree.imageUrl} 
          alt={saree.name} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
            <Heart className="h-4 w-4 text-pink-500" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">{saree.price}</span>
            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
              {Math.round(saree.similarity * 100)}% match
            </span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{saree.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{saree.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}