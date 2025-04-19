
import { Button } from './ui/button';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(suggestion)}
          className="bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100 hover:text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800 dark:hover:bg-pink-900/50 transition-all duration-300 text-xs"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}