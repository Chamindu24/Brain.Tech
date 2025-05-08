import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Globe, Code, Layers, Zap, 
  Brain, Database, Shield, ArrowRight
} from 'lucide-react';

export default function Services() {
  // State for animations
  const [animatedElements, setAnimatedElements] = useState({
    header: false,
    title: false,
    servicesRow1: false,
    servicesRow2: false,
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
          ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' 
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
        <span className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 
          ${primary ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-0'}`}></span>
      </a>
    );
  };

  // Service card component with improved mobile handling
  const ServiceCard = ({ icon: Icon, title, description }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg relative overflow-hidden group h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background glow */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${isHovered ? 'bg-indigo-600' : 'bg-indigo-100'} flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300`}>
            <Icon size={24} className={`${isHovered ? 'text-white' : 'text-indigo-600'} transition-colors duration-300`} />
          </div>
          
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">{title}</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow">{description}</p>
          
          <div className="mt-4 sm:mt-6">
            <a 
              href="#" 
              className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors text-sm sm:text-base"
            >
              Learn More 
              <ArrowRight 
                size={16} 
                className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
              />
            </a>
          </div>
        </div>
      </div>
    );
  };

  // Intersection Observer for element animations - with improved mobile handling
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
          if (sectionId === 'services-section') {
            // Mobile-friendly animation sequence with shorter delays
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, header: true}));
            }, 100);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, title: true}));
            }, 200);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, servicesRow1: true}));
            }, 300);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, servicesRow2: true}));
            }, 400);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, cta: true}));
            }, 500);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      observer.observe(servicesSection);
    }

    return () => {
      if (servicesSection) {
        observer.unobserve(servicesSection);
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

  // Services data
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Custom websites built from scratch using modern technologies to create fast, responsive, and user-friendly experiences tailored to your business needs."
    },
    {
      icon: Code,
      title: "App Development",
      description: "Native and cross-platform mobile applications designed to provide seamless experiences on all devices, helping you reach your audience wherever they are."
    },
    {
      icon: Layers,
      title: "UI/UX Design",
      description: "User-centered design focused on creating intuitive, accessible, and visually appealing interfaces that delight your users and improve engagement."
    },
    {
      icon: Database,
      title: "Data Analytics",
      description: "Turn your data into actionable insights with our advanced analytics solutions, helping you make informed decisions and optimize your business strategy."
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Protect your digital assets with our comprehensive security solutions, ensuring your systems and data remain safe from threats and vulnerabilities."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed up your existing websites and applications to improve user experience, search engine rankings, and overall conversion rates."
    }
  ];

  return (
    <div id="services-section" className="w-full overflow-hidden">
      {/* Header Section with Brain Icon - improved mobile layout */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 py-12 sm:py-16 md:py-24 relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-indigo-800/80 to-blue-900/90"></div>
        
        {/* Floating bubbles background effect - reduced number for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isMobile ? 3 : 5)].map((_, i) => (
            <div key={i} 
              className="absolute rounded-full bg-indigo-400 opacity-5"
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
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className={`flex flex-col md:flex-row items-center justify-between transition-all duration-1000 
            ${animatedElements.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="mb-8 md:mb-0 text-center md:text-left">
                <br></br>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Our Services</h2>
              <p className="text-base sm:text-lg text-indigo-100 max-w-lg">
                Transforming businesses with intelligent solutions built for the digital age. Discover how we can elevate your brand.
              </p>
            </div>
            
            {/* Animated Brain Icon - smaller on mobile */}
            {!isMobile ? (
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 animate-float">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain size={isMobile ? 48 : 72} className="text-white animate-glow" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-indigo-300/30 rounded-full animate-spin" 
                    style={{ animationDuration: '12s' }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 border-2 border-blue-300/20 rounded-full animate-reverse-spin" 
                    style={{ animationDuration: '15s' }}></div>
                </div>
                
                {/* Particle effects around brain - fewer on mobile */}
                {[...Array(isMobile ? 4 : 8)].map((_, i) => (
                  <div key={i}
                    className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-blue-300 rounded-full animate-particle"
                    style={{
                      top: `calc(50% + ${Math.cos(i * (isMobile ? 90 : 45) * Math.PI / 180) * (isMobile ? 30 : 40)}px)`,
                      left: `calc(50% + ${Math.sin(i * (isMobile ? 90 : 45) * Math.PI / 180) * (isMobile ? 30 : 40)}px)`,
                      animationDelay: `${i * 0.2}s`,
                      opacity: 0.6
                    }}
                  ></div>
                ))}
                
                {/* Neural network lines - fewer on mobile */}
                {[...Array(isMobile ? 2 : 4)].map((_, i) => (
                  <div key={i}
                    className="absolute top-1/2 left-1/2 w-12 sm:w-16 h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-400/50 to-indigo-500/0 animate-pulse"
                    style={{
                      transform: `rotate(${i * (isMobile ? 90 : 45)}deg)`,
                      transformOrigin: 'center',
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: '3s'
                    }}
                  ></div>
                ))}
              </div>
            ) : (
              // Simplified brain icon for very small screens
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain size={48} className="text-white animate-glow" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 border-2 border-indigo-300/30 rounded-full animate-spin" 
                    style={{ animationDuration: '12s' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services Content Section - improved mobile spacing */}
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        {/* Background elements - simplified for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 sm:w-64 h-40 sm:h-64 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 sm:w-64 h-40 sm:h-64 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
          
          {/* Grid pattern - simplified for mobile */}
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
          {/* Section heading - adjusted for mobile */}
          <div className={`text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 transition-all duration-700 
            ${animatedElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs sm:text-sm font-medium mb-4">
              What We Offer
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Comprehensive Digital Solutions</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Our services are designed to help businesses thrive in today's digital landscape
            </p>
          </div>
          
          {/* First row of services - adjusted for mobile */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8 transition-all duration-700 delay-200
            ${animatedElements.servicesRow1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          
          {/* Second row of services - adjusted for mobile */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 transition-all duration-700 delay-400
            ${animatedElements.servicesRow2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {services.slice(3, 6).map((service, index) => (
              <ServiceCard key={index + 3} {...service} />
            ))}
          </div>
          
          {/* CTA Section - adjusted for mobile */}
          <div className={`mt-8 sm:mt-12 md:mt-16 text-center transition-all duration-700 delay-600
            ${animatedElements.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-12 border border-gray-100 relative overflow-hidden">
              {/* Background elements */}
              <div className="absolute -top-10 -right-10 w-24 sm:w-40 h-24 sm:h-40 bg-indigo-50 rounded-full blur-3xl opacity-70"></div>
              <div className="absolute -bottom-10 -left-10 w-24 sm:w-40 h-24 sm:h-40 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Ready to Transform Your Business?</h3>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
                  Let's discuss how our services can help you achieve your goals and drive growth in the digital landscape.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button primary href="/contact">Schedule a Consultation</Button>
                  <Button href="/case-studies">View Case Studies</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Keyframe animations - optimized for mobile */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(99, 102, 241, 0.7)); }
          50% { filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.9)); }
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
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        
        @keyframes particle {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 0.3; }
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
        
        /* Fix for mobile viewport height issues */
        @media (max-width: 640px) {
          #services-section {
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  );
}