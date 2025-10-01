// TierDetail.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Badge, ProgressBar } from '../common';
import { ArrowLeft, Lock, Unlock, Play, CheckCircle2, BookOpen, Target } from 'lucide-react';

const TierDetail: React.FC = () => {
  const { tierId } = useParams();

  // Mock data - Cây level trong 1 bậc
  const tierData = {
    id: tierId,
    name: 'Beginner A1',
    code: 'A1',
    description: 'Căn bản cho người mới bắt đầu',
    progress: 40,
    levels: [
      {
        id: '1',
        name: 'Level 1 - Greetings',
        description: 'Học cách chào hỏi và giới thiệu bản thân',
        order: 1,
        isLocked: false,
        isCompleted: true,
        progress: 100,
        vocabularyCount: 20,
        exerciseCount: 4,
        completedExercises: 4,
        estimatedTime: 30,
        unlockConditions: []
      },
      {
        id: '2',
        name: 'Level 2 - Numbers & Colors',
        description: 'Số đếm, màu sắc và đồ vật cơ bản',
        order: 2,
        isLocked: false,
        isCompleted: false,
        progress: 75,
        vocabularyCount: 25,
        exerciseCount: 4,
        completedExercises: 3,
        estimatedTime: 35,
        unlockConditions: ['complete_level_1']
      },
      {
        id: '3',
        name: 'Level 3 - Family & Friends',
        description: 'Từ vựng về gia đình và bạn bè',
        order: 3,
        isLocked: true,
        isCompleted: false,
        progress: 25,
        vocabularyCount: 30,
        exerciseCount: 4,
        completedExercises: 1,
        estimatedTime: 40,
        unlockConditions: ['complete_level_2']
      },
      {
        id: '4',
        name: 'Level 4 - Daily Activities',
        description: 'Hoạt động hàng ngày và thói quen',
        order: 4,
        isLocked: true,
        isCompleted: false,
        progress: 0,
        vocabularyCount: 35,
        exerciseCount: 4,
        completedExercises: 0,
        estimatedTime: 45,
        unlockConditions: ['complete_level_3', 'reach_80_points']
      },
      {
        id: '5',
        name: 'Level 5 - Food & Drinks',
        description: 'Đồ ăn, thức uống và nhà hàng',
        order: 5,
        isLocked: true,
        isCompleted: false,
        progress: 0,
        vocabularyCount: 40,
        exerciseCount: 4,
        completedExercises: 0,
        estimatedTime: 50,
        unlockConditions: ['complete_level_4']
      }
    ]
  };

  const getLevelStatus = (level: any) => {
    if (level.isCompleted) return 'completed';
    if (!level.isLocked) return 'in-progress';
    return 'locked';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/learning"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <Badge variant="info" className="mb-2">
              {tierData.code}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900">{tierData.name}</h1>
            <p className="text-gray-600">{tierData.description}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{tierData.progress}%</div>
          <p className="text-gray-600">Tiến độ bậc</p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="mb-6" padding="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {tierData.levels.filter(l => !l.isLocked).length}/{tierData.levels.length}
            </p>
            <p className="text-gray-600">Level mở khóa</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {tierData.levels.filter(l => l.isCompleted).length}
            </p>
            <p className="text-gray-600">Level hoàn thành</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {tierData.levels.reduce((acc, level) => acc + level.completedExercises, 0)}
            </p>
            <p className="text-gray-600">Bài tập đã làm</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Play className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {tierData.levels.reduce((acc, level) => acc + level.exerciseCount, 0)}
            </p>
            <p className="text-gray-600">Tổng bài tập</p>
          </div>
        </div>

        <ProgressBar progress={tierData.progress} color="blue" height="lg" />
      </Card>

      {/* Learning Path Tree */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 transform translate-x-4 z-0 hidden md:block"></div>
        
        <div className="space-y-6 relative z-10">
          {tierData.levels.map((level, index) => {
            const status = getLevelStatus(level);
            const isAccessible = status !== 'locked';
            
            return (
              <div key={level.id} className="flex items-start space-x-4">
                {/* Level Number with Connection */}
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg relative z-10 ${
                    status === 'completed' ? 'bg-green-500' :
                    status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {level.order}
                    {status === 'completed' && (
                      <CheckCircle2 className="absolute -top-1 -right-1 h-6 w-6 text-white bg-green-500 rounded-full" />
                    )}
                  </div>
                  
                  {/* Connection dot */}
                  {index < tierData.levels.length - 1 && (
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                  )}
                </div>

                {/* Level Content */}
                <Card className={`flex-1 transition-all ${
                  !isAccessible ? 'opacity-60' : 'hover:shadow-lg'
                }`} padding="lg">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {level.name}
                        </h3>
                        <Badge variant={
                          status === 'completed' ? 'success' :
                          status === 'in-progress' ? 'info' : 'default'
                        }>
                          {status === 'completed' ? 'Hoàn thành' :
                           status === 'in-progress' ? 'Đang học' : 'Đang khóa'}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{level.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{level.vocabularyCount} từ vựng</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>{level.completedExercises}/{level.exerciseCount} bài tập</span>
                        </div>
                        <div>⏱️ {level.estimatedTime} phút</div>
                        <div className={`font-medium ${
                          status === 'completed' ? 'text-green-600' :
                          status === 'in-progress' ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {level.progress}% hoàn thành
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {status === 'in-progress' && (
                        <div className="mt-3">
                          <ProgressBar progress={level.progress} color="blue" />
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 min-w-[140px]">
                      <Link
                        to={isAccessible ? `/learning/level/${level.id}` : '#'}
                        className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                          isAccessible
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Vào học
                      </Link>
                      
                      {status === 'completed' && (
                        <Link
                          to={`/learning/level/${level.id}/review`}
                          className="flex items-center justify-center px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Ôn tập
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Unlock Conditions */}
                  {status === 'locked' && level.unlockConditions.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800 font-medium">
                        Điều kiện mở khóa:
                      </p>
                      <ul className="text-sm text-yellow-700 mt-1">
                        {level.unlockConditions.map((condition, idx) => (
                          <li key={idx}>• {condition}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Reward */}
      {tierData.progress === 100 && (
        <Card className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white" padding="lg">
          <div className="text-center">
            <CheckCircle2 className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Chúc mừng!</h3>
            <p className="text-green-100 mb-4">
              Bạn đã hoàn thành bậc {tierData.code}. Sẵn sàng cho bậc tiếp theo?
            </p>
            <Link
              to="/learning"
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Khám phá bậc tiếp theo
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TierDetail;