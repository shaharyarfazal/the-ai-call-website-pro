
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { MessageCircle } from 'lucide-react';
interface ChatMoonProps {
  onOpenChat: () => void;
}

export const ChatMoon: React.FC<ChatMoonProps> = ({ onOpenChat }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Open chat"
              onClick={onOpenChat}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              size="icon"
              className={`rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-lg transition-transform duration-200 ${isHovered ? 'scale-105' : 'scale-100'}`}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Chat with AI</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

// Add default export
export default ChatMoon;
