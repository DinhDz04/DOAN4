// src/components/user/Quests.tsx
import React from 'react';
import { Target, CheckCircle, Clock, Award, Star, Zap } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import Badge from '../common/Badge';

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  type: 'exercises_completed' | 'points_earned' | 'streak_maintained' | 'vocabulary_learned';
  targetValue: number;
  currentProgress: number;
  rewardType: 'points' | 'xp' | 'item';
  rewardValue: number;
  isCompleted: boolean;
  rewardClaimed: boolean;
  expiresIn: string;
}

const Quests: React.FC = () => {
  // Mock data - nhiệm vụ hàng ngày
  const dailyQuests: DailyQuest[] = [
    {
      id: '1',
      title: 'Hoàn thành 5 bài tập',
      description: 'Hoàn thành 5 bài tập bất kỳ',
      type: 'exercises_completed',
      targetValue: 5,
      currentProgress: 3,
      rewardType: 'points',
      rewardValue: 100,
      isCompleted: false,
      rewardClaimed: false,
      expiresIn: '6 giờ'
    },
    {
      id: '2',
      title: 'Kiếm 200 điểm',
      description: 'Tích lũy 200 điểm từ các bài tập',
      type: 'points_earned',
      targetValue: 200,
      currentProgress: 150,
      rewardType: 'points',
      rewardValue: 50,
      isCompleted: false,
      rewardClaimed: false,
      expiresIn: '6 giờ'
    },
    {
      id: '3',
      title: 'Duy trì streak',
      description: 'Học liên tiếp 3 ngày',
      type: 'streak_maintained',
      targetValue: 3,
      currentProgress: 3,
      rewardType: 'xp',
      rewardValue: 50,
      isCompleted: true,
      rewardClaimed: false,
      expiresIn: '6 giờ'
    },
    {
      id: '4',
      title: 'Học 10 từ mới',
      description: 'Học 10 từ vựng mới',
      type: 'vocabulary_learned',
      targetValue: 10,
      currentProgress: 10,
      rewardType: 'points',
      rewardValue: 150,
      isCompleted: true,
      rewardClaimed: true,
      expiresIn: '6 giờ'
    }
  ];

  const getQuestIcon = (type: string) => {
    switch (type) {
      case 'exercises_completed':
        return <CheckCircle className="h-5 w-5" />;
      case 'points_earned':
        return <Star className="h-5 w-5" />;
      case 'streak_maintained':
        return <Zap className="h-5 w-5" />;
      case 'vocabulary_learned':
        return <Award className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getQuestColor = (type: string) => {
    switch (type) {
      case 'exercises_completed':
        return 'blue';
      case 'points_earned':
        return 'yellow';
      case 'streak_maintained':
        return 'green';
      case 'vocabulary_learned':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const getRewardIcon = (rewardType: string) => {
    switch (rewardType) {
      case 'points':
        return <Star className="h-4 w-4" />;
      case 'xp':
        return <Zap className="h-4 w-4" />;
      case 'item':
        return <Award className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const handleClaimReward = (questId: string) => {
    // TODO: Gọi API claim reward
    alert(`Nhận thưởng thành công!`);
  };

  const completedQuests = dailyQuests.filter(quest => quest.isCompleted);
  const progress = (completedQuests.length / dailyQuests.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nhiệm Vụ Hàng Ngày</h1>
        <p className="text-gray-600">Hoàn thành nhiệm vụ để nhận phần thưởng</p>
      </div>

      {/* Progress Overview */}
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Tiến độ hôm nay</span>
              <span className="text-sm text-gray-600">{completedQuests.length}/{dailyQuests.length} nhiệm vụ</span>
            </div>
            <ProgressBar 
              progress={progress} 
              color="blue" 
              height="lg"
              showPercentage 
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Reset sau: 6 giờ</span>
          </div>
        </div>
      </Card>

      {/* Daily Quests */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Nhiệm vụ của bạn</h2>
        
        {dailyQuests.map(quest => {
          const progressPercentage = (quest.currentProgress / quest.targetValue) * 100;
          const isClaimable = quest.isCompleted && !quest.rewardClaimed;

          return (
            <Card key={quest.id} hover className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg bg-${getQuestColor(quest.type)}-100`}>
                    {getQuestIcon(quest.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{quest.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{quest.description}</p>
                    
                    {/* Progress */}
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          {quest.currentProgress}/{quest.targetValue}
                        </span>
                        <span className="text-gray-600">{Math.round(progressPercentage)}%</span>
                      </div>
                      <ProgressBar 
                        progress={progressPercentage} 
                        color={getQuestColor(quest.type) as any}
                        height="sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Reward Section */}
                <div className="text-right ml-4">
                  <div className={`flex items-center justify-end space-x-1 mb-2 ${
                    isClaimable ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {getRewardIcon(quest.rewardType)}
                    <span className="font-bold">{quest.rewardValue}</span>
                  </div>
                  
                  {quest.rewardClaimed ? (
                    <Badge variant="success" size="sm">
                      Đã nhận
                    </Badge>
                  ) : isClaimable ? (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleClaimReward(quest.id)}
                    >
                      Nhận thưởng
                    </Button>
                  ) : (
                    <Badge variant={quest.isCompleted ? "success" : "default"} size="sm">
                      {quest.isCompleted ? 'Hoàn thành' : 'Đang làm'}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Hết hạn sau: {quest.expiresIn}</span>
                {quest.isCompleted && !quest.rewardClaimed && (
                  <span className="text-yellow-600 font-medium">✨ Có thể nhận thưởng!</span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Achievement Stats */}
      <Card>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{completedQuests.length}</div>
            <div className="text-sm text-gray-600">Hoàn thành hôm nay</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-gray-600">Tuần này</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">48</div>
            <div className="text-sm text-gray-600">Tháng này</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">1,250</div>
            <div className="text-sm text-gray-600">Điểm đã nhận</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Quests;