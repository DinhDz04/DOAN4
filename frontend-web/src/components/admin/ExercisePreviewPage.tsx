import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, XCircle, HelpCircle, Menu, X } from 'lucide-react';
import AdminLayout from './AdminLayout';
import Card from '../common/Card';
import Button from '../common/Button';

interface Question {
  id: string;
  type: 'multiple-choice' | 'matching' | 'fill-blank';
  questionText: string;
  points: number;
  imageUrl?: string;
  options?: { id: string; text: string; isCorrect: boolean }[];
  matchingPairs?: { id: string; left: string; right: string }[];
  blanks?: { id: string; position: number; correctAnswer: string }[];
  explanation?: string;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: string;
  points: number;
  timeLimit?: number;
  questions: Question[];
}

const ExercisePreviewPage: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    const fetchExercise = async () => {
      setTimeout(() => {
        setExercise({
          id: exerciseId!,
          title: 'Bài tập trắc nghiệm cơ bản',
          description: 'Chọn đáp án đúng cho các câu hỏi về từ vựng',
          type: 'multiple-choice',
          points: 100,
          timeLimit: 300,
          questions: [
            {
              id: '1',
              type: 'multiple-choice',
              questionText: 'What does "hello" mean?',
              points: 25,
              options: [
                { id: '1', text: 'Xin chào', isCorrect: true },
                { id: '2', text: 'Tạm biệt', isCorrect: false },
                { id: '3', text: 'Cảm ơn', isCorrect: false },
                { id: '4', text: 'Chào mừng', isCorrect: false }
              ],
              explanation: '"Hello" là cách chào hỏi thông dụng trong tiếng Anh, nghĩa là "Xin chào"'
            },
            {
              id: '2',
              type: 'multiple-choice',
              questionText: 'What is the meaning of "goodbye"?',
              points: 25,
              options: [
                { id: '1', text: 'Xin chào', isCorrect: false },
                { id: '2', text: 'Tạm biệt', isCorrect: true },
                { id: '3', text: 'Cảm ơn', isCorrect: false },
                { id: '4', text: 'Chào mừng', isCorrect: false }
              ],
              explanation: '"Goodbye" nghĩa là "Tạm biệt"'
            }
          ]
        });
        setTimeLeft(300);
      }, 500);
    };

    if (exerciseId) {
      fetchExercise();
    }
  }, [exerciseId]);

  useEffect(() => {
    if (!exercise?.timeLimit || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [exercise?.timeLimit, timeLeft]);

  const currentQuestion = exercise?.questions[currentQuestionIndex];

  const handleAnswer = (answer: any) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion!.id]: answer
    }));
  };

  const handleNext = () => {
    if (exercise && currentQuestionIndex < exercise.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsCompleted(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!exercise) return 0;
    
    let totalScore = 0;
    exercise.questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      if (question.type === 'multiple-choice' && userAnswer) {
        const selectedOption = question.options?.find(opt => opt.id === userAnswer);
        if (selectedOption?.isCorrect) {
          totalScore += question.points;
        }
      }
    });
    
    return totalScore;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!exercise || !currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout currentPage="learning-path">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 break-words">
                {exercise.title}
              </h1>
              <p className="text-gray-600 text-sm md:text-base break-words">
                {exercise.description}
              </p>
            </div>
          </div>
          {exercise.timeLimit && (
            <div className="flex items-center space-x-2 text-red-600 font-semibold">
              <Clock className="h-5 w-5" />
              <span className="text-lg">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="block lg:hidden mb-4">
          <Button
            variant="secondary"
            onClick={() => setShowMobileNav(!showMobileNav)}
            icon={showMobileNav ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            fullWidth
          >
            {showMobileNav ? "Đóng danh sách câu hỏi" : "Mở danh sách câu hỏi"}
          </Button>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 md:p-4 mb-6">
          <p className="text-yellow-700 text-sm md:text-base">
            <strong>Chế độ xem trước:</strong> Bạn có thể làm thử bài tập để kiểm tra
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {!isCompleted ? (
              /* Exercise in progress */
              <Card>
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Câu {currentQuestionIndex + 1} / {exercise.questions.length}</span>
                    <span>{currentQuestion.points} điểm</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / exercise.questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 break-words">{currentQuestion.questionText}</h3>
                  
                  {currentQuestion.type === 'multiple-choice' && (
                    <div className="space-y-3">
                      {currentQuestion.options?.map(option => (
                        <label key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value={option.id}
                            checked={userAnswers[currentQuestion.id] === option.id}
                            onChange={() => handleAnswer(option.id)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="break-words flex-1">{option.text}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Add other question types here */}
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <Button 
                    variant="secondary" 
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="w-full sm:w-auto justify-center"
                  >
                    Câu trước
                  </Button>
                  
                  {currentQuestionIndex === exercise.questions.length - 1 ? (
                    <Button variant="primary" onClick={handleSubmit} className="w-full sm:w-auto justify-center">
                      Nộp bài
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleNext} className="w-full sm:w-auto justify-center">
                      Câu tiếp theo
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              /* Results */
              <Card>
                <div className="text-center mb-6">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Kết quả bài tập</h2>
                  <p className="text-gray-600 text-base md:text-lg">
                    Điểm số: <span className="font-bold text-blue-600">{calculateScore()}/{exercise.points}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  {exercise.questions.map((question, index) => {
                    const userAnswer = userAnswers[question.id];
                    const isCorrect = question.type === 'multiple-choice' && 
                      question.options?.find(opt => opt.id === userAnswer)?.isCorrect;

                    return (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <h4 className="font-semibold text-sm md:text-base break-words">
                            Câu {index + 1}: {question.questionText}
                          </h4>
                        </div>
                        
                        {question.explanation && (
                          <div className="bg-gray-50 p-3 rounded-lg mt-2">
                            <div className="flex items-center space-x-2 text-sm text-gray-700">
                              <HelpCircle className="h-4 w-4" />
                              <span className="font-medium">Giải thích:</span>
                            </div>
                            <p className="text-sm mt-1 break-words">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center mt-6">
                  <Button variant="primary" onClick={() => {
                    setCurrentQuestionIndex(0);
                    setUserAnswers({});
                    setIsCompleted(false);
                    setShowResults(false);
                    setTimeLeft(exercise.timeLimit || 0);
                  }} className="w-full sm:w-auto justify-center">
                    Làm lại
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Question Navigation Sidebar */}
          <div className={`lg:col-span-1 ${showMobileNav ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <h4 className="font-semibold mb-3 text-sm md:text-base">Danh sách câu hỏi</h4>
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {exercise.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => !isCompleted && setCurrentQuestionIndex(index)}
                    className={`p-2 rounded text-sm transition-colors ${
                      index === currentQuestionIndex
                        ? 'bg-blue-600 text-white'
                        : userAnswers[exercise.questions[index].id]
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } ${isCompleted ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ExercisePreviewPage;