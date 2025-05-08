import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Preloader from './components/Preloader';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Project';
import Services from './components/Services';
import AIIntegration from './components/AIIntegration';
import CustomSoftwareDevelopment from './components/CustomSoftwareDevelopment';
import DataAnalytics from './components/DataAnalytics';
import AISolutions from './components/AISolutions';
import ScheduleDemo from './components/ScheduleDemo';
import AI from './components/AI'
import AIPoweredSolutions from './components/AI-PoweredSolutions';
import BigDataAnalysis from './components/bigdata';
import MachineLearning from './components/machine';
import GlobalScalability from './components/Global';
import EnhancedSecurity from './components/Security';
import Auto from './components/Auto';




function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For Preloader

  const handleLogin = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/AIIntegration" element={<AIIntegration />} />
            <Route path="/CustomSoftwareDevelopment" element={<CustomSoftwareDevelopment />} />
            <Route path="/DataAnalytics" element={<DataAnalytics />} />
            <Route path="/AISolutions" element={<AISolutions />} />
            <Route path="/ScheduleDemo" element={<ScheduleDemo />} />
            <Route path="/AI" element={<AI />} />
            <Route path="/AIPoweredSolutions" element={<AIPoweredSolutions />} />
            <Route path="/BigDataAnalysis" element={<BigDataAnalysis />} />
            <Route path="/MachineLearning" element={<MachineLearning />} />
            <Route path="/GlobalScalability" element={<GlobalScalability />} />
            <Route path="/EnhancedSecurity" element={<EnhancedSecurity />} />
            <Route path="/Auto" element={<Auto />} />
   

         
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
