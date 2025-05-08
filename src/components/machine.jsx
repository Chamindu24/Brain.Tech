import React, { useState, useEffect } from 'react';
import { 
  Brain, ChartBar, Share2, Code, 
  Search, CheckCircle, ChevronRight, TrendingUp, 
  Server, ArrowRight, Gauge, BarChart4, Zap, Cpu, Database
} from 'lucide-react';


export default function MachineLearning() {
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
  
  // ML solution cards
  const solutionCards = [
    {
      icon: <Brain />,
      title: "Neural Networks",
      description: "Deep learning models that mimic human brain to recognize patterns and make decisions.",
      color: "from-purple-600 to-indigo-600",
      stats: [
        { value: "95%", label: "Accuracy" },
        { value: "8x", label: "Faster Training" }
      ]
    },
    {
      icon: <Share2 />,
      title: "Reinforcement Learning",
      description: "Self-improving algorithms that learn optimal actions through environment interaction.",
      color: "from-teal-500 to-emerald-500",
      stats: [
        { value: "12x", label: "Performance" },
        { value: "90%", label: "Adaptation" }
      ]
    },
    {
      icon: <ChartBar />,
      title: "Predictive Analytics",
      description: "Forecast future trends and behaviors with statistical algorithms and machine learning.",
      color: "from-red-500 to-pink-600",
      stats: [
        { value: "94%", label: "Precision" },
        { value: "5x", label: "ROI" }
      ]
    },
    {
      icon: <Code />,
      title: "AutoML Systems",
      description: "Automated machine learning that optimizes model selection and hyperparameters.",
      color: "from-amber-500 to-orange-600",
      stats: [
        { value: "75%", label: "Time Saved" },
        { value: "3x", label: "Efficiency" }
      ]
    }
  ];

  // Feature tabs data
  const featureTabs = [
    {
      title: "Continuous Learning",
      icon: <TrendingUp size={20} />,
      content: {
        heading: "Self-Improving Algorithms",
        description: "Our ML models continuously learn from new data, improving accuracy and performance over time without manual intervention.",
        features: [
          "Online learning capabilities",
          "Adaptive model training",
          "Automatic feature detection",
          "Performance monitoring systems"
        ]
      }
    },
    {
      title: "Distributed Training",
      icon: <Server size={20} />,
      content: {
        heading: "Scalable Model Training",
        description: "Train complex models across distributed computing resources to handle massive datasets and reduce time to insights.",
        features: [
          "Multi-GPU acceleration",
          "Cluster-based training",
          "Model parallelism",
          "Gradient synchronization"
        ]
      }
    },
    {
      title: "Model Explainability",
      icon: <Search size={20} />,
      content: {
        heading: "Transparent AI Decision Making",
        description: "Understand how your ML models make decisions with interpretable AI techniques that build trust and compliance.",
        features: [
          "Feature importance analysis",
          "SHAP values integration",
          "Local interpretable explanations",
          "Decision boundary visualization"
        ]
      }
    },
    {
      title: "Model Deployment",
      icon: <Zap size={20} />,
      content: {
        heading: "Enterprise Model Deployment",
        description: "Seamlessly deploy ML models to production with robust pipelines that ensure consistency and reliability.",
        features: [
          "One-click deployment",
          "Version control system",
          "Rollback capabilities",
          "A/B testing framework"
        ]
      }
    }
  ];

  // Button component with hover animation
  const Button = ({ children, primary, className, icon, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button 
        onClick={onClick}
        className={`${primary 
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
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
        <span className={`absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 
          ${primary ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-0'}`}></span>
      </button>
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
          if (sectionId === 'machine-learning-section') {
            setTimeout(() => setAnimatedElements(prev => ({...prev, header: true})), 100);
            setTimeout(() => setAnimatedElements(prev => ({...prev, intro: true})), 300);
            setTimeout(() => setAnimatedElements(prev => ({...prev, solutions: true})), 600);
            setTimeout(() => setAnimatedElements(prev => ({...prev, features: true})), 900);
            setTimeout(() => setAnimatedElements(prev => ({...prev, cta: true})), 1200);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const section = document.getElementById('machine-learning-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <div id="machine-learning-section" className="overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-20 lg:py-28 relative">
        {/* Animated data points background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
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
          
          {/* Digital grid pattern */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="col-span-1 border-r border-white/30 h-full"></div>
            ))}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="row-span-1 border-b border-white/30 w-full"></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 
            ${animatedElements.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="inline-block">
                Self-Learning 
                <span className="relative">
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">
                    {" Machine Learning"}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-500/20 rounded-full transform translate-y-1"></span>
                </span>
                {" Algorithms"}
              </span>
            </h1>
            
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Implement intelligent systems that continuously improve over time,
              delivering better results and predictive capabilities.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button primary className="shadow-xl shadow-purple-900/20">
                Explore ML Solutions
              </Button>
              
              <Button className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                View Demo Models
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
                Intelligent Algorithms
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Algorithms That Learn and Evolve With Your Business
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Our machine learning platform delivers self-improving algorithms that adapt to changing data patterns
                and business environments without constant manual tuning.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: <CheckCircle size={20} className="text-purple-600" />, text: "Continuously learning models that improve with more data" },
                  { icon: <CheckCircle size={20} className="text-purple-600" />, text: "Adaptive algorithms that detect changing patterns" },
                  { icon: <CheckCircle size={20} className="text-purple-600" />, text: "Automated feature engineering and selection" },
                  { icon: <CheckCircle size={20} className="text-purple-600" />, text: "Explainable AI for transparent decision-making" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">{item.icon}</div>
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <Button primary>Discover Our ML Platform</Button>
            </div>
            
            {/* Right column with data visualization */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6">
              <h3 className="text-xl font-semibold mb-6 text-center">ML Performance Metrics</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Model Accuracy", value: "97%" },
                  { label: "Training Speed", value: "8x" },
                  { label: "Self-Optimization", value: "24/7" },
                  { label: "ROI Increase", value: "340%" }
                ].map((metric, index) => (
                  <div key={index} className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
                    <span className="text-3xl font-bold text-purple-700">{metric.value}</span>
                    <span className="text-sm text-gray-600 text-center">{metric.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Gauge size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-800">Continuous Improvement</h4>
                    <p className="text-sm text-gray-600">
                      Our ML models improve by an average of 12% every quarter with
                      automated retraining and optimization processes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Cards */}
      <section className="py-16 md:py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 
            ${animatedElements.solutions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              ML Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Advanced Machine Learning Solutions
            </h2>
            <p className="text-lg text-gray-600">
              From neural networks to reinforcement learning, our platform offers
              cutting-edge ML algorithms that adapt and evolve.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {solutionCards.map((card, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-700 transform hover:-translate-y-2
                  ${animatedElements.solutions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                onMouseEnter={() => setIsHoveringCard(index)}
                onMouseLeave={() => setIsHoveringCard(null)}
              >
                <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                <div className="p-6">
                  {/* Fixed this part - Applied the gradient directly to the icon with proper Tailwind classes */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-50 flex items-center justify-center mb-4">
                    {React.cloneElement(card.icon, { 
                      size: 24, 
                      className: `text-${card.color.split('-')[1]} ${
                        isHoveringCard === index 
                          ? 'transform scale-110 transition-transform duration-300' 
                          : 'transition-transform duration-300'
                      }`
                    })}
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
              Core Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Self-Learning ML Platform
            </h2>
            <p className="text-lg text-gray-600">
              Our machine learning platform continuously adapts and evolves with your data,
              delivering increasingly accurate predictions and insights.
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
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">              
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
                    Explore {featureTabs[activeTab].title}
                  </Button>
                </div>
                
                {/* Illustration */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-full aspect-square max-w-xs">
                    {/* Central node */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg z-10">
                      {React.cloneElement(featureTabs[activeTab].icon, { size: 32, className: "text-white" })}
                    </div>
                    
                    {/* Data flow visualization */}
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-purple-200 animate-spin-slow opacity-70"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-dashed border-indigo-200 animate-spin-slow opacity-50" style={{animationDirection: 'reverse', animationDuration: '30s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 
            ${animatedElements.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Implement Self-Learning Algorithms?
            </h2>
            
            <p className="text-xl text-purple-100 mb-8">
              Schedule a consultation with our ML experts to discover how our
              self-improving algorithms can transform your business.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <Button primary className="shadow-xl shadow-purple-900/20">
                Get Started Now
              </Button>
              
              <Button className="bg-white text-purple-900 hover:bg-purple-50">
                Talk to ML Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Animations */}
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
        }
        
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        
        .animate-float-particle {
          animation: float-particle 15s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
      `}</style>
    </div>
  );
}