import React, { useState, useEffect, useRef } from 'react';
import {
  Code, Monitor, Zap, Github,
  Globe, Database, Layers, ArrowRight,
  BarChart, Smartphone, Shield,
  Users, Settings, Cloud, Package, CheckCircle
} from 'lucide-react';

export default function SoftwareDevelopment() {
  const [isInView, setIsInView] = useState({
    hero: false,
    features: false,
    capabilities: false,
    workflow: false,
    cta: false
  });
  
  // Observer refs for each section
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const workflowRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Set up Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(prev => ({...prev, [entry.target.dataset.section]: true}));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section refs
    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (capabilitiesRef.current) observer.observe(capabilitiesRef.current);
    if (workflowRef.current) observer.observe(workflowRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    // Auto-trigger hero animation after load
    setTimeout(() => {
      setIsInView(prev => ({...prev, hero: true}));
    }, 300);
    
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (capabilitiesRef.current) observer.unobserve(capabilitiesRef.current);
      if (workflowRef.current) observer.unobserve(workflowRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);
  
  // Enhanced Button component with improved animations
  const Button = ({ children, primary, className, icon }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button 
        className={`${primary 
          ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white' 
          : 'bg-white/10 backdrop-blur text-white border border-white/20'} 
          px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 
          hover:shadow-xl relative overflow-hidden
          flex items-center justify-center gap-2 w-full sm:w-auto ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="relative z-10 flex items-center gap-2">
          {icon && <span className="text-current">{icon}</span>}
          {children}
          {primary && (
            <ArrowRight size={18} className={`transition-transform duration-500 ${isHovered ? 'translate-x-1' : ''}`} />
          )}
        </span>
        <span className={`absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 
          transition-all duration-500 ${primary ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-0'}`}></span>
      </button>
    );
  };

  // Software Development features with icons and descriptions
  const features = [
    { 
      icon: <Code size={36} />, 
      title: "Custom Software Development", 
      description: "Tailor-made software solutions designed to address your specific business challenges and requirements." 
    },
    { 
      icon: <Globe size={36} />, 
      title: "Web Applications", 
      description: "Powerful, scalable web applications with intuitive interfaces and robust backend systems." 
    },
    { 
      icon: <Smartphone size={36} />, 
      title: "Mobile Development", 
      description: "Native and cross-platform mobile applications that deliver seamless experiences across devices." 
    },
    { 
      icon: <Cloud size={36} />, 
      title: "Cloud Solutions", 
      description: "Leverage cloud technologies for scalable, reliable, and cost-effective software infrastructure." 
    },
    { 
      icon: <Settings size={36} />, 
      title: "System Integration", 
      description: "Connect and unify disparate systems to enable smooth data flow across your organization." 
    },
    { 
      icon: <Shield size={36} />, 
      title: "Secure Development", 
      description: "Enterprise-grade security protocols integrated throughout the development lifecycle." 
    }
  ];
  
  // Development workflow steps
  const workflowSteps = [
    {
      icon: <Users size={28} />,
      title: "Discovery & Planning",
      description: "We analyze your requirements and create a comprehensive development roadmap aligned with your business objectives."
    },
    {
      icon: <Code size={28} />,
      title: "Design & Development",
      description: "Our expert developers build your solution using industry best practices and cutting-edge technologies."
    },
    {
      icon: <BarChart size={28} />,
      title: "Testing & Quality Assurance",
      description: "Rigorous testing ensures your software meets the highest quality standards and performance benchmarks."
    },
    {
      icon: <Layers size={28} />,
      title: "Deployment & Support",
      description: "Seamless deployment followed by ongoing maintenance and evolutionary enhancements to your software."
    }
  ];

  // Development capability metrics
  const capabilities = [
    { title: "100% Custom", desc: "Tailored solutions", icon: <Settings size={24} /> },
    { title: "50% Faster Delivery", desc: "Agile methodology", icon: <Zap size={24} /> },
    { title: "99.9% Reliability", desc: "Enterprise-grade", icon: <Shield size={24} /> },
    { title: "24/7 Support", desc: "Continuous assistance", icon: <Users size={24} /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 overflow-hidden">
      {/* Hero Section with improved mobile responsiveness */}
      <section 
        ref={heroRef} 
        data-section="hero" 
        className="pt-20 pb-20 lg:py-0 min-h-screen flex items-center relative bg-gradient-to-br from-violet-900 via-blue-900 to-indigo-900 text-white overflow-hidden"
      >
        {/* Abstract background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-purple-500/10 top-1/4 -left-36 md:-left-48"></div>
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-blue-500/10 bottom-1/4 -right-36 md:-right-48"></div>
          <div className="absolute w-full h-full bg-gradient-to-b from-black/0 via-black/0 to-black/20"></div>
          
          {/* Animated particles with better distribution */}
          {[...Array(30)].map((_, i) => (
            <div key={i} 
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full opacity-20"
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
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16 lg:gap-20">
            <div className={`w-full lg:w-1/2 transition-all duration-1000 ease-out
              ${isInView.hero ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div>
                <span className="inline-flex items-center px-4 py-1 bg-violet-700/30 text-violet-200 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Enterprise Software Solutions
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-200 to-indigo-300 
                  animate-gradient-x inline-block">Custom Software</span>{" "}
                <span className="relative">
                  Development
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded"></span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-xl">
                Transform your business with custom-built software solutions designed
                to optimize workflows, enhance productivity, and drive growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button primary className="shadow-lg shadow-purple-600/20" icon={<Code size={18} />}>
                  Explore Solutions
                </Button>
                <Button className="hover:bg-white/20">
                  Request Consultation
                </Button>
              </div>
            </div>
            
            <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 
              ${isInView.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="w-full h-64 sm:h-80 md:h-96 
                  bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm 
                  rounded-2xl flex items-center justify-center overflow-hidden relative
                  border border-white/10 shadow-2xl">
                  
                  {/* Improved glowing orbs background */}
                  <div className="absolute w-40 h-40 bg-violet-500/30 rounded-full filter blur-3xl top-1/4 left-1/4 animate-pulse-slow"></div>
                  <div className="absolute w-40 h-40 bg-blue-500/30 rounded-full filter blur-3xl bottom-1/4 right-1/4 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
                  
                  {/* 3D Code Animation with enhanced visuals */}
                  <div className="relative w-64 h-64 animate-float-slow">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code size={100} className="text-white animate-glow" />
                    </div>
                    
                    {/* Improved orbital rings with 3D effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-56 h-56 border-2 border-purple-300/30 rounded-full animate-orbit perspective-element"
                        style={{animationDuration: '15s'}}></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-72 h-40 border border-blue-300/20 rounded-full animate-orbit-reverse perspective-element" 
                        style={{animationDuration: '20s'}}></div>
                    </div>
                    
                    {/* Enhanced floating icons with frosted glass effect */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 
                      bg-purple-600/90 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center animate-float
                      shadow-glow-purple"
                      style={{animationDelay: '0.5s'}}>
                      <Globe size={20} className="text-white" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 
                      bg-blue-600/90 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center animate-float
                      shadow-glow-blue"
                      style={{animationDelay: '1.5s'}}>
                      <Database size={20} className="text-white" />
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-x-4 -translate-y-1/2 
                      bg-indigo-600/90 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center animate-float
                      shadow-glow-indigo"
                      style={{animationDelay: '1s'}}>
                      <Github size={20} className="text-white" />
                    </div>
                    <div className="absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2 
                      bg-violet-500/90 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center animate-float
                      shadow-glow-violet"
                      style={{animationDelay: '2s'}}>
                      <Smartphone size={20} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Improved floating badges with glass morphism */}
                  <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md rounded-lg p-3 
                    shadow-lg flex items-center gap-2 animate-float-badge">
                    <Package size={20} className="text-blue-500" />
                    <span className="font-medium text-sm">Scalable Architecture</span>
                  </div>
                  <div className="absolute top-6 left-6 bg-purple-600/80 backdrop-blur-md rounded-lg p-3 
                    shadow-lg flex items-center gap-2 animate-float-badge-alt">
                    <Code size={20} className="text-white" />
                    <span className="font-medium text-sm text-white">Clean Code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with improved card design */}
      <section 
        ref={featuresRef}
        data-section="features" 
        className="py-20 md:py-28 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 
            ${isInView.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-4 py-1 bg-violet-100 text-violet-600 rounded-full text-sm font-medium mb-4">
              Our Development Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Custom Software Solutions</h2>
            <p className="text-lg text-gray-600">
              End-to-end development services tailored to your unique business requirements and technical specifications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 bg-gradient-to-br from-white to-violet-50/50
                rounded-xl border border-violet-100/50 overflow-hidden shadow-sm hover:shadow-lg
                group hover:-translate-y-1 hover:border-violet-200/70
                ${isInView.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <div className="flex-shrink-0 mb-6 w-14 h-14 bg-violet-100 rounded-lg flex items-center justify-center
                    group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-blue-500 transition-colors duration-300 
                    text-violet-600 group-hover:text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-violet-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    {feature.description}
                  </p>
                  
                  {/* Animated indicator on hover */}
                  <div className="mt-6 flex items-center text-violet-600 font-medium opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 transform translate-x-0 group-hover:translate-x-2">
                    <span>Learn more</span>
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section with improved mobile layout */}
      <section 
        ref={capabilitiesRef}
        data-section="capabilities" 
        className="py-20 md:py-28 bg-gradient-to-b from-violet-50 to-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transition-all duration-700
            ${isInView.capabilities ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="bg-gradient-to-br from-violet-600 to-blue-700 p-1 rounded-2xl shadow-xl">
                <div className="bg-white rounded-xl p-6 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {capabilities.map((item, idx) => (
                      <div key={idx} className="flex flex-col p-5 bg-violet-50 rounded-lg hover:bg-violet-100 
                        transition-all duration-300 border border-violet-100 hover:border-violet-200 group
                        hover:shadow-md hover:-translate-y-1">
                        <div className="flex items-center mb-3">
                          <div className="mr-3 text-violet-700">
                            {item.icon}
                          </div>
                          <h3 className="font-bold text-xl text-violet-700">{item.title}</h3>
                        </div>
                        <p className="text-gray-600">{item.desc}</p>
                        
                        {/* Improved animated accent line */}
                        <div className="w-12 h-1 bg-gradient-to-r from-violet-400 to-blue-500 rounded mt-4 
                          group-hover:w-24 transition-all duration-500"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <span className="inline-block px-4 py-1 bg-violet-100 text-violet-600 rounded-full 
                text-sm font-medium mb-4">
                Business Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Custom Software?</h2>
              <p className="text-lg text-gray-600 mb-6">
                In today's competitive landscape, custom software delivers transformative advantages
                by tailoring solutions precisely to your unique business processes and objectives.
              </p>
              
              <div className="space-y-5 mb-8">
                {[
                  "Automate complex business processes to increase efficiency",
                  "Improve operational agility and adaptability to market changes", 
                  "Enhance customer experiences with intuitive interfaces",
                  "Gain competitive advantage with proprietary solutions"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-violet-500 to-blue-600 
                      rounded-full flex items-center justify-center text-white mt-1 mr-3 
                      group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle size={12} strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-violet-700 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button primary className="shadow-lg shadow-violet-600/20">
                Discover Software Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Workflow with improved visual flow */}
      <section 
        ref={workflowRef}
        data-section="workflow" 
        className="py-20 md:py-28 bg-gradient-to-br from-violet-900 to-blue-900 text-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 
            ${isInView.workflow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-4 py-1 bg-violet-700/50 text-violet-200 rounded-full text-sm font-medium mb-4">
              Our Development Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Software Development Lifecycle</h2>
            <p className="text-lg text-violet-100">
              Our structured approach delivers high-quality software solutions through these key development phases.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {workflowSteps.map((step, index) => (
              <div key={index} 
                className={`bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden
                transition-all duration-700 hover:transform hover:scale-105 group relative
                ${isInView.workflow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}>
                
                {/* Progress indicator */}
                <div className="h-1 bg-gradient-to-r from-violet-400 to-blue-500 w-full transform origin-left 
                  scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl 
                      flex items-center justify-center text-white shadow-lg relative z-10">
                      {step.icon}
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                        -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 
                        group-hover:opacity-100"></div>
                    </div>
                    <span className="text-lg font-medium text-violet-200">Phase {index + 1}</span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-violet-100">{step.description}</p>
                </div>
                
                {/* Connection line between steps (visible on desktop) */}
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-1 
                    bg-gradient-to-r from-violet-400 to-transparent z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with improved mobile experience */}
      <section 
        ref={ctaRef}
        data-section="cta" 
        className="py-20 md:py-28 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`max-w-5xl mx-auto bg-gradient-to-br from-violet-600 via-blue-600 to-indigo-600 rounded-2xl 
            p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden
            transition-all duration-1000 ${isInView.cta ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            
            {/* Enhanced animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute w-64 h-64 rounded-full bg-white/10 top-0 -right-20 animate-blob"></div>
              <div className="absolute w-64 h-64 rounded-full bg-blue-500/10 -bottom-20 -left-20 animate-blob" 
                style={{animationDelay: '2s'}}></div>
              <div className="absolute w-64 h-64 rounded-full bg-violet-500/10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-blob"
                style={{animationDelay: '4s'}}></div>
                
              {/* Added subtle particle effect */}
              {[...Array(15)].map((_, i) => (
                <div key={i} 
                  className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float-cta-particle ${Math.random() * 8 + 8}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">Ready for Custom Software?</h2>
              <p className="text-lg md:text-xl lg:text-2xl text-violet-100 mb-10 max-w-3xl mx-auto">
                Let's build the perfect software solution that elevates your business capabilities and drives innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button primary className="bg-white text-violet-700 hover:bg-violet-50 border-0 shadow-lg px-8 py-4 text-lg">
                  Start Your Project
                </Button>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced keyframe animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(10px, -10px); opacity: 0.5; }
        }
        
        @keyframes float-cta-particle {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(10px, -10px); opacity: 0.6; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(10px, -10px); opacity: 0.5; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(10px, -10px); opacity: 0.5; }
        }
        
        @keyframes float-badge {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        
        @keyframes float-badge-alt {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(147, 51, 234, 0.7)); }
          50% { filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.9)); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes orbit-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -10px) scale(1.05); }
          50% { transform: translate(0, 10px) scale(1); }
          75% { transform: translate(-10px, -5px) scale(0.95); }
        }
        
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 6s ease infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-orbit {
          animation: orbit 15s linear infinite;
        }
        
        .animate-orbit-reverse {
          animation: orbit-reverse 20s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        .animate-float-badge {
          animation: float-badge 5s ease-in-out infinite;
        }
        
        .animate-float-badge-alt {
          animation: float-badge-alt 7s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}