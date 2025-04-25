
import { SareeCard, SareeItem } from './SareeCard';

interface SimilarSareesProps {
  sarees: SareeItem[];
  isLoading: boolean;
}

export function SimilarSarees({ sarees, isLoading }: SimilarSareesProps) {
  if (isLoading) {
    return (
      <div className="w-full py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sarees.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Similar Sarees</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sarees.map((saree) => (
          <SareeCard key={saree.id} saree={saree} />
        ))}
      </div>
    </div>
  );
}