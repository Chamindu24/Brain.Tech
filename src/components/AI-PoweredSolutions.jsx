import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, Shield, TrendingUp, Zap, Database, 
  Brain, Code, BarChart, Settings, ChevronRight, 
  CheckCircle, Users, ArrowRight, PieChart
} from 'lucide-react';

export default function AIPoweredSolutions() {
  // State for animations and interactions
  const [animatedElements, setAnimatedElements] = useState({
    header: false,
    intro: false,
    solutions: false,
    features: false,
    cta: false
  });
  const [activeTab, setActiveTab] = useState(0);
  const [isHoveringCard, setIsHoveringCard] = useState(null);
  const solutionsRef = useRef(null);

  // Solution cards data
  const solutionCards = [
    {
      icon: <Brain />,
      title: "Machine Learning Solutions",
      description: "Implement custom ML models that adapt to your business needs and evolve with your data.",
      color: "from-purple-600 to-indigo-600",
      stats: [
        { value: "95%", label: "Accuracy" },
        { value: "3x", label: "Faster Process" }
      ]
    },
    {
      icon: <Database />,
      title: "Advanced Data Analytics",
      description: "Transform raw data into actionable insights with our intelligent analytics platform.",
      color: "from-teal-500 to-emerald-500",
      stats: [
        { value: "87%", label: "Pattern Detection" },
        { value: "62%", label: "Cost Reduction" }
      ]
    },
    {
      icon: <Shield />,
      title: "AI Security Systems",
      description: "Protect your digital assets with intelligent threat detection and prevention.",
      color: "from-red-500 to-pink-600",
      stats: [
        { value: "99.8%", label: "Threat Detection" },
        { value: "24/7", label: "Monitoring" }
      ]
    },
    {
      icon: <Cpu />,
      title: "Intelligent Automation",
      description: "Streamline operations with smart workflow automation powered by AI algorithms.",
      color: "from-amber-500 to-orange-600",
      stats: [
        { value: "74%", label: "Time Saved" },
        { value: "5x", label: "ROI" }
      ]
    }
  ];

  // Feature tabs data
  const featureTabs = [
    {
      title: "Neural Networks",
      icon: <TrendingUp size={20} />,
      content: {
        heading: "Advanced Neural Networks",
        description: "Our deep learning models use multi-layered neural networks that mimic human brain function, delivering unparalleled pattern recognition and prediction capabilities.",
        features: [
          "Deep learning architecture",
          "Supervised and unsupervised learning",
          "Transfer learning capabilities",
          "Continuous model improvement"
        ],
        image: "neural-networks.svg"
      }
    },
    {
      title: "Natural Language",
      icon: <Code size={20} />,
      content: {
        heading: "Natural Language Processing",
        description: "Transform how your business handles text and speech with our cutting-edge NLP solutions that understand context, sentiment, and intent.",
        features: [
          "Sentiment analysis",
          "Entity extraction",
          "Language translation",
          "Conversational AI"
        ],
        image: "nlp-solution.svg"
      }
    },
    {
      title: "Predictive Analytics",
      icon: <BarChart size={20} />,
      content: {
        heading: "Predictive Analytics Engine",
        description: "Leverage historical data to forecast future trends and make data-driven decisions with our predictive modeling tools.",
        features: [
          "Time series analysis",
          "Regression modeling",
          "Anomaly detection",
          "Scenario planning"
        ],
        image: "predictive-analytics.svg"
      }
    },
    {
      title: "Computer Vision",
      icon: <Zap size={20} />,
      content: {
        heading: "Computer Vision Systems",
        description: "Our CV solutions enable machines to interpret visual information from the world, automating visual tasks and extracting insights from images and video.",
        features: [
          "Object detection & recognition",
          "Image classification",
          "Video analytics",
          "Optical character recognition"
        ],
        image: "computer-vision.svg"
      }
    }
  ];

  // Metrics data for visualization
  const metricsData = [
    { name: 'Efficiency', value: 85 },
    { name: 'Accuracy', value: 92 },
    { name: 'Cost Savings', value: 78 },
    { name: 'User Satisfaction', value: 90 }
  ];

  // Button component with hover animation
  const Button = ({ children, primary, className, icon, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button 
        onClick={onClick}
        className={`${primary 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
          : 'bg-white text-gray-800 border border-gray-200'} 
          px-6 py-3 rounded-lg font-medium transition-all duration-300 
          hover:shadow-lg relative overflow-hidden
          flex items-center justify-center gap-2 w-full sm:w-auto ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon || (primary && <ArrowRight size={16} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />)}
        </span>
        <span className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-300 
          ${primary ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-0'}`}></span>
      </button>
    );
  };

  // Circle Progress component for metrics visualization
  const CircleProgress = ({ percentage, size = 100, strokeWidth = 8, color = 'purple' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
    
    const colorClasses = {
      purple: "stroke-purple-600",
      teal: "stroke-teal-500",
      blue: "stroke-blue-600",
      amber: "stroke-amber-500"
    };
    
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="#e5e7eb"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-1000 ease-out ${colorClasses[color]}`}
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-xl font-bold">{percentage}%</span>
        </div>
      </div>
    );
  };

  // Intersection Observer for element animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId === 'ai-solutions') {
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, header: true}));
            }, 100);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, intro: true}));
            }, 300);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, solutions: true}));
            }, 600);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, features: true}));
            }, 900);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, cta: true}));
            }, 1200);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const aiSolutionsSection = document.getElementById('ai-solutions');
    if (aiSolutionsSection) {
      observer.observe(aiSolutionsSection);
    }

    return () => {
      if (aiSolutionsSection) {
        observer.unobserve(aiSolutionsSection);
      }
    };
  }, []);

  return (
    <div id="ai-solutions" className="overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-20 lg:py-28 relative">
        {/* Animated particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} 
              className="absolute rounded-full bg-white opacity-5 animate-float-particle"
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 15 + 15}s`,
                animationDelay: `${Math.random() * 10}s`
              }}
            ></div>
          ))}
          
          {/* Neural network grid */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="col-span-1 border-r border-white/30 h-full"></div>
            ))}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="row-span-1 border-b border-white/30 w-full"></div>
            ))}
            
            {/* Neural network nodes */}
            {[...Array(15)].map((_, i) => {
              const x = 8 + Math.floor(Math.random() * 84);
              const y = 8 + Math.floor(Math.random() * 84);
              return (
                <div key={i} 
                  className="absolute w-2 h-2 bg-white rounded-full animate-pulse-slow"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    opacity: 0.4
                  }}
                ></div>
              );
            })}
            
            {/* Neural network connections */}
            {[...Array(10)].map((_, i) => {
              const x1 = 10 + Math.floor(Math.random() * 80);
              const y1 = 10 + Math.floor(Math.random() * 80);
              const x2 = 10 + Math.floor(Math.random() * 80);
              const y2 = 10 + Math.floor(Math.random() * 80);
              return (
                <svg key={i} className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
                  <line 
                    x1={`${x1}%`} 
                    y1={`${y1}%`} 
                    x2={`${x2}%`} 
                    y2={`${y2}%`} 
                    stroke="white" 
                    strokeWidth="1"
                    strokeDasharray="3,3"
                    className="animate-dash-slow"
                    style={{ animationDelay: `${Math.random() * 5}s` }}
                  />
                </svg>
              );
            })}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 
            ${animatedElements.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="inline-block">
                Transforming Business with 
                <span className="relative">
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                    {" AI-Powered"}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-500/20 rounded-full transform translate-y-1"></span>
                </span>
                {" Solutions"}
              </span>
            </h1>
            
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Leverage the power of artificial intelligence to solve complex business challenges,
              automate processes, and drive innovation at scale.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button primary className="shadow-xl shadow-purple-900/20">
                Explore AI Solutions
              </Button>
              
              <Button className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path 
              fill="#f9fafb" 
              fillOpacity="1" 
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 
            ${animatedElements.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Left column with text content */}
            <div>
              <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                Next-Gen AI Solutions
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Harness the Power of Artificial Intelligence for Your Business
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Our AI-powered solutions combine cutting-edge machine learning algorithms, 
                neural networks, and data analytics to deliver transformative results that 
                drive growth, efficiency, and innovation.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: <CheckCircle size={20} className="text-purple-600" />, text: "Customized AI solutions tailored to your specific business challenges" },
                  { icon: <CheckCircle size={20} className="text-purple-600" />, text: "Seamless integration with your existing systems and workflows" },
                  { icon: <CheckCircle size={20} className="text-purple-600" />, text: "Continuous learning models that improve over time" },
                  { icon: <CheckCircle size={20} className="text-purple-600" />, text: "Data-driven insights for informed decision making" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">{item.icon}</div>
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <Button primary>Discover Our Approach</Button>
            </div>
            
            {/* Right column with metrics visualization */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6">
              <h3 className="text-xl font-semibold mb-6 text-center">AI Implementation Results</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {metricsData.map((metric, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <CircleProgress 
                      percentage={metric.value} 
                      color={['purple', 'teal', 'blue', 'amber'][index % 4]} 
                    />
                    <h4 className="mt-3 text-gray-800 font-medium">{metric.name}</h4>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-800">Results you can measure</h4>
                    <p className="text-sm text-gray-600">
                      Our AI solutions deliver quantifiable improvements across your organization,
                      with an average ROI of 300% within the first year of implementation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Solutions Cards */}
      <section ref={solutionsRef} className="py-16 md:py-24 bg-gray-50 relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-100/50 to-blue-100/50 rounded-full blur-3xl opacity-60 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-teal-100/50 to-green-100/50 rounded-full blur-3xl opacity-60 transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 
            ${animatedElements.solutions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              Our Core Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Intelligent Solutions for Modern Challenges
            </h2>
            <p className="text-lg text-gray-600">
              From predictive analytics to natural language processing, our AI solutions address
              your most pressing business needs with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {solutionCards.map((card, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-700 delay-${index * 100} transform hover:-translate-y-2
                  ${animatedElements.solutions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                onMouseEnter={() => setIsHoveringCard(index)}
                onMouseLeave={() => setIsHoveringCard(null)}
              >
                <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center mb-4">
                    <div className={`text-gradient-to-r ${card.color}`}>
                      {React.cloneElement(card.icon, { 
                        size: 24, 
                        className: isHoveringCard === index 
                          ? 'transform scale-110 transition-transform duration-300' 
                          : 'transition-transform duration-300'
                      })}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-600 mb-6">{card.description}</p>
                  
                  {/* Stats display */}
                  <div className="flex items-center justify-between mb-4">
                    {card.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${card.color}`}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-2">
                    <a href="#" className="flex items-center text-sm font-medium text-purple-700 hover:text-purple-800 transition-colors">
                      Learn more <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Tabs Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 
            ${animatedElements.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              Core Technologies
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Cutting-Edge AI Technologies
            </h2>
            <p className="text-lg text-gray-600">
              Our solutions are built on innovative AI technologies that deliver tangible business outcomes.
            </p>
          </div>
          
          <div className={`transition-all duration-1000 delay-200
            ${animatedElements.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Feature Tabs Navigation */}
            <div className="flex flex-wrap justify-center mb-8 gap-2">
              {featureTabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
                    ${activeTab === index 
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-200' 
                      : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'}`}
                >
                  {tab.icon}
                  <span>{tab.title}</span>
                </button>
              ))}
            </div>
            
            {/* Feature Tab Content */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-50 rounded-full opacity-50 blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-purple-800">{featureTabs[activeTab].content.heading}</h3>
                    <p className="text-gray-600 mb-6">{featureTabs[activeTab].content.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {featureTabs[activeTab].content.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="p-1 bg-green-100 rounded-full mt-1">
                            <CheckCircle size={16} className="text-green-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button primary>
                      Explore {featureTabs[activeTab].title} Solutions
                    </Button>
                  </div>
                  
                  {/* Illustration */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 flex items-center justify-center relative overflow-hidden">
                    {/* Placeholder for illustration - animated neural network */}
                    <div className="relative w-full aspect-square max-w-xs">
                      {/* Central node */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg z-10">
                        {React.cloneElement(featureTabs[activeTab].icon, { size: 32, className: "text-white" })}
                      </div>
                      
                      {/* Orbiting nodes */}
                      {[...Array(5)].map((_, i) => {
                        const angle = (i * 72) + (activeTab * 15);
                        const delay = i * 0.2;
                        return (
                          <div key={i} 
                            className="absolute w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
                            style={{
                              top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 35}%)`,
                              left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 35}%)`,
                              transform: 'translate(-50%, -50%)',
                              animation: `pulse-scale 3s ease-in-out infinite`,
                              animationDelay: `${delay}s`
                            }}
                          >
                            <div className="text-purple-600">
                              {[<Database size={18} />, <Users size={18} />, <PieChart size={18} />, <Settings size={18} />, <Brain size={18} />][i]}
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Connection lines */}
                      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
                        {[...Array(5)].map((_, i) => {
                          const angle = (i * 72) + (activeTab * 15);
                          const x2 = 50 + Math.cos(angle * Math.PI / 180) * 35;
                          const y2 = 50 + Math.sin(angle * Math.PI / 180) * 35;
                          return (
                            <line 
                              key={i} 
                              x1="50%" 
                              y1="50%" 
                              x2={`${x2}%`} 
                              y2={`${y2}%`} 
                              stroke="url(#purpleGradient)" 
                              strokeWidth="2"
                              strokeDasharray="4,4" 
                              className="animate-dash" 
                              style={{ animationDelay: `${i * 0.2}s` }}
                            />
                          );
                        })}
                        <defs>
                          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#9333ea" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      {/* Pulse animation around central node */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-purple-400 animate-ping opacity-20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-16 md:py-24 bg-gray-50 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid pattern background */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 opacity-20">
            {[...Array(60)].map((_, i) => (
              <div key={i} className="border border-gray-200"></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 
            ${animatedElements.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              Industry Applications
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              AI Solutions Across Industries
            </h2>
            <p className="text-lg text-gray-600">
              See how our AI technologies are driving transformation across diverse industry sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Healthcare & Life Sciences",
                description: "Predictive diagnostics, patient monitoring, and personalized treatment plans.",
                icon: <Users />,
                color: "from-blue-600 to-indigo-600"
              },
              {
                title: "Finance & Banking",
                description: "Fraud detection, risk assessment, and automated trading systems.",
                icon: <BarChart />,
                color: "from-green-600 to-teal-600"
              },
              {
                title: "Manufacturing",
                description: "Predictive maintenance, quality control, and production optimization.",
                icon: <Settings />,
                color: "from-orange-600 to-amber-600"
              },
              {
                title: "Retail & E-commerce",
                description: "Inventory forecasting, personalized recommendations, and demand prediction.",
                icon: <TrendingUp />,
                color: "from-red-600 to-pink-600"
              },
              {
                title: "Telecommunications",
                description: "Network optimization, customer churn prediction, and service personalization.",
                icon: <Zap />,
                color: "from-purple-600 to-fuchsia-600"
              },
              {
                title: "Transportation & Logistics",
                description: "Route optimization, fleet management, and supply chain intelligence.",
                icon: <Code />,
                color: "from-cyan-600 to-blue-600"
              }
            ].map((useCase, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-700 transform hover:-translate-y-1 hover:shadow-lg
                  ${animatedElements.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${useCase.color}`}></div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-indigo-50 flex items-center justify-center mb-4">
                    {React.cloneElement(useCase.icon, { size: 20, className: "text-purple-700" })}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4">{useCase.description}</p>
                  
                  <a href="#" className="flex items-center text-sm font-medium text-purple-700 hover:text-purple-800 transition-colors">
                    View case studies <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20 animate-float-slow"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 15}s`,
                animationDelay: `${Math.random() * 10}s`
              }}
            ></div>
          ))}
          
          {/* Code-like pattern in background */}
          <div className="absolute inset-0 flex flex-col justify-between opacity-5">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="h-px bg-white"
                style={{
                  width: `${Math.random() * 50 + 10}%`,
                  marginLeft: `${Math.random() * 40}%`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 
            ${animatedElements.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business with AI?
            </h2>
            
            <p className="text-xl text-purple-100 mb-8">
              Schedule a consultation with our AI experts to discover how our solutions 
              can address your specific business challenges.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/20 shadow-xl max-w-xl mx-auto">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-white text-sm font-medium mb-1 block">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-white text-sm font-medium mb-1 block">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="text-white text-sm font-medium mb-1 block">Company</label>
                  <input 
                    type="text" 
                    id="company"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-colors"
                    placeholder="Your company"
                  />
                </div>
                
                <div>
                  <label htmlFor="interest" className="text-white text-sm font-medium mb-1 block">I'm interested in</label>
                  <select 
                    id="interest"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:ring-2 focus:ring-white/30 focus:border-transparent transition-colors"
                  >
                    <option value="" className="bg-purple-900">Select an option</option>
                    <option value="machine-learning" className="bg-purple-900">Machine Learning Solutions</option>
                    <option value="data-analytics" className="bg-purple-900">Advanced Data Analytics</option>
                    <option value="ai-security" className="bg-purple-900">AI Security Systems</option>
                    <option value="automation" className="bg-purple-900">Intelligent Automation</option>
                  </select>
                </div>
                
                <div className="pt-2">
                  <Button 
                    primary 
                    className="w-full shadow-xl shadow-purple-900/30"
                  >
                    Request a Consultation
                  </Button>
                  <p className="text-sm text-purple-200 mt-3">
                    Our team will get back to you within 24 hours
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add keyframe animations for various effects */}
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-40px) translateX(20px); }
          50% { transform: translateY(0) translateX(40px); }
          75% { transform: translateY(40px) translateX(20px); }
        }
        
        @keyframes pulse-scale {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        
        @keyframes dash {
          to { stroke-dashoffset: 24; }
        }
        
        @keyframes dash-slow {
          to { stroke-dashoffset: 16; }
        }
        
        .animate-float-particle {
          animation: float-particle 15s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-dash {
          animation: dash 10s linear infinite;
        }
        
        .animate-dash-slow {
          animation: dash-slow 15s linear infinite;
        }
        
        .text-gradient-to-r {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        
        .from-purple-600.to-indigo-600 {
          background-image: linear-gradient(to right, #9333ea, #4f46e5);
        }
        
        .from-teal-500.to-emerald-500 {
          background-image: linear-gradient(to right, #14b8a6, #10b981);
        }
        
        .from-red-500.to-pink-600 {
          background-image: linear-gradient(to right, #ef4444, #db2777);
        }
        
        .from-amber-500.to-orange-600 {
          background-image: linear-gradient(to right, #f59e0b, #ea580c);
        }
      `}</style>
    </div>
  );
}