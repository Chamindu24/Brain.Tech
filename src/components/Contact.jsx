import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle,
  MessageSquare, AlertCircle, ArrowRight, Brain
} from 'lucide-react';

export default function Contact() {
  // State for form fields and animation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [animatedElements, setAnimatedElements] = useState({
    header: false,
    title: false,
    contactInfo: false,
    form: false
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill out all required fields');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after some time
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 5000);
    }, 1500);
  };

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
          if (sectionId === 'contact-section') {
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, header: true}));
            }, 100);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, title: true}));
            }, 300);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, contactInfo: true}));
            }, 600);
            setTimeout(() => {
              setAnimatedElements(prev => ({...prev, form: true}));
            }, 900);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      observer.observe(contactSection);
    }

    return () => {
      if (contactSection) {
        observer.unobserve(contactSection);
      }
    };
  }, []);

  // Button component with hover animation (reused from main file)
  const Button = ({ children, primary, className, icon, type, disabled }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button 
        type={type || 'button'}
        disabled={disabled}
        className={`${primary 
          ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' 
          : 'bg-white text-gray-800 border border-gray-200'} 
          px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-300 
          hover:shadow-lg relative overflow-hidden
          flex items-center justify-center gap-2 w-full sm:w-auto 
          ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
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
  };

  return (
    <div id="contact-section">
      {/* Header Section with Brain Icon */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 py-16 relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-indigo-800/80 to-blue-900/90"></div>
        
        {/* Floating bubbles background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} 
              className="absolute rounded-full bg-indigo-400 opacity-5"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        <br></br> <br></br> <br></br>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className={`flex flex-col md:flex-row items-center justify-between transition-all duration-1000 
            ${animatedElements.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="mb-8 md:mb-0 text-center md:text-left">
                <br></br>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-lg text-indigo-100 max-w-lg">
                Have questions about our intelligent solutions? Our team of experts is ready to help you transform your business.
              </p>
            </div>
            
            {/* Animated Brain Icon */}
            <div className="relative w-40 h-40 animate-float">
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain size={72} className="text-white animate-glow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-indigo-300/30 rounded-full animate-spin" 
                  style={{ animationDuration: '12s' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 border-2 border-blue-300/20 rounded-full animate-reverse-spin" 
                  style={{ animationDuration: '15s' }}></div>
              </div>
              
              {/* Added particle effects around brain */}
              {[...Array(8)].map((_, i) => (
                <div key={i}
                  className="absolute w-2 h-2 bg-blue-300 rounded-full animate-particle"
                  style={{
                    top: `calc(50% + ${Math.cos(i * 45 * Math.PI / 180) * 40}px)`,
                    left: `calc(50% + ${Math.sin(i * 45 * Math.PI / 180) * 40}px)`,
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.6
                  }}
                ></div>
              ))}
              
              {/* Neural network lines */}
              {[...Array(4)].map((_, i) => (
                <div key={i}
                  className="absolute top-1/2 left-1/2 w-16 h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-400/50 to-indigo-500/0 animate-pulse"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: 'center',
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '3s'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="w-full h-full border-gray-200" style={{
                borderWidth: (i % 10 === 0 || i < 10) ? '0.5px' : '0'
              }}></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Section heading */}
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-700 
            ${animatedElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
              Contact Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">We'd Love to Hear From You</h2>
            <p className="text-lg text-gray-600">
              Reach out to discuss how our intelligent solutions can transform your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact information */}
            <div className={`transition-all duration-700 delay-200
              ${animatedElements.contactInfo ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 h-full border border-gray-100 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-2xl"></div>
                
                <div className="relative">
                  <h3 className="text-2xl font-semibold mb-6 text-indigo-700">We're Here To Help</h3>
                  
                  <div className="space-y-6">
                    {/* Address */}
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-indigo-200 transition-all duration-300">
                        <MapPin size={20} className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Visit Us</h4>
                        <p className="text-gray-600">
                          123 Innovation Drive<br />
                          Tech Park, Suite 500<br />
                          San Francisco, CA 94107
                        </p>
                      </div>
                    </div>
                    
                    {/* Phone */}
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-indigo-200 transition-all duration-300">
                        <Phone size={20} className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Call Us</h4>
                        <p className="text-gray-600">
                          +1 (555) 123-4567<br />
                          Monday - Friday, 9am - 5pm PST
                        </p>
                      </div>
                    </div>
                    
                    {/* Email */}
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-indigo-200 transition-all duration-300">
                        <Mail size={20} className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email Us</h4>
                        <p className="text-gray-600">
                          info@braintech.com<br />
                          support@braintech.com
                        </p>
                      </div>
                    </div>
                    
                    {/* Hours */}
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-indigo-200 transition-all duration-300">
                        <Clock size={20} className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Business Hours</h4>
                        <p className="text-gray-600">
                          Monday - Friday: 9am - 5pm PST<br />
                          Saturday: 10am - 2pm PST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive map with animation */}
                  <div className="mt-8 rounded-lg overflow-hidden border border-gray-200 h-48 bg-indigo-50 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-80"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center z-10">
                        <div className="relative">
                          <MapPin size={32} className="text-indigo-600 mx-auto mb-2" />
                          <div className="absolute inset-0 w-8 h-8 rounded-full bg-indigo-200 animate-ping-slow opacity-60 mx-auto"></div>
                        </div>
                        <p className="text-indigo-700 font-medium">Our Location</p>
                        <p className="text-sm text-indigo-500">Click to view map</p>
                      </div>
                    </div>
                    {/* Map grid lines */}
                    <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 opacity-30">
                      {[...Array(60)].map((_, i) => (
                        <div key={i} className="w-full h-full border-indigo-200" style={{
                          borderWidth: '0.5px'
                        }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className={`transition-all duration-700 delay-400
              ${animatedElements.form ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-100 rounded-full opacity-50 blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-6 text-indigo-700">Send Us a Message</h3>
                  
                  {submitted ? (
                    <div className="py-10">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                          <CheckCircle size={32} className="text-green-500" />
                          <div className="absolute inset-0 w-16 h-16 rounded-full bg-green-100 animate-ping-slow opacity-60"></div>
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                        <p className="text-gray-600">
                          Thank you for reaching out. We'll get back to you shortly.
                        </p>
                      </div>
                      <div className="mt-6 text-center">
                        <Button 
                          primary
                          onClick={() => setSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {formError && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2 mb-4">
                          <AlertCircle size={18} />
                          <span>{formError}</span>
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="What can we help you with?"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="Tell us about your project or inquiry..."
                          required
                        ></textarea>
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          primary 
                          type="submit" 
                          disabled={isSubmitting}
                          icon={isSubmitting ? null : <Send size={16} />}
                          className={isSubmitting ? 'cursor-not-allowed' : ''}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
              
              {/* Quick contact options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <MessageSquare size={18} className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Live Chat</h4>
                    <p className="text-sm text-gray-500">Talk to an expert now</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <Phone size={18} className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Call Us</h4>
                    <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add keyframe animations to enable the animations mentioned in the CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(99, 102, 241, 0.7)); }
          50% { filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.9)); }
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
        
        .group:hover .group-hover\\:bg-indigo-200 {
          background-color: rgba(199, 210, 254, 1);
        }
      `}</style>
    </div>
  );
}