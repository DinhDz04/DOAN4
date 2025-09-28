// GamificationManagement.tsx
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Trophy, Gift, Target, Zap, Clock, Star } from 'lucide-react';
import AdminLayout from './AdminLayout';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { GameItem, DailyQuest, GiftBox } from '../../types';

// Import các forms
import { GameItemForm, DailyQuestForm, GiftBoxForm } from '../forms/GamificationForms';

const GamificationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'items' | 'quests' | 'giftboxes'>('items');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GameItem | DailyQuest | GiftBox | null>(null);
  const [currentFormType, setCurrentFormType] = useState<'item' | 'quest' | 'giftbox' | null>(null);

  // Mock data
  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([]);
  const [giftBoxes, setGiftBoxes] = useState<GiftBox[]>([]);

    const itemTypeIcons = {
    xp_boost: <Zap className="h-4 w-4" />,
    point_boost: <Star className="h-4 w-4" />,
    streak_freeze: <Clock className="h-4 w-4" />,
    theme: <span>ðŸŽ¨</span>,
    avatar: <span>ðŸ‘¤</span>
  };
  const questTypeLabels = {
    exercises_completed: 'HoÃ n thÃ nh bÃ i táº­p',
    points_earned: 'Kiáº¿m Ä‘iá»ƒm',
    streak_maintained: 'Duy trÃ¬ streak',
    vocabulary_learned: 'Há»c tá»« vá»±ng'
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    setCurrentFormType(activeTab === 'items' ? 'item' : activeTab === 'quests' ? 'quest' : 'giftbox');
    setShowCreateModal(true);
  };

  const handleEdit = (item: GameItem | DailyQuest | GiftBox) => {
    setEditingItem(item);
    // Xác định loại form dựa vào tab hiện tại
    setCurrentFormType(activeTab === 'items' ? 'item' : activeTab === 'quests' ? 'quest' : 'giftbox');
    setShowCreateModal(true);
  };

  const handleFormSubmit = (data: any) => {
    if (currentFormType === 'item') {
      if (editingItem) {
        // Cập nhật item
        setGameItems(items => 
          items.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item)
        );
        console.log('Updated item:', data);
      } else {
        // Thêm item mới
        const newItem = {
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        setGameItems(items => [...items, newItem]);
        console.log('Created new item:', newItem);
      }
    } else if (currentFormType === 'quest') {
      if (editingItem) {
        // Cập nhật quest
        setDailyQuests(quests => 
          quests.map(quest => quest.id === editingItem.id ? { ...data, id: editingItem.id } : quest)
        );
        console.log('Updated quest:', data);
      } else {
        // Thêm quest mới
        const newQuest = {
          ...data,
          id: Date.now().toString()
        };
        setDailyQuests(quests => [...quests, newQuest]);
        console.log('Created new quest:', newQuest);
      }
    } else if (currentFormType === 'giftbox') {
      if (editingItem) {
        // Cập nhật gift box
        setGiftBoxes(boxes => 
          boxes.map(box => box.id === editingItem.id ? { ...data, id: editingItem.id } : box)
        );
        console.log('Updated gift box:', data);
      } else {
        // Thêm gift box mới
        const newGiftBox = {
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        setGiftBoxes(boxes => [...boxes, newGiftBox]);
        console.log('Created new gift box:', newGiftBox);
      }
    }

    // Đóng modal và reset state
    setShowCreateModal(false);
    setEditingItem(null);
    setCurrentFormType(null);
  };

  const handleFormClose = () => {
    setShowCreateModal(false);
    setEditingItem(null);
    setCurrentFormType(null);
  };

  const handleDelete = (id: string, type: 'item' | 'quest' | 'giftbox') => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      if (type === 'item') {
        setGameItems(items => items.filter(item => item.id !== id));
      } else if (type === 'quest') {
        setDailyQuests(quests => quests.filter(quest => quest.id !== id));
      } else if (type === 'giftbox') {
        setGiftBoxes(boxes => boxes.filter(box => box.id !== id));
      }
    }
  };

  const handleToggleActive = (id: string, type: 'item' | 'quest' | 'giftbox') => {
    if (type === 'item') {
      setGameItems(items => 
        items.map(item => 
          item.id === id ? { ...item, isActive: !item.isActive } : item
        )
      );
    } else if (type === 'quest') {
      setDailyQuests(quests => 
        quests.map(quest => 
          quest.id === id ? { ...quest, isActive: !quest.isActive } : quest
        )
      );
    } else if (type === 'giftbox') {
      setGiftBoxes(boxes => 
        boxes.map(box => 
          box.id === id ? { ...box, isActive: !box.isActive } : box
        )
      );
    }
  };

  const renderGameItems = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gameItems.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <Trophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có vật phẩm nào</h3>
          <p className="text-gray-600 mb-4">Tạo vật phẩm đầu tiên để kích thích người dùng</p>
          <Button variant="primary" onClick={handleCreateNew}>
            Tạo vật phẩm mới
          </Button>
        </div>
      ) : (
        gameItems.map((item) => (
          <Card key={item.id} hover className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  {itemTypeIcons[item.type]}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.price} điểm</p>
                </div>
              </div>
              <Badge variant={item.isActive ? 'success' : 'default'} size="sm">
                {item.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {item.duration ? `Duration: ${item.duration} days` : 'Permanent'}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleActive(item.id, 'item')}
                  className={`p-1 rounded ${
                    item.isActive ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {item.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, 'item')}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  const renderDailyQuests = () => (
    <div className="space-y-4">
      {dailyQuests.length === 0 ? (
        <div className="text-center py-12">
          <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có nhiệm vụ nào</h3>
          <p className="text-gray-600 mb-4">Tạo nhiệm vụ hàng ngày cho người dùng</p>
          <Button variant="primary" onClick={handleCreateNew}>
            Tạo nhiệm vụ mới
          </Button>
        </div>
      ) : (
        dailyQuests.map((quest) => (
          <Card key={quest.id} hover className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{quest.title}</h3>
                <p className="text-sm text-gray-600">{quest.description}</p>
              </div>
              <Badge variant={quest.isActive ? 'success' : 'default'} size="sm">
                {quest.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-500">Loại:</span>
                <span className="ml-2 font-medium">{questTypeLabels[quest.type]}</span>
              </div>
              <div>
                <span className="text-gray-500">Mục tiêu:</span>
                <span className="ml-2 font-medium">{quest.targetValue}</span>
              </div>
              <div>
                <span className="text-gray-500">Phần thưởng:</span>
                <span className="ml-2 font-medium">{quest.rewardValue} {quest.rewardType}</span>
              </div>
              <div>
                <span className="text-gray-500">Độ khó:</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Valid: {quest.validFrom} to {quest.validTo}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleActive(quest.id, 'quest')}
                  className={`p-1 rounded ${
                    quest.isActive ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {quest.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleEdit(quest)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(quest.id, 'quest')}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  const renderGiftBoxes = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {giftBoxes.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <Gift className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có hộp quà nào</h3>
          <p className="text-gray-600 mb-4">Tạo hộp quà để thưởng cho người dùng</p>
          <Button variant="primary" onClick={handleCreateNew}>
            Tạo hộp quà mới
          </Button>
        </div>
      ) : (
        giftBoxes.map((giftBox) => (
          <Card key={giftBox.id} hover className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{giftBox.name}</h3>
                <p className="text-sm text-gray-600">{giftBox.description}</p>
              </div>
              <Badge variant={giftBox.isActive ? 'success' : 'default'} size="sm">
                {giftBox.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Nội dung:</h4>
              <div className="space-y-1">
                {giftBox.contents.map((content, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span>{content.itemType} x{content.quantity}</span>
                    <span className="text-gray-500">{(content.probability * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Created: {giftBox.createdAt}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleActive(giftBox.id, 'giftbox')}
                  className={`p-1 rounded ${
                    giftBox.isActive ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {giftBox.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleEdit(giftBox)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(giftBox.id, 'giftbox')}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <AdminLayout currentPage="gamification">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Gamification</h1>
            <p className="text-gray-600 mt-2">Quản lý vật phẩm, nhiệm vụ và hộp quà</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <Card>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'items', label: 'Vật phẩm', icon: Trophy },
                { id: 'quests', label: 'Nhiệm vụ', icon: Target },
                { id: 'giftboxes', label: 'Hộp quà', icon: Gift }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'items' && renderGameItems()}
            {activeTab === 'quests' && renderDailyQuests()}
            {activeTab === 'giftboxes' && renderGiftBoxes()}
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Vật phẩm đang hoạt động</p>
              </div>
            </div>
          </Card>
          <Card padding="md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Nhiệm vụ hàng ngày</p>
              </div>
            </div>
          </Card>
          <Card padding="md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Hộp quà có sẵn</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Create/Edit Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingItem ? 'Chỉnh sửa' : 'Tạo mới'} {activeTab === 'items' ? 'vật phẩm' : activeTab === 'quests' ? 'nhiệm vụ' : 'hộp quà'}
            </h3>
            <p className="text-gray-600 mb-4">
              Modal form sẽ được implement tại đây
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                Hủy
              </Button>
              <Button variant="primary">
                Lưu
              </Button>
            </div>
          </div>
        </div>
      )}
      <GameItemForm
        isOpen={showCreateModal && currentFormType === 'item'}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={currentFormType === 'item' ? editingItem : null}
      />

      <DailyQuestForm
        isOpen={showCreateModal && currentFormType === 'quest'}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={currentFormType === 'quest' ? editingItem : null}
      />

      <GiftBoxForm
        isOpen={showCreateModal && currentFormType === 'giftbox'}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={currentFormType === 'giftbox' ? editingItem : null}
      />
    </AdminLayout>
  );
};

export default GamificationManagement;