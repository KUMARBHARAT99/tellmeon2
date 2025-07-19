import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Award, Clock, RotateCcw, ArrowRight } from 'lucide-react';

const QuizSystem = ({ courseId, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [score, setScore] = useState(0);

  const quizData = {
    title: "Renewable Energy Fundamentals Quiz",
    questions: [
      {
        id: 1,
        question: "Which renewable energy source has the highest global capacity?",
        options: [
          "Solar Power",
          "Wind Power", 
          "Hydroelectric Power",
          "Geothermal Power"
        ],
        correct: 2,
        explanation: "Hydroelectric power currently has the highest global installed capacity among renewable sources."
      },
      {
        id: 2,
        question: "What percentage of global electricity comes from renewable sources?",
        options: ["15%", "25%", "30%", "45%"],
        correct: 2,
        explanation: "Approximately 30% of global electricity generation comes from renewable energy sources."
      },
      {
        id: 3,
        question: "Which country leads in solar energy production?",
        options: ["Germany", "China", "United States", "Japan"],
        correct: 1,
        explanation: "China is the world's largest producer of solar energy, accounting for over 30% of global production."
      },
      {
        id: 4,
        question: "What is the main advantage of wind energy?",
        options: [
          "Low maintenance cost",
          "Zero emissions during operation",
          "Consistent power output",
          "Small land footprint"
        ],
        correct: 1,
        explanation: "Wind energy produces zero emissions during operation, making it environmentally friendly."
      },
      {
        id: 5,
        question: "Which technology is used to store renewable energy?",
        options: [
          "Battery systems",
          "Pumped hydro storage",
          "Compressed air storage",
          "All of the above"
        ],
        correct: 3,
        explanation: "All these technologies are used for renewable energy storage, each with specific applications."
      }
    ]
  };

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quizData.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(300);
    setScore(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const percentage = Math.round((score / quizData.questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <Award className="h-12 w-12 text-green-600" />
            ) : (
              <XCircle className="h-12 w-12 text-red-600" />
            )}
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {passed ? 'Congratulations! 🎉' : 'Keep Learning! 📚'}
          </h2>
          
          <div className="text-6xl font-bold mb-4">
            <span className={passed ? 'text-green-600' : 'text-red-600'}>
              {percentage}%
            </span>
          </div>
          
          <p className="text-xl text-gray-600 mb-6">
            You scored {score} out of {quizData.questions.length} questions correctly
          </p>

          {passed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium">
                🏆 You've earned a certificate! It will be added to your profile.
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retake Quiz</span>
            </button>
            
            {passed && (
              <button
                onClick={() => onComplete && onComplete(percentage)}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <span>Continue Course</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Review Answers */}
          <div className="mt-8 text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Review Answers</h3>
            <div className="space-y-4">
              {quizData.questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                        isCorrect ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          Your answer: {question.options[userAnswer] || 'Not answered'}
                        </p>
                        <p className="text-sm text-green-600 mb-2">
                          Correct answer: {question.options[question.correct]}
                        </p>
                        <p className="text-sm text-gray-500">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{quizData.title}</h1>
            <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-1">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-green-100 text-sm mt-2">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(question.id, index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[question.id] === index
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[question.id] === index
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[question.id] === index && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="text-sm text-gray-500">
              {Object.keys(selectedAnswers).length} of {quizData.questions.length} answered
            </div>
            
            <button
              onClick={handleNext}
              disabled={selectedAnswers[question.id] === undefined}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>
                {currentQuestion === quizData.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSystem;