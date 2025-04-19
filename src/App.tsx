
import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, ShoppingBag } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent } from './components/ui/card';
import { Avatar } from './components/ui/avatar';
import { ScrollArea } from './components/ui/scroll-area';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

// Types for our application
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface SareeRecommendation {
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

// Mock data for initial development
const mockSareeRecommendations: SareeRecommendation[] = [
  {
    id: '1',
    name: 'Banarasi Silk Saree',
    description: 'Traditional Banarasi silk saree with intricate gold zari work',
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
    description: 'Pure Kanjivaram silk saree with traditional temple border',
    price: '₹15,499',
    image: 'https://images.unsplash.com/photo-1610189020382-9a4a4a5fdfc9?q=80&w=400&auto=format&fit=crop',
    color: 'Purple',
    material: 'Silk',
    occasion: 'Festival',
    link: '#'
  },
  {
    id: '3',
    name: 'Cotton Handloom Saree',
    description: 'Lightweight cotton handloom saree with contemporary prints',
    price: '₹2,499',
    image: 'https://images.unsplash.com/photo-1610189020382-9a4a4a5fdfc9?q=80&w=400&auto=format&fit=crop',
    color: 'Blue',
    material: 'Cotton',
    occasion: 'Casual',
    link: '#'
  }
];

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I can help you find the perfect saree. Tell me what you\'re looking for - color, material, occasion, or any specific preferences.',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recommendations, setRecommendations] = useState<SareeRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Speech recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';
  }

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Here are some saree recommendations based on your preferences. I\'ve selected options that match your requirements.',
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setRecommendations(mockSareeRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  // Handle voice input
  const toggleRecording = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser');
      return;
    }
    
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setInput(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <header className="py-4 px-6 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Saree Finder AI
          </h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 dark:from-pink-900 dark:to-purple-900 dark:text-pink-200">
              Powered by AI
            </Badge>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-4 max-w-7xl">
        <div className="flex flex-col w-full md:w-1/2 h-[calc(100vh-12rem)]">
          <Card className="flex-1 shadow-md border-pink-100 dark:border-pink-900">
            <CardContent className="p-0 flex flex-col h-full">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
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
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-[80%]">
                        <Avatar className="bg-gradient-to-r from-pink-500 to-purple-600">
                          <span className="text-xs">AI</span>
                        </Avatar>
                        <div className="rounded-lg p-3 bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-900">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t border-pink-100 dark:border-pink-900">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={toggleRecording}
                    className={`${isRecording ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 animate-pulse' : 'bg-gray-100 dark:bg-gray-800'}`}
                  >
                    {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                  </Button>
                  <Input 
                    placeholder="Ask about sarees..." 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="border-pink-100 dark:border-pink-900 focus-visible:ring-pink-500"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-1/2 h-[calc(100vh-12rem)]">
          <Card className="h-full shadow-md border-pink-100 dark:border-pink-900">
            <CardContent className="p-4 h-full flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Saree Recommendations
              </h2>
              
              {recommendations.length > 0 ? (
                <Tabs defaultValue="grid" className="flex-1">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="grid" className="flex-1">
                    <ScrollArea className="h-[calc(100vh-18rem)]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {recommendations.map((saree) => (
                          <Card key={saree.id} className="overflow-hidden border-pink-100 dark:border-pink-900 transition-all duration-300 hover:shadow-lg">
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
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                size="sm"
                              >
                                <ShoppingBag size={16} className="mr-2" />
                                Shop Now
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="list" className="flex-1">
                    <ScrollArea className="h-[calc(100vh-18rem)]">
                      <div className="space-y-3">
                        {recommendations.map((saree) => (
                          <Card key={saree.id} className="overflow-hidden border-pink-100 dark:border-pink-900">
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
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                    size="sm"
                                  >
                                    <ShoppingBag size={14} className="mr-1" />
                                    Shop Now
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-24 h-24 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center mb-4">
                    <ShoppingBag size={40} className="text-pink-500 dark:text-pink-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No recommendations yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md">
                    Tell me what kind of saree you're looking for, and I'll help you find the perfect options.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="py-3 px-6 bg-white dark:bg-gray-800 border-t border-pink-100 dark:border-pink-900 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Saree Finder AI &copy; {new Date().getFullYear()} - Find your perfect saree with AI assistance</p>
      </footer>
    </div>
  );
}

export default App;