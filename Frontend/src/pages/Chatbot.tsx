import { useState } from "react";
import { Send, Camera, Mic, Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'voice';
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m Krishi Mitra, your AI farming assistant. How can I help you today? You can ask me about crops, weather, pest control, or any farming-related questions.',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // Prefer '/api' proxy in dev; allow override via VITE_API_BASE_URL for direct calls
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

  // Light formatter: ensures headings and list markers render well if Groq returns plain text
  const normalizeToMarkdown = (text: string): string => {
    let t = text.trim();
    // Replace bold-like markers if model uses **text** already (keep as is)
    // Ensure there are blank lines before headings-like segments
    t = t.replace(/\n?\s*([A-Za-z].*?:)\s*\n/g, '\n\n**$1**\n');
    // Ensure list items start on new lines
    t = t.replace(/\s*(\d+)\)\s+/g, '\n$1. '); // handle 1) -> 1.
    t = t.replace(/\s*(\d+)\.\s+/g, '\n$1. ');
    t = t.replace(/\s*[-•]\s+/g, '\n- ');
    // Collapse excessive blank lines
    t = t.replace(/\n{3,}/g, '\n\n');
    return t;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    try {
      const reply = await generateBotResponse(inputMessage);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: reply,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I could not reach the assistant right now. Please try again in a moment.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateBotResponse = async (userInput: string): Promise<string> => {
    // Call backend FastAPI endpoint which proxies to Groq
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Backend error ${res.status}: ${text}`);
    }

    const data = await res.json();
    return data.reply ?? 'I could not generate a response.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="bg-hero-gradient rounded-2xl p-4 sm:p-6 text-primary-foreground shadow-card">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Ask Krishi Mitra</h1>
          <p className="text-xs sm:text-sm text-primary-foreground/80">
            Your AI farming assistant for Kerala agriculture
          </p>
        </div>
      </div>

      {/* Chat Container */}
  <Card className="bg-card-gradient shadow-card flex flex-col h-[75dvh] md:h-[600px]">
        {/* Messages Area */}
  <CardContent className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className={
                  message.sender === 'bot' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }>
                  {message.sender === 'bot' ? '🌱' : 'You'}
                </AvatarFallback>
              </Avatar>
              
              <div className={`max-w-[80%] sm:max-w-[70%] ${message.sender === 'user' ? 'text-right' : 'text-left'} break-words`}>
                <div
                  className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-accent text-foreground'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <div className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none break-words leading-snug sm:leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {normalizeToMarkdown(message.content)}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm leading-snug sm:leading-relaxed break-words">{message.content}</p>
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  🌱
                </AvatarFallback>
              </Avatar>
              <div className="bg-accent text-accent-foreground rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Input Area */}
        <div className="border-t border-border p-3 sm:p-4">
          <div className="hidden sm:flex gap-2 mb-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Camera className="h-4 w-4" />
              Photo
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Image className="h-4 w-4" />
              Gallery
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Mic className="h-4 w-4" />
              Voice
            </Button>
          </div>
          
          <div className="flex gap-2 min-w-0">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about farming..."
              className="flex-1 min-w-0"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-primary hover:bg-primary-dark shadow-soft"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;