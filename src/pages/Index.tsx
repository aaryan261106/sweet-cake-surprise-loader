
import React, { useState, useEffect } from 'react';
import BirthdayLoader from '@/components/BirthdayLoader';

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    // Set a longer timeout so the user can see the birthday message and confetti
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen">
      {loading ? (
        <BirthdayLoader onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-purple-50 p-4">
          <div className="text-center max-w-xl">
            <h1 className="text-4xl font-bold mb-6 text-pink-500">Happy Birthday, My Love!</h1>
            <p className="text-xl text-purple-600 mb-8">
              I made this website just for you on your special day. I hope it brings a smile to your face!
            </p>
            <p className="text-lg text-pink-400">
              You can add more content here or navigate to special sections I've prepared for you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
