
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { Send, Mic, Image as ImageIcon } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { SimilarSarees } from './SimilarSarees';
import { SareeItem } from './SareeCard';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I can help you find the perfect saree. Tell me what you\'re looking for or upload a photo of a saree you like.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [similarSarees, setSimilarSarees] = useState<SareeItem[]>([]);
  const [isSearchingSarees, setIsSearchingSarees] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'll help you find sarees based on your request: "${inputValue}". Here are some options that might interest you.`,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
      
      // Simulate finding sarees based on text
      setIsSearchingSarees(true);
      setTimeout(() => {
        setSimilarSarees(getMockSarees());
        setIsSearchingSarees(false);
      }, 1500);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUploaded = (imageUrl: string) => {
    // Add user message with the image
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `[Uploaded a saree image]`,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setShowImageUploader(false);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I found some sarees similar to your uploaded image. Here are the best matches:',
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
      
      // Simulate finding similar sarees
      setIsSearchingSarees(true);
      setTimeout(() => {
        setSimilarSarees(getMockSarees());
        setIsSearchingSarees(false);
      }, 1500);
    }, 1500);
  };

  // Mock function to generate sample sarees
  const getMockSarees = (): SareeItem[] => {
    return [
      {
        id: '1',
        name: 'Banarasi Silk Saree',
        price: '₹5,999',
        imageUrl: 'https://images.unsplash.com/photo-1610189020382-9a4a4a6e7e03?q=80&w=1000',
        similarity: 0.95,
        description: 'Elegant Banarasi silk saree with intricate gold zari work and rich pallu.',
        shopUrl: '#',
      },
      {
        id: '2',
        name: 'Kanjivaram Silk Saree',
        price: '₹8,499',
        imageUrl: 'https://images.unsplash.com/photo-1610189020382-9a4a4a6e7e03?q=80&w=1000',
        similarity: 0.89,
        description: 'Traditional Kanjivaram silk saree with temple border and contrast pallu.',
        shopUrl: '#',
      },
      {
        id: '3',
        name: 'Georgette Designer Saree',
        price: '₹3,299',
        imageUrl: 'https://images.unsplash.com/photo-1610189020382-9a4a4a6e7e03?q=80&w=1000',
        similarity: 0.82,
        description: 'Lightweight georgette saree with modern prints and embellished border.',
        shopUrl: '#',
      },
      {
        id: '4',
        name: 'Cotton Handloom Saree',
        price: '₹2,499',
        imageUrl: 'https://images.unsplash.com/photo-1610189020382-9a4a4a6e7e03?q=80&w=1000',
        similarity: 0.78,
        description: 'Comfortable cotton handloom saree with traditional weaving patterns.',
        shopUrl: '#',
      },
      {
        id: '5',
        name: 'Chiffon Party Wear Saree',
        price: '₹4,199',
        imageUrl: 'https://images.unsplash.com/photo-1610189020382-9a4a4a6e7e03?q=80&w=1000',
        similarity: 0.75,
        description: 'Elegant chiffon saree with sequin work and designer blouse piece.',
        shopUrl: '#',
      },
      {
        id: '6',
        name: 'Patola Silk Saree',
        price: '₹12,999',
        imageUrl: 'https://images.unsplash.com/photo-1610189020382-9a4a4a6e7e03?q=80&w=1000',
        similarity: 0.72,
        description: 'Premium Patola silk saree with double ikat weaving and rich pallu design.',
        shopUrl: '#',
      },
    ];
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <Card
                className={`max-w-[80%] p-3 ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] p-3 bg-gray-100">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {showImageUploader && (
          <div className="my-4">
            <ImageUploader onImageUploaded={handleImageUploaded} />
          </div>
        )}
        
        <SimilarSarees sarees={similarSarees} isLoading={isSearchingSarees} />
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowImageUploader(!showImageUploader)}
            className="text-purple-600"
          >
            <ImageIcon size={20} />
          </Button>
          <Button variant="outline" size="icon" className="text-purple-600">
            <Mic size={20} />
          </Button>
          <Input
            placeholder="Ask about sarees or describe what you want..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}