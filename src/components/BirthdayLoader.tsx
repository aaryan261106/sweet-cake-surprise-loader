
import React, { useEffect, useState } from 'react';
import { CakeSlice } from 'lucide-react';
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
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        
        // Launch confetti
        confetti({
          particleCount: 3,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { y: 0.6 },
          colors: ['#FFDEE2', '#FDE1D3', '#E5DEFF', '#FEF7CD', '#D3E4FD']
        });
      }, 150);
      
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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="relative h-80 w-full max-w-xs">
        {/* Cake plate */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gray-200 rounded-full shadow-md transform-gpu z-10"></div>
        
        {/* Cake base layer */}
        <div 
          className={cn(
            "absolute w-40 h-16 bg-[#FDE1D3] rounded-lg shadow-md left-1/2 -translate-x-1/2 transform-gpu transition-all duration-1000",
            loadingComplete ? "bottom-2" : "-top-20"
          )}
          style={{ 
            transitionDelay: "0.1s",
            zIndex: 4
          }}
        />
        
        {/* Cake middle layer */}
        <div 
          className={cn(
            "absolute w-32 h-14 bg-[#FFDEE2] rounded-lg shadow-md left-1/2 -translate-x-1/2 transform-gpu transition-all duration-1000",
            loadingComplete ? "bottom-18" : "-top-20"
          )}
          style={{ 
            transitionDelay: "0.5s",
            zIndex: 5
          }}
        />
        
        {/* Cake top layer */}
        <div 
          className={cn(
            "absolute w-24 h-12 bg-[#E5DEFF] rounded-lg shadow-md left-1/2 -translate-x-1/2 transform-gpu transition-all duration-1000",
            loadingComplete ? "bottom-32" : "-top-20"
          )}
          style={{ 
            transitionDelay: "0.9s",
            zIndex: 6
          }}
        />
        
        {/* Cake topper/candle */}
        <div 
          className={cn(
            "absolute left-1/2 -translate-x-1/2 transform-gpu transition-all duration-1000",
            loadingComplete ? "bottom-44" : "-top-20"
          )}
          style={{ 
            transitionDelay: "1.3s",
            zIndex: 7
          }}
        >
          <div className="w-2 h-8 bg-[#FEF7CD] rounded-sm mx-auto"></div>
          <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto -mt-2 animate-pulse"></div>
        </div>
        
        {/* Decorative elements that appear after cake assembly */}
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
            <CakeSlice className="text-pink-400 animate-bounce" size={22} />
            <CakeSlice className="text-purple-400 animate-bounce" style={{ animationDelay: "0.2s" }} size={22} />
            <CakeSlice className="text-blue-400 animate-bounce" style={{ animationDelay: "0.4s" }} size={22} />
          </div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className={cn(
        "mt-12 transition-all duration-1000",
        !loadingComplete ? "opacity-100" : "opacity-0"
      )}>
        <p className="text-xl text-pink-500 font-medium animate-pulse">Baking with love...</p>
      </div>
      
      {/* Birthday message */}
      <div className={cn(
        "mt-12 text-center transition-all duration-1000 transform-gpu",
        showMessage ? "opacity-100 scale-100" : "opacity-0 scale-75"
      )}>
        <h1 className="text-3xl md:text-4xl font-bold text-pink-500 mb-2">{message}</h1>
        <p className="text-lg text-purple-400">Made with ❤️ just for you</p>
      </div>
    </div>
  );
};

export default BirthdayLoader;
