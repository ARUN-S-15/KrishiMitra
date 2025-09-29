import { useState } from "react";
import { Send, Camera, Mic, Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('pest') || input.includes('disease')) {
      return 'For pest control, I recommend integrated pest management (IPM). Can you describe the symptoms you\'re seeing? Also, consider using neem oil as a natural pesticide. Would you like me to suggest specific treatments based on your crop type?';
    }
    
    if (input.includes('weather') || input.includes('rain')) {
      return 'Based on current weather patterns in Kerala, expect moderate rainfall this week. This is good for most crops, but ensure proper drainage for root vegetables. Would you like specific weather recommendations for your crops?';
    }
    
    if (input.includes('fertilizer') || input.includes('nutrition')) {
      return 'For organic farming, I recommend a balanced NPK ratio. Consider using compost and vermicompost. The specific fertilizer depends on your crop and soil condition. What crops are you growing?';
    }
    
    if (input.includes('tomato')) {
      return 'Tomatoes need well-drained soil and regular watering. Plant spacing should be 60×45 cm. Watch out for early blight and use copper-based fungicides if needed. Are you growing them in the field or greenhouse?';
    }
    
    if (input.includes('rice') || input.includes('paddy')) {
      return 'Rice cultivation requires flooding technique. Ensure proper leveling of fields and maintain 2-3 inches of water. Transplant 25-30 day old seedlings. Which variety are you planning to grow?';
    }
    
    return 'I understand your question about farming. As your AI assistant, I can help with crop management, pest control, weather advice, and farming techniques. Could you provide more specific details about your farming challenge?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="bg-hero-gradient rounded-2xl p-6 text-primary-foreground shadow-card">
          <h1 className="text-3xl font-bold mb-2">Ask Krishi Mitra</h1>
          <p className="text-primary-foreground/80">
            Your AI farming assistant for Kerala agriculture
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="bg-card-gradient shadow-card h-[600px] flex flex-col">
        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
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
              
              <div className={`max-w-[70%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-accent text-accent-foreground'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
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
        <div className="border-t border-border p-4">
          <div className="flex gap-2 mb-3">
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
          
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about farming..."
              className="flex-1"
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