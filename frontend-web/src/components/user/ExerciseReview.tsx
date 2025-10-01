// ExerciseReview.tsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, Badge, Button, ProgressBar } from '../common';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  Play, 
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Award
} from 'lucide-react';

const ExerciseReview: React.FC = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  // Mock data - sẽ kết nối với backend
  const reviewData = {
    exercise: {
      id: exerciseId,
      title: 'Multiple Choice - Family Members',
      type: 'multiple-choice',
      points: 20,
      totalQuestions: 5,
      correctAnswers: 4,
      timeSpent: 145, // seconds
      completedAt: '2024-01-20T10:30:00Z'
    },
    questions: [
      {
        id: 'q1',
        question: 'What is the English word for "cha"?',
        userAnswer: 'a2',
        correctAnswer: 'a2',
        isCorrect: true,
        options: [
          { id: 'a1', text: 'Mother', isCorrect: false },
          { id: 'a2', text: 'Father', isCorrect: true },
          { id: 'a3', text: 'Brother', isCorrect: false },
          { id: 'a4', text: 'Sister', isCorrect: false }
        ],
        explanation: '"Father" means "cha" in Vietnamese.',
        timeSpent: 25
      },
      {
        id: 'q2',
        question: 'Choose the correct word for "anh trai":',
        userAnswer: 'b3',
        correctAnswer: 'b3',
        isCorrect: true,
        options: [
          { id: 'b1', text: 'Sister', isCorrect: false },
          { id: 'b2', text: 'Younger brother', isCorrect: false },
          { id: 'b3', text: 'Older brother', isCorrect: true },
          { id: 'b4', text: 'Cousin', isCorrect: false }
        ],
        explanation: '"Older brother" means "anh trai" in Vietnamese.',
        timeSpent: 30
      },
      {
        id: 'q3',
        question: 'What does "sibling" mean?',
        userAnswer: 'c1',
        correctAnswer: 'c4',
        isCorrect: false,
        options: [
          { id: 'c1', text: 'Parents', isCorrect: false },
          { id: 'c2', text: 'Grandparents', isCorrect: false },
          { id: 'c3', text: 'Children', isCorrect: false },
          { id: 'c4', text: 'Brothers or sisters', isCorrect: true }
        ],
        explanation: 'Sibling refers to brothers or sisters.',
        timeSpent: 45
      },
      {
        id: 'q4',
        question: 'Select the word for "chị gái":',
        userAnswer: 'd3',
        correctAnswer: 'd3',
        isCorrect: true,
        options: [
          { id: 'd1', text: 'Brother', isCorrect: false },
          { id: 'd2', text: 'Younger sister', isCorrect: false },
          { id: 'd3', text: 'Older sister', isCorrect: true },
          { id: 'd4', text: 'Mother', isCorrect: false }
        ],
        explanation: '"Older sister" means "chị gái" in Vietnamese.',
        timeSpent: 20
      },
      {
        id: 'q5',
        question: 'What is "grandfather" in Vietnamese?',
        userAnswer: 'e2',
        correctAnswer: 'e1',
        isCorrect: false,
        options: [
          { id: 'e1', text: 'Ông', isCorrect: true },
          { id: 'e2', text: 'Bà', isCorrect: false },
          { id: 'e3', text: 'Bố', isCorrect: false },
          { id: 'e4', text: 'Chú', isCorrect: false }
        ],
        explanation: '"Grandfather" is "ông" in Vietnamese.',
        timeSpent: 25
      }
    ]
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const scorePercentage = (reviewData.exercise.correctAnswers / reviewData.exercise.totalQuestions) * 100;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  };

  const getPerformanceText = (percentage: number) => {
    if (percentage >= 90) return 'Xuất sắc!';
    if (percentage >= 80) return 'Rất tốt!';
    if (percentage >= 70) return 'Tốt!';
    if (percentage >= 60) return 'Khá';
    return 'Cần cố gắng thêm';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link
            to={`/learning/exercise/${exerciseId}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <Badge variant="info" className="mb-2">
              Xem lại bài tập
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900">
              {reviewData.exercise.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <Card className="mb-6" padding="lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {scorePercentage}%
            </p>
            <p className="text-gray-600">Điểm số</p>
            <Badge variant={getPerformanceColor(scorePercentage)} className="mt-2">
              {getPerformanceText(scorePercentage)}
            </Badge>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {reviewData.exercise.correctAnswers}/{reviewData.exercise.totalQuestions}
            </p>
            <p className="text-gray-600">Câu đúng</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatTime(reviewData.exercise.timeSpent)}
            </p>
            <p className="text-gray-600">Thời gian</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {reviewData.exercise.points}
            </p>
            <p className="text-gray-600">Điểm nhận được</p>
          </div>
        </div>

        {/* Progress Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tiến độ làm bài</span>
            <span>{reviewData.exercise.correctAnswers}/{reviewData.exercise.totalQuestions} câu đúng</span>
          </div>
          <ProgressBar 
            progress={scorePercentage} 
            color={getPerformanceColor(scorePercentage) as any} 
            height="lg" 
          />
        </div>
      </Card>

      {/* Questions Review */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Chi tiết từng câu hỏi
        </h2>
        
        {reviewData.questions.map((question, index) => {
          const isExpanded = expandedQuestions.has(question.id);
          const userSelectedOption = question.options.find(opt => opt.id === question.userAnswer);
          const correctOption = question.options.find(opt => opt.isCorrect);

          return (
            <Card key={question.id} className="overflow-hidden">
              {/* Question Header */}
              <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleQuestion(question.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    question.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {question.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Câu {index + 1}: {question.question}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>⏱️ {question.timeSpent}s</span>
                      <span className={`font-medium ${
                        question.isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {question.isCorrect ? 'Đúng' : 'Sai'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200 pt-4">
                  {/* Options */}
                  <div className="space-y-3 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Các lựa chọn:</h4>
                    {question.options.map((option) => {
                      let borderColor = 'border-gray-200';
                      let bgColor = 'bg-white';
                      let textColor = 'text-gray-900';

                      if (option.id === question.correctAnswer) {
                        borderColor = 'border-green-500';
                        bgColor = 'bg-green-50';
                        textColor = 'text-green-900';
                      } else if (option.id === question.userAnswer && !question.isCorrect) {
                        borderColor = 'border-red-500';
                        bgColor = 'bg-red-50';
                        textColor = 'text-red-900';
                      }

                      return (
                        <div
                          key={option.id}
                          className={`p-3 rounded-lg border-2 ${borderColor} ${bgColor} ${textColor}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option.text}</span>
                            <div className="flex items-center space-x-2">
                              {option.id === question.correctAnswer && (
                                <Badge variant="success" size="sm">
                                  Đáp án đúng
                                </Badge>
                              )}
                              {option.id === question.userAnswer && !question.isCorrect && (
                                <Badge variant="danger" size="sm">
                                  Bạn chọn
                                </Badge>
                              )}
                              {option.id === question.userAnswer && question.isCorrect && (
                                <Badge variant="success" size="sm">
                                  Bạn chọn đúng
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {question.explanation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">📝 Giải thích:</h4>
                      <p className="text-blue-800">{question.explanation}</p>
                    </div>
                  )}

                  {/* Learning Tip for Wrong Answers */}
                  {!question.isCorrect && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-3">
                      <h4 className="font-medium text-yellow-900 mb-2">💡 Mẹo học tập:</h4>
                      <p className="text-yellow-800">
                        Hãy ôn lại từ vựng này và thử làm lại bài tập sau 1-2 ngày.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Button
          variant="outline"
          onClick={() => navigate('/learning')}
          icon={<BookOpen className="h-4 w-4" />}
        >
          Quay lại học tập
        </Button>
        
        <Button
          variant="primary"
          onClick={() => navigate(`/learning/exercise/${exerciseId}`)}
          icon={<Play className="h-4 w-4" />}
        >
          Làm lại bài tập
        </Button>
        
        <Button
          variant="success"
          onClick={() => navigate('/learning/level/current')}
        >
          Bài tập tiếp theo
        </Button>
      </div>

      {/* Study Recommendations */}
      <Card className="mt-6" padding="md">
        <h3 className="font-semibold text-gray-900 mb-3">📊 Gợi ý học tập</h3>
        <div className="space-y-2 text-sm text-gray-700">
          {scorePercentage >= 80 ? (
            <p>🎉 Bạn đã làm rất tốt! Hãy tiếp tục với các bài tập nâng cao.</p>
          ) : scorePercentage >= 60 ? (
            <p>👍 Khá tốt! Ôn lại các câu sai và thử làm lại bài tập sau.</p>
          ) : (
            <p>💪 Cần ôn tập thêm. Hãy xem lại từ vựng và làm bài tập cơ bản trước.</p>
          )}
          <p>⏰ Thời gian trung bình mỗi câu: {Math.round(reviewData.exercise.timeSpent / reviewData.exercise.totalQuestions)} giây</p>
        </div>
      </Card>
    </div>
  );
};

export default ExerciseReview;