import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizSystem from './QuizSystem';
import CertificateViewer from './CertificateViewer';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Award, 
  CheckCircle, 
  Lock,
  Download,
  BookOpen,
  MessageCircle,
  Trophy
} from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [completedLessons, setCompletedLessons] = useState(new Set([1, 2]));
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  // Mock course data (in real app, fetch based on id)
  const course = {
    id: 1,
    title: "Introduction to Renewable Energy",
    description: "Master the fundamentals of renewable energy systems including solar, wind, and hydroelectric power. This comprehensive course covers both theoretical concepts and practical applications.",
    instructor: {
      name: "Dr. Sarah Johnson",
      title: "Professor of Environmental Engineering",
      avatar: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100",
      bio: "Dr. Johnson has 15+ years of experience in renewable energy research and has published over 50 papers in the field."
    },
    duration: "6 weeks",
    students: 1234,
    rating: 4.8,
    reviews: 156,
    level: "Beginner",
    price: "Free",
    image: "https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=800",
    certificate: true,
    enrolled: false,
    progress: 25,
    quizScore: null,
    certificateEarned: false,
    modules: [
      {
        id: 1,
        title: "Introduction to Renewable Energy",
        lessons: [
          { id: 1, title: "What is Renewable Energy?", duration: "15 min", type: "video" },
          { id: 2, title: "Types of Renewable Energy", duration: "20 min", type: "video" },
          { id: 3, title: "Global Energy Landscape", duration: "10 min", type: "reading" },
          { id: 4, title: "Quiz: Energy Basics", duration: "5 min", type: "quiz" }
        ]
      },
      {
        id: 2,
        title: "Solar Energy Systems",
        lessons: [
          { id: 5, title: "Solar Panel Technology", duration: "25 min", type: "video" },
          { id: 6, title: "Solar Installation Process", duration: "30 min", type: "video" },
          { id: 7, title: "Case Study: Residential Solar", duration: "15 min", type: "reading" },
          { id: 8, title: "Solar Energy Calculator", duration: "20 min", type: "interactive" }
        ]
      },
      {
        id: 3,
        title: "Wind Energy",
        lessons: [
          { id: 9, title: "Wind Turbine Design", duration: "20 min", type: "video" },
          { id: 10, title: "Wind Farm Development", duration: "25 min", type: "video" },
          { id: 11, title: "Environmental Impact", duration: "15 min", type: "reading" },
          { id: 12, title: "Quiz: Wind Energy", duration: "10 min", type: "quiz" }
        ]
      },
      {
        id: 4,
        title: "Final Assessment",
        lessons: [
          { id: 13, title: "Comprehensive Quiz", duration: "30 min", type: "quiz" },
          { id: 14, title: "Course Certificate", duration: "5 min", type: "certificate" }
        ]
      }
    ],
    skills: ["Solar Energy", "Wind Power", "Energy Analysis", "Sustainability", "Environmental Impact"],
    requirements: [
      "Basic understanding of physics",
      "Interest in environmental topics",
      "No prior experience required"
    ],
    outcomes: [
      "Understand different types of renewable energy",
      "Analyze energy systems and their efficiency",
      "Design basic renewable energy solutions",
      "Evaluate environmental impacts"
    ]
  };

  const toggleLessonComplete = (lessonId) => {
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
    } else {
      newCompleted.add(lessonId);
    }
    setCompletedLessons(newCompleted);
  };

  const handleQuizComplete = (score) => {
    setShowQuiz(false);
    course.quizScore = score;
    if (score >= 70) {
      course.certificateEarned = true;
      setCourseCompleted(true);
      // Add lesson 14 (certificate) to completed
      setCompletedLessons(prev => new Set([...prev, 14]));
    }
  };

  const handleLessonClick = (lesson) => {
    if (lesson.type === 'quiz' && lesson.id === 13) {
      setShowQuiz(true);
    } else if (lesson.type === 'certificate' && course.certificateEarned) {
      setShowCertificate(true);
    } else if (!isLocked(lesson.id)) {
      toggleLessonComplete(lesson.id);
    }
  };

  const isLocked = (lessonId) => {
    return !course.enrolled && lessonId > 2;
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video': return Play;
      case 'reading': return BookOpen;
      case 'quiz': return MessageCircle;
      case 'interactive': return Award;
      case 'certificate': return Trophy;
      default: return BookOpen;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'curriculum', name: 'Curriculum' },
    { id: 'instructor', name: 'Instructor' },
    { id: 'reviews', name: 'Reviews' }
  ];

  if (showQuiz) {
    return <QuizSystem courseId={course.id} onComplete={handleQuizComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Course Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {course.price}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-600 text-lg mb-6">{course.description}</p>
              
              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{course.students} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-gray-600">{course.rating} ({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Certificate included</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300">
                  {course.enrolled ? 'Continue Learning' : 'Enroll Now'}
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Course Video/Image */}
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 lg:h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                <button className="bg-white/90 backdrop-blur-sm p-4 rounded-full hover:bg-white transition-colors">
                  <Play className="h-8 w-8 text-gray-900 ml-1" />
                </button>
              </div>
              {course.enrolled && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What you'll learn</h3>
                      <ul className="space-y-2">
                        {course.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Skills you'll gain</h3>
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === 'curriculum' && (
                  <div className="space-y-6">
                    {course.modules.map((module, moduleIndex) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Module {moduleIndex + 1}: {module.title}
                          </h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {module.lessons.map((lesson) => {
                            const LessonIcon = getLessonIcon(lesson.type);
                            const isCompleted = completedLessons.has(lesson.id);
                            const locked = isLocked(lesson.id);
                            
                            return (
                              <div
                                key={lesson.id}
                                className={`px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                                  locked ? 'opacity-50' : 'cursor-pointer'
                                }`}
                                onClick={() => handleLessonClick(lesson)}
                              >
                                <div className="flex items-center space-x-4">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    isCompleted ? 'bg-green-100' : 
                                    lesson.type === 'certificate' && course.certificateEarned ? 'bg-yellow-100' :
                                    'bg-gray-100'
                                  }`}>
                                    {locked ? (
                                      <Lock className="h-4 w-4 text-gray-400" />
                                    ) : isCompleted ? (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : lesson.type === 'certificate' && course.certificateEarned ? (
                                      <Trophy className="h-4 w-4 text-yellow-600" />
                                    ) : (
                                      <LessonIcon className="h-4 w-4 text-gray-600" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                    <p className="text-sm text-gray-500 capitalize">
                                      {lesson.type === 'certificate' ? 'Certificate Available' : lesson.type}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                                  {lesson.type === 'quiz' && course.quizScore && (
                                    <p className="text-xs text-green-600 font-medium">
                                      Score: {course.quizScore}%
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Instructor Tab */}
                {activeTab === 'instructor' && (
                  <div className="space-y-6">
                    <div className="flex items-start space-x-6">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{course.instructor.name}</h3>
                        <p className="text-green-600 font-medium mb-2">{course.instructor.title}</p>
                        <p className="text-gray-600">{course.instructor.bio}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-4xl font-bold text-gray-900">{course.rating}</div>
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(course.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{course.reviews} reviews</p>
                      </div>
                    </div>
                    
                    {/* Sample Reviews */}
                    <div className="space-y-4">
                      {[
                        { name: "John Doe", rating: 5, comment: "Excellent course! Very comprehensive and well-structured.", date: "2 weeks ago" },
                        { name: "Jane Smith", rating: 4, comment: "Great content, but could use more practical examples.", date: "1 month ago" },
                        { name: "Mike Johnson", rating: 5, comment: "Perfect introduction to renewable energy. Highly recommended!", date: "1 month ago" }
                      ].map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 font-medium text-sm">
                                  {review.name.charAt(0)}
                                </span>
                              </div>
                              <span className="font-medium text-gray-900">{review.name}</span>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center space-x-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Progress (if enrolled) */}
            {course.enrolled && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {completedLessons.size} of {course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons completed
                  </div>
                </div>
              </div>
            )}

            {/* Related Courses */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Courses</h3>
              <div className="space-y-4">
                {[
                  { title: "Solar Energy Systems", price: "$49", rating: 4.7 },
                  { title: "Wind Power Engineering", price: "$59", rating: 4.8 },
                  { title: "Energy Storage Solutions", price: "$39", rating: 4.6 }
                ].map((relatedCourse, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{relatedCourse.title}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-semibold text-sm">{relatedCourse.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500">{relatedCourse.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateViewer
          certificate={{
            title: course.title,
            studentName: "Alex Johnson",
            completionDate: new Date().toLocaleDateString(),
            score: course.quizScore,
            instructor: course.instructor.name,
            certificateId: `SC-${course.id}-${Date.now()}`
          }}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default CourseDetail;