// LevelDetail.tsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Badge, Button, ProgressBar } from '../common';
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Clock, 
  Award,
  ArrowLeft,
  Target,
  CheckSquare,
  Square
} from 'lucide-react';

const LevelDetail: React.FC = () => {
  const { levelId } = useParams();
  const [activeTab, setActiveTab] = useState<'vocabulary' | 'exercises'>('vocabulary');
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Mock data
  const levelData = {
    id: levelId,
    name: 'Level 3 - Family & Friends',
    description: 'Học từ vựng về các thành viên trong gia đình và bạn bè',
    progress: 65,
    vocabularyCount: 30,
    exerciseCount: 4,
    completedExercises: 1,
    estimatedTime: 40,
    
    vocabulary: [
      {
        id: '1',
        word: 'father',
        pronunciation: '/ˈfɑː.ðər/',
        definition: 'cha, bố',
        example: 'My father is a teacher.',
        partOfSpeech: 'noun',
        audioUrl: '/audio/father.mp3',
        imageUrl: '/images/family/father.jpg',
        isLearned: true
      },
      {
        id: '2',
        word: 'mother',
        pronunciation: '/ˈmʌð.ər/',
        definition: 'mẹ',
        example: 'Her mother cooks very well.',
        partOfSpeech: 'noun',
        audioUrl: '/audio/mother.mp3',
        imageUrl: '/images/family/mother.jpg',
        isLearned: true
      },
      {
        id: '3',
        word: 'sibling',
        pronunciation: '/ˈsɪb.lɪŋ/',
        definition: 'anh chị em ruột',
        example: 'I have two siblings.',
        partOfSpeech: 'noun',
        audioUrl: '/audio/sibling.mp3',
        imageUrl: '/images/family/siblings.jpg',
        isLearned: false
      }
      // ... more vocabulary
    ],
    
    exercises: [
      {
        id: 'ex1',
        title: 'Nối từ',
        description: 'Kéo thả để nối từ với định nghĩa phù hợp',
        type: 'matching',
        points: 20,
        timeLimit: 180,
        isCompleted: true,
        difficulty: 'easy',
        isRequired: true,
        order: 1
      },
      {
        id: 'ex2',
        title: 'Trắc nghiệm',
        description: 'Chọn đáp án đúng cho câu hỏi',
        type: 'multiple-choice',
        points: 25,
        timeLimit: 240,
        isCompleted: false,
        difficulty: 'easy',
        isRequired: true,
        order: 2
      },
      {
        id: 'ex3',
        title: 'Điền từ',
        description: 'Điền từ thích hợp vào chỗ trống',
        type: 'fill-blank',
        points: 30,
        timeLimit: 300,
        isCompleted: false,
        difficulty: 'medium',
        isRequired: true,
        order: 3
      },
      {
        id: 'ex4',
        title: 'Bài tập tổng hợp',
        description: 'Tổng hợp tất cả kỹ năng đã học',
        type: 'comprehensive',
        points: 50,
        timeLimit: 600,
        isCompleted: false,
        difficulty: 'hard',
        isRequired: false,
        order: 4,
        unlockCondition: 'complete_all_exercises'
      }
    ]
  };

  const toggleWordSelection = (wordId: string) => {
    setSelectedWords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(wordId)) {
        newSet.delete(wordId);
      } else {
        newSet.add(wordId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedWords(new Set());
    } else {
      const allWordIds = new Set(levelData.vocabulary.map(word => word.id));
      setSelectedWords(allWordIds);
    }
    setSelectAll(!selectAll);
  };

  const canAccessComprehensive = levelData.exercises
    .filter(ex => ex.isRequired)
    .every(ex => ex.isCompleted);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link
            to={`/learning/tier/A1`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <Badge variant="info" className="mb-2">
              Level {levelId}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900">
              {levelData.name}
            </h1>
            <p className="text-gray-600 mt-1">{levelData.description}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {levelData.progress}%
          </div>
          <p className="text-gray-600">Tiến độ level</p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="mb-6" padding="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{levelData.vocabularyCount}</p>
            <p className="text-gray-600">Từ vựng</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {levelData.completedExercises}/{levelData.exerciseCount}
            </p>
            <p className="text-gray-600">Bài tập</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{levelData.estimatedTime}</p>
            <p className="text-gray-600">Phút ước tính</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{levelData.progress}%</p>
            <p className="text-gray-600">Hoàn thành</p>
          </div>
        </div>
        
        <ProgressBar progress={levelData.progress} color="blue" height="lg" className="mt-4" />
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('vocabulary')}
          className={`flex-1 py-3 px-4 rounded-md text-center font-medium transition-colors ${
            activeTab === 'vocabulary'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen className="h-5 w-5 inline mr-2" />
          Sổ tay từ vựng ({levelData.vocabularyCount})
        </button>
        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex-1 py-3 px-4 rounded-md text-center font-medium transition-colors ${
            activeTab === 'exercises'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Target className="h-5 w-5 inline mr-2" />
          Bài tập ({levelData.exerciseCount})
        </button>
      </div>

      {/* Vocabulary Tab */}
      {activeTab === 'vocabulary' && (
        <div>
          {/* Select All Action */}
          <Card className="mb-4" padding="md">
            <div className="flex items-center justify-between">
              <button
                onClick={handleSelectAll}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {selectAll ? (
                  <CheckSquare className="h-5 w-5" />
                ) : (
                  <Square className="h-5 w-5" />
                )}
                <span>{selectAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}</span>
              </button>
              
              {selectedWords.size > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">{selectedWords.size} từ đã chọn</span>
                  <Button size="sm" variant="success">
                    Đánh dấu đã học
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Vocabulary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {levelData.vocabulary.map((word) => (
              <Card 
                key={word.id} 
                className={`hover:shadow-lg transition-all cursor-pointer ${
                  selectedWords.has(word.id) ? 'ring-2 ring-blue-500' : ''
                }`}
                padding="md"
                onClick={() => toggleWordSelection(word.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{word.word}</h3>
                    <p className="text-gray-500 text-sm">{word.pronunciation}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {word.isLearned && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    )}
                    {selectedWords.has(word.id) ? (
                      <CheckSquare className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-300" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <Badge variant="info" size="sm" className="mb-1">
                      {word.partOfSpeech}
                    </Badge>
                    <p className="text-gray-700">{word.definition}</p>
                  </div>
                  
                  <div className="text-sm text-gray-600 italic">
                    "{word.example}"
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      🔊 Nghe
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      📖 Chi tiết
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Exercises Tab */}
      {activeTab === 'exercises' && (
        <div className="space-y-4">
          {levelData.exercises.map((exercise) => {
            const isLocked = exercise.type === 'comprehensive' && !canAccessComprehensive;
            
            return (
              <Card 
                key={exercise.id} 
                className={`hover:shadow-lg transition-all ${
                  exercise.isCompleted ? 'border-green-200' : ''
                } ${isLocked ? 'opacity-60' : ''}`}
                padding="lg"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {exercise.isCompleted && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                      {isLocked && (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {exercise.title}
                          {exercise.isRequired && (
                            <Badge variant="warning" className="ml-2">
                              Bắt buộc
                            </Badge>
                          )}
                        </h3>
                        <p className="text-gray-600">{exercise.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <Badge variant={
                        exercise.difficulty === 'easy' ? 'success' :
                        exercise.difficulty === 'medium' ? 'warning' : 'danger'
                      }>
                        {exercise.difficulty}
                      </Badge>
                      <span>⏱️ {exercise.timeLimit} giây</span>
                      <span>🎯 {exercise.points} điểm</span>
                      <span>📝 {exercise.type}</span>
                      
                      {exercise.type === 'comprehensive' && !canAccessComprehensive && (
                        <Badge variant="danger">
                          Cần hoàn thành bài tập trước
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-4">
                    <Link
                      to={!isLocked ? `/learning/exercise/${exercise.id}` : '#'}
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                        isLocked
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : exercise.isCompleted
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isLocked ? (
                        'Đang khóa'
                      ) : exercise.isCompleted ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Làm lại
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Bắt đầu
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LevelDetail;