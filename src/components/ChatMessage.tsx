
import { Avatar } from './ui/avatar';
import { Message } from '../types';
import { Image } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div 
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          message.role === 'assistant' 
            ? 'bg-gradient-to-r from-pink-500 to-purple-600' 
            : 'bg-gray-200 dark:bg-gray-700'
        }`}>
          <span className="text-xs text-white">{message.role === 'assistant' ? 'AI' : 'You'}</span>
        </div>
        <div 
          className={`rounded-lg p-3 ${
            message.role === 'assistant' 
              ? 'bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-900' 
              : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
          } animate-fade-in`}
        >
          <p>{message.content}</p>
          
          {/* Display image if present */}
          {message.imageUrl && (
            <div className="mt-2 relative">
              <div className="relative rounded-md overflow-hidden border border-pink-200 dark:border-pink-800">
                <img 
                  src={message.imageUrl} 
                  alt="Uploaded saree" 
                  className="w-full max-h-48 object-contain"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Image size={12} className="mr-1" />
                  Saree Sample
                </div>
              </div>
            </div>
          )}
          
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
}