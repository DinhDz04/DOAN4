// ExercisePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, ProgressBar, Button, Alert } from '../common';
import { Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const ExercisePage: React.FC = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<any[]>([]);

  // Mock exercise data - sẽ kết nối với backend
  const exerciseData = {
    id: exerciseId,
    title: 'Multiple Choice - Family Members',
    type: 'multiple-choice',
    timeLimit: 180, // 3 minutes
    points: 20,
    questions: [
      {
        id: 'q1',
        question: 'What is the English word for "cha"?',
        options: [
          { id: 'a1', text: 'Mother', isCorrect: false },
          { id: 'a2', text: 'Father', isCorrect: true },
          { id: 'a3', text: 'Brother', isCorrect: false },
          { id: 'a4', text: 'Sister', isCorrect: false }
        ],
        explanation: '"Father" means "cha" in Vietnamese.'
      },
      {
        id: 'q2',
        question: 'Choose the correct word for "anh trai":',
        options: [
          { id: 'b1', text: 'Sister', isCorrect: false },
          { id: 'b2', text: 'Younger brother', isCorrect: false },
          { id: 'b3', text: 'Older brother', isCorrect: true },
          { id: 'b4', text: 'Cousin', isCorrect: false }
        ],
        explanation: '"Older brother" means "anh trai" in Vietnamese.'
      }
      // ... more questions
    ]
  };

  useEffect(() => {
    if (exerciseData.timeLimit > 0) {
      setTimeLeft(exerciseData.timeLimit);
      const timer = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, []);

  const handleTimeUp = () => {
    setShowResult(true);
    // Gửi kết quả lên backend
    submitResults();
  };

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
  };

  const handleNext = () => {
    const currentQ = exerciseData.questions[currentQuestion];
    const isCorrect = currentQ.options.find(opt => opt.id === selectedAnswer)?.isCorrect;
    
    // Lưu câu trả lời
    setAnswers(prev => [...prev, {
      questionId: currentQ.id,
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect,
      timeSpent: exerciseData.timeLimit - timeLeft
    }]);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < exerciseData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      submitResults();
    }
  };

  const submitResults = async () => {
    // Gửi kết quả lên backend
    const result = {
      exerciseId: exerciseId,
      score: score,
      totalQuestions: exerciseData.questions.length,
      timeSpent: exerciseData.timeLimit - timeLeft,
      answers: answers
    };
    
    console.log('Submitting results:', result);
    // await api.submitExerciseResult(result);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center" padding="lg">
          <div className="mb-6">
            {score === exerciseData.questions.length ? (
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            )}
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {score === exerciseData.questions.length ? 'Xuất sắc!' : 'Hoàn thành!'}
            </h1>
            <p className="text-gray-600 mb-6">
              Bạn đã hoàn thành bài tập {exerciseData.title}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-blue-600">Câu đúng</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((score / exerciseData.questions.length) * 100)}%
              </div>
              <div className="text-sm text-green-600">Tỷ lệ đúng</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {formatTime(exerciseData.timeLimit - timeLeft)}
              </div>
              <div className="text-sm text-purple-600">Thời gian</div>
            </div>
          </div>

          <div className="flex space-x-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/learning/level/`)}
            >
              Quay lại level
            </Button>
            <Button 
              variant="primary"
              onClick={() => navigate(`/learning/exercise/${exerciseId}/review`)}
            >
              Xem lại đáp án
            </Button>
            <Button 
              variant="success"
              onClick={() => navigate(`/learning/exercise/`)}
            >
              Bài tiếp theo
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestionData = exerciseData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / exerciseData.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <Card className="mb-6" padding="md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{exerciseData.title}</h1>
            <p className="text-gray-600">
              Câu {currentQuestion + 1} của {exerciseData.questions.length}
            </p>
          </div>
          
          {exerciseData.timeLimit > 0 && (
            <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg">
              <Clock className="h-5 w-5 text-red-600" />
              <span className="text-red-600 font-bold">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        <ProgressBar progress={progress} color="blue" className="mt-4" />
      </Card>

      {/* Question */}
      <Card className="mb-6" padding="lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQuestionData.question}
        </h2>

        <div className="space-y-3">
          {currentQuestionData.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                  selectedAnswer === option.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === option.id && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-900">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="ghost"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(prev => prev - 1)}
        >
          Quay lại
        </Button>
        
        <Button
          variant="primary"
          disabled={!selectedAnswer}
          onClick={handleNext}
          icon={<ArrowRight className="h-4 w-4" />}
        >
          {currentQuestion === exerciseData.questions.length - 1 ? 'Kết thúc' : 'Tiếp theo'}
        </Button>
      </div>

      {/* Instructions */}
      <Alert
        type="info"
        message="Chọn một đáp án và nhấn 'Tiếp theo' để chuyển sang câu hỏi kế tiếp."
        className="mt-6"
      />
    </div>
  );
};

export default ExercisePage;