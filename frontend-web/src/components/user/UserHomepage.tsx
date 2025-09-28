import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  Unlock, 
  ChevronRight, 
  BookOpen, 
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  PlayCircle
} from 'lucide-react';

const UserHomepage = () => {
  // Mock data - cấu trúc học tập 6 bậc
  const learningTiers = [
    {
      code: 'A1',
      name: 'Beginner',
      description: 'Căn bản',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-100',
      borderColor: 'border-green-200',
      levels: [
        { id: 1, name: 'Level 1', progress: 100, unlocked: true, completed: true },
        { id: 2, name: 'Level 2', progress: 75, unlocked: true, completed: false },
        { id: 3, name: 'Level 3', progress: 0, unlocked: true, completed: false },
        { id: 4, name: 'Level 4', progress: 0, unlocked: false, completed: false },
        { id: 5, name: 'Level 5', progress: 0, unlocked: false, completed: false },
      ]
    },
    {
      code: 'A2',
      name: 'Elementary',
      description: 'Sơ cấp',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-100',
      borderColor: 'border-blue-200',
      levels: [
        { id: 1, name: 'Level 1', progress: 0, unlocked: false, completed: false },
        { id: 2, name: 'Level 2', progress: 0, unlocked: false, completed: false },
        { id: 3, name: 'Level 3', progress: 0, unlocked: false, completed: false },
        { id: 4, name: 'Level 4', progress: 0, unlocked: false, completed: false },
        { id: 5, name: 'Level 5', progress: 0, unlocked: false, completed: false },
      ]
    },
    {
      code: 'B1',
      name: 'Intermediate',
      description: 'Trung cấp',
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'from-yellow-50 to-amber-100',
      borderColor: 'border-yellow-200',
      levels: [
        { id: 1, name: 'Level 1', progress: 0, unlocked: false, completed: false },
        { id: 2, name: 'Level 2', progress: 0, unlocked: false, completed: false },
        { id: 3, name: 'Level 3', progress: 0, unlocked: false, completed: false },
        { id: 4, name: 'Level 4', progress: 0, unlocked: false, completed: false },
        { id: 5, name: 'Level 5', progress: 0, unlocked: false, completed: false },
      ]
    },
    {
      code: 'B2',
      name: 'Upper Intermediate',
      description: 'Trung cao cấp',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-100',
      borderColor: 'border-orange-200',
      levels: [
        { id: 1, name: 'Level 1', progress: 0, unlocked: false, completed: false },
        { id: 2, name: 'Level 2', progress: 0, unlocked: false, completed: false },
        { id: 3, name: 'Level 3', progress: 0, unlocked: false, completed: false },
        { id: 4, name: 'Level 4', progress: 0, unlocked: false, completed: false },
        { id: 5, name: 'Level 5', progress: 0, unlocked: false, completed: false },
      ]
    },
    {
      code: 'C1',
      name: 'Advanced',
      description: 'Cao cấp',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'from-purple-50 to-indigo-100',
      borderColor: 'border-purple-200',
      levels: [
        { id: 1, name: 'Level 1', progress: 0, unlocked: false, completed: false },
        { id: 2, name: 'Level 2', progress: 0, unlocked: false, completed: false },
        { id: 3, name: 'Level 3', progress: 0, unlocked: false, completed: false },
        { id: 4, name: 'Level 4', progress: 0, unlocked: false, completed: false },
        { id: 5, name: 'Level 5', progress: 0, unlocked: false, completed: false },
      ]
    },
    {
      code: 'C2',
      name: 'Proficiency',
      description: 'Thành thạo',
      color: 'from-gray-700 to-black',
      bgColor: 'from-gray-100 to-gray-300',
      borderColor: 'border-gray-300',
      levels: [
        { id: 1, name: 'Level 1', progress: 0, unlocked: false, completed: false },
        { id: 2, name: 'Level 2', progress: 0, unlocked: false, completed: false },
        { id: 3, name: 'Level 3', progress: 0, unlocked: false, completed: false },
        { id: 4, name: 'Level 4', progress: 0, unlocked: false, completed: false },
        { id: 5, name: 'Level 5', progress: 0, unlocked: false, completed: false },
      ]
    }
  ];

  // Thống kê học tập
  const learningStats = {
    totalLessons: 150,
    completedLessons: 42,
    currentStreak: 7,
    totalPoints: 1250,
    nextLevel: 'A1 - Level 3'
  };

  const getTierProgress = (levels: any[]) => {
    const completed = levels.filter(level => level.completed).length;
    return (completed / levels.length) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header với thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bài học đã hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {learningStats.completedLessons}<span className="text-sm font-normal text-gray-500">/{learningStats.totalLessons}</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chuỗi ngày học</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{learningStats.currentStreak} ngày</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng điểm</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{learningStats.totalPoints}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Level tiếp theo</p>
              <p className="text-lg font-bold text-gray-900 mt-2">{learningStats.nextLevel}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lộ trình học tập */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Lộ trình học tập</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Đã hoàn thành</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Đang học</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span>Chưa mở khóa</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {learningTiers.map((tier, tierIndex) => {
            const tierProgress = getTierProgress(tier.levels);
            const isTierUnlocked = tier.levels.some(level => level.unlocked);
            
            return (
              <div 
                key={tier.code}
                className={`bg-gradient-to-r ${tier.bgColor} border ${tier.borderColor} rounded-2xl p-6 transition-all duration-300 hover:shadow-md ${
                  !isTierUnlocked ? 'opacity-60' : ''
                }`}
              >
                {/* Tier Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl`}>
                      {tier.code}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                      <p className="text-gray-600">{tier.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${tier.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${tierProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{Math.round(tierProgress)}%</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {tier.levels.filter(level => level.completed).length}/{tier.levels.length} level hoàn thành
                    </p>
                  </div>
                </div>

                {/* Levels Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {tier.levels.map((level, levelIndex) => (
                    <Link
                      key={level.id}
                      to={level.unlocked ? `/learning/level/${level.id}` : '#'}
                      className={`block relative group ${
                        !level.unlocked ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'
                      }`}
                    >
                      <div className={`relative rounded-xl p-4 border-2 transition-all duration-300 ${
                        level.completed 
                          ? 'border-green-500 bg-green-50' 
                          : level.unlocked 
                            ? 'border-blue-500 bg-white hover:border-blue-600 hover:shadow-md' 
                            : 'border-gray-300 bg-gray-100'
                      }`}>
                        {/* Level Status Icon */}
                        <div className="absolute -top-2 -right-2">
                          {level.completed ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                          ) : level.unlocked ? (
                            <PlayCircle className="h-6 w-6 text-blue-600" />
                          ) : (
                            <Lock className="h-6 w-6 text-gray-400" />
                          )}
                        </div>

                        {/* Level Info */}
                        <div className="text-center">
                          <h4 className={`font-semibold ${
                            level.completed ? 'text-green-800' : 
                            level.unlocked ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {level.name}
                          </h4>
                          
                          {/* Progress Bar */}
                          {level.unlocked && !level.completed && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${level.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{level.progress}%</p>
                            </div>
                          )}

                          {level.completed && (
                            <div className="mt-2">
                              <div className="w-full bg-green-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full"></div>
                              </div>
                              <p className="text-xs text-green-600 mt-1">Hoàn thành</p>
                            </div>
                          )}

                          {!level.unlocked && (
                            <p className="text-xs text-gray-500 mt-2">Mở khóa sau</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bài học tiếp theo */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Tiếp tục học tập</h3>
            <p className="text-blue-100">Bạn đang học A1 - Level 2. Hoàn thành 75%</p>
          </div>
          <Link 
            to="/learning/level/2"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-2"
          >
            <BookOpen className="h-5 w-5" />
            <span>Tiếp tục học</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserHomepage;