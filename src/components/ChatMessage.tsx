
import { Avatar } from './ui/avatar';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div 
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className={message.role === 'assistant' ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-200 dark:bg-gray-700'}>
          <span className="text-xs">{message.role === 'assistant' ? 'AI' : 'You'}</span>
        </Avatar>
        <div 
          className={`rounded-lg p-3 ${
            message.role === 'assistant' 
              ? 'bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-900' 
              : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
          } animate-fade-in`}
        >
          <p>{message.content}</p>
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
}