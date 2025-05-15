
import React, { useState, useEffect } from 'react';
import { Heart, Star, Trophy } from 'lucide-react';
import BirthdayLoader from '@/components/BirthdayLoader';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showHearts, setShowHearts] = useState(false);

  // Images for gallery (would be replaced with your actual images)
  const memories = [
    { title: "First Date", description: "The magical day we first met" },
    { title: "Our Adventure", description: "Exploring the world together" },
    { title: "Special Moments", description: "Creating memories that last forever" },
    { title: "Just Us", description: "Every day is special with you" },
  ];

  const handleLoadingComplete = () => {
    // Set a longer timeout so the user can see the birthday message and confetti
    setTimeout(() => {
      setLoading(false);
      // Start showing floating hearts after content loads
      setTimeout(() => setShowHearts(true), 500);
    }, 6000);
  };

  // Parallax scroll effect
  useEffect(() => {
    if (!loading) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const headers = document.querySelectorAll('.parallax-header');
        const cards = document.querySelectorAll('.memory-card');
        
        headers.forEach((header) => {
          (header as HTMLElement).style.transform = `translateY(${scrollY * 0.4}px)`;
        });
        
        cards.forEach((card, index) => {
          (card as HTMLElement).style.transform = `translateY(${scrollY * 0.1 * (index % 2 ? 1 : -1)}px)`;
        });
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [loading]);

  return (
    <div className="min-h-screen">
      {loading ? (
        <BirthdayLoader onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-pink-50 to-purple-100">
          {/* Floating hearts animation overlay */}
          {showHearts && (
            <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <Heart 
                  key={i} 
                  className="absolute text-pink-300 animate-float" 
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.3,
                    animation: `float ${5 + Math.random() * 10}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                    transform: `scale(${Math.random() + 0.5})`,
                  }}
                  size={24} 
                />
              ))}
            </div>
          )}
          
          {/* Hero section */}
          <header className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20"></div>
              <div className="absolute inset-0 backdrop-blur-sm"></div>
            </div>
            
            <div className="text-center z-20 max-w-3xl px-6">
              <div className="mb-4 flex justify-center">
                <Trophy className="text-yellow-500 h-12 w-12 animate-pulse" />
              </div>
              <h1 className="parallax-header text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-red-400 to-purple-500 bg-clip-text text-transparent">
                Happy Birthday, My Love
              </h1>
              <p className="text-2xl md:text-3xl text-rose-600 font-light mb-8">
                To the most amazing person who makes every day special
              </p>
              <div className="flex justify-center space-x-2">
                <Star className="text-yellow-400 animate-pulse" size={28} />
                <Heart className="text-red-400 animate-pulse" style={{ animationDelay: "0.2s" }} size={28} />
                <Star className="text-yellow-400 animate-pulse" style={{ animationDelay: "0.4s" }} size={28} />
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <p className="text-pink-700 text-sm">Scroll down for more</p>
            </div>
          </header>
          
          {/* Love letter section */}
          <section className="py-20 px-6 bg-gradient-to-b from-pink-100/70 to-purple-100/70">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-rose-600 mb-10">My Love Letter to You</h2>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-pink-200">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  From the moment I met you, you've brought immeasurable joy and meaning to my life. Your smile lights up even my darkest days, and your laughter is the most beautiful music I've ever heard.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  On your special day, I want to celebrate not just the day you were born, but all the wonderful qualities that make you uniquely you—your kindness, your strength, your passion, and the countless ways you make this world better just by being in it.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  My wish for you today and always is a life filled with all the happiness you've given me. Happy Birthday, my love. Here's to celebrating many more together.
                </p>
                <div className="mt-8 text-right">
                  <p className="text-pink-600 font-medium">Forever Yours,</p>
                  <p className="text-pink-600 italic">Your Love</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Memories gallery */}
          <section className="py-20 px-6 bg-gradient-to-b from-purple-100/70 to-pink-50/70">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-rose-600 mb-10">Our Beautiful Memories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {memories.map((memory, index) => (
                  <div 
                    key={index} 
                    className="memory-card bg-gradient-to-br from-white/60 to-pink-100/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-pink-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="aspect-square w-full bg-pink-200/50 rounded-md mb-4 flex items-center justify-center">
                      <Heart className="h-12 w-12 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-bold text-rose-600 mb-2">{memory.title}</h3>
                    <p className="text-gray-700">{memory.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Footer with love counter */}
          <footer className="bg-gradient-to-r from-pink-300/30 to-purple-300/30 py-12 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <Heart className="h-10 w-10 text-red-500 inline-block animate-pulse" />
              </div>
              <p className="text-lg text-rose-600">Made with infinite love, just for you.</p>
              <p className="text-sm text-purple-600 mt-2">May all your wishes come true today and always.</p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
