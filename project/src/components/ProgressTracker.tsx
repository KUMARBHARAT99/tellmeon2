import React, { useState, useEffect } from 'react';
import { Trophy, Target, BookOpen, Award, TrendingUp, Calendar } from 'lucide-react';

const ProgressTracker = () => {
  const [userProgress, setUserProgress] = useState({
    totalCourses: 12,
    completedCourses: 8,
    certificates: 5,
    skillPoints: 850,
    currentStreak: 15,
    totalStudyHours: 45,
    weeklyGoal: 10,
    weeklyProgress: 7
  });

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first course",
      icon: BookOpen,
      unlocked: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Complete 5 courses",
      icon: Target,
      unlocked: true,
      date: "2024-02-20"
    },
    {
      id: 3,
      title: "Sustainability Expert",
      description: "Earn 3 certificates",
      icon: Award,
      unlocked: true,
      date: "2024-03-01"
    },
    {
      id: 4,
      title: "Streak Master",
      description: "Maintain 30-day learning streak",
      icon: TrendingUp,
      unlocked: false,
      progress: 15,
      target: 30
    },
    {
      id: 5,
      title: "Green Champion",
      description: "Complete all renewable energy courses",
      icon: Trophy,
      unlocked: false,
      progress: 3,
      target: 5
    }
  ]);

  const skillCategories = [
    { name: "Renewable Energy", level: 85, color: "bg-green-500" },
    { name: "Sustainability", level: 70, color: "bg-blue-500" },
    { name: "Climate Tech", level: 60, color: "bg-purple-500" },
    { name: "Green Business", level: 45, color: "bg-orange-500" },
    { name: "Environmental Science", level: 55, color: "bg-teal-500" }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 1.5 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 0.5 },
    { day: 'Fri', hours: 2 },
    { day: 'Sat', hours: 1 },
    { day: 'Sun', hours: 0 }
  ];

  const completionPercentage = Math.round((userProgress.completedCourses / userProgress.totalCourses) * 100);
  const weeklyPercentage = Math.round((userProgress.weeklyProgress / userProgress.weeklyGoal) * 100);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Courses Completed</p>
              <p className="text-3xl font-bold">{userProgress.completedCourses}/{userProgress.totalCourses}</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-200" />
          </div>
          <div className="mt-4">
            <div className="bg-green-400/30 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-green-100 text-sm mt-2">{completionPercentage}% Complete</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Certificates Earned</p>
              <p className="text-3xl font-bold">{userProgress.certificates}</p>
            </div>
            <Award className="h-8 w-8 text-blue-200" />
          </div>
          <p className="text-blue-100 text-sm mt-4">+2 this month</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Skill Points</p>
              <p className="text-3xl font-bold">{userProgress.skillPoints}</p>
            </div>
            <Target className="h-8 w-8 text-purple-200" />
          </div>
          <p className="text-purple-100 text-sm mt-4">Level 8 Learner</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Learning Streak</p>
              <p className="text-3xl font-bold">{userProgress.currentStreak}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-200" />
          </div>
          <p className="text-orange-100 text-sm mt-4">days in a row</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Weekly Goal</h3>
            <Calendar className="h-6 w-6 text-gray-400" />
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{userProgress.weeklyProgress}/{userProgress.weeklyGoal} hours</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(weeklyPercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {weeklyPercentage >= 100 ? '🎉 Goal achieved!' : `${userProgress.weeklyGoal - userProgress.weeklyProgress} hours to go`}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">This Week's Activity</h4>
            <div className="grid grid-cols-7 gap-2">
              {weeklyActivity.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                  <div 
                    className="bg-green-100 rounded h-16 flex items-end justify-center relative"
                  >
                    <div 
                      className="bg-green-500 rounded w-full transition-all duration-500"
                      style={{ height: `${(day.hours / 3) * 100}%` }}
                    ></div>
                    <span className="absolute bottom-1 text-xs text-white font-medium">
                      {day.hours}h
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Levels */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Skill Levels</h3>
          <div className="space-y-4">
            {skillCategories.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${skill.color} h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                achievement.unlocked 
                  ? 'border-green-200 bg-green-50 hover:shadow-lg' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  achievement.unlocked 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-500'
                }`}>
                  <achievement.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  
                  {achievement.unlocked ? (
                    <p className="text-xs text-green-600 font-medium">
                      Unlocked {achievement.date}
                    </p>
                  ) : (
                    <div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {achievement.progress}/{achievement.target}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;