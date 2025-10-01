// LearningLevels.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from '../common';
import { ChevronRight, Lock, Unlock, Award, BookOpen, Users } from 'lucide-react';

const LearningLevels: React.FC = () => {
  // Mock data - 6 bậc học
  const learningTiers = [
    {
      id: 'A1',
      code: 'A1',
      name: 'Beginner',
      description: 'Căn bản cho người mới bắt đầu',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-100',
      borderColor: 'border-green-200',
      isUnlocked: true,
      progress: 40,
      levelCount: 5,
      completedLevels: 2,
      totalStudents: 12500,
      estimatedTime: '2-3 tháng'
    },
    {
      id: 'A2',
      code: 'A2',
      name: 'Elementary',
      description: 'Sơ cấp - Giao tiếp cơ bản',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-100',
      borderColor: 'border-blue-200',
      isUnlocked: false,
      progress: 0,
      levelCount: 5,
      completedLevels: 0,
      totalStudents: 8900,
      estimatedTime: '3-4 tháng'
    },
    {
      id: 'B1',
      code: 'B1',
      name: 'Intermediate',
      description: 'Trung cấp - Giao tiếp hàng ngày',
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'from-yellow-50 to-amber-100',
      borderColor: 'border-yellow-200',
      isUnlocked: false,
      progress: 0,
      levelCount: 5,
      completedLevels: 0,
      totalStudents: 6700,
      estimatedTime: '4-5 tháng'
    },
    {
      id: 'B2',
      code: 'B2',
      name: 'Upper Intermediate',
      description: 'Trung cao cấp - Giao tiếp thành thạo',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-100',
      borderColor: 'border-orange-200',
      isUnlocked: false,
      progress: 0,
      levelCount: 5,
      completedLevels: 0,
      totalStudents: 4500,
      estimatedTime: '5-6 tháng'
    },
    {
      id: 'C1',
      code: 'C1',
      name: 'Advanced',
      description: 'Cao cấp - Sử dụng ngôn ngữ linh hoạt',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'from-purple-50 to-indigo-100',
      borderColor: 'border-purple-200',
      isUnlocked: false,
      progress: 0,
      levelCount: 5,
      completedLevels: 0,
      totalStudents: 2300,
      estimatedTime: '6-8 tháng'
    },
    {
      id: 'C2',
      code: 'C2',
      name: 'Proficiency',
      description: 'Thành thạo như người bản xứ',
      color: 'from-gray-700 to-black',
      bgColor: 'from-gray-100 to-gray-300',
      borderColor: 'border-gray-300',
      isUnlocked: false,
      progress: 0,
      levelCount: 5,
      completedLevels: 0,
      totalStudents: 1200,
      estimatedTime: '8-12 tháng'
    }
  ];

  const userStats = {
    currentTier: 'A1',
    completedTiers: 0,
    totalPoints: 1250,
    currentStreak: 7
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Lộ Trình Học Tập</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Khám phá 6 bậc học từ cơ bản đến nâng cao. Mỗi bậc có 5 level giúp bạn tiến bộ vững chắc.
        </p>
      </div>

      {/* User Progress */}
      <Card className="mb-8" padding="lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{userStats.currentTier}</p>
            <p className="text-gray-600">Bậc hiện tại</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{userStats.completedTiers}/6</p>
            <p className="text-gray-600">Bậc đã hoàn thành</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{userStats.totalPoints}</p>
            <p className="text-gray-600">Tổng điểm</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{userStats.currentStreak}</p>
            <p className="text-gray-600">Ngày học liên tiếp</p>
          </div>
        </div>
      </Card>

      {/* Learning Tiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {learningTiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
              !tier.isUnlocked ? 'opacity-75' : ''
            }`}
            padding="lg"
            hover={tier.isUnlocked}
          >
            {/* Tier Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl`}>
                {tier.code}
              </div>
              <div className="text-right">
                {tier.isUnlocked ? (
                  <Unlock className="h-6 w-6 text-green-500" />
                ) : (
                  <Lock className="h-6 w-6 text-gray-400" />
                )}
                <Badge 
                  variant={tier.isUnlocked ? "success" : "default"} 
                  className="mt-2"
                >
                  {tier.isUnlocked ? "Đã mở khóa" : "Đang khóa"}
                </Badge>
              </div>
            </div>

            {/* Tier Info */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <p className="text-gray-600 mb-3">{tier.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{tier.levelCount} levels</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{tier.totalStudents.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Progress */}
            {tier.isUnlocked && tier.progress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Tiến độ</span>
                  <span>{tier.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${tier.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {tier.completedLevels}/{tier.levelCount} levels hoàn thành
                </p>
              </div>
            )}

            {/* Estimated Time */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600">
                ⏱️ Thời gian ước tính: <span className="font-semibold">{tier.estimatedTime}</span>
              </p>
            </div>

            {/* Action Button */}
            <Link
              to={tier.isUnlocked ? `/learning/tier/${tier.id}` : '#'}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-semibold transition-all ${
                tier.isUnlocked
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {tier.isUnlocked ? (
                <>
                  <span>Vào học</span>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                'Chưa mở khóa'
              )}
            </Link>

            {/* Locked Overlay */}
            {!tier.isUnlocked && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
                <div className="text-center">
                  <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Hoàn thành bậc trước để mở khóa</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Learning Path Info */}
      <Card className="mt-8" padding="lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Về lộ trình học</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Cấu trúc học tập:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>6 bậc học từ A1 đến C2</li>
              <li>Mỗi bậc có 5 level</li>
              <li>Mỗi level có từ vựng + 4 loại bài tập</li>
              <li>Hoàn thành tất cả để mở khóa bậc tiếp theo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Tiến độ học tập:</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Học mọi lúc, mọi nơi</li>
              <li>Theo dõi tiến độ chi tiết</li>
              <li>Nhận điểm thưởng và phần thưởng</li>
              <li>So sánh với cộng đồng người học</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LearningLevels;