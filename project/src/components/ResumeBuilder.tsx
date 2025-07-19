import React, { useState } from 'react';
import { Download, Eye, Save, Sparkles, Plus, Trash2, Edit3 } from 'lucide-react';

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: []
  });

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'certifications', name: 'Certifications', icon: '🏆' },
    { id: 'projects', name: 'Projects', icon: '🚀' }
  ];

  const addItem = (section) => {
    const newItem = section === 'experience' ? {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    } : section === 'education' ? {
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: ''
    } : section === 'skills' ? {
      name: '',
      level: 'Beginner'
    } : section === 'certifications' ? {
      name: '',
      issuer: '',
      date: '',
      credentialId: ''
    } : {
      name: '',
      description: '',
      technologies: '',
      link: ''
    };

    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateItem = (section, index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const generateAISuggestions = () => {
    // AI suggestions for green jobs
    const suggestions = [
      "Experienced in renewable energy project management",
      "Passionate about sustainable development and environmental conservation",
      "Skilled in carbon footprint analysis and green technology implementation",
      "Committed to driving positive environmental impact through innovative solutions"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    updatePersonal('summary', resumeData.personal.summary + (resumeData.personal.summary ? ' ' : '') + randomSuggestion);
  };

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={resumeData.personal.fullName}
            onChange={(e) => updatePersonal('fullName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={resumeData.personal.email}
            onChange={(e) => updatePersonal('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={resumeData.personal.phone}
            onChange={(e) => updatePersonal('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={resumeData.personal.location}
            onChange={(e) => updatePersonal('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="San Francisco, CA"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
        <input
          type="url"
          value={resumeData.personal.linkedin}
          onChange={(e) => updatePersonal('linkedin', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="https://linkedin.com/in/johndoe"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
          <button
            onClick={generateAISuggestions}
            className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI Suggest</span>
          </button>
        </div>
        <textarea
          value={resumeData.personal.summary}
          onChange={(e) => updatePersonal('summary', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Write a compelling summary highlighting your passion for sustainability and green technology..."
        />
      </div>
    </div>
  );

  const renderArraySection = (sectionName) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {sections.find(s => s.id === sectionName)?.name}
        </h3>
        <button
          onClick={() => addItem(sectionName)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add {sectionName.slice(0, -1)}</span>
        </button>
      </div>

      {resumeData[sectionName].map((item, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
          <button
            onClick={() => removeItem(sectionName, index)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          {sectionName === 'experience' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(sectionName, index, 'title', e.target.value)}
                placeholder="Job Title"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                value={item.company}
                onChange={(e) => updateItem(sectionName, index, 'company', e.target.value)}
                placeholder="Company Name"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                value={item.location}
                onChange={(e) => updateItem(sectionName, index, 'location', e.target.value)}
                placeholder="Location"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={item.startDate}
                  onChange={(e) => updateItem(sectionName, index, 'startDate', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="date"
                  value={item.endDate}
                  onChange={(e) => updateItem(sectionName, index, 'endDate', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <textarea
                value={item.description}
                onChange={(e) => updateItem(sectionName, index, 'description', e.target.value)}
                placeholder="Job description and achievements..."
                rows={3}
                className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {sectionName === 'skills' && (
            <div className="flex space-x-4">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(sectionName, index, 'name', e.target.value)}
                placeholder="Skill name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <select
                value={item.level}
                onChange={(e) => updateItem(sectionName, index, 'level', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Resume Builder</h1>
          <p className="text-gray-600">Create a professional resume optimized for green jobs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Save className="h-4 w-4" />
                  <span>Save Draft</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {activeSection === 'personal' && renderPersonalSection()}
              {activeSection !== 'personal' && renderArraySection(activeSection)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;