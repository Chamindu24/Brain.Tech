import React, { useState, useEffect, useRef } from 'react';
import {
  Brain, Code, Cpu, Lightbulb, Lock, 
  Server, MessageSquare, Bot, ChevronRight,
  Shield, Zap, ArrowRight, BarChart, CheckCircle, Users
} from 'lucide-react';

export default function AISolutions() {
  const [isInView, setIsInView] = useState({
    hero: false,
    solutions: false,
    capabilities: false,
    process: false,
    cta: false
  });
  
  // Observer refs for each section
  const heroRef = useRef(null);
  const solutionsRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Set up Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(prev => ({...prev, [entry.target.dataset.section]: true}));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section refs
    if (heroRef.current) observer.observe(heroRef.current);
    if (solutionsRef.current) observer.observe(solutionsRef.current);
    if (capabilitiesRef.current) observer.observe(capabilitiesRef.current);
    if (processRef.current) observer.observe(processRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    // Auto-trigger hero animation after load
    setTimeout(() => {
      setIsInView(prev => ({...prev, hero: true}));
    }, 300);
    
    return () => observer.disconnect();
  }, []);
  
  // Button component with animations
  const Button = ({ children, primary, className, icon }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button 
        className={`${primary 
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
          : 'bg-white/10 backdrop-blur text-white border border-white/20'} 
          px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 
          hover:shadow-xl relative overflow-hidden
          flex items-center justify-center gap-2 w-full sm:w-auto ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="relative z-10 flex items-center gap-2">
          {icon && <span className="text-current">{icon}</span>}
          {children}
          {primary && (
            <ChevronRight size={18} className={`transition-transform duration-500 ${isHovered ? 'translate-x-1' : ''}`} />
          )}
        </span>
        <span className={`absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 
          transition-all duration-500 ${primary ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-0'}`}></span>
      </button>
    );
  };

  // AI solutions with icons
  const aiSolutions = [
    { 
      icon: <Brain size={32} />, 
      title: "Machine Learning", 
      description: "Custom ML models that learn from your data to predict outcomes and automate decision-making." 
    },
    { 
      icon: <MessageSquare size={32} />, 
      title: "NLP & Chatbots", 
      description: "Intelligent conversational interfaces that understand and respond naturally to user requests." 
    },
    { 
      icon: <Cpu size={32} />, 
      title: "Computer Vision", 
      description: "Image and video analysis that can detect objects, faces, and patterns in visual data." 
    },
    { 
      icon: <Shield size={32} />, 
      title: "AI Security", 
      description: "Intelligent threat detection and prevention systems powered by advanced algorithms." 
    },
    { 
      icon: <Server size={32} />, 
      title: "AI Infrastructure", 
      description: "Scalable cloud and on-premise solutions optimized for AI workloads and deployment." 
    },
    { 
      icon: <Bot size={32} />, 
      title: "Process Automation", 
      description: "Streamline operations with intelligent automation that adapts to changing conditions." 
    }
  ];
  
  // Implementation process steps
  const processSteps = [
    {
      icon: <Lightbulb size={24} />,
      title: "Discovery",
      description: "We analyze your challenges and identify opportunities for AI implementation."
    },
    {
      icon: <Code size={24} />,
      title: "Development",
      description: "Our experts build and train custom AI models tailored to your specific needs."
    },
    {
      icon: <Server size={24} />,
      title: "Deployment",
      description: "We integrate AI solutions into your existing systems with minimal disruption."
    },
    {
      icon: <BarChart size={24} />,
      title: "Optimization",
      description: "Continuous improvement through monitoring, feedback, and model refinement."
    }
  ];

  // Key capabilities metrics
  const capabilities = [
    { title: "95% Accuracy", desc: "High-precision models", icon: <CheckCircle size={24} /> },
    { title: "10x Faster", desc: "Processing speed", icon: <Zap size={24} /> },
    { title: "24/7 Operation", desc: "Non-stop intelligence", icon: <Bot size={24} /> },
    { title: "Secure by Design", desc: "Built-in protection", icon: <Lock size={24} /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        data-section="hero" 
        className="pt-20 pb-20 lg:py-0 min-h-screen flex items-center relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white overflow-hidden"
      >
        {/* Abstract background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-72 h-72 rounded-full bg-purple-500/10 top-1/4 -left-36"></div>
          <div className="absolute w-72 h-72 rounded-full bg-indigo-500/10 bottom-1/4 -right-36"></div>
          <div className="absolute w-full h-full bg-gradient-to-b from-black/0 via-black/0 to-black/20"></div>
          
          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <div key={i} 
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-particle ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className={`w-full lg:w-1/2 transition-all duration-1000 ease-out
              ${isInView.hero ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div>
                <span className="inline-flex items-center px-4 py-1 bg-indigo-700/30 text-indigo-200 rounded-full text-sm font-medium mb-6">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Enterprise AI Solutions
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300 
                  inline-block">AI-Powered</span>{" "}
                <span className="relative">
                  Innovation
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded"></span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-xl">
                Transform your business with intelligent solutions that learn, adapt, and evolve to
                solve your most complex challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button primary className="shadow-lg shadow-indigo-600/20" icon={<Brain size={18} />}>
                  Explore AI Solutions
                </Button>
                <Button className="hover:bg-white/20">
                  Request Demo
                </Button>
              </div>
            </div>
            
            <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 
              ${isInView.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="relative mx-auto max-w-lg">
                <div className="w-full h-64 sm:h-80 
                  bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm 
                  rounded-2xl flex items-center justify-center overflow-hidden relative
                  border border-white/10 shadow-2xl">
                  
                  {/* Glowing orbs */}
                  <div className="absolute w-40 h-40 bg-indigo-500/30 rounded-full filter blur-3xl top-1/4 left-1/4 animate-pulse-slow"></div>
                  <div className="absolute w-40 h-40 bg-purple-500/30 rounded-full filter blur-3xl bottom-1/4 right-1/4 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
                  
                  {/* Brain animation */}
                  <div className="relative w-56 h-56 animate-float-slow">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain size={72} className="text-white animate-glow" />
                    </div>
                    
                    {/* Orbital rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-56 h-56 border-2 border-indigo-300/30 rounded-full animate-orbit"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-72 h-40 border border-purple-300/20 rounded-full animate-orbit-reverse"></div>
                    </div>
                    
                    {/* Floating icons */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 
                      bg-indigo-600/90 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center animate-float"
                      style={{animationDelay: '0.5s'}}>
                      <Cpu size={20} className="text-white" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 
                      bg-purple-600/90 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center animate-float"
                      style={{animationDelay: '1.5s'}}>
                      <MessageSquare size={20} className="text-white" />
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-x-4 -translate-y-1/2 
                      bg-indigo-600/90 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center animate-float"
                      style={{animationDelay: '1s'}}>
                      <Code size={20} className="text-white" />
                    </div>
                    <div className="absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2 
                      bg-purple-500/90 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center animate-float"
                      style={{animationDelay: '2s'}}>
                      <Server size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section 
        ref={solutionsRef}
        data-section="solutions" 
        className="py-20 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 
            ${isInView.solutions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
              AI Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Solutions for Every Challenge</h2>
            <p className="text-lg text-gray-600">
              Cutting-edge AI technologies customized to deliver tangible business results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiSolutions.map((solution, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 bg-gradient-to-br from-white to-indigo-50/50
                rounded-xl overflow-hidden shadow-sm hover:shadow-lg
                group hover:-translate-y-1 border border-indigo-100/50
                ${isInView.solutions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex-shrink-0 mb-5 w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center
                    group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-500 transition-colors 
                    text-indigo-600 group-hover:text-white">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-indigo-700">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    {solution.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-indigo-600 font-medium opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300">
                    <span>Learn more</span>
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section 
        ref={capabilitiesRef}
        data-section="capabilities" 
        className="py-20 md:py-24 bg-gradient-to-b from-indigo-50 to-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transition-all duration-700
            ${isInView.capabilities ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-1 rounded-2xl shadow-xl">
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-5">
                    {capabilities.map((item, idx) => (
                      <div key={idx} className="flex flex-col p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 
                        transition-all duration-300 border border-indigo-100 hover:border-indigo-200 group">
                        <div className="flex items-center mb-3">
                          <div className="mr-3 text-indigo-700">
                            {item.icon}
                          </div>
                          <h3 className="font-bold text-lg text-indigo-700">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                        
                        <div className="w-12 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded mt-4 
                          group-hover:w-20 transition-all duration-500"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full 
                text-sm font-medium mb-4">
                Business Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why AI Solutions?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Artificial Intelligence offers a competitive edge by automating complex tasks,
                uncovering hidden insights, and enabling intelligent decision-making.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Automate repetitive tasks to free human talent for innovation",
                  "Discover patterns and opportunities hidden in your data", 
                  "Make predictions based on comprehensive data analysis",
                  "Enhance customer experiences with personalized interactions"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 
                      rounded-full flex items-center justify-center text-white mt-1 mr-3">
                      <CheckCircle size={12} strokeWidth={3} />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button primary className="shadow-lg shadow-indigo-600/20">
                Discover AI Applications
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section 
        ref={processRef}
        data-section="process" 
        className="py-20 md:py-24 bg-gradient-to-br from-indigo-900 to-purple-900 text-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 
            ${isInView.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-4 py-1 bg-indigo-700/50 text-indigo-200 rounded-full text-sm font-medium mb-4">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Implementation Process</h2>
            <p className="text-lg text-indigo-100">
              A systematic approach to deploying intelligent solutions for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {processSteps.map((step, index) => (
              <div key={index} 
                className={`bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden
                transition-all duration-700 hover:shadow-lg group relative
                ${isInView.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}>
                
                <div className="h-1 bg-gradient-to-r from-indigo-400 to-purple-500 w-full transform origin-left 
                  scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg 
                      flex items-center justify-center text-white shadow-lg">
                      {step.icon}
                    </div>
                    <span className="text-lg font-medium text-indigo-200">Step {index + 1}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-indigo-100">{step.description}</p>
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-1 
                    bg-gradient-to-r from-indigo-400 to-transparent z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        data-section="cta" 
        className="py-20 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`max-w-5xl mx-auto bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl 
            p-8 md:p-12 shadow-2xl relative overflow-hidden
            transition-all duration-1000 ${isInView.cta ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute w-64 h-64 rounded-full bg-white/10 top-0 -right-20 animate-blob"></div>
              <div className="absolute w-64 h-64 rounded-full bg-purple-500/10 -bottom-20 -left-20 animate-blob" 
                style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform with AI?</h2>
              <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
                Start your journey to intelligent automation and data-driven decision making today.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button primary className="bg-white text-indigo-700 hover:bg-indigo-50 border-0 shadow-lg px-6">
                  Get Started with AI
                </Button>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6">
                  Book a Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float-particle { 0%, 100% { transform: translate(0, 0); opacity: 0.2; } 50% { transform: translate(10px, -10px); opacity: 0.5; } }
        @keyframes glow { 0%, 100% { filter: drop-shadow(0 0 5px rgba(99, 102, 241, 0.7)); } 50% { filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.9)); } }
        @keyframes orbit { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes orbit-reverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(5px, 5px) scale(1.05); } }
        
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-orbit { animation: orbit 15s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 20s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-blob { animation: blob 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
}