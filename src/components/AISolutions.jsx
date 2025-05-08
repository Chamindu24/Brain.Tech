import React, { useState, useEffect } from 'react';
import { 
  Code, Database, BarChart, Search, 
  Cloud, Lock, Smartphone, Cpu, 
  ArrowRight, Box, Server, Wifi
} from 'lucide-react';

export default function ExploreOurSolutions() {
  // State for animations
  const [animatedElements, setAnimatedElements] = useState({
    header: false,
    title: false,
    subtitle: false,
    icon: false,
    solutionsRow1: false,
    solutionsRow2: false,
    cta: false
  });

  // Button component with improved mobile handling
  const Button = ({ children, primary, className, icon, type, disabled, href }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <a 
        href={href || "#"}
        type={type || 'button'}
        disabled={disabled}
        className={`${primary 
          ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' 
          : 'bg-white text-gray-800 border border-gray-200'} 
          px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-300 
          hover:shadow-lg relative overflow-hidden
          flex items-center justify-center gap-2 w-full sm:w-auto text-center
          ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
          ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon || (primary && <ArrowRight size={16} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />)}
        </span>
        <span className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 transition-all duration-300 
          ${primary ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-0'}`}></span>
      </a>
    );
  };

  // Solution card component with improved mobile handling
  const SolutionCard = ({ icon: Icon, title, description }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg relative overflow-hidden group h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background glow */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${isHovered ? 'bg-blue-600' : 'bg-blue-100'} flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300`}>
            <Icon size={24} className={`${isHovered ? 'text-white' : 'text-blue-600'} transition-colors duration-300`} />
          </div>
          
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">{title}</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow">{description}</p>
          
          <div className="mt-4 sm:mt-6">
            <Button 
              primary 
              className="text-sm py-1 px-3"
            >
              Explore Solution
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Intersection Observer for element animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Lower threshold for better mobile triggering
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId === 'solutions-section') {
            // Enhanced animation sequence with staggered delays
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, header: true}));
            }, 100);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, title: true}));
            }, 200);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, subtitle: true}));
            }, 300);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, icon: true}));
            }, 400);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, solutionsRow1: true}));
            }, 500);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, solutionsRow2: true}));
            }, 600);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, cta: true}));
            }, 700);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const solutionsSection = document.getElementById('solutions-section');
    if (solutionsSection) {
      observer.observe(solutionsSection);
    }

    return () => {
      if (solutionsSection) {
        observer.unobserve(solutionsSection);
      }
    };
  }, []);

  // Check if we're on a mobile device for conditional rendering
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Solutions data
  const solutions = [
    {
      icon: Cloud,
      title: "Cloud Architecture",
      description: "Scalable, resilient cloud infrastructure solutions designed to optimize performance and reduce operational costs while ensuring business continuity."
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "End-to-end data pipeline development and management solutions that transform raw data into actionable insights for informed decision-making."
    },
    {
      icon: BarChart,
      title: "Business Intelligence",
      description: "Custom analytics dashboards and visualization tools that help businesses understand complex data patterns and identify growth opportunities."
    },
    {
      icon: Lock,
      title: "Security Solutions",
      description: "Comprehensive cybersecurity frameworks that protect your digital assets, ensure compliance, and build customer trust through robust protection."
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile solutions that deliver exceptional user experiences and extend your digital reach across all devices."
    },
    {
      icon: Code,
      title: "Custom Software",
      description: "Tailor-made software solutions engineered to address your unique business challenges and streamline complex operational workflows."
    }
  ];

  return (
    <div id="solutions-section" className="w-full overflow-hidden">
      {/* Enhanced Header Section with Server Icon and more animations */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-900 py-12 sm:py-16 md:py-24 relative overflow-hidden">
        {/* Dynamic animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-teal-900/90 animate-gradient"></div>
        
        {/* Floating bubbles background effect - enhanced with more dynamic positions */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isMobile ? 4 : 8)].map((_, i) => (
            <div key={i} 
              className="absolute rounded-full bg-teal-400 opacity-5"
              style={{
                width: `${Math.random() * (isMobile ? 100 : 200) + 50}px`,
                height: `${Math.random() * (isMobile ? 100 : 200) + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Digital circuit pattern overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-full opacity-5">
            {[...Array(isMobile ? 4 : 8)].map((_, i) => (
              <div key={i} 
                className="absolute bg-blue-300"
                style={{
                  height: '1px',
                  width: `${Math.random() * 20 + 10}%`,
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
            {[...Array(isMobile ? 4 : 8)].map((_, i) => (
              <div key={i + 'v'} 
                className="absolute bg-teal-300"
                style={{
                  width: '1px',
                  height: `${Math.random() * 20 + 10}%`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 80}%`,
                  animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* New floating data nodes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isMobile ? 4 : 10)].map((_, i) => (
            <div key={`node-${i}`} 
              className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `nodeFloat ${Math.random() * 8 + 7}s ease-in-out infinite, nodePulse ${Math.random() * 2 + 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left max-w-lg">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-700 
                ${animatedElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="relative inline-block">
                  <br></br>
                  <span className="relative z-10">Explore Our</span>
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-teal-400 opacity-50 transform -skew-x-12"></span>
                </span>
                <span className="block mt-1">Enterprise Solutions</span>
              </h2>
              
              <p className={`text-base sm:text-lg text-blue-100 transition-all duration-700 delay-200
                ${animatedElements.subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Innovative technology solutions crafted to solve complex business challenges and drive digital transformation.
              </p>
              
              {/* New animated call-to-action chips */}
              <div className={`flex flex-wrap gap-2 mt-6 justify-center md:justify-start transition-all duration-700 delay-300
                ${animatedElements.subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {['Cloud-Native', 'AI-Powered', 'Enterprise-Grade', 'Scalable'].map((tag, i) => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-800/50 text-blue-100 border border-blue-700/50"
                    style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Enhanced Animated Server Icon with Connection Effects */}
            <div className={`relative w-32 h-32 sm:w-40 sm:h-40 animate-float transition-all duration-1000 
              ${animatedElements.icon ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Server size={isMobile ? 48 : 72} className="text-white animate-glow" />
                  
                  {/* Pulsing dot indicators */}
                  <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping-slow"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-400 rounded-full animate-ping-slow" 
                    style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
              
              {/* Multiple orbit rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-teal-300/30 rounded-full animate-spin" 
                  style={{ animationDuration: '12s' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 sm:w-36 sm:h-36 border-2 border-blue-300/20 rounded-full animate-reverse-spin" 
                  style={{ animationDuration: '15s' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full border border-teal-300/10 rounded-full animate-pulse" 
                  style={{ animationDuration: '4s' }}></div>
              </div>
              
              {/* Connection lines with active data transfer effect */}
              {[...Array(isMobile ? 3 : 6)].map((_, i) => {
                const angle = (i * (360 / (isMobile ? 3 : 6))) * (Math.PI / 180);
                const length = isMobile ? 30 : 50;
                const endX = Math.cos(angle) * length;
                const endY = Math.sin(angle) * length;
                
                return (
                  <div key={`conn-${i}`} className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-r from-blue-500/80 to-teal-500/80"
                    style={{
                      height: '1px',
                      transformOrigin: '0 0',
                      transform: `rotate(${i * (360 / (isMobile ? 3 : 6))}deg)`,
                      width: `${length}px`,
                    }}>
                    <div className="absolute top-0 left-0 w-1 h-1 bg-teal-400 rounded-full animate-data-transfer"></div>
                  </div>
                );
              })}
              
              {/* WiFi/signal icon for connectivity */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                <Wifi size={16} className="text-white" />
              </div>
              
              {/* Particle effects around server */}
              {[...Array(isMobile ? 4 : 8)].map((_, i) => (
                <div key={i}
                  className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-teal-300 rounded-full animate-particle"
                  style={{
                    top: `calc(50% + ${Math.cos(i * (360 / (isMobile ? 4 : 8)) * Math.PI / 180) * (isMobile ? 30 : 40)}px)`,
                    left: `calc(50% + ${Math.sin(i * (360 / (isMobile ? 4 : 8)) * Math.PI / 180) * (isMobile ? 30 : 40)}px)`,
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.6
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Added animated wave divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform rotate-180">
            <svg className="relative block" style={{width: 'calc(100% + 1.5px)'}} height="60" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-gray-50 opacity-20"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Solutions Content Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 sm:w-64 h-40 sm:h-64 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 sm:w-64 h-40 sm:h-64 bg-teal-100 rounded-full opacity-50 blur-3xl"></div>
          
          {/* Grid pattern */}
          {!isMobile && (
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20">
              {[...Array(100)].map((_, i) => (
                <div key={i} className="w-full h-full border-gray-200" style={{
                  borderWidth: (i % 10 === 0 || i < 10) ? '0.5px' : '0'
                }}></div>
              ))}
            </div>
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Section heading */}
          <div className={`text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 transition-all duration-700 
            ${animatedElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-4">
              Technology Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Enterprise-Grade Solutions</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Innovative technology solutions engineered to accelerate your digital transformation journey
            </p>
          </div>
          
          {/* First row of solutions */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8 transition-all duration-700 delay-200
            ${animatedElements.solutionsRow1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {solutions.slice(0, 3).map((solution, index) => (
              <SolutionCard key={index} {...solution} />
            ))}
          </div>
          
          {/* Second row of solutions */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 transition-all duration-700 delay-400
            ${animatedElements.solutionsRow2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {solutions.slice(3, 6).map((solution, index) => (
              <SolutionCard key={index + 3} {...solution} />
            ))}
          </div>
          
          {/* CTA Section */}
          <div className={`mt-8 sm:mt-12 md:mt-16 text-center transition-all duration-700 delay-600
            ${animatedElements.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-12 border border-gray-100 relative overflow-hidden">
              {/* Background elements */}
              <div className="absolute -top-10 -right-10 w-24 sm:w-40 h-24 sm:h-40 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
              <div className="absolute -bottom-10 -left-10 w-24 sm:w-40 h-24 sm:h-40 bg-teal-50 rounded-full blur-3xl opacity-70"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Start Your Digital Transformation</h3>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
                  Let our team of experts help you implement the right solutions to accelerate growth and unlock new opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button primary href="/contact">Schedule a Consultation</Button>
                  <Button href="/case-studies">View Success Stories</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(20, 184, 166, 0.7)); }
          50% { filter: drop-shadow(0 0 15px rgba(20, 184, 166, 0.9)); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes reverse-spin {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.8); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        
        @keyframes particle {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 0.3; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes nodeFloat {
          0% { transform: translate(0, 0); }
          25% { transform: translate(10px, 10px); }
          50% { transform: translate(0, 15px); }
          75% { transform: translate(-10px, 5px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes nodePulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes data-transfer {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(50px); opacity: 0; }
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-spin {
          animation: spin 10s linear infinite;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 15s linear infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-particle {
          animation: particle 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        
        .animate-data-transfer {
          animation: data-transfer 2s linear infinite;
        }
        
        /* Fix for mobile viewport height issues */
        @media (max-width: 640px) {
          #solutions-section {
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  );
}