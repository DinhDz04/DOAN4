// src/components/user/Leaderboard.tsx
import React, { useState } from 'react';
import { Trophy, Crown, Medal, Star, Zap, Users, Target } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar?: string;
  points: number;
  level: number;
  streak: number;
  tier: string;
  progress: number;
  isCurrentUser?: boolean;
}

const Leaderboard: React.FC = () => {
  const [activeTimeframe, setActiveTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'alltime'>('weekly');
  const [activeCategory, setActiveCategory] = useState<'points' | 'streak' | 'level'>('points');

  // Mock data - bảng xếp hạng
  const leaderboardData: LeaderboardUser[] = [
    {
      id: '1',
      rank: 1,
      name: 'Nguyễn Văn A',
      points: 2850,
      level: 25,
      streak: 42,
      tier: 'B2',
      progress: 85
    },
    {
      id: '2',
      rank: 2,
      name: 'Trần Thị B',
      points: 2670,
      level: 24,
      streak: 38,
      tier: 'B1',
      progress: 92
    },
    {
      id: '3',
      rank: 3,
      name: 'Lê Văn C',
      points: 2450,
      level: 22,
      streak: 15,
      tier: 'B1',
      progress: 78
    },
    {
      id: '4',
      rank: 4,
      name: 'Phạm Thị D',
      points: 2310,
      level: 21,
      streak: 29,
      tier: 'A2',
      progress: 65
    },
    {
      id: '5',
      rank: 5,
      name: 'Hoàng Văn E',
      points: 2150,
      level: 20,
      streak: 7,
      tier: 'A2',
      progress: 88
    },
    {
      id: 'current-user',
      rank: 8,
      name: 'Bạn',
      points: 1850,
      level: 18,
      streak: 12,
      tier: 'A1',
      progress: 72,
      isCurrentUser: true
    }
  ];

  const timeframes = [
    { id: 'daily', label: 'Hôm nay' },
    { id: 'weekly', label: 'Tuần này' },
    { id: 'monthly', label: 'Tháng này' },
    { id: 'alltime', label: 'Tất cả' }
  ];

  const categories = [
    { id: 'points', label: 'Điểm số', icon: Star },
    { id: 'streak', label: 'Streak', icon: Zap },
    { id: 'level', label: 'Cấp độ', icon: Target }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-gray-600">{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-orange-500';
      case 2:
        return 'from-gray-400 to-gray-600';
      case 3:
        return 'from-orange-400 to-red-500';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  const getDisplayValue = (user: LeaderboardUser, category: string) => {
    switch (category) {
      case 'points':
        return user.points;
      case 'streak':
        return `${user.streak} ngày`;
      case 'level':
        return `Cấp ${user.level}`;
      default:
        return user.points;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bảng Xếp Hạng</h1>
          <p className="text-gray-600">So tài cùng người học khác</p>
        </div>
        
        {/* Current User Rank */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">#{leaderboardData.find(u => u.isCurrentUser)?.rank}</div>
              <div className="text-blue-100 text-sm">Hạng của bạn</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold">{leaderboardData.find(u => u.isCurrentUser)?.points}</div>
              <div className="text-blue-100 text-sm">Điểm số</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Timeframe Filter */}
        <Card>
          <div className="flex space-x-1">
            {timeframes.map(timeframe => (
              <button
                key={timeframe.id}
                onClick={() => setActiveTimeframe(timeframe.id as any)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTimeframe === timeframe.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Category Filter */}
        <Card>
          <div className="flex space-x-1">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    activeCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Leaderboard List */}
      <Card>
        <div className="space-y-3">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b border-gray-200">
            <div className="col-span-1">Hạng</div>
            <div className="col-span-5">Người dùng</div>
            <div className="col-span-3 text-center">Giá trị</div>
            <div className="col-span-3 text-center">Cấp độ</div>
          </div>

          {/* Leaderboard Items */}
          {leaderboardData.map(user => (
            <div
              key={user.id}
              className={`grid grid-cols-12 gap-4 items-center p-4 rounded-xl transition-all ${
                user.isCurrentUser
                  ? 'bg-blue-50 border-2 border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              {/* Rank */}
              <div className="col-span-1 flex justify-center">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRankBadgeColor(user.rank)} flex items-center justify-center text-white`}>
                  {getRankIcon(user.rank)}
                </div>
              </div>

              {/* User Info */}
              <div className="col-span-5 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold truncate ${user.isCurrentUser ? 'text-blue-700' : 'text-gray-900'}`}>
                      {user.name}
                    </span>
                    {user.isCurrentUser && (
                      <Badge variant="info" size="sm">Bạn</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Zap className="h-3 w-3" />
                    <span>{user.streak} ngày</span>
                  </div>
                </div>
              </div>

              {/* Value */}
              <div className="col-span-3 text-center">
                <div className="text-lg font-bold text-gray-900">
                  {getDisplayValue(user, activeCategory)}
                </div>
              </div>

              {/* Level Progress */}
              <div className="col-span-3">
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center space-x-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold text-gray-900">{user.tier}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${user.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">{user.progress}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center p-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">1,248</div>
          <div className="text-gray-600">Người tham gia</div>
        </Card>

        <Card className="text-center p-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">15,820</div>
          <div className="text-gray-600">Điểm trung bình</div>
        </Card>

        <Card className="text-center p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">42</div>
          <div className="text-gray-600">Bạn bè đang học</div>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-center">
        <div className="p-6">
          <Trophy className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Thử thách bản thân!</h3>
          <p className="mb-4 opacity-90">Luyện tập mỗi ngày để leo lên top đầu bảng xếp hạng</p>
          <Button variant="outline" className="text-purple-600 bg-white hover:bg-white/90">
            Bắt đầu học ngay
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Leaderboard;