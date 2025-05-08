import React, { useState, useEffect, useRef } from 'react';
import { Brain, ArrowUp, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(null);
  const footerRef = useRef(null);
  const scrollTopTimerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeLink, setActiveLink] = useState("/"); // Track active link
  
  // Enhanced Brain icon animation state
  const [brainAnimating, setBrainAnimating] = useState(false);
  
  // Auto animation for icons
  useEffect(() => {
    const iconInterval = setInterval(() => {
      const icons = ['github', 'twitter', 'linkedin', 'mail', 'brain'];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      setHoverIcon(randomIcon);
      
      setTimeout(() => {
        setHoverIcon(null);
      }, 1000);
    }, 5000); // Auto animate a random icon every 5 seconds
    
    return () => clearInterval(iconInterval);
  }, []);
  
  // Check if viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set active link based on current path
    const path = window.location.pathname;
    setActiveLink(path || "/");
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Check if footer is in viewport with IntersectionObserver
  useEffect(() => {
    if (!footerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if ((entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight - 100) !== isVisible) {
          setIsVisible(entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight - 100);
          
          // Trigger brain animation when footer becomes visible
          if (entry.isIntersecting && !brainAnimating) {
            setBrainAnimating(true);
            setTimeout(() => setBrainAnimating(false), 2000);
          }
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [isVisible, brainAnimating]);
  
  // Scroll to top with smooth animation
  const scrollToTop = () => {
    if (scrollTopTimerRef.current) {
      clearTimeout(scrollTopTimerRef.current);
    }
    
    // Animate the button first
    setHoverIcon('top');
    
    // Then scroll after a short delay
    scrollTopTimerRef.current = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Reset the animation state after scrolling
      setTimeout(() => setHoverIcon(null), 1000);
    }, 300);
  };
  
  // Handle social icon hover animations
  const handleIconHover = (icon) => {
    if (!isMobile) {  // Only apply hover effects on non-mobile devices
      setHoverIcon(icon);
    }
  };
  
  const handleIconLeave = () => {
    setHoverIcon(null);
  };
  
  // Handle icon tap on mobile
  const handleIconTap = (icon) => {
    if (isMobile) {
      setHoverIcon(icon);
      setTimeout(() => setHoverIcon(null), 800);
    }
    
    // Special case for brain icon
    if (icon === 'brain') {
      setBrainAnimating(true);
      setTimeout(() => setBrainAnimating(false), 2000);
    }
  };
  
  // Enhanced brain icon animation handling
  const handleBrainInteraction = () => {
    setBrainAnimating(true);
    handleIconTap('brain');
    setTimeout(() => setBrainAnimating(false), 2000);
  };
  
  // Handle navigation link click
  const handleNavLinkClick = (path) => {
    setActiveLink(path);
  };
  
  // Get animation classes for icons
  const getIconAnimationClass = (icon) => {
    if (icon === 'brain' && brainAnimating) {
      return 'animate-spin scale-125';
    }
    
    if (hoverIcon !== icon) return '';
    
    switch (icon) {
      case 'github':
        return 'animate-bounce';
      case 'twitter':
        return 'animate-pulse';
      case 'linkedin':
        return 'rotate-12 scale-125';
      case 'mail':
        return 'animate-ping opacity-70';
      case 'top':
        return 'animate-bounce';
      case 'brain':
        return 'animate-spin';
      default:
        return '';
    }
  };
  
  // Get nav link classes
  const getNavLinkClasses = (path) => {
    const baseClasses = "text-indigo-200 hover:text-white transition-all duration-300 relative";
    const activeClasses = path === activeLink ? "text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-indigo-400 after:scale-x-100 after:origin-left after:transition-transform after:duration-300" : "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-indigo-400 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300";
    
    return `${baseClasses} ${activeClasses}`;
  };
  
  // Get the current year
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      ref={footerRef}
      className={`bg-gradient-to-t from-indigo-900 to-indigo-800 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 md:pb-12">
        {/* Top section with logo and scroll to top */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div 
              className={`transition-all duration-500 hover:rotate-180 hover:scale-125 ${brainAnimating ? 'animate-spin scale-125' : ''}`}
              onMouseEnter={() => handleIconHover('brain')}
              onMouseLeave={handleIconLeave}
              onClick={handleBrainInteraction}
            >
              <Brain 
                className={`h-8 w-8 text-indigo-300 transition-all duration-500 ${
                  brainAnimating ? 'text-indigo-100' : ''
                }`} 
                strokeWidth={brainAnimating ? 2.5 : 2} 
              />
            </div>
            <span className="ml-2 text-xl font-bold">
              <span className={`transition-colors duration-500 ${brainAnimating ? 'text-white' : 'text-indigo-300'}`}>Brain</span>
              <span className="text-white">Tech</span>
            </span>
          </div>
          
          <button 
            onClick={scrollToTop}
            className={`p-3 rounded-full bg-indigo-700 hover:bg-indigo-600 text-white transition-all duration-300 ${
              getIconAnimationClass('top')
            }`}
            onMouseEnter={() => handleIconHover('top')}
            onMouseLeave={handleIconLeave}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-300">
          {/* Column 1: About */}
          <div className="space-y-4 transform transition-all duration-500 translate-y-0 hover:-translate-y-1">
            <h3 className="text-white text-lg font-semibold">About Us</h3>
            <p className="text-indigo-200">
              BrainTech delivers innovative solutions powered by cutting-edge AI technology. We help businesses transform their digital landscape.
            </p>
          </div>
          
          {/* Column 2: Quick Links with animation */}
          <div className="space-y-4 transform transition-all duration-500 translate-y-0 hover:-translate-y-1">
            <h3 className="text-white text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/" 
                  className={getNavLinkClasses("/")}
                  onClick={() => handleNavLinkClick("/")}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className={getNavLinkClasses("/about")}
                  onClick={() => handleNavLinkClick("/about")}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="/services" 
                  className={getNavLinkClasses("/services")}
                  onClick={() => handleNavLinkClick("/services")}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="/projects" 
                  className={getNavLinkClasses("/projects")}
                  onClick={() => handleNavLinkClick("/projects")}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className={getNavLinkClasses("/contact")}
                  onClick={() => handleNavLinkClick("/contact")}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div className="space-y-4 transform transition-all duration-500 translate-y-0 hover:-translate-y-1">
            <h3 className="text-white text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-indigo-200">36/3,Januda,Hakmana Road,Beliatta</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-200">janudakodi@gmail.com</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-200">+ (94) 77300-7426</span>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div className="space-y-4 transform transition-all duration-500 translate-y-0 hover:-translate-y-1">
            <h3 className="text-white text-lg font-semibold">Subscribe</h3>
            <p className="text-indigo-200">Join our newsletter for updates</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                className="px-4 py-2 rounded-md bg-indigo-700 border border-indigo-600 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-md text-white font-medium transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Social links */}
        <div className="mt-12 pt-8 border-t border-indigo-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a
                href="#"
                aria-label="GitHub"
                className={`text-indigo-300 hover:text-white transition-all duration-300 ${getIconAnimationClass('github')}`}
                onMouseEnter={() => handleIconHover('github')}
                onMouseLeave={handleIconLeave}
                onClick={() => handleIconTap('github')}
              >
                <Github size={24} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className={`text-indigo-300 hover:text-white transition-all duration-300 ${getIconAnimationClass('twitter')}`}
                onMouseEnter={() => handleIconHover('twitter')}
                onMouseLeave={handleIconLeave}
                onClick={() => handleIconTap('twitter')}
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className={`text-indigo-300 hover:text-white transition-all duration-300 ${getIconAnimationClass('linkedin')}`}
                onMouseEnter={() => handleIconHover('linkedin')}
                onMouseLeave={handleIconLeave}
                onClick={() => handleIconTap('linkedin')}
              >
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                aria-label="Email"
                className={`text-indigo-300 hover:text-white transition-all duration-300 ${getIconAnimationClass('mail')}`}
                onMouseEnter={() => handleIconHover('mail')}
                onMouseLeave={handleIconLeave}
                onClick={() => handleIconTap('mail')}
              >
                <Mail size={24} />
              </a>
            </div>
            
            <div className="flex items-center">
              <span className="text-indigo-200">
                © {currentYear} BrainTech. All rights reserved.
              </span>
              <Heart className="w-4 h-4 mx-1 text-red-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Mobile-friendly bottom nav with active link indicators */}
      
       
      
    </footer>
  );
};

export default Footer;