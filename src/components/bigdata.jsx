import React, { useState, useEffect } from 'react';
import { 
  Database, BarChart4, Share2, Search, 
  CheckCircle, ChevronRight, TrendingUp, 
  Server, ArrowRight, Gauge, LineChart, Zap, Cpu, PieChart, FileJson
} from 'lucide-react';


export default function BigDataAnalysis() {
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
  
  // Big Data solution cards
  const solutionCards = [
    {
      icon: <Database />,
      title: "Data Warehousing",
      description: "Scalable storage solutions for structured and unstructured data with optimized query performance.",
      color: "from-blue-600 to-cyan-600",
      stats: [
        { value: "99.9%", label: "Uptime" },
        { value: "10x", label: "Faster Queries" }
      ]
    },
    {
      icon: <BarChart4 />,
      title: "Real-time Analytics",
      description: "Process and analyze streaming data in real-time to power dynamic dashboards and alerts.",
      color: "from-emerald-500 to-green-600",
      stats: [
        { value: "ms", label: "Latency" },
        { value: "24/7", label: "Monitoring" }
      ]
    },
    {
      icon: <PieChart />,
      title: "Predictive Insights",
      description: "Leverage historical data patterns to forecast trends and anticipate future business needs.",
      color: "from-orange-500 to-amber-600",
      stats: [
        { value: "92%", label: "Accuracy" },
        { value: "6x", label: "ROI" }
      ]
    },
    {
      icon: <FileJson />,
      title: "Data Integration",
      description: "Seamlessly connect disparate data sources into a unified analytics platform with automated ETL.",
      color: "from-purple-500 to-violet-600",
      stats: [
        { value: "85%", label: "Time Saved" },
        { value: "4x", label: "Efficiency" }
      ]
    }
  ];

  // Feature tabs data
  const featureTabs = [
    {
      title: "Batch Processing",
      icon: <Server size={20} />,
      content: {
        heading: "High-Volume Data Processing",
        description: "Process massive datasets efficiently with distributed computing frameworks optimized for throughput and reliability.",
        features: [
          "Distributed computing architecture",
          "Optimized query processing",
          "Automated data partitioning",
          "Fault-tolerant operations"
        ]
      }
    },
    {
      title: "Stream Processing",
      icon: <Zap size={20} />,
      content: {
        heading: "Real-Time Data Streams",
        description: "Analyze continuous data streams as they arrive, enabling immediate insights and rapid business responses.",
        features: [
          "Sub-second processing latency",
          "Windowed computations",
          "Event-time processing",
          "Stream-table joins"
        ]
      }
    },
    {
      title: "Data Visualization",
      icon: <LineChart size={20} />,
      content: {
        heading: "Interactive Dashboards",
        description: "Transform complex data into intuitive visualizations that reveal patterns and support decision-making.",
        features: [
          "Interactive drill-down capabilities",
          "Custom visualization templates",
          "Multi-dimensional charting",
          "Real-time dashboard updates"
        ]
      }
    },
    {
      title: "Advanced Analytics",
      icon: <Search size={20} />,
      content: {
        heading: "Deep Data Exploration",
        description: "Uncover hidden patterns and correlations in your data with advanced statistical and machine learning techniques.",
        features: [
          "Anomaly detection algorithms",
          "Time-series forecasting",
          "Cluster analysis",
          "Pattern recognition systems"
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
          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
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
        <span className={`absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-300 
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
          if (sectionId === 'big-data-section') {
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
    
    const section = document.getElementById('big-data-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <div id="big-data-section" className="overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 py-20 lg:py-28 relative">
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
                Transform 
                <span className="relative">
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400">
                    {" Big Data"}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-cyan-500/20 rounded-full transform translate-y-1"></span>
                </span>
                {" Into Insights"}
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Harness the power of your data with advanced analytics and visualization tools
              that deliver actionable business intelligence.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button primary className="shadow-xl shadow-blue-900/20">
                Explore Data Solutions
              </Button>
              
              <Button className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                View Demo Dashboards
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
              <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Data-Driven Decisions
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Turn Massive Datasets Into Strategic Business Insights
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Our big data platform enables you to process, analyze, and visualize
                petabytes of data to uncover valuable insights and drive informed decisions.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: <CheckCircle size={20} className="text-blue-600" />, text: "Scalable data processing for any size organization" },
                  { icon: <CheckCircle size={20} className="text-blue-600" />, text: "Real-time analytics on streaming data sources" },
                  { icon: <CheckCircle size={20} className="text-blue-600" />, text: "Intuitive visualization tools for non-technical users" },
                  { icon: <CheckCircle size={20} className="text-blue-600" />, text: "Seamless integration with existing data infrastructure" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">{item.icon}</div>
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <Button primary>Discover Our Data Platform</Button>
            </div>
            
            {/* Right column with data visualization */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6">
              <h3 className="text-xl font-semibold mb-6 text-center">Data Processing Metrics</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Processing Speed", value: "12TB/hr" },
                  { label: "Query Response", value: "ms" },
                  { label: "Data Sources", value: "100+" },
                  { label: "Cost Savings", value: "68%" }
                ].map((metric, index) => (
                  <div key={index} className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <span className="text-3xl font-bold text-blue-700">{metric.value}</span>
                    <span className="text-sm text-gray-600 text-center">{metric.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Gauge size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">Performance Optimization</h4>
                    <p className="text-sm text-gray-600">
                      Our distributed processing technology reduces query times by up to 95%
                      compared to traditional data warehousing solutions.
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
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Data Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              End-to-End Big Data Solutions
            </h2>
            <p className="text-lg text-gray-600">
              From data storage and processing to advanced analytics and visualization,
              our platform covers the complete data lifecycle.
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
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center mb-4">
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
                    <a href="#" className="flex items-center text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors">
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
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Core Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Powerful Data Processing Platform
            </h2>
            <p className="text-lg text-gray-600">
              Process and analyze massive datasets with our scalable and flexible
              big data platform designed for performance and reliability.
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
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'}`}
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
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">{featureTabs[activeTab].content.heading}</h3>
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
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-full aspect-square max-w-xs">
                    {/* Central node */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg z-10">
                      {React.cloneElement(featureTabs[activeTab].icon, { size: 32, className: "text-white" })}
                    </div>
                    
                    {/* Data flow visualization */}
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-200 animate-spin-slow opacity-70"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-200 animate-spin-slow opacity-50" style={{animationDirection: 'reverse', animationDuration: '30s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900">        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 
            ${animatedElements.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Unlock the Value in Your Data?
            </h2>
            
            <p className="text-xl text-blue-100 mb-8">
              Schedule a consultation with our data experts to discover how our
              big data solutions can transform your business intelligence.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <Button primary className="shadow-xl shadow-blue-900/20">
                Start Your Data Journey
              </Button>
              
              <Button className="bg-white text-blue-900 hover:bg-blue-50">
                Talk to Data Expert
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