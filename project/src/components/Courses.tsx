import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, BookOpen, Filter, Search, Play, Award } from 'lucide-react';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'renewable-energy', name: 'Renewable Energy' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'climate-tech', name: 'Climate Tech' },
    { id: 'green-business', name: 'Green Business' },
    { id: 'environmental-science', name: 'Environmental Science' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const courses = [
    {
      id: 1,
      title: "Introduction to Renewable Energy",
      description: "Learn the fundamentals of solar, wind, and hydroelectric power systems.",
      instructor: "Dr. Sarah Johnson",
      duration: "6 weeks",
      students: 1234,
      rating: 4.8,
      level: "beginner",
      category: "renewable-energy",
      price: "Free",
      image: "https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=400",
      lessons: 24,
      certificate: true
    },
    {
      id: 2,
      title: "Sustainable Business Practices",
      description: "Discover how to implement eco-friendly strategies in modern business.",
      instructor: "Prof. Michael Chen",
      duration: "8 weeks",
      students: 892,
      rating: 4.9,
      level: "intermediate",
      category: "green-business",
      price: "$49",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      lessons: 32,
      certificate: true
    },
    {
      id: 3,
      title: "Climate Change Solutions",
      description: "Explore innovative technologies and policies addressing climate change.",
      instructor: "Dr. Emily Rodriguez",
      duration: "10 weeks",
      students: 567,
      rating: 4.7,
      level: "advanced",
      category: "climate-tech",
      price: "$79",
      image: "https://images.pexels.com/photos/3039036/pexels-photo-3039036.jpeg?auto=compress&cs=tinysrgb&w=400",
      lessons: 40,
      certificate: true
    },
    {
      id: 4,
      title: "Environmental Impact Assessment",
      description: "Master the skills to evaluate environmental impacts of projects.",
      instructor: "Dr. James Wilson",
      duration: "7 weeks",
      students: 445,
      rating: 4.6,
      level: "intermediate",
      category: "environmental-science",
      price: "$59",
      image: "https://images.pexels.com/photos/3039036/pexels-photo-3039036.jpeg?auto=compress&cs=tinysrgb&w=400",
      lessons: 28,
      certificate: true
    },
    {
      id: 5,
      title: "Green Technology Innovation",
      description: "Dive into cutting-edge green technologies and their applications.",
      instructor: "Dr. Lisa Park",
      duration: "9 weeks",
      students: 723,
      rating: 4.8,
      level: "advanced",
      category: "climate-tech",
      price: "$89",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      lessons: 36,
      certificate: true
    },
    {
      id: 6,
      title: "Sustainability Fundamentals",
      description: "Build a strong foundation in sustainability principles and practices.",
      instructor: "Prof. David Kumar",
      duration: "5 weeks",
      students: 1567,
      rating: 4.9,
      level: "beginner",
      category: "sustainability",
      price: "Free",
      image: "https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=400",
      lessons: 20,
      certificate: true
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sustainability <span className="text-green-600">Courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master green skills with our comprehensive courses designed for the sustainable future
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Courses", value: courses.length, icon: BookOpen },
            { label: "Active Students", value: "5.2K+", icon: Users },
            { label: "Certificates Issued", value: "3.8K+", icon: Award },
            { label: "Average Rating", value: "4.8", icon: Star }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
              <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold text-gray-900">
                    {course.price}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Instructor */}
                <p className="text-green-600 font-medium text-sm mb-4">
                  {course.instructor}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-gray-500">({course.students})</span>
                  </div>
                  {course.certificate && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Award className="h-4 w-4" />
                      <span className="text-xs font-medium">Certificate</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  to={`/course/${course.id}`}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 text-center block"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;