
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface BirthdayLoaderProps {
  onLoadingComplete?: () => void;
  message?: string;
}

const BirthdayLoader: React.FC<BirthdayLoaderProps> = ({ 
  onLoadingComplete,
  message = "Happy Birthday, My Love!" 
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Launch confetti when the cake is fully assembled
  useEffect(() => {
    if (loadingComplete) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };
      
      // Create more elaborate confetti effect
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        
        // Launch confetti from multiple directions
        confetti({
          particleCount: 5,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { y: 0.6 },
          colors: ['#FFDEE2', '#FDE1D3', '#E5DEFF', '#FEF7CD', '#D3E4FD', '#FFB6C1', '#FF69B4']
        });
        
        // Add some from the sides
        setTimeout(() => {
          confetti({
            particleCount: 5,
            angle: randomInRange(0, 60),
            spread: randomInRange(50, 70),
            origin: { x: 0, y: 0.5 },
            colors: ['#FFDEE2', '#FDE1D3', '#E5DEFF', '#FEF7CD', '#D3E4FD', '#FFB6C1', '#FF69B4']
          });
        }, 100);
        
        setTimeout(() => {
          confetti({
            particleCount: 5,
            angle: randomInRange(120, 180),
            spread: randomInRange(50, 70),
            origin: { x: 1, y: 0.5 },
            colors: ['#FFDEE2', '#FDE1D3', '#E5DEFF', '#FEF7CD', '#D3E4FD', '#FFB6C1', '#FF69B4']
          });
        }, 200);
      }, 200);
      
      // Show message after cake is assembled
      setTimeout(() => {
        setShowMessage(true);
        if (onLoadingComplete) onLoadingComplete();
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [loadingComplete, onLoadingComplete]);

  // Trigger the loading complete state after all animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-purple-200 overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Heart 
            key={i} 
            className="absolute text-pink-200 animate-pulse" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${Math.random() * 2 + 1})`,
            }}
            size={20} 
          />
        ))}
      </div>
      
      <div className="relative h-80 w-full max-w-xs z-10">
        {/* Cake plate - more elegant */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-3 bg-gradient-to-r from-pink-200 via-white to-pink-200 rounded-full shadow-lg transform-gpu z-10"></div>
        
        {/* Cake base layer */}
        <div 
          className={cn(
            "absolute w-40 h-16 bg-gradient-to-r from-pink-300 to-red-200 rounded-lg shadow-lg left-1/2 -translate-x-1/2 transform-gpu transition-all duration-1000 border-t-2 border-white/50",
            loadingComplete ? "bottom-3" : "-top-20"
          )}
          style={{ 
            transitionDelay: "0.1s",
            zIndex: 4
          }}
        />
        
        {/* Cake middle layer */}
        <div 
          className={cn(
            "absolute w-32 h-14 bg-gradient-to-r from-pink-200 to-rose-300 rounded-lg shadow-lg left-1/2 -translate-x-1/2 transform-gpu transition-all duration-1000 border-t-2 border-white/50",
            loadingComplete ? "bottom-19" : "-top-20"
          )}
          style={{ 
            transitionDelay: "0.5s",
            zIndex: 5
          }}
        />
        
        {/* Cake top layer */}
        <div 
          className={cn(
            "absolute w-24 h-12 bg-gradient-to-r from-purple-200 to-pink-300 rounded-lg shadow-lg left-1/2 -translate-x-1/2 transform-gpu transition-all duration-1000 border-t-2 border-white/50",
            loadingComplete ? "bottom-33" : "-top-20"
          )}
          style={{ 
            transitionDelay: "0.9s",
            zIndex: 6
          }}
        />
        
        {/* Cake topper/candle - more elegant */}
        <div 
          className={cn(
            "absolute left-1/2 -translate-x-1/2 transform-gpu transition-all duration-1000",
            loadingComplete ? "bottom-45" : "-top-20"
          )}
          style={{ 
            transitionDelay: "1.3s",
            zIndex: 7
          }}
        >
          <div className="w-2 h-10 bg-gradient-to-t from-yellow-200 to-amber-100 rounded-sm mx-auto"></div>
          <div className="w-4 h-4 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full mx-auto -mt-2 animate-pulse shadow-glow"></div>
        </div>
        
        {/* Decorative hearts that appear after cake assembly */}
        <div 
          className={cn(
            "absolute inset-0 flex items-end justify-center pb-16 transition-opacity duration-1000",
            loadingComplete ? "opacity-100" : "opacity-0"
          )}
          style={{ 
            transitionDelay: "1.8s",
            zIndex: 8
          }}
        >
          <div className="flex gap-4">
            <Heart className="text-pink-500 animate-bounce" size={22} />
            <Heart className="text-rose-400 animate-bounce" style={{ animationDelay: "0.2s" }} size={22} />
            <Heart className="text-red-400 animate-bounce" style={{ animationDelay: "0.4s" }} size={22} />
          </div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className={cn(
        "mt-12 transition-all duration-1000",
        !loadingComplete ? "opacity-100" : "opacity-0"
      )}>
        <p className="text-xl text-pink-500 font-medium animate-pulse">Creating magic for you...</p>
      </div>
      
      {/* Birthday message - more romantic */}
      <div className={cn(
        "mt-12 text-center transition-all duration-1000 transform-gpu",
        showMessage ? "opacity-100 scale-100" : "opacity-0 scale-75"
      )}>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-400 to-pink-500 bg-clip-text text-transparent mb-2">{message}</h1>
        <p className="text-lg text-rose-400">Every moment with you is a gift 💖</p>
      </div>
    </div>
  );
};

export default BirthdayLoader;
