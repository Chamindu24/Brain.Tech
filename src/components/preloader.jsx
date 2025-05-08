import React, { useEffect, useState } from 'react';
import { Brain, Cpu, Database, Sparkles, Zap, Cloud, ExternalLink } from 'lucide-react';

const EnhancedPreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState(0);
  
  // Function to open a new tab and ensure it starts at the top
  const openNewTab = (url) => {
    // Open a new tab with the specified URL
    const newTab = window.open(url, '_blank');
    
    // If the new tab was successfully opened, try to scroll to top
    if (newTab) {
      newTab.addEventListener('load', () => {
        newTab.scrollTo(0, 0);
      });
    }
  };
  
  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const increment = Math.random() * 10 + (100 - prevProgress) * 0.05;
        const newProgress = prevProgress + increment;
        
        // Update loading phase based on progress
        if (newProgress > 25 && loadingPhase === 0) setLoadingPhase(1);
        if (newProgress > 50 && loadingPhase === 1) setLoadingPhase(2);
        if (newProgress > 75 && loadingPhase === 2) setLoadingPhase(3);
        
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 300);
    
    return () => clearInterval(timer);
  }, [loadingPhase]);
  
  // When progress reaches 100%, begin fade out
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [progress]);
  
  if (!isVisible) return null;

  // Loading messages by phase
  const loadingMessages = [
    "Initializing neural systems...",
    "Scaling AI modules...",
    "Syncing quantum processors...",
    "Launching experience..."
  ];
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-blue-900 to-violet-900">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-grid-pattern animate-pulse"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-white opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Brain logo with enhanced glowing effect - CLICKABLE */}
        <div 
          className="relative mb-6 mt-8 cursor-pointer transition-transform hover:scale-105"
          onClick={() => openNewTab('/dashboard')}
          title="Open Dashboard in New Tab"
        >
          <div className="absolute inset-0 rounded-full bg-blue-400 opacity-30 blur-xl animate-pulse"></div>
          <div className="relative">
            <div className="animate-levitate">
              <Brain size={56} className="md:hidden text-white" strokeWidth={1.5} />
              <Brain size={80} className="hidden md:block text-white" strokeWidth={1.5} />
            </div>
            
            {/* Glowing orb background */}
            <div className="absolute top-1/2 left-1/2 w-10 h-10 md:w-16 md:h-16 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-md opacity-40 animate-pulse"></div>
          </div>
          
          {/* Orbiting elements - also clickable */}
          <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-40 md:h-40 -translate-x-1/2 -translate-y-1/2">
            <div 
              className="absolute animate-orbit cursor-pointer hover:text-cyan-200 transition-colors" 
              style={{ animationDuration: '7s' }}
              onClick={(e) => {
                e.stopPropagation();
                openNewTab('/cpu');
              }}
              title="Open CPU Page"
            >
              <Cpu size={16} className="md:w-5 md:h-5 text-blue-300" />
            </div>
            <div 
              className="absolute animate-orbit cursor-pointer hover:text-indigo-200 transition-colors" 
              style={{ animationDuration: '10s', animationDelay: '-4s' }}
              onClick={(e) => {
                e.stopPropagation();
                openNewTab('/database');
              }}
              title="Open Database Page"
            >
              <Database size={16} className="md:w-5 md:h-5 text-indigo-300" />
            </div>
            <div 
              className="absolute animate-orbit cursor-pointer hover:text-purple-200 transition-colors" 
              style={{ animationDuration: '8s', animationDelay: '-2s' }}
              onClick={(e) => {
                e.stopPropagation();
                openNewTab('/features');
              }}
              title="Open Features Page"
            >
              <Sparkles size={16} className="md:w-5 md:h-5 text-violet-300" />
            </div>
            <div 
              className="absolute animate-orbit cursor-pointer hover:text-blue-200 transition-colors" 
              style={{ animationDuration: '12s', animationDelay: '-6s' }}
              onClick={(e) => {
                e.stopPropagation();
                openNewTab('/performance');
              }}
              title="Open Performance Page"
            >
              <Zap size={16} className="md:w-5 md:h-5 text-cyan-300" />
            </div>
            <div 
              className="absolute animate-orbit cursor-pointer hover:text-sky-200 transition-colors" 
              style={{ animationDuration: '9s', animationDelay: '-3s' }}
              onClick={(e) => {
                e.stopPropagation();
                openNewTab('/cloud');
              }}
              title="Open Cloud Page"
            >
              <Cloud size={16} className="md:w-5 md:h-5 text-sky-300" />
            </div>
          </div>
        </div>
        
        {/* Company name with modern typography - Also clickable */}
        <h1 
          className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight cursor-pointer group"
          onClick={() => openNewTab('/home')}
          title="Open Home Page"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 group-hover:from-blue-200 group-hover:to-purple-200">Brain</span>
          <span className="text-white">Tech</span>
          <ExternalLink className="inline-block ml-1 w-4 h-4 opacity-70 group-hover:opacity-100" />
        </h1>
        
        {/* Tagline */}
        <p className="text-xs md:text-sm text-blue-200 opacity-80 mb-6">Next-gen AI solutions</p>
        
        {/* Loading message with fade transition */}
        <div className="h-6 mb-3">
          <p className="text-xs md:text-sm text-blue-100 animate-pulse">
            {loadingMessages[loadingPhase]}
          </p>
        </div>
        
        {/* Progress bar with improved styling */}
        <div className="w-56 md:w-72 h-1 md:h-1.5 bg-blue-950 rounded-full overflow-hidden mb-2 relative">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          >
            {/* Animated glow effect */}
            <div className="absolute top-0 h-full w-20 bg-white opacity-30 blur-sm animate-slide"></div>
          </div>
        </div>
        
        {/* Progress percentage */}
        <p className="text-blue-200 text-xs md:text-sm mb-4">
          {Math.round(progress)}%
        </p>
        
        {/* Loading dots */}
        <div className="flex space-x-1 mb-8">
          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      {/* Bottom text - Made clickable */}
      <div 
        className="absolute bottom-6 text-center text-blue-200 text-xs opacity-70 px-4 cursor-pointer hover:opacity-100 transition-opacity flex items-center justify-center"
        onClick={() => openNewTab('/about')}
        title="Learn About Us"
      >
        <p>AI-Powered • Responsive • Secure</p>
        <ExternalLink className="ml-1 w-3 h-3" />
      </div>
      
      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes levitate {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-levitate {
          animation: levitate 4s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-12px) scale(1.3); opacity: 0.3; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(32px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(32px) rotate(-360deg); }
        }
        .animate-orbit {
          animation: orbit 10s linear infinite;
        }
        
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-slide {
          animation: slide 2s ease-in-out infinite;
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        @media (min-width: 768px) {
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(48px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(48px) rotate(-360deg); }
          }
          .bg-grid-pattern {
            background-size: 30px 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedPreloader;