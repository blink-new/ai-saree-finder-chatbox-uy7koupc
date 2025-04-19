
import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent } from './components/ui/card';
import { ScrollArea } from './components/ui/scroll-area';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Message, SareeRecommendation } from './types';
import { ChatMessage } from './components/ChatMessage';
import { SareeCard } from './components/SareeCard';
import { analyzeQuery } from './services/aiService';
import { sampleQueries } from './data/mockData';

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
    
    try {
      // Process the query using our AI service
      const { responseText, recommendations } = await analyzeQuery(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setRecommendations(recommendations);
    } catch (error) {
      console.error('Error processing query:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setInput(suggestion);
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
              <Sparkles size={14} className="mr-1" />
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
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                          <span className="text-xs text-white">AI</span>
                        </div>
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
                {messages.length === 1 && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Try asking about:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {sampleQueries.map((query, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionSelect(query)}
                          className="bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100 hover:text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800 dark:hover:bg-pink-900/50 transition-all duration-300 text-xs"
                        >
                          {query}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={toggleRecording}
                    className={`${isRecording ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 animate-pulse' : 'bg-pink-50 text-pink-600 dark:bg-pink-900 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-800'}`}
                  >
                    {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                  </Button>
                  <Input 
                    placeholder="Ask about sarees..." 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border-pink-100 dark:border-pink-900 focus-visible:ring-pink-500"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
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
                          <SareeCard key={saree.id} saree={saree} view="grid" />
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="list" className="flex-1">
                    <ScrollArea className="h-[calc(100vh-18rem)]">
                      <div className="space-y-3">
                        {recommendations.map((saree) => (
                          <SareeCard key={saree.id} saree={saree} view="list" />
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-24 h-24 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center mb-4 animate-pulse">
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
        <p>Saree Finder AI © {new Date().getFullYear()} - Find your perfect saree with AI assistance</p>
      </footer>
    </div>
  );
}

export default App;