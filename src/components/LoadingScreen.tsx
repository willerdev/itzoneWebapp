import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-blue-100 flex items-center justify-center z-50">
      <div className="animate-pulse">
        <img 
          src="https://i.imgur.com/z2z9igQ.png" 
          alt="Loading" 
          className="w-50 h-50 animate-zoom"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;