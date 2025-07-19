import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FloatingParticles } from './components/InteractiveAnimations';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Sustainability from './components/Sustainability';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ResumeBuilder from './components/ResumeBuilder';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Profile from './components/Profile';
import AIAssistant from './components/AIAssistant';
import ProgressTracker from './components/ProgressTracker';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <FloatingParticles />
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <About />
              <Sustainability />
              <Contact />
            </>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<ProgressTracker />} />
        </Routes>
        <AIAssistant />
        <Footer />
      </div>
    </Router>
  );
}

export default App;