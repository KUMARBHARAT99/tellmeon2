import React from 'react';
import { CheckCircle, ExternalLink, TrendingUp, Users, Award, Globe } from 'lucide-react';

const About = () => {
  const features = [
    "AI-driven career matching with 95% accuracy",
    "Partnership with 500+ green companies",
    "Blockchain-verified sustainability credentials",
    "Real-time environmental impact tracking"
  ];

  const stats = [
    { number: "10K+", label: "Green Jobs Matched", icon: TrendingUp },
    { number: "500+", label: "Partner Companies", icon: Users },
    { number: "95%", label: "Match Accuracy", icon: Award },
    { number: "50+", label: "Countries Served", icon: Globe }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                SkillConnect-AI
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're revolutionizing the intersection of artificial intelligence and sustainable development, 
              creating a platform that doesn't just find jobs—it builds a greener future.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://sites.google.com/view/ai-tech99/home"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105"
            >
              <span>View Our Projects</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;