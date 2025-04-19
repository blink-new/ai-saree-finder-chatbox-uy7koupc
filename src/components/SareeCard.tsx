
import { ShoppingBag } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { SareeRecommendation } from '../types';

interface SareeCardProps {
  saree: SareeRecommendation;
  view: 'grid' | 'list';
}

export function SareeCard({ saree, view }: SareeCardProps) {
  if (view === 'grid') {
    return (
      <Card className="overflow-hidden border-pink-100 dark:border-pink-900 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        <div className="aspect-[3/4] relative">
          <img 
            src={saree.image} 
            alt={saree.name} 
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-white text-pink-600 dark:bg-gray-800 dark:text-pink-300">
              {saree.price}
            </Badge>
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-lg">{saree.name}</h3>
          <div className="flex flex-wrap gap-1 my-2">
            <Badge variant="outline" className="bg-pink-50 text-pink-700 dark:bg-pink-900 dark:text-pink-200">
              {saree.color}
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-200">
              {saree.material}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              {saree.occasion}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {saree.description}
          </p>
          <Button 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            size="sm"
            onClick={() => window.open(saree.link, '_blank')}
          >
            <ShoppingBag size={16} className="mr-2" />
            Shop Now
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden border-pink-100 dark:border-pink-900 hover:shadow-md transition-all duration-300">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
            <img 
              src={saree.image} 
              alt={saree.name} 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{saree.name}</h3>
              <Badge className="bg-white text-pink-600 dark:bg-gray-800 dark:text-pink-300">
                {saree.price}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1 my-1">
              <Badge variant="outline" className="bg-pink-50 text-pink-700 dark:bg-pink-900 dark:text-pink-200 text-xs">
                {saree.color}
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-200 text-xs">
                {saree.material}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
              {saree.description}
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
              size="sm"
              onClick={() => window.open(saree.link, '_blank')}
            >
              <ShoppingBag size={14} className="mr-1" />
              Shop Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}