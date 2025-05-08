import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Brain, Code, Bot, Star, Database, Cpu, Activity, Globe, 
  Sparkles, ChevronRight, ArrowRight, Zap, CheckCircle,
  Shield, Award, TrendingUp, BarChart, Menu, X, ExternalLink,
  Lightbulb, Lock, Users, Mail, Phone, ChevronDown, ShieldCheck, LineChart
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BrainTechHomepage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animatedElements, setAnimatedElements] = useState({
    hero: false,
    services: false,
    features: false,
    testimonials: false,
    cta: false,
    stats: false
  });

  // Refs for intersection observer
  const sectionRefs = {
    hero: useRef(null),
    services: useRef(null),
    features: useRef(null),
    stats: useRef(null),
    testimonials: useRef(null),
    cta: useRef(null)
  };

  // Handle scroll position for sticky header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimized intersection observer with useCallback
  const observerCallback = useCallback((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionId) {
          setAnimatedElements(prev => ({...prev, [sectionId]: true}));
        }
      }
    });
  }, []);

  // Enhanced Intersection Observer setup
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section refs
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Trigger initial hero animation with staggered delay
    setTimeout(() => {
      setAnimatedElements(prev => ({...prev, hero: true}));
    }, 300);

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [observerCallback]);

  // Enhanced Button component that handles both links and buttons
  const Button = ({ children, primary, className, icon, onClick, to, href }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const buttonClasses = `${primary 
      ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' 
      : 'bg-white text-gray-800 border border-gray-200'} 
      px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-300 
      hover:shadow-lg relative overflow-hidden
      flex items-center justify-center gap-2 w-full sm:w-auto ${className}`;
    
    // If 'to' prop is provided, use Link
    if (to) {
      return (
        <Link 
          to={to}
          className={buttonClasses}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="relative z-10 flex items-center gap-2">
            {children}
            {icon || (primary && <ArrowRight size={16} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />)}
          </span>
          <span className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 
            ${primary ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-0'}`}></span>
        </Link>
      );
    }
    
    // If 'href' prop is provided, use anchor tag
    if (href) {
      return (
        <a 
          href={href}
          className={buttonClasses}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="relative z-10 flex items-center gap-2">
            {children}
            {icon || (primary && <ArrowRight size={16} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />)}
          </span>
          <span className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 
            ${primary ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-0'}`}></span>
        </a>
      );
    }
    
    // Default to button element
    return (
      <button 
        onClick={onClick}
        className={buttonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon || (primary && <ArrowRight size={16} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />)}
        </span>
        <span className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 
          ${primary ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-0'}`}></span>
      </button>
    );
  };

  // Enhanced features with icons and animations
  const features = [
    { 
      icon: <Brain className="text-indigo-500" size={32} />, 
      title: "AI-Powered Solutions", 
      description: "Leverage the power of artificial intelligence to solve complex business challenges and drive innovation.", 
      animationDelay: "0ms",
      to: "/AIPoweredSolutions"
    },
    { 
      icon: <Database className="text-indigo-500" size={32} />, 
      title: "Big Data Analysis", 
      description: "Transform large datasets into actionable insights with our advanced analytics and visualization tools.", 
      animationDelay: "100ms",
      to: "/BigDataAnalysis"
    },
    { 
      icon: <Cpu className="text-indigo-500" size={32} />, 
      title: "Machine Learning", 
      description: "Implement self-learning algorithms that improve over time for better results and predictive capabilities.", 
      animationDelay: "200ms",
      to: "/MachineLearning"
    },
    { 
      icon: <Bot className="text-indigo-500" size={32} />, 
      title: "Intelligent Automation", 
      description: "Streamline operations with smart automation that adapts to your workflow and reduces manual tasks.", 
      animationDelay: "300ms",
      to: "/Auto"
    },
    { 
      icon: <Shield className="text-indigo-500" size={32} />, 
      title: "Enhanced Security", 
      description: "Protect your data with next-generation security protocols, encryption, and advanced threat detection.", 
      animationDelay: "400ms",
      to: "/EnhancedSecurity" 
    },
    { 
      icon: <Globe className="text-indigo-500" size={32} />, 
      title: "Global Scalability", 
      description: "Solutions that grow with your business needs, from startup to enterprise, ensuring sustainable growth.", 
      animationDelay: "500ms",
      to: "/GlobalScalability" 
    }
  ];
  
  // Expanded stats data with animations
  const stats = [
    { value: "98%", label: "Client Satisfaction", icon: <CheckCircle size={24} className="text-green-500" />, delay: "0ms" },
    { value: "200+", label: "Projects Completed", icon: <Award size={24} className="text-yellow-500" />, delay: "100ms" },
    { value: "40%", label: "Efficiency Increase", icon: <TrendingUp size={24} className="text-indigo-500" />, delay: "200ms" },
    { value: "24/7", label: "Support & Monitoring", icon: <Activity size={24} className="text-blue-500" />, delay: "300ms" }
  ];

  // Enhanced testimonials data
  const testimonials = [
    {
      name: "Alex Brown",
      position: "CTO, TechForward",
      initials: "AB",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-purple-500",
      quote: "BrainTech's AI integration has revolutionized our data processing capabilities. We've seen a 40% increase in efficiency and significant cost savings.",
      delay: "100ms"
    },
    {
      name: "Sarah Johnson",
      position: "CEO, InnovateCorp",
      initials: "SJ",
      gradientFrom: "from-blue-500",
      gradientTo: "to-cyan-500",
      quote: "The custom software solution developed by BrainTech has been a game-changer for our operations. Their team understood our unique challenges and delivered beyond expectations.",
      delay: "200ms"
    },
    {
      name: "Robert Miller",
      position: "Director, DataDrive",
      initials: "RM",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-blue-500",
      quote: "Their data analytics platform provided insights we never knew existed in our business. The implementation was smooth and the ongoing support has been exceptional.",
      delay: "300ms"
    }
  ];

  // Parallax effect function
  const calculateParallax = (speed = 0.2) => {
    return -scrollPosition * speed;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Enhanced animated background with parallax effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i} 
            className="absolute rounded-full bg-indigo-400 opacity-5"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${calculateParallax(0.05 + (i * 0.01))}px)`,
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced Hero Section with advanced animations */}
      <section 
        id="hero" 
        ref={sectionRefs.hero} 
        className="pt-20 pb-16 min-h-screen flex items-center relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white overflow-hidden"
      >
        {/* Improved animated background with layered parallax */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-indigo-800/80 to-blue-900/90"
          style={{ transform: `translateY(${calculateParallax(0.1)}px)` }}
        ></div>
        
        {/* Enhanced particle system background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Horizontal neural lines with variable speeds and opacities */}
          {[...Array(30)].map((_, i) => (
            <div 
              key={`h-${i}`}
              className="absolute bg-gradient-to-r from-indigo-500/0 via-indigo-400/10 to-indigo-500/0"
              style={{
                height: `${Math.random() * 1 + 0.5}px`,
                width: '100%',
                top: `${Math.random() * 100}%`,
                left: 0,
                animation: `floatHorizontal ${Math.random() * 8 + 10}s infinite alternate ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.6 + 0.2
              }}
            ></div>
          ))}
          
          {/* Vertical neural lines with glow effect */}
          {[...Array(30)].map((_, i) => (
            <div 
              key={`v-${i}`}
              className="absolute bg-gradient-to-b from-indigo-500/0 via-indigo-400/10 to-indigo-500/0"
              style={{
                width: `${Math.random() * 1 + 0.5}px`,
                height: '100%',
                left: `${Math.random() * 100}%`,
                top: 0,
                animation: `floatVertical ${Math.random() * 8 + 12}s infinite alternate ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.6 + 0.2,
                filter: 'blur(0.5px)'
              }}
            ></div>
          ))}
          
          {/* Floating dots for neural network nodes */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={`dot-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(${120 + Math.random() * 80}, ${180 + Math.random() * 40}, ${240 + Math.random() * 15}, ${0.3 + Math.random() * 0.4})`,
                animation: `pulse ${Math.random() * 3 + 2}s infinite alternate ease-in-out`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: '0 0 8px rgba(130, 170, 255, 0.5)'
              }}
            ></div>
          ))}
        </div>
        
        {/* Moving wave effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path 
                d="M0,32L48,48C96,64,192,96,288,101.3C384,107,480,85,576,80C672,75,768,85,864,90.7C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                className="fill-white/10"
                style={{
                  animation: 'wave 15s linear infinite',
                  animationDelay: '0s'
                }}
              ></path>
              <path 
                d="M0,80L48,85.3C96,91,192,101,288,106.7C384,112,480,112,576,96C672,80,768,48,864,58.7C960,69,1056,123,1152,128C1248,133,1344,91,1392,69.3L1440,48L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                className="fill-white/5"
                style={{
                  animation: 'wave 18s linear infinite reverse',
                  animationDelay: '2s'
                }}
              ></path>
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left content column - improved mobile responsiveness */}
            <div className={`w-full lg:w-1/2 transition-all duration-1000 
              ${animatedElements.hero ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="animation-fade-in-up" style={{ animationDelay: '300ms' }}>
                <span className="inline-flex items-center px-4 py-1 bg-indigo-700/50 text-indigo-200 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-indigo-600/30">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse relative">
                    <span className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-60"></span>
                  </span>
                  Next-Gen AI Technology
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animation-fade-in-up" style={{ animationDelay: '500ms' }}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 
                  animate-gradient-text inline-block">Intelligent</span>{" "}
                <span className="relative inline-block">
                  Software Solutions
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400/0 via-blue-400/70 to-indigo-400/0 animate-expand-width"></span>
                </span>{" "}
                for Tomorrow
              </h1>
              <p className="text-lg md:text-xl text-indigo-100 mb-8 
                animation-fade-in-up max-w-lg" style={{ animationDelay: '700ms' }}>
                Harness the power of artificial intelligence to transform your business
                and stay ahead of the competition in today's digital landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 
                animation-fade-in-up" style={{ animationDelay: '900ms' }}>
                <Button primary to="/demo" className="bg-white text-indigo-700 hover:bg-indigo-50 border-0 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    <Zap size={16} className="mr-2 group-hover:animate-pulse" />
                    Schedule Demo
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-200/0 via-blue-200/30 to-blue-200/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                </Button>
                <Button to="/about" className="bg-indigo-500/20 backdrop-blur-sm text-white border border-indigo-400/30 hover:bg-indigo-600/30 hover:border-indigo-400/50 transition-colors duration-300 group relative overflow-hidden">
                  <span className="relative z-10">Learn More</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                </Button>
              </div>
              
              {/* Trust indicators with improved mobile display */}
              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-center gap-4 animation-fade-in-up" style={{ animationDelay: '1100ms' }}>
                <p className="text-indigo-200 font-medium">Trusted by:</p>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-6 gap-y-3">
                  {[
                    { name: "TechCorp", icon: <ShieldCheck size={16} className="mr-1" /> },
                    { name: "InnovateLabs", icon: <Lightbulb size={16} className="mr-1" /> },
                    { name: "DataPlus", icon: <Database size={16} className="mr-1" /> }
                  ].map((company, i) => (
                    <div key={i} className="text-white/70 font-semibold text-sm flex items-center">
                      {company.icon}
                      {company.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right visual column - enhanced 3D and animation effects */}
            <div className={`w-full lg:w-1/2 mt-12 lg:mt-0 transition-all duration-1000 delay-300 
              ${animatedElements.hero ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="relative perspective-1000">
                <div className="w-full h-64 sm:h-80 md:h-96 
                  bg-gradient-to-r from-indigo-500/30 to-purple-600/30 backdrop-blur-sm 
                  rounded-2xl flex items-center justify-center overflow-hidden relative
                  border border-white/20 shadow-xl transform hover:rotate-y-2 hover:scale-105 transition-transform duration-700
                  animate-subtle-float">
                  
                  {/* Enhanced nested glowing orbs with parallax effect */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-blue-400/20 
                      absolute -top-12 -right-12 blur-md animate-pulse"
                      style={{ transform: `translate(${calculateParallax(-0.05)}px, ${calculateParallax(0.05)}px)` }}
                    ></div>
                    <div className="w-32 h-32 md:w-56 md:h-56 rounded-full bg-indigo-400/20 
                      absolute bottom-8 -left-12 blur-md animate-pulse" 
                      style={{ animationDelay: '1s', transform: `translate(${calculateParallax(0.05)}px, ${calculateParallax(-0.05)}px)` }}
                    ></div>
                    
                    {/* Enhanced radial gradient core */}
                    <div className="absolute inset-0 bg-radial-gradient from-indigo-600/5 to-transparent"></div>
                    
                    {/* Enhanced 3D rotating brain animation with improved visual effects */}
                    <div className="relative w-48 h-48 animate-float animation-fade-in-up transform hover:rotate-y-12 transition-transform duration-700" 
                      style={{ animationDelay: '700ms' }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center transform-gpu">
                        <Brain size={96} className="text-white animate-glow drop-shadow-lg" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-indigo-500/10 filter blur-md animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Enhanced orbits with varying animations */}
                      <div className="absolute inset-0 flex items-center justify-center transform-gpu">
                        <div className="w-32 h-32 border-4 border-indigo-300/30 rounded-full animate-spin" 
                          style={{ animationDuration: '12s' }}></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center transform-gpu rotate-12">
                        <div className="w-48 h-48 border-2 border-blue-300/20 rounded-full animate-reverse-spin" 
                          style={{ animationDuration: '15s' }}></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center transform-gpu -rotate-12">
                        <div className="w-64 h-64 border border-purple-300/10 rounded-full animate-spin" 
                          style={{ animationDuration: '20s' }}></div>
                      </div>
                      
                      {/* Enhanced 3D particle system around brain */}
                      {[...Array(16)].map((_, i) => {
                        const angle = i * (360 / 16);
                        const radius = 70;
                        const x = Math.cos(angle * Math.PI / 180) * radius;
                        const y = Math.sin(angle * Math.PI / 180) * radius;
                        
                        return (
                          <div key={i}
                            className="absolute w-2 h-2 bg-blue-300 rounded-full animate-particle-3d"
                            style={{
                              top: `calc(50% + ${y}px)`,
                              left: `calc(50% + ${x}px)`,
                              animationDelay: `${i * 0.15}s`,
                              opacity: 0.6,
                              boxShadow: '0 0 6px rgba(147, 197, 253, 0.8)'
                            }}
                          ></div>
                        );
                      })}
                      
                      {/* Enhanced neural network connections with glow effect */}
                      {[...Array(8)].map((_, i) => (
                        <div key={i}
                          className="absolute top-1/2 left-1/2 bg-gradient-to-r from-indigo-500/0 via-indigo-400/50 to-indigo-500/0 animate-pulse"
                          style={{
                            height: '1px',
                            width: '80px',
                            transform: `rotate(${i * 45}deg)`,
                            transformOrigin: 'center',
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: '3s',
                            boxShadow: '0 0 4px rgba(129, 140, 248, 0.7)'
                          }}
                        ></div>
                      ))}
                      
                      {/* Data pulse points with connection effect */}
                      {[...Array(5)].map((_, i) => {
                        const angle = i * 72;
                        const delay = i * 0.3;
                        return (
                          <div key={`pulse-${i}`} className="absolute -translate-x-1/2 -translate-y-1/2"
                            style={{
                              top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 90}px)`,
                              left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 90}px)`
                            }}>
                            <span className="block w-3 h-3 bg-blue-400/70 rounded-full animate-ping-slow"
                              style={{ animationDelay: `${delay}s` }}></span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Enhanced floating badges with improved animated icons and interaction */}
                  <div className="absolute bottom-4 right-4 bg-indigo-600/90 backdrop-blur rounded-lg p-3 
                    shadow-lg flex items-center gap-2 animate-float-badge hover:bg-indigo-600/95 transition-colors
                    group">
                    <div className="relative">
                      <Sparkles size={20} className="text-yellow-300 group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border border-yellow-300/60 rounded-full animate-ping-slow opacity-40"></div>
                      </div>
                    </div>
                    <span className="font-medium text-sm text-white">AI-Powered</span>
                  </div>
                  
                  <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur rounded-lg p-3 
                    shadow-lg flex items-center gap-2 animate-float-badge-alt hover:bg-indigo-600/95 transition-colors
                    group">
                    <div className="relative">
                      <Bot size={20} className="text-white group-hover:scale-110 transition-transform animate-subtle-bounce" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border border-white/60 rounded-full animate-ping-slow opacity-40" 
                          style={{ animationDelay: '1s' }}></div>
                      </div>
                    </div>
                    <span className="font-medium text-sm text-white">Smart Automation</span>
                  </div>
                  
                  {/* Enhanced tech circle elements with 3D orbit animations */}
                  <div className="absolute top-1/4 right-1/6 bg-blue-500/20 backdrop-blur-sm rounded-full p-2
                    shadow-lg animate-3d-orbit hover:bg-blue-500/40 transition-colors" style={{ animationDuration: '15s' }}>
                    <Cpu size={16} className="text-blue-200 animate-pulse" />
                  </div>
                  
                  <div className="absolute bottom-1/4 left-1/6 bg-purple-500/20 backdrop-blur-sm rounded-full p-2
                    shadow-lg animate-3d-reverse-orbit hover:bg-purple-500/40 transition-colors" style={{ animationDuration: '18s' }}>
                    <Database size={16} className="text-purple-200 animate-pulse" />
                  </div>
                  
                  <div className="absolute top-1/3 left-1/4 bg-indigo-500/20 backdrop-blur-sm rounded-full p-2
                    shadow-lg animate-3d-orbit hover:bg-indigo-500/40 transition-colors" style={{ animationDuration: '20s', animationDelay: '2s' }}>
                    <Lightbulb size={16} className="text-indigo-200 animate-pulse" />
                  </div>
                  
                  {/* Added additional floating tech elements */}
                  <div className="absolute bottom-1/3 right-1/4 bg-cyan-500/20 backdrop-blur-sm rounded-full p-2
                    shadow-lg animate-3d-reverse-orbit hover:bg-cyan-500/40 transition-colors" style={{ animationDuration: '17s', animationDelay: '1.5s' }}>
                    <LineChart size={16} className="text-cyan-200 animate-pulse" />
                  </div>
                  
                  <div className="absolute top-2/3 right-1/3 bg-emerald-500/20 backdrop-blur-sm rounded-full p-2
                    shadow-lg animate-3d-orbit hover:bg-emerald-500/40 transition-colors" style={{ animationDuration: '19s', animationDelay: '1s' }}>
                    <Lock size={16} className="text-emerald-200 animate-pulse" />
                  </div>
                </div>
                
                {/* Enhanced glow effects with interactive pulse */}
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-indigo-600/30 rounded-full -z-10 blur-2xl animate-subtle-pulse"></div>
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-purple-600/30 rounded-full -z-10 blur-2xl animate-subtle-pulse-alt"></div>
                
                {/* Added interactive floating data points */}
                <div className="absolute -top-4 right-1/4 w-6 h-6 bg-blue-500/40 rounded-full animate-float" 
                  style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
                  <div className="absolute inset-0 bg-blue-500/40 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                </div>
                <div className="absolute -bottom-2 left-1/3 w-4 h-4 bg-purple-500/40 rounded-full animate-float" 
                  style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
                  <div className="absolute inset-0 bg-purple-500/40 rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Added scrolldown indicator for better UX */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
          <span className="text-indigo-200 text-sm mb-2 opacity-70">Scroll Down</span>
          <ChevronDown size={20} className="text-indigo-200 opacity-70" />
        </div>
      </section>

      {/* Enhanced Services Section with improved card hover effects */}
      <section 
        id="services" 
        ref={sectionRefs.services} 
        className="py-16 md:py-24 bg-gradient-to-b from-white to-indigo-50"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 
            ${animatedElements.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transformative Solutions</h2>
            <p className="text-lg text-gray-600">
              Innovative software solutions designed to propel your business forward with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Enhanced Service Cards with improved hover effects */}
            {[
              {
                icon: <Brain size={24} className="text-indigo-600" />,
                title: "AI Integration",
                description: "Seamlessly integrate artificial intelligence into your existing systems to enhance capabilities and unlock new possibilities.",
                to: "/AIIntegration",
                delay: "100ms"
              },
              {
                icon: <Code size={24} className="text-indigo-600" />,
                title: "Custom Software Development",
                description: "Tailored solutions designed specifically for your unique business requirements and operational challenges.",
                to: "/CustomSoftwareDevelopment",
                delay: "200ms"
              },
              {
                icon: <BarChart size={24} className="text-indigo-600" />,
                title: "Data Analytics",
                description: "Convert raw data into meaningful insights that drive strategic business decisions and unlock new opportunities.",
                to: "/DataAnalytics",
                delay: "300ms"
              }
            ].map((service, index) => (
              <Link 
                key={index}
                to={service.to}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-700 
                  group hover:shadow-xl transform hover:-translate-y-1
                  ${animatedElements.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: service.delay }}
              >
                <div className="p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-blue-600/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 
                    group-hover:scale-110 transition-transform duration-300 relative z-10 
                    group-hover:bg-gradient-to-r group-hover:from-indigo-500/20 group-hover:to-blue-500/20">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 relative z-10 group-hover:text-indigo-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-4 relative z-10">
                    {service.description}
                  </p>
                  <div className="text-indigo-600 font-medium flex items-center group-hover:text-indigo-700 relative z-10">
                    Learn more <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
                <div className="h-1 w-0 bg-gradient-to-r from-indigo-600 to-blue-500 group-hover:w-full transition-all duration-500"></div>
              </Link>
            ))}
          </div>
          
          {/* Enhanced CTA button with improved animations */}
          <div className={`mt-12 flex justify-center transition-all duration-700 delay-500
            ${animatedElements.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <Button primary to="/services" className="group relative overflow-hidden shadow-md hover:shadow-indigo-500/20">
              <span className="relative z-10 flex items-center gap-1">
                Explore All Services
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with interactive, animated cards */}
      <section 
        id="features" 
        ref={sectionRefs.features} 
        className="py-16 md:py-24 bg-white relative overflow-hidden"
      >
        {/* Enhanced background pattern with subtle animation */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-5 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="border-b border-r border-gray-200"></div>
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 
            ${animatedElements.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">Our Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Technology Capabilities</h2>
            <p className="text-lg text-gray-600">
              Our cutting-edge platform offers powerful features to accelerate your digital transformation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Link 
                key={index}
                to={feature.to}
                className={`bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 
                  ${animatedElements.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: feature.animationDelay }}
              >
                <div className="p-6">
                  <div className="w-14 h-14 bg-indigo-50 rounded-lg flex items-center justify-center mb-5 
                    group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <div className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors">
                    Learn more <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with animated counters */}
      <section 
        id="stats" 
        ref={sectionRefs.stats} 
        className="py-16 bg-gradient-to-r from-indigo-900 to-blue-900 text-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-700 
                  ${animatedElements.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: stat.delay }}
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-indigo-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with enhanced cards */}
      <section 
        id="testimonials" 
        ref={sectionRefs.testimonials} 
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 
            ${animatedElements.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">
              Discover how our intelligent solutions have transformed businesses across industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-700 hover:shadow-xl 
                  ${animatedElements.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: testimonial.delay }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-r ${testimonial.gradientFrom} ${testimonial.gradientTo}`}>
                      {testimonial.initials}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-indigo-300 opacity-30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 ml-6">{testimonial.quote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with gradient background */}
      <section 
        id="cta" 
        ref={sectionRefs.cta} 
        className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-blue-600 text-white relative overflow-hidden"
      >
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-indigo-900 bg-opacity-40"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-700 
            ${animatedElements.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-lg text-indigo-100 mb-8">
              Schedule a demo today and discover how our intelligent solutions can drive innovation and efficiency in your organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button primary to="/demo" className="bg-white text-indigo-600 hover:bg-indigo-50 border-0">
                Schedule Demo
              </Button>
              <Button to="/contact" className="border border-white/30 bg-transparent hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">Contact Us</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Have questions about our solutions or services? Our team is ready to help you navigate the future of technology.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Mail size={20} className="text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">Email</h4>
                      <p className="text-gray-600">info@braintech.io</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Phone size={20} className="text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Users size={20} className="text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">Support</h4>
                      <p className="text-gray-600">24/7 customer support available</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
                <form>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <Button primary type="submit" className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add styles for the animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes floatHorizontal {
          0% { transform: translateX(-10px); }
          100% { transform: translateX(10px); }
        }
        
        @keyframes floatVertical {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(10px); }
        }
        
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes subtlePulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.8; }
          100% { opacity: 0.6; }
        }
        
        @keyframes subtleFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes particle3d {
          0% { transform: scale(0.8) translateZ(-5px); opacity: 0.3; }
          50% { transform: scale(1.2) translateZ(10px); opacity: 0.8; }
          100% { transform: scale(0.8) translateZ(-5px); opacity: 0.3; }
        }
        
        @keyframes expandWidth {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
        }
        
        @keyframes orbit3d {
          0% { transform: rotateY(0deg) rotateX(0deg) translateZ(80px); }
          50% { transform: rotateY(180deg) rotateX(30deg) translateZ(30px); }
          100% { transform: rotateY(360deg) rotateX(0deg) translateZ(80px); }
        }
        
        @keyframes reverseOrbit3d {
          0% { transform: rotateY(0deg) rotateX(0deg) translateZ(80px); }
          50% { transform: rotateY(-180deg) rotateX(-30deg) translateZ(30px); }
          100% { transform: rotateY(-360deg) rotateX(0deg) translateZ(80px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes reverseSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(99, 102, 241, 0.6)); }
          50% { filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.8)); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-badge {
          animation: float 5s ease-in-out infinite;
        }
        
        .animate-float-badge-alt {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-orbit {
          animation: orbit3d 15s linear infinite;
        }
        
        .animate-reverse-orbit {
          animation: reverseOrbit3d 12s linear infinite;
        }
        
        .animate-ping-slow {
          animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-subtle-bounce {
          animation: subtleBounce 2s ease-in-out infinite;
        }
        
        .animate-particle-3d {
          animation: particle3d 4s ease-in-out infinite;
        }
        
        .animate-spin {
          animation: spin 20s linear infinite;
        }
        
        .animate-reverse-spin {
          animation: reverseSpin 15s linear infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-gradient-text {
          animation: gradientShift 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .animation-fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s forwards;
        }
        
        .animate-subtle-float {
          animation: subtleFloat 6s ease-in-out infinite;
        }
        
        .animate-subtle-pulse {
          animation: subtlePulse 4s ease-in-out infinite;
        }
        
        .animate-subtle-pulse-alt {
          animation: subtlePulse 4s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-expand-width {
          animation: expandWidth 1s ease-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }
        
        .animate-3d-orbit {
          animation: orbit3d 20s linear infinite;
        }
        
        .animate-3d-reverse-orbit {
          animation: reverseOrbit3d 18s linear infinite;
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
        
        .rotate-y-2 {
          transform: rotateY(2deg);
        }
        
        .hover\\:rotate-y-12:hover {
          transform: rotateY(12deg);
        }
      `}</style>
    </div>
  );
}