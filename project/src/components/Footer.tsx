import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Linkedin, Twitter, Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "/#features" },
        { name: "About", href: "/#about" },
        { name: "Green Jobs", href: "/#sustainability" },
        { name: "Contact", href: "/#contact" }
      ]
    },
    {
      title: "Learning",
      links: [
        { name: "Courses", href: "/courses" },
        { name: "Career Guide", href: "#" },
        { name: "Sustainability Blog", href: "#" },
        { name: "Training Programs", href: "#" }
      ]
    },
    {
      title: "Tools",
      links: [
        { name: "Resume Builder", href: "/resume-builder" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Profile", href: "/profile" },
        { name: "API Documentation", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/bharat-kumar-44bb39364",
      color: "hover:text-blue-600"
    },
    { 
      name: "Twitter", 
      icon: Twitter, 
      href: "#",
      color: "hover:text-blue-400"
    },
    { 
      name: "Instagram", 
      icon: Instagram, 
      href: "https://www.instagram.com/invites/contact/?igsh=drpb9640s9q6&utm_content=sic7ngn",
      color: "hover:text-pink-600"
    },
    { 
      name: "Facebook", 
      icon: Facebook, 
      href: "#",
      color: "hover:text-blue-700"
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">SkillConnect-AI</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Building a sustainable future through AI-powered career development and green innovation. 
              Join thousands of professionals making a positive environmental impact.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">bharat@skillconnect-ai.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91 (456) bkc_error_04</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-gray-700 ${social.color} hover:scale-110`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest green job opportunities and sustainability insights.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-2 rounded-r-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 SkillConnect-AI. All Rights Reserved. | Building a greener tomorrow, today.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;