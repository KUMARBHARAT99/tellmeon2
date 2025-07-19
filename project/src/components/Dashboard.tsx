import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  BookOpen, 
  FileText, 
  Award, 
  TrendingUp, 
  Users, 
  Calendar,
  Bell,
  Target,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const [user] = useState({
    name: "Alex Johnson",
    level: "Intermediate",
    completedCourses: 8,
    certificates: 3,
    skillScore: 85
  });

  const quickActions = [
    {
      title: "Build Resume",
      description: "Create AI-powered resume",
      icon: FileText,
      link: "/resume-builder",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Browse Courses",
      description: "Explore sustainability courses",
      icon: BookOpen,
      link: "/courses",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "View Profile",
      description: "Manage your profile",
      icon: Users,
      link: "/profile",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const recentActivity = [
    { action: "Completed", item: "Renewable Energy Basics", time: "2 hours ago", type: "course" },
    { action: "Earned", item: "Green Technology Certificate", time: "1 day ago", type: "certificate" },
    { action: "Updated", item: "Resume Profile", time: "3 days ago", type: "profile" },
    { action: "Started", item: "Climate Change Solutions", time: "1 week ago", type: "course" }
  ];

  const upcomingEvents = [
    { title: "Sustainability Webinar", date: "March 15", time: "2:00 PM" },
    { title: "Green Tech Workshop", date: "March 20", time: "10:00 AM" },
    { title: "Career Fair", date: "March 25", time: "9:00 AM" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Continue your journey towards a sustainable career
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: "Skill Score", 
              value: `${user.skillScore}%`, 
              icon: Target, 
              color: "from-green-500 to-emerald-500",
              change: "+5% this week"
            },
            { 
              title: "Courses Completed", 
              value: user.completedCourses, 
              icon: BookOpen, 
              color: "from-blue-500 to-cyan-500",
              change: "+2 this month"
            },
            { 
              title: "Certificates", 
              value: user.certificates, 
              icon: Award, 
              color: "from-purple-500 to-indigo-500",
              change: "+1 this month"
            },
            { 
              title: "Network", 
              value: "127", 
              icon: Users, 
              color: "from-orange-500 to-red-500",
              change: "+12 this week"
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
              <p className="text-green-600 text-xs font-medium">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Link>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'course' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'certificate' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {activity.type === 'course' ? <BookOpen className="h-5 w-5" /> :
                       activity.type === 'certificate' ? <Award className="h-5 w-5" /> :
                       <Users className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">
                        {activity.action} <span className="text-green-600">{activity.item}</span>
                      </p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Learning Progress</h3>
                <Zap className="h-6 w-6" />
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Current Level: {user.level}</span>
                  <span>{user.skillScore}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-500"
                    style={{ width: `${user.skillScore}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-green-100 text-sm">
                Complete 2 more courses to reach Advanced level!
              </p>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Upcoming Events</h3>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
                <Bell className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-blue-900">New course available</p>
                  <p className="text-xs text-blue-700">Climate Tech Innovations</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm font-medium text-green-900">Certificate ready</p>
                  <p className="text-xs text-green-700">Renewable Energy Basics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;