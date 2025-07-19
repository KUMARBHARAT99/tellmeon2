import React, { useState } from 'react';
import { Leaf, Recycle, TreePine, PanelTop as SolarPanel, Droplets, Factory } from 'lucide-react';

const Sustainability = () => {
  const [activeModal, setActiveModal] = useState(null);

  const sustainabilityCards = [
    {
      id: 'renewable',
      icon: SolarPanel,
      title: "Renewable Energy",
      description: "Discover careers in solar, wind, and hydropower industries with our AI-powered matching system.",
      color: "from-yellow-500 to-orange-500",
      details: {
        overview: "The renewable energy sector is experiencing unprecedented growth, creating millions of jobs worldwide.",
        careers: ["Solar Engineer", "Wind Technician", "Energy Analyst", "Project Manager", "Grid Specialist"],
        growth: "70% faster than average job growth",
        salary: "$45,000 - $120,000+ annually"
      }
    },
    {
      id: 'circular',
      icon: Recycle,
      title: "Circular Economy",
      description: "Join the movement towards waste reduction and sustainable resource management.",
      color: "from-green-500 to-teal-500",
      details: {
        overview: "The circular economy focuses on eliminating waste and maximizing resource efficiency.",
        careers: ["Sustainability Consultant", "Waste Management Specialist", "Product Designer", "Supply Chain Manager"],
        growth: "45% growth in circular economy jobs",
        salary: "$50,000 - $100,000+ annually"
      }
    },
    {
      id: 'climate',
      icon: TreePine,
      title: "Climate Tech",
      description: "Explore cutting-edge technologies fighting climate change and environmental degradation.",
      color: "from-blue-500 to-indigo-500",
      details: {
        overview: "Climate technology is at the forefront of innovation, developing solutions for our planet's biggest challenges.",
        careers: ["Climate Data Scientist", "Carbon Analyst", "Environmental Engineer", "Policy Researcher"],
        growth: "85% increase in climate tech investments",
        salary: "$60,000 - $150,000+ annually"
      }
    }
  ];

  const greenStats = [
    { number: "2.5M", label: "Tons CO₂ Reduced", icon: Leaf },
    { number: "15K", label: "Green Jobs Created", icon: Factory },
    { number: "100+", label: "Sustainable Projects", icon: TreePine }
  ];

  const Modal = ({ card, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className={`bg-gradient-to-r ${card.color} p-6 text-white rounded-t-2xl`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <card.icon className="h-8 w-8" />
              <h3 className="text-2xl font-bold">{card.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Overview</h4>
            <p className="text-gray-600">{card.details.overview}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Career Opportunities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {card.details.careers.map((career, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <span className="text-gray-700 font-medium">{career}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Growth Rate</h4>
              <p className="text-green-600 font-medium">{card.details.growth}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Salary Range</h4>
              <p className="text-blue-600 font-medium">{card.details.salary}</p>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300">
            Explore {card.title} Careers
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="sustainability" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Green Innovation{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Hub
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore sustainable career opportunities and environmental solutions that make a real impact
          </p>
        </div>

        {/* Sustainability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sustainabilityCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{card.description}</p>
              
              <button
                onClick={() => setActiveModal(card)}
                className={`w-full bg-gradient-to-r ${card.color} text-white py-3 px-4 rounded-lg font-semibold hover:scale-105 transition-all duration-300`}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Green Stats */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Our Environmental Impact</h3>
            <p className="text-green-100 text-lg">Making a difference through sustainable career connections</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {greenStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-4xl font-bold mb-2">{stat.number}</h4>
                <p className="text-green-100 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Crisis Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🌍 The Sustainability Challenge
            </h3>
            <p className="text-gray-600 text-lg">
              Only 1% of people actively contribute to sustainability while 99% contribute to pollution. 
              We're changing this imbalance through education and career opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Recycle, title: "Plastic Waste", stat: "380M tons/year", desc: "Only 9% recycled" },
              { icon: Droplets, title: "Water Crisis", stat: "50% population", desc: "Will face scarcity by 2025" },
              { icon: Factory, title: "CO₂ Emissions", stat: "36.3B metric tons", desc: "Global emissions in 2021" },
              { icon: Leaf, title: "Deforestation", stat: "10M hectares", desc: "Lost annually" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                <item.icon className="h-8 w-8 text-red-500 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-2xl font-bold text-red-600 mb-1">{item.stat}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <Modal card={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </section>
  );
};

export default Sustainability;