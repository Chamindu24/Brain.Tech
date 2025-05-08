import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Code, ExternalLink, GitBranch, Star, 
  Filter, Tag, Search, Layers, CheckCircle, ChevronDown
} from 'lucide-react';

export default function Projects() {
  // State for projects data, filters, and search
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTechnology, setSelectedTechnology] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [animatedElements, setAnimatedElements] = useState({
    header: false,
    filters: false,
    projects: false
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch projects data
  useEffect(() => {
    // Simulated API call to fetch projects
    setTimeout(() => {
      const projectsData = [
        {
          id: 1,
          title: 'AI-Powered Customer Service Bot',
          description: 'A machine learning chatbot that provides instant customer support for e-commerce platforms',
          image: '/projects/project-1.jpg',
          category: 'Artificial Intelligence',
          technologies: ['Python', 'TensorFlow', 'React', 'Node.js'],
          featured: true,
          stats: {
            stars: 483,
            forks: 127,
            commits: 865
          },
          demoUrl: 'https://demo.example.com/ai-bot',
          repoUrl: 'https://github.com/example/ai-bot',
          details: 'This project uses natural language processing to understand customer queries and provide accurate responses. It integrates with e-commerce platforms to pull product information, order status, and account details.'
        },
        {
          id: 2,
          title: 'Neural Network Visualization Tool',
          description: 'Interactive 3D visualization of neural networks for educational purposes',
          image: '/projects/project-2.jpg',
          category: 'Data Visualization',
          technologies: ['JavaScript', 'Three.js', 'D3.js', 'React'],
          featured: true,
          stats: {
            stars: 327,
            forks: 89,
            commits: 512
          },
          demoUrl: 'https://demo.example.com/nn-viz',
          repoUrl: 'https://github.com/example/nn-viz',
          details: 'Users can create custom neural network architectures and watch data flow through the network in real-time. The tool includes pre-built examples of common architectures like CNNs and RNNs.'
        },
        {
          id: 3,
          title: 'Smart Home Energy Management',
          description: 'IoT system for optimizing energy usage in residential buildings',
          image: '/projects/project-3.jpg',
          category: 'Internet of Things',
          technologies: ['Arduino', 'Python', 'MQTT', 'React Native'],
          featured: false,
          stats: {
            stars: 195,
            forks: 43,
            commits: 378
          },
          demoUrl: 'https://demo.example.com/smart-energy',
          repoUrl: 'https://github.com/example/smart-energy',
          details: 'This system connects to smart home devices to monitor energy consumption and automatically adjust settings for optimal efficiency. It includes a mobile app for remote monitoring and control.'
        },
        {
          id: 4,
          title: 'Blockchain-Based Supply Chain',
          description: 'Transparent tracking system for product authenticity and logistics',
          image: '/projects/project-4.jpg',
          category: 'Blockchain',
          technologies: ['Solidity', 'Ethereum', 'React', 'Node.js'],
          featured: false,
          stats: {
            stars: 258,
            forks: 76,
            commits: 423
          },
          demoUrl: 'https://demo.example.com/supply-chain',
          repoUrl: 'https://github.com/example/supply-chain',
          details: 'This blockchain solution provides end-to-end visibility into supply chains, with immutable records of product journey from manufacturer to consumer.'
        },
        {
          id: 5,
          title: 'Augmented Reality Training Platform',
          description: 'AR-based system for technical skills training and assessment',
          image: '/projects/project-5.jpg',
          category: 'Augmented Reality',
          technologies: ['Unity', 'C#', 'ARKit', 'ARCore'],
          featured: true,
          stats: {
            stars: 372,
            forks: 91,
            commits: 629
          },
          demoUrl: 'https://demo.example.com/ar-training',
          repoUrl: 'https://github.com/example/ar-training',
          details: 'This platform overlays instructional content onto real-world objects, guiding users through complex technical procedures and providing real-time feedback.'
        },
        {
          id: 6,
          title: 'Predictive Maintenance System',
          description: 'ML algorithm that predicts equipment failures before they occur',
          image: '/projects/project-6.jpg',
          category: 'Machine Learning',
          technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'React'],
          featured: false,
          stats: {
            stars: 217,
            forks: 59,
            commits: 345
          },
          demoUrl: 'https://demo.example.com/predictive-maintenance',
          repoUrl: 'https://github.com/example/predictive-maintenance',
          details: 'By analyzing sensor data from industrial equipment, this system can predict failures weeks in advance, allowing for planned maintenance and minimizing downtime.'
        }
      ];

      setProjects(projectsData);
      setFilteredProjects(projectsData);

      // Extract unique categories and technologies
      const allCategories = ['All', ...new Set(projectsData.map(project => project.category))];
      const allTechnologies = ['All', ...new Set(projectsData.flatMap(project => project.technologies))];
      
      setCategories(allCategories);
      setTechnologies(allTechnologies);
    }, 500);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...projects];

    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(project => project.category === selectedCategory);
    }

    // Apply technology filter
    if (selectedTechnology !== 'All') {
      result = result.filter(project => project.technologies.includes(selectedTechnology));
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(result);
  }, [selectedCategory, selectedTechnology, searchQuery, projects]);

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
          if (sectionId === 'projects-section') {
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, header: true}));
            }, 100);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, filters: true}));
            }, 300);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, projects: true}));
            }, 600);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const projectsSection = document.getElementById('projects-section');
    if (projectsSection) {
      observer.observe(projectsSection);
    }

    return () => {
      if (projectsSection) {
        observer.unobserve(projectsSection);
      }
    };
  }, []);

  // Button component with hover animation
  const Button = ({ children, primary, className, icon, onClick, href }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const buttonContent = (
      <button 
        onClick={onClick}
        className={`${primary 
          ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' 
          : 'bg-white text-gray-800 border border-gray-200'} 
          px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-300 
          hover:shadow-lg relative overflow-hidden flex items-center justify-center gap-2
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
      </button>
    );

    return href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {buttonContent}
      </a>
    ) : buttonContent;
  };

  // Open modal with project details
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="projects-section">
      {/* Improved Header Section with Better Mobile Responsiveness */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 py-10 sm:py-12 md:py-16 relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-indigo-800/80 to-blue-900/90"></div>
        
        {/* Mobile-optimized floating code elements background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} 
              className="absolute text-indigo-300 opacity-5 font-mono text-xs sm:text-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 90 - 45}deg)`,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              {['function()', 'const data = []', '<Component />', 'import React', 'export default'][i % 5]}
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className={`transition-all duration-1000 
            ${animatedElements.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="text-center max-w-3xl mx-auto px-4 sm:px-6">
                <br></br>
                <br></br>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">Our Projects</h2>
              <p className="text-base sm:text-lg text-indigo-100 leading-relaxed">
                Explore our portfolio of innovative solutions across various technologies and domains.
                From AI and machine learning to blockchain and IoT, discover how we're pushing the boundaries of what's possible.
              </p>
            </div>
            
            {/* Mobile-friendly code blocks */}
            <div className="flex flex-wrap justify-center mt-6 sm:mt-8 gap-3 sm:gap-4 overflow-hidden px-2">
              {/* Single code block for mobile, three for larger screens */}
              <div 
                className="bg-indigo-800/50 backdrop-blur-sm rounded-lg border border-indigo-700/30 px-3 py-2 sm:px-4 sm:py-3 min-w-48 text-left opacity-80 sm:hidden"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="font-mono text-xs text-indigo-200">
                <div className="font-mono text-xs text-indigo-200">
    <div>function getProjects() {'{'}</div>
    <div>  return data.filter(p =&gt; p.status)</div>
    <div>{'}'}</div>
  </div>
                </div>
              </div>
              
              {/* Multiple code blocks for larger screens */}
              {[...Array(3)].map((_, i) => (
                <div key={i} 
                  className="hidden sm:block bg-indigo-800/50 backdrop-blur-sm rounded-lg border border-indigo-700/30 px-4 py-3 min-w-48 text-left opacity-80"
                  style={{
                    transform: `rotate(${(i-1) * 2}deg) translateY(${(i-1) * 5}px)`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="font-mono text-xs text-indigo-200">
                    <div>{i === 0 ? 'function getProjects() {' : i === 1 ? 'const results = await AI.analyze()' : 'class ProjectComponent {'}</div>
                    <div>{i === 0 ? '  return data.filter(p => p.status)' : i === 1 ? '  return results.filter(valid)' : '  render() {'}</div>
                    <div>{i === 0 ? '}' : i === 1 ? '}' : '  }'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section - Now with improved mobile layout */}
      <section className="py-10 sm:py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 sm:w-64 h-40 sm:h-64 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 sm:w-64 h-40 sm:h-64 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
          
          {/* Grid pattern - simplified for mobile */}
          <div className="absolute inset-0 grid grid-cols-5 sm:grid-cols-10 grid-rows-5 sm:grid-rows-10 opacity-20">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="w-full h-full border-gray-200" style={{
                borderWidth: (i % 5 === 0 || i < 5) ? '0.5px' : '0'
              }}></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Filters - improved for mobile */}
          <div className={`mb-6 sm:mb-8 md:mb-12 transition-all duration-700 
            ${animatedElements.filters ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6 border border-gray-100">
              {/* Mobile responsive filter layout */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {/* Search */}
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                
                {/* Filter controls in flex layout for mobile, grid for larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Category filter */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Filter size={18} className="text-gray-400" />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none bg-white"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  
                  {/* Technology filter */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Code size={18} className="text-gray-400" />
                    </div>
                    <select
                      value={selectedTechnology}
                      onChange={(e) => setSelectedTechnology(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none bg-white"
                    >
                      {technologies.map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-3 sm:mt-4">
                <div className="text-xs sm:text-sm text-gray-500">
                  Showing <span className="font-medium text-indigo-600">{filteredProjects.length}</span> projects
                </div>
                {(selectedCategory !== 'All' || selectedTechnology !== 'All' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedTechnology('All');
                      setSearchQuery('');
                    }}
                    className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 ml-auto flex items-center gap-1"
                  >
                    <span>Clear filters</span>
                    <span>×</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Projects Grid - Improved mobile layout */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 transition-all duration-700 
            ${animatedElements.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Project Image Placeholder */}
                  <div className="relative h-36 sm:h-48 bg-gradient-to-r from-indigo-500 to-blue-600 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Layers size={28} className="text-white/70 sm:size-36" />
                    </div>
                    {project.featured && (
                      <div className="absolute top-0 right-0 bg-indigo-700 text-white text-xs font-medium px-2 py-1 flex items-center">
                        <Star size={12} className="mr-1" /> Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">{project.title}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <Star size={14} className="text-yellow-500 mr-1" />
                        <span>{project.stats.stars}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-0.5 sm:py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 sm:py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => openProjectModal(project)}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm w-full"
                      >
                        View Details
                      </Button>
                      <Button 
                        href={project.repoUrl} 
                        className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm !bg-gray-100 hover:!bg-gray-200"
                        icon={<GitBranch size={14} className="sm:size-16" />}
                      >
                        Repo
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-16">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Search size={20} className="text-indigo-600 sm:size-24" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">No projects found</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Try adjusting your search or filters</p>
                <Button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedTechnology('All');
                    setSearchQuery('');
                  }}
                  primary
                  className="text-sm"
                >
                  Show all projects
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Project Details Modal - Improved for mobile */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 opacity-100 transition-opacity">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[95vh] overflow-auto shadow-2xl">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{selectedProject.title}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-xl sm:text-2xl">×</span>
                </button>
              </div>
              
              <div className="h-40 sm:h-60 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg mb-4 sm:mb-6 flex items-center justify-center">
                <Layers size={36} className="text-white/70 sm:size-48" />
              </div>
              
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Project Description</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">{selectedProject.description}</p>
                <p className="text-sm sm:text-base text-gray-700">{selectedProject.details}</p>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium bg-indigo-50 text-indigo-600 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Project Stats</h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-0.5 sm:mb-1">
                      <Star size={16} className="text-yellow-500 mr-1 sm:size-18" />
                    </div>
                    <p className="text-lg sm:text-xl font-semibold text-gray-800">{selectedProject.stats.stars}</p>
                    <p className="text-xs text-gray-500">Stars</p>
                  </div>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-0.5 sm:mb-1">
                      <GitBranch size={16} className="text-gray-700 mr-1 sm:size-18" />
                    </div>
                    <p className="text-lg sm:text-xl font-semibold text-gray-800">{selectedProject.stats.forks}</p>
                    <p className="text-xs text-gray-500">Forks</p>
                  </div>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-0.5 sm:mb-1">
                      <Code size={16} className="text-gray-700 mr-1 sm:size-18" />
                    </div>
                    <p className="text-lg sm:text-xl font-semibold text-gray-800">{selectedProject.stats.commits}</p>
                    <p className="text-xs text-gray-500">Commits</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  href={selectedProject.demoUrl}
                  primary
                  icon={<ExternalLink size={14} className="sm:size-16" />}
                  className="flex-1 text-sm"
                >
                  View Live Demo
                </Button>
                <Button 
                  href={selectedProject.repoUrl}
                  icon={<GitBranch size={14} className="sm:size-16" />}
                  className="flex-1 text-sm"
                >
                  View Repository
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        /* Add additional mobile-friendly animations */
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        /* Add responsive animation timing adjustments */
        @media (max-width: 640px) {
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        }
      `}</style>
    </div>
  );
}