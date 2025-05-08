import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [animationState, setAnimationState] = useState('idle');
  const [activePage, setActivePage] = useState('home');
  const animationTimerRef = useRef(null);
  const prevScrollY = useRef(0);
  
  // Get current path and set active page
  useEffect(() => {
    // Extract the pathname from the URL
    const path = window.location.pathname;
    
    // Set active page based on pathname
    if (path === '/' || path === '') {
      setActivePage('home');
    } else {
      // Remove leading slash and convert to lowercase
      const page = path.substring(1).toLowerCase();
      setActivePage(page);
    }
  }, []);
  
  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (Math.abs(currentScrollY - prevScrollY.current) > 5) {
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      prevScrollY.current = currentScrollY;
    }
  }, []);
  
  // Throttled scroll effect
  useEffect(() => {
    let scrollTimer;
    const throttledScroll = () => {
      if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
          handleScroll();
          scrollTimer = null;
        }, 100);
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [handleScroll]);
  
  // Enhanced animation cycle with requestAnimationFrame
  useEffect(() => {
    let animationFrameId;
    
    const runAnimationCycle = () => {
      // First animation: rotate
      setAnimationState('rotate');
      
      // After 1s, change to zoom
      animationTimerRef.current = setTimeout(() => {
        setAnimationState('zoom');
        
        // After another 1s, change to pulse
        animationTimerRef.current = setTimeout(() => {
          setAnimationState('pulse');
          
          // After another 1s, return to idle
          animationTimerRef.current = setTimeout(() => {
            setAnimationState('idle');
            
            // Wait 3s before starting next cycle
            animationTimerRef.current = setTimeout(() => {
              animationFrameId = requestAnimationFrame(runAnimationCycle);
            }, 3000);
          }, 1000);
        }, 1000);
      }, 1000);
    };
    
    // Start animation cycle with requestAnimationFrame for smoother animation
    animationFrameId = requestAnimationFrame(runAnimationCycle);
    
    // Cleanup on unmount
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);
  
  // Navigate and set active page
  const handleNavigation = useCallback((page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  }, []);
  
  // Precomputed animation classes for better performance
  const getAnimationClasses = useCallback(() => {
    switch (animationState) {
      case 'rotate':
        return 'animate-spin scale-100';
      case 'zoom':
        return 'scale-125 transform transition-transform duration-300';
      case 'pulse':
        return 'animate-pulse scale-110';
      default:
        return 'scale-100 hover:scale-110 transition-transform duration-300';
    }
  }, [animationState]);
  
  // Close mobile menu when resizing to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);
  
  // Function to check if a link is active
  const isActive = (page) => activePage === page.toLowerCase();
  
  // Get dynamic classes for nav links
  const getLinkClasses = (page) => {
    const isActivePage = isActive(page);
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative";
    const colorClasses = isScrolled 
      ? (isActivePage ? "text-indigo-600" : "text-gray-700 hover:text-indigo-500") 
      : (isActivePage ? "text-indigo-400" : "text-gray-200 hover:text-white");
      
    return `${baseClasses} ${colorClasses}`;
  };
  
  // Get mobile link classes
  const getMobileLinkClasses = (page) => {
    const isActivePage = isActive(page);
    const baseClasses = "block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 relative";
    
    return isActivePage
      ? `${baseClasses} text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600`
      : `${baseClasses} text-gray-700 hover:text-indigo-600 hover:bg-gray-50`;
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-sm ${
      isScrolled ? 'bg-white/95 shadow-lg' : 'bg-transparent'
    }`}>
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex-shrink-0 flex items-center">
            <div className={`relative transition-all duration-500 ${getAnimationClasses()}`}>
              <Brain 
                className={`h-8 w-8 ${isScrolled ? 'text-indigo-600' : 'text-indigo-400'}`}
                strokeWidth={2}
              />
            </div>
            <span className="ml-2 text-xl font-bold">
              <span className={`transition-colors duration-300 ${isScrolled ? 'text-indigo-600' : 'text-indigo-400'}`}>Brain</span>
              <span className={`transition-colors duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Tech</span>
            </span>
          </div>
          
          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="/" 
              onClick={() => handleNavigation('home')}
              className={getLinkClasses('home')}
            >
              Home
              {isActive('home') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform"></span>
              )}
            </a>
            
            <a 
              href="/about" 
              onClick={() => handleNavigation('about')}
              className={getLinkClasses('about')}
            >
              About
              {isActive('about') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform"></span>
              )}
            </a>
            
            <a 
              href="/services" 
              onClick={() => handleNavigation('services')}
              className={getLinkClasses('services')}
            >
              Services
              {isActive('services') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform"></span>
              )}
            </a>
            
            <a 
              href="/projects" 
              onClick={() => handleNavigation('projects')}
              className={getLinkClasses('projects')}
            >
              Projects
              {isActive('projects') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform"></span>
              )}
            </a>
            
            <a 
              href="/contact" 
              onClick={() => handleNavigation('contact')}
              className={getLinkClasses('contact')}
            >
              Contact
              {isActive('contact') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 transform"></span>
              )}
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-gray-700/30'
              } hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors`}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm shadow-lg">
          <a 
            href="/" 
            onClick={() => handleNavigation('home')}
            className={getMobileLinkClasses('home')}
          >
            Home
          </a>
          
          <a 
            href="/about" 
            onClick={() => handleNavigation('about')}
            className={getMobileLinkClasses('about')}
          >
            About
          </a>
          
          <a 
            href="/services" 
            onClick={() => handleNavigation('services')}
            className={getMobileLinkClasses('services')}
          >
            Services
          </a>
          
          <a 
            href="/projects" 
            onClick={() => handleNavigation('projects')}
            className={getMobileLinkClasses('projects')}
          >
            Projects
          </a>
          
          <a 
            href="/contact" 
            onClick={() => handleNavigation('contact')}
            className={getMobileLinkClasses('contact')}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;