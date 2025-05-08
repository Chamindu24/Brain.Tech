import React, { useState, useEffect } from 'react';
import { 
  Users, Award, Clock, Globe, 
  Target, Lightbulb, Rocket, ChevronRight, ArrowRight, 
  CheckCircle, Briefcase, Medal, Code, Star
} from 'lucide-react';
import { Link } from "react-router-dom";




export default function BrainTechAboutPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animatedElements, setAnimatedElements] = useState({
    hero: false,
    mission: false,
    team: false,
    values: false,
    timeline: false,
    partners: false
  });

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Viewport-based animations
      const viewportHeight = window.innerHeight;
      if (window.scrollY > viewportHeight * 0.05) setAnimatedElements(prev => ({...prev, hero: true}));
      if (window.scrollY > viewportHeight * 0.2) setAnimatedElements(prev => ({...prev, mission: true}));
      if (window.scrollY > viewportHeight * 0.4) setAnimatedElements(prev => ({...prev, values: true}));
      if (window.scrollY > viewportHeight * 0.6) setAnimatedElements(prev => ({...prev, team: true}));
      if (window.scrollY > viewportHeight * 0.7) setAnimatedElements(prev => ({...prev, timeline: true}));
      if (window.scrollY > viewportHeight * 0.8) setAnimatedElements(prev => ({...prev, partners: true}));
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial hero animation
    setTimeout(() => {
      setAnimatedElements(prev => ({...prev, hero: true}));
    }, 300);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for element animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            setAnimatedElements(prev => ({...prev, [sectionId]: true}));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Button component with hover animation
  const Button = ({ children, primary, className, icon }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button 
        className={`${primary 
          ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' 
          : 'bg-white text-gray-800 border border-gray-200'} 
          px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-300 
          hover:shadow-lg relative overflow-hidden
          flex items-center justify-center gap-2 w-full sm:w-auto ${className}`}
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

  // Company values data
  const values = [
    { icon: <Lightbulb className="text-indigo-500" size={28} />, title: "Innovation", description: "We push boundaries and explore new technologies to deliver cutting-edge solutions." },
    { icon: <Target className="text-indigo-500" size={28} />, title: "Excellence", description: "We strive for perfection in every line of code and every client interaction." },
    { icon: <Users className="text-indigo-500" size={28} />, title: "Collaboration", description: "We believe great ideas come from diverse teams working together toward a common goal." },
    { icon: <Globe className="text-indigo-500" size={28} />, title: "Integrity", description: "We build trust through honest communication and ethical business practices." }
  ];

  // Team members data
  const team = [
    { 
      name: "Elizabeth Chen", 
      role: "CEO & Founder", 
      image: "/team/elizabeth.jpg",
      bio: "Elizabeth founded BrainTech with a vision to democratize AI technology for businesses of all sizes."
    },
    { 
      name: "David Wilson", 
      role: "CTO", 
      image: "/team/david.jpg",
      bio: "With 15+ years in software architecture, David leads our technical direction and innovation strategy."
    },
    { 
      name: "Michael Rodriguez", 
      role: "Head of AI Research", 
      image: "/team/michael.jpg",
      bio: "Michael combines academic expertise with practical implementation to develop our AI solutions."
    },
    { 
      name: "Sophia Jackson", 
      role: "Director of Operations", 
      image: "/team/sophia.jpg",
      bio: "Sophia ensures our delivery processes run smoothly while maintaining our high quality standards."
    }
  ];

  // Company timeline data
  const timeline = [
    { year: "2016", title: "Founded", description: "BrainTech was founded with the mission to bring AI-powered solutions to businesses." },
    { year: "2018", title: "First Major Product", description: "Launched our flagship AI integration platform serving clients across industries." },
    { year: "2020", title: "Global Expansion", description: "Expanded operations to Europe and Asia with offices in London and Singapore." },
    { year: "2022", title: "Research Breakthrough", description: "Developed proprietary algorithm improving ML model efficiency by 40%." },
    { year: "2024", title: "Strategic Growth", description: "Doubled our team size and launched advanced analytics platform for enterprise clients." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white overflow-hidden">
        {/* Improved animated background with particles */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-indigo-800/80 to-blue-900/90"></div>
          
          {/* Neural network pattern - connected dots */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div key={i} 
                className="absolute rounded-full bg-indigo-400 opacity-10"
                style={{
                  width: `${Math.random() * 150 + 50}px`,
                  height: `${Math.random() * 150 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
            
            {/* Small particles */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <div key={`particle-${i}`} 
                  className="absolute rounded-full bg-blue-200 opacity-30"
                  style={{
                    width: '4px',
                    height: '4px',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `particle ${Math.random() * 20 + 10}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>
            
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="rgb(147, 197, 253)" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {[...Array(10)].map((_, i) => (
                <line 
                  key={`line-${i}`}
                  x1={`${Math.random() * 100}%`} 
                  y1={`${Math.random() * 100}%`} 
                  x2={`${Math.random() * 100}%`} 
                  y2={`${Math.random() * 100}%`} 
                  stroke="url(#lineGradient)" 
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Animated navigation/mini-menu */}
          <div className={`fixed top-0 left-0 w-full py-4 bg-indigo-900/80 backdrop-blur-md z-50 transition-all duration-500 ${scrollPosition > 100 ? 'shadow-lg' : ''}`}>
            <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Code size={18} className="text-white" />
                </div>
                <span className="text-white font-bold text-lg"></span>
              </div>
              
              
              <div>
                
              </div>
            </div>
          </div>
          
          <div className={`text-center max-w-4xl mx-auto pt-16 md:pt-24 transition-all duration-1000 
            ${animatedElements.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <span className="inline-block px-4 py-1 bg-indigo-700/50 text-indigo-200 rounded-full text-sm font-medium mb-6 border border-indigo-500/30">
                About BrainTech
              </span>
            </div>
            
            {/* Improved heading with animated gradient text */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Pioneering the Future of 
              <div className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 animate-gradient-text ml-2">
                  Intelligent Technology
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-70"></span>
              </div>
            </h1>
            
            {/* Improved subheading */}
            <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform businesses through the power of artificial intelligence and 
              advanced software solutions that drive innovation and growth.
            </p>
            
            {/* CTAs with animation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/AISolutions">
              <Button primary className="group bg-white text-indigo-700 hover:bg-indigo-50 border-0">
              <span>Explore Our Solutions</span>
               <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
                </Link>
              <Button className="bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/60">
                <Star size={16} className="mr-1" />
                <span>Our Success Stories</span>
              </Button>
            </div>
            
            {/* Animated statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
  <div className="bg-cyan-900/20 backdrop-blur-md rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-300 transition-all duration-300 group">
    <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">200+</div>
    <div className="text-cyan-200">Clients Worldwide</div>
  </div>
  <div className="bg-cyan-900/20 backdrop-blur-md rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-300 transition-all duration-300 group">
    <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">8</div>
    <div className="text-cyan-200">Years of Excellence</div>
  </div>
  <div className="bg-cyan-900/20 backdrop-blur-md rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-300 transition-all duration-300 group">
    <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">50+</div>
    <div className="text-cyan-200">AI Experts</div>
  </div>


            </div>
          </div>
        </div>
        
        {/* Improved wave effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L40,149.3C80,139,160,117,240,128C320,139,400,181,480,181.3C560,181,640,139,720,128C800,117,880,139,960,165.3C1040,192,1120,224,1200,224C1280,224,1360,192,1400,176L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className={`w-full md:w-1/2 transition-all duration-1000 
              ${animatedElements.mission ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="relative">
                <div className="w-full h-64 md:h-96 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 
                  rounded-2xl flex items-center justify-center overflow-hidden relative shadow-xl">
                  
                  {/* Animated dots grid */}
                  <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-4 p-4">
                    {[...Array(96)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-2 h-2 bg-indigo-500 rounded-full opacity-40"
                        style={{
                          animation: `pulse 3s ease-in-out infinite`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Central element */}
                  <div className="relative z-10 p-6 bg-white/90 rounded-xl shadow-lg max-w-md">
                    <h3 className="text-2xl font-bold text-indigo-800 mb-4">Our Mission</h3>
                    <p className="text-gray-700">
                      At BrainTech, we're committed to democratizing artificial intelligence and making advanced 
                      technology accessible to businesses of all sizes. Our mission is to empower organizations
                      through intelligent software solutions that drive growth, efficiency, and innovation.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100 rounded-2xl -z-10 blur-sm"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100 rounded-2xl -z-10 blur-sm"></div>
              </div>
            </div>
            
            <div className={`w-full md:w-1/2 transition-all duration-1000 delay-200 
              ${animatedElements.mission ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforming Business Through Technology</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2016, BrainTech has grown from a small startup into a global technology 
                leader with offices across three continents. We've helped hundreds of businesses
                harness the power of AI and custom software solutions to overcome challenges and
                achieve their goals.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of experts combines deep technical knowledge with industry expertise to
                deliver solutions that make a real difference. From AI integration to custom software
                development, we're committed to excellence in everything we do.
              </p>
              <Button primary className="group">
                Our Approach
                <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-16 md:py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 
            ${animatedElements.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Principles That Guide Us</h2>
            <p className="text-lg text-gray-600">
              These core values define our culture and drive every decision we make.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 
                ${animatedElements.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
                  border border-gray-100 hover:border-indigo-100 h-full group">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 
                    group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-indigo-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 
            ${animatedElements.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet The Experts</h2>
            <p className="text-lg text-gray-600">
              Our talented team brings together diverse expertise to drive innovation and excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 
                ${animatedElements.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
                  group overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-indigo-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-indigo-500 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                  <div className="h-1 w-0 bg-gradient-to-r from-indigo-600 to-blue-500 group-hover:w-full transition-all duration-700"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`mt-12 text-center transition-all duration-700 delay-500
            ${animatedElements.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <Button primary className="group">
              Join Our Team
              <Briefcase size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-16 md:py-24 bg-gradient-to-br from-indigo-900 to-blue-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} 
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 15}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 
            ${animatedElements.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-3 py-1 bg-indigo-700/50 text-indigo-200 rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Milestones & Growth</h2>
            <p className="text-lg text-indigo-100">
              The key moments that have shaped our company's evolution and success.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-indigo-400/30 rounded-full"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-700 
                  ${animatedElements.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:order-last'}`}>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 
                      transition-all duration-300 hover:transform hover:scale-105">
                      <div className="text-indigo-300 text-sm font-medium mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                      <p className="text-indigo-100">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 w-12 h-12 rounded-full bg-indigo-600 border-4 border-indigo-900 flex 
                    items-center justify-center">
                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-20"></div>
                    <Clock size={20} className="text-white" />
                  </div>
                  
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-last' : 'md:text-right'} md:block hidden`}>
                    {/* Empty div to maintain layout */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 
            ${animatedElements.partners ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
              Our Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted By Industry Leaders</h2>
            <p className="text-lg text-gray-600">
              We collaborate with forward-thinking organizations to drive innovation across industries.
            </p>
          </div>
          
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 transition-all duration-700
            ${animatedElements.partners ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Partner logos */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center justify-center" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="bg-gray-100 rounded-lg w-full h-24 flex items-center justify-center 
                  hover:bg-indigo-50 transition-colors p-4 group">
                  <div className="text-gray-400 group-hover:text-indigo-500 transition-colors flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-bold text-lg">Partner {index + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-600 to-blue-700 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} 
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 15}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl text-indigo-100 mb-8">
              Let's discuss how BrainTech's intelligent solutions can address your unique challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button primary className="bg-white text-indigo-700 hover:bg-indigo-50 border-0">
                Get Started Now
              </Button>
              <Button className="bg-transparent border border-white text-white hover:bg-white/10">
                Schedule a Meeting
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Global animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes particle {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translate(100px, -100px); opacity: 0; }
        }
        
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 4s linear infinite;
        }
      `}</style>
    </div>
  );
}