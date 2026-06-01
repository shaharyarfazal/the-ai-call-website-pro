import React, { useState, useEffect } from 'react';

const messagePairs = [
  {
    hero: "Never miss a call again",
    button: "Try Now"
  },
  {
    hero: "24/7 AI phone support", 
    button: "Start Call"
  },
  {
    hero: "Book appointments automatically",
    button: "Test It"
  },
  {
    hero: "Qualify leads while you sleep",
    button: "See How"
  },
  {
    hero: "Your AI receptionist is ready",
    button: "Meet AI"
  },
  {
    hero: "Experience the future of business calls",
    button: "Talk Now"
  }
];

export const TypingHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentMessage = messagePairs[currentIndex].hero;
    
    if (isTyping) {
      if (displayedText.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
        }, Math.random() * 100 + 50);
        
        return () => clearTimeout(timeout);
      } else {
        // Message complete, wait then start erasing
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2500);
        
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40);
        
        return () => clearTimeout(timeout);
      } else {
        // Move to next message
        setCurrentIndex((prev) => (prev + 1) % messagePairs.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentIndex]);

  return (
    <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight text-foreground min-h-[1.2em] font-mono">
      {displayedText}
      <span className="animate-pulse text-primary">|</span>
    </h1>
  );
};

export const DynamicButtonText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Sync with typing hero - change when typing completes + display time
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messagePairs.length);
    }, 7000); // Matches the full cycle time of the hero

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="transition-all duration-700 ease-in-out animate-pulse text-shadow-glow">
      {messagePairs[currentIndex].button}
    </span>
  );
};