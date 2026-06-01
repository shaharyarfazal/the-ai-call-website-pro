
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Send, Loader2, Bot } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatMoonPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatMoonPanel: React.FC<ChatMoonPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Collect user information only when chat opens
  useEffect(() => {
    if (!isOpen || userInfo) return;
    
    const collectUserInfo = async () => {
      try {
        // Get timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Get browser info
        const browserInfo = {
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          cookieEnabled: navigator.cookieEnabled,
          onLine: navigator.onLine,
          screenResolution: `${screen.width}x${screen.height}`,
          viewportSize: `${window.innerWidth}x${window.innerHeight}`,
          colorDepth: screen.colorDepth,
        };

        // Get IP-based location only if not on slow connection or Save-Data
        let locationInfo = null;
        const connection = (navigator as any).connection;
        const skipLocation = 
          connection?.saveData || 
          connection?.effectiveType === 'slow-2g' || 
          connection?.effectiveType === '2g';
          
        if (!skipLocation) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
            
            const locationResponse = await fetch('https://ipapi.co/json/', {
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            
            if (locationResponse.ok) {
              locationInfo = await locationResponse.json();
            }
          } catch (error) {
            console.log('Could not fetch location info:', error);
          }
        }

        setUserInfo({
          timezone,
          browserInfo,
          locationInfo,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error collecting user info:', error);
      }
    };

    collectUserInfo();
  }, [isOpen, userInfo]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus input when chat opens and after sending messages
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isLoading]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Security: Sanitize input to prevent XSS
    const sanitizedInput = inputValue.trim()
      .replace(/[<>]/g, '') // Remove HTML tags
      .substring(0, 500); // Limit message length

    if (!sanitizedInput) return;

    const sessionId = localStorage.getItem('chatSessionId') || crypto.randomUUID();
    
    if (!localStorage.getItem('chatSessionId')) {
      localStorage.setItem('chatSessionId', sessionId);
    }

    // Add user message immediately with sanitized content
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: sanitizedInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
        console.log('Sending message to secure webhook:', sanitizedInput);

      // Security: Use secure chat webhook instead of direct webhook
      const response = await supabase.functions.invoke('secure-chat-webhook', {
        body: {
          message: sanitizedInput,
          timestamp: new Date().toISOString(),
          session_id: sessionId,
          user_id: 'anonymous',
          userInfo: userInfo || {},
          page_url: window.location.href.substring(0, 100), // Limit URL length
          referrer: (document.referrer || 'direct').substring(0, 100)
        },
      });

      if (response.error) {
        throw response.error;
      }

      console.log('Response data:', response.data);
      
      // Security: Sanitize bot response to prevent XSS
      let responseText = response.data?.response || 'I received your message!';
      
      // Parse nested response if needed
      try {
        if (typeof responseText === 'string' && responseText.startsWith('{')) {
          const parsedResponse = JSON.parse(responseText);
          responseText = parsedResponse.output || parsedResponse.message || parsedResponse.text || parsedResponse.content || parsedResponse.reply || responseText;
        }
      } catch (parseError) {
        // Keep original response if parsing fails
      }

      // Sanitize response content
      responseText = String(responseText)
        .replace(/[<>]/g, '') // Remove HTML tags
        .replace(/\/n/g, '\n') // Convert /n to actual newlines
        .substring(0, 1000); // Limit response length

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-28 right-2 sm:right-6 z-40 w-[calc(100vw-1rem)] max-w-xs sm:max-w-sm md:max-w-md animate-fade-in">
      <Card className="h-[450px] sm:h-[500px] md:h-[550px] flex flex-col shadow-2xl border-border bg-card/95 backdrop-blur-md"
        style={{
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 30px hsl(var(--primary) / 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between p-2 sm:p-3 md:p-4 border-b border-border">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <Bot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
            <CardTitle className="text-xs sm:text-sm md:text-lg text-foreground truncate">AI Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-accent text-foreground h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 flex-shrink-0">
            <X className="h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-grow p-2 sm:p-3 md:p-4 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-2 sm:gap-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg max-w-[90%] sm:max-w-[85%] transition-all duration-200 ${
                    message.sender === 'user' 
                      ? 'bg-primary/90 text-primary-foreground shadow-lg border border-primary/20' 
                      : 'bg-secondary/60 text-secondary-foreground shadow-md border border-border backdrop-blur-sm'
                  }`}>
                    <p className="text-xs sm:text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/60 text-secondary-foreground p-2 sm:p-2.5 md:p-3 rounded-lg max-w-[90%] sm:max-w-[85%] flex items-center gap-2 shadow-md border border-border backdrop-blur-sm">
                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin text-primary" />
                    <p className="text-xs sm:text-sm">Typing...</p>
                  </div>
                </div>
              )}
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        
        <CardFooter className="p-2 sm:p-3 md:p-4 border-t border-border">
          <div className="flex w-full items-center space-x-1 sm:space-x-2">
            <Input 
              ref={inputRef}
              placeholder="Type your message..." 
              className="flex-1 bg-input border-border focus:border-primary focus:ring-primary/20 text-xs sm:text-sm h-8 sm:h-9 md:h-10" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-200 h-8 w-8 sm:h-10 sm:w-10"
            >
              {isLoading ? (
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              ) : (
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// Add default export
export default ChatMoonPanel;
