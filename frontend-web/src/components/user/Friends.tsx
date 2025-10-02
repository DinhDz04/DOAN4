// src/components/user/Friends.tsx
import React, { useState } from 'react';
import { Users, UserPlus, Search, MessageCircle, Trophy, Star, Zap, Check, X, UserCheck } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  points: number;
  streak: number;
  tier: string;
  isOnline: boolean;
  lastActive?: string;
  mutualFriends?: number;
}

interface FriendRequest {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  level: number;
  sentAt: string;
  mutualFriends: number;
}

const Friends: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - bạn bè
  const friends: Friend[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      level: 22,
      points: 2450,
      streak: 15,
      tier: 'B1',
      isOnline: true,
      mutualFriends: 8
    },
    {
      id: '2',
      name: 'Trần Thị B',
      level: 19,
      points: 1870,
      streak: 7,
      tier: 'A2',
      isOnline: true,
      lastActive: '2 phút trước',
      mutualFriends: 12
    },
    {
      id: '3',
      name: 'Lê Văn C',
      level: 25,
      points: 2890,
      streak: 42,
      tier: 'B2',
      isOnline: false,
      lastActive: '1 giờ trước',
      mutualFriends: 5
    },
    {
      id: '4',
      name: 'Phạm Thị D',
      level: 17,
      points: 1560,
      streak: 3,
      tier: 'A1',
      isOnline: true,
      lastActive: '5 phút trước',
      mutualFriends: 3
    },
    {
      id: '5',
      name: 'Hoàng Văn E',
      level: 21,
      points: 1980,
      streak: 21,
      tier: 'A2',
      isOnline: false,
      lastActive: '3 giờ trước',
      mutualFriends: 7
    }
  ];

  // Mock data - lời mời kết bạn
  const friendRequests: FriendRequest[] = [
    {
      id: '1',
      userId: '6',
      name: 'Mai Thị F',
      level: 18,
      sentAt: '2 giờ trước',
      mutualFriends: 4
    },
    {
      id: '2',
      userId: '7',
      name: 'Đỗ Văn G',
      level: 23,
      sentAt: '1 ngày trước',
      mutualFriends: 2
    }
  ];

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'online' && friend.isOnline) ||
                      (activeTab === 'pending' && false); // pending handled separately
    
    return matchesSearch && matchesTab;
  });

  const tabs = [
    { id: 'all', label: 'Tất cả', count: friends.length },
    { id: 'online', label: 'Đang online', count: friends.filter(f => f.isOnline).length },
    { id: 'pending', label: 'Đang chờ', count: friendRequests.length }
  ];

  const handleAcceptRequest = (requestId: string) => {
    // TODO: Gọi API chấp nhận lời mời
    alert('Đã chấp nhận lời mời kết bạn!');
  };

  const handleRejectRequest = (requestId: string) => {
    // TODO: Gọi API từ chối lời mời
    alert('Đã từ chối lời mời kết bạn!');
  };

  const handleSendMessage = (friendId: string) => {
    // TODO: Mở chat với bạn
    alert('Mở chat với bạn!');
  };

  const handleAddFriend = () => {
    // TODO: Mở modal tìm bạn
    alert('Tìm kiếm và thêm bạn!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bạn Bè</h1>
          <p className="text-gray-600">Kết nối và học cùng bạn bè</p>
        </div>
        
        <Button 
          variant="primary" 
          icon={<UserPlus className="h-4 w-4" />}
          onClick={handleAddFriend}
        >
          Thêm bạn
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search */}
        <Card className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm bạn bè..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-0 focus:ring-0 text-gray-900 placeholder-gray-500"
            />
          </div>
        </Card>

        {/* Stats */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{friends.length}</div>
              <div className="text-sm text-gray-600">Bạn bè</div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                <Badge variant={activeTab === tab.id ? "info" : "default"} size="sm">
                  {tab.count}
                </Badge>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'pending' ? (
            /* Pending Requests */
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Lời mời kết bạn</h3>
              {friendRequests.length === 0 ? (
                <div className="text-center py-8">
                  <UserCheck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Không có lời mời kết bạn nào</p>
                </div>
              ) : (
                friendRequests.map(request => (
                  <Card key={request.id} hover className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {request.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{request.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Cấp {request.level}</span>
                            <span>{request.mutualFriends} bạn chung</span>
                            <span>{request.sentAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="primary"
                          icon={<Check className="h-4 w-4" />}
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          Chấp nhận
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<X className="h-4 w-4" />}
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          Từ chối
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          ) : (
            /* Friends List */
            <div className="space-y-4">
              {filteredFriends.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Không tìm thấy bạn bè nào</p>
                </div>
              ) : (
                filteredFriends.map(friend => (
                  <Card key={friend.id} hover className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {friend.name.charAt(0)}
                          </div>
                          {friend.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{friend.name}</h4>
                            {friend.isOnline ? (
                              <Badge variant="success" size="sm">Online</Badge>
                            ) : (
                              <span className="text-xs text-gray-500">{friend.lastActive}</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Trophy className="h-3 w-3" />
                              <span>Cấp {friend.level}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3" />
                              <span>{friend.points} điểm</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Zap className="h-3 w-3" />
                              <span>{friend.streak} ngày</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          icon={<MessageCircle className="h-4 w-4" />}
                          onClick={() => handleSendMessage(friend.id)}
                        >
                          Nhắn tin
                        </Button>
                        <Badge variant="info">
                          {friend.tier}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Friend Suggestions */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Gợi ý kết bạn</h3>
            <Button variant="ghost" size="sm">
              Xem thêm
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mx-auto mb-3">
                  {String.fromCharCode(64 + item)}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Người dùng {item}</h4>
                <div className="text-sm text-gray-600 mb-3">Cấp {15 + item} • {3 + item} bạn chung</div>
                <Button size="sm" variant="outline" fullWidth icon={<UserPlus className="h-3 w-3" />}>
                  Thêm bạn
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Friends Activity */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            {[
              { name: 'Nguyễn Văn A', action: 'vừa hoàn thành bài tập Level B1', time: '5 phút trước' },
              { name: 'Trần Thị B', action: 'đã đạt cấp độ mới A2', time: '1 giờ trước' },
              { name: 'Lê Văn C', action: 'vừa nhận huy hiệu Streak 30 ngày', time: '2 giờ trước' },
              { name: 'Phạm Thị D', action: 'đã vượt qua bài kiểm tra từ vựng', time: '3 giờ trước' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {activity.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900">{activity.name}</span>
                  <span className="text-gray-600"> {activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Friends;