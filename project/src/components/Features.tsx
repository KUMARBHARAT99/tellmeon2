import React from 'react';
import { ScrollReveal, HoverGlow } from './InteractiveAnimations';
import { Scaling as Seedling, Building, Shield, TrendingUp, Wifi, GraduationCap, FileText, Users, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Seedling,
      title: "AI-Powered Career Guidance",
      description: "Get personalized recommendations for green careers in renewable energy, sustainable architecture, and climate tech using advanced machine learning.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Building,
      title: "Eco-Friendly Business Management",
      description: "Help companies hire talent aligned with sustainable practices and analyze carbon footprints to suggest greener alternatives.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Blockchain Credentials",
      description: "Secure storage and verification of green certifications and eco-friendly business credentials using decentralized technology.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: TrendingUp,
      title: "Data Analytics for Sustainability",
      description: "Analyze global job trends and climate impact of industries to help make data-driven eco-friendly decisions.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Wifi,
      title: "IoT-Enabled Smart Workspaces",
      description: "Suggest energy-efficient workplaces with IoT monitoring and help companies adopt green infrastructure solutions.",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: GraduationCap,
      title: "Sustainability Training",
      description: "Personalized learning modules on sustainable development and green technologies tailored to your career path.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: FileText,
      title: "AI Resume Builder",
      description: "Create professional resumes optimized for green jobs with AI-powered suggestions and industry-specific templates.",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with like-minded professionals, mentors, and companies in the sustainability sector worldwide.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Award,
      title: "Certification System",
      description: "Earn verified certificates in sustainability skills and showcase your expertise to potential employers.",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for a{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Sustainable Future
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our AI-driven platform transforms career development and creates meaningful impact
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`h-1 w-full bg-gradient-to-r ${feature.color} rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Green Jobs Matched" },
              { number: "500+", label: "Partner Companies" },
              { number: "95%", label: "Match Accuracy" },
              { number: "50+", label: "Countries Served" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;