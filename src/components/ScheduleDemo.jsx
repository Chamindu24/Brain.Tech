import React, { useState } from 'react';
import {
  Calendar, Clock, User, Mail, Building, Phone,
  CheckCircle, ArrowRight, ChevronDown, X
} from 'lucide-react';

export default function DemoScheduler() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    date: '',
    time: '',
    requirements: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Available dates for the next 14 days
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would normally send data to backend
    console.log("Form submitted:", formData);
  };

  const nextStep = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };

  const prevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Custom form button component
  const Button = ({ children, primary, onClick, type = "button", disabled = false }) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${
        primary
          ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:shadow-lg hover:shadow-violet-600/20'
          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
      } 
      px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
      {primary && !disabled && (
        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );

  // Form field component for reusability
  const FormField = ({ label, icon, children }) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );

  // Drawer toggle button for mobile
  const DrawerToggle = () => (
    <button 
      onClick={toggleDrawer}
      className="fixed bottom-6 right-6 z-40 lg:hidden bg-gradient-to-r from-violet-600 to-blue-600 text-white p-4 rounded-full shadow-lg animate-bounce-subtle"
    >
      {isDrawerOpen ? <X /> : <Calendar />}
    </button>
  );

  // Reset form for another demo
  const resetForm = () => {
    setFormStep(1);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      date: '',
      time: '',
      requirements: '',
    });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-violet-900 via-blue-900 to-indigo-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 className="text-2xl font-bold">Schedule AI Demo</h1>
            <button 
              onClick={() => window.history.back()} 
              className="text-sm bg-white/10 backdrop-blur px-3 py-1 rounded-lg hover:bg-white/20"
            >
              Back to AI Solutions
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="lg:flex gap-8">
          {/* Left content area - visible on desktop, hidden in drawer on mobile */}
          <div className={`
            lg:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:block
            fixed lg:static inset-0 z-30 transition-transform duration-300 transform
            ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'} 
            lg:translate-y-0
          `}>
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Demo Request</h2>
                <p className="text-gray-600">Schedule a personalized demonstration of our AI solutions tailored to your business needs.</p>
              </div>

              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">Progress</span>
                  <span className="text-sm font-medium text-violet-600">{Math.floor((formStep / 3) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-600 to-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${(formStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step indicators */}
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step}
                    className={`flex flex-col items-center ${step <= formStep ? 'text-violet-600' : 'text-gray-400'}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step < formStep 
                        ? 'bg-violet-600 text-white' 
                        : step === formStep 
                        ? 'bg-violet-100 text-violet-600 border-2 border-violet-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step < formStep ? (
                        <CheckCircle size={20} />
                      ) : (
                        step
                      )}
                    </div>
                    <span className="text-xs font-medium">
                      {step === 1 ? 'Contact' : step === 2 ? 'Schedule' : 'Requirements'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Demo features */}
              <div className="bg-violet-50 rounded-xl p-5 mb-8">
                <h3 className="text-lg font-semibold text-violet-800 mb-4">What to expect:</h3>
                <ul className="space-y-3">
                  {[
                    "Personalized AI solution overview",
                    "Custom integration possibilities",
                    "Live demonstration with your data",
                    "ROI and implementation timeline",
                    "Q&A with our AI specialists"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-violet-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center text-sm text-gray-500">
                Our team will contact you within 24 hours to confirm your demo.
              </div>
            </div>
          </div>

          {/* Right form area */}
          <div className="lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 transition-all duration-500 ease-out animate-fade-in">
            {isSubmitted ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Demo Request Confirmed!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for scheduling a demo. We've sent a confirmation to {formData.email}. 
                  Our team will contact you shortly to prepare for your personalized demonstration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button primary onClick={resetForm}>
                    Schedule Another Demo
                  </Button>
                  <Button onClick={() => window.history.back()}>
                    Return to AI Solutions
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Step 1: Contact Information */}
                <div className={`transition-all duration-500 transform ${
                  formStep === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 absolute'
                }`}>
                  {formStep === 1 && (
                    <>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField label="Full Name" icon={<User size={16} />}>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            placeholder="John Smith"
                          />
                        </FormField>
                        
                        <FormField label="Email Address" icon={<Mail size={16} />}>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            placeholder="john@example.com"
                          />
                        </FormField>
                        
                        <FormField label="Company" icon={<Building size={16} />}>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            placeholder="Acme Inc."
                          />
                        </FormField>
                        
                        <FormField label="Phone Number" icon={<Phone size={16} />}>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            placeholder="+1 (555) 123-4567"
                          />
                        </FormField>
                      </div>
                    </>
                  )}
                </div>

                {/* Step 2: Schedule */}
                <div className={`transition-all duration-500 transform ${
                  formStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 absolute'
                }`}>
                  {formStep === 2 && (
                    <>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Date & Time</h2>
                      
                      <FormField label="Preferred Date" icon={<Calendar size={16} />}>
                        <select
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none bg-white"
                        >
                          <option value="">Select a date</option>
                          {availableDates.map((date) => (
                            <option key={date} value={date}>
                              {new Date(date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <ChevronDown size={16} />
                        </div>
                      </FormField>
                      
                      <FormField label="Preferred Time" icon={<Clock size={16} />}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                          {timeSlots.map((time) => (
                            <label 
                              key={time}
                              className={`border rounded-lg px-4 py-3 flex items-center justify-center cursor-pointer transition-all ${
                                formData.time === time 
                                  ? 'bg-violet-100 border-violet-500 text-violet-700' 
                                  : 'border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="time"
                                value={time}
                                checked={formData.time === time}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <span>{time}</span>
                            </label>
                          ))}
                        </div>
                      </FormField>
                    </>
                  )}
                </div>

                {/* Step 3: Requirements */}
                <div className={`transition-all duration-500 transform ${
                  formStep === 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 absolute'
                }`}>
                  {formStep === 3 && (
                    <>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Requirements</h2>
                      
                      <FormField label="Tell us about your AI needs" icon={<Clipboard size={16} />}>
                        <textarea
                          name="requirements"
                          value={formData.requirements}
                          onChange={handleChange}
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          placeholder="Please describe your business needs, challenges, and what you hope to achieve with AI integration..."
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-2">This helps us prepare a tailored demonstration for your specific use case.</p>
                      </FormField>
                    </>
                  )}
                </div>

                {/* Navigation buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                  {formStep > 1 && (
                    <Button onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {formStep < 3 ? (
                      <Button primary onClick={nextStep}>
                        Continue
                      </Button>
                    ) : (
                      <Button primary type="submit">
                        Confirm Demo Request
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Mobile drawer toggle */}
      <DrawerToggle />

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}