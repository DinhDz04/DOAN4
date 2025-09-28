import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Plus, Trash2, Zap, Star, Clock, Gift, Trophy, Target } from 'lucide-react';

// Game Item Form
interface GameItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const GameItemForm: React.FC<GameItemFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    type: initialData?.type || '',
    price: initialData?.price || 100,
    duration: initialData?.duration || '',
    effectValue: initialData?.effectValue || 1,
    isActive: initialData?.isActive ?? true,
    imageUrl: initialData?.imageUrl || ''
  });

  const itemTypes = [
    { value: 'xp_boost', label: 'Thẻ nhân XP', icon: <Zap className="h-4 w-4" /> },
    { value: 'point_boost', label: 'Thẻ nhân điểm', icon: <Star className="h-4 w-4" /> },
    { value: 'streak_freeze', label: 'Thẻ khôi phục chuỗi', icon: <Clock className="h-4 w-4" /> },
    { value: 'theme', label: 'Giao diện', icon: <span>🎨</span> },
    { value: 'avatar', label: 'Avatar', icon: <span>👤</span> }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Chỉnh sửa vật phẩm" : "Thêm vật phẩm mới"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên vật phẩm *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên vật phẩm..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mô tả về vật phẩm này..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loại vật phẩm *
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn loại vật phẩm</option>
            {itemTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá (điểm) *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {(formData.type === 'xp_boost' || formData.type === 'point_boost') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hệ số nhân
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                value={formData.effectValue}
                onChange={(e) => setFormData({...formData, effectValue: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {formData.type && ['xp_boost', 'point_boost', 'streak_freeze'].includes(formData.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thời hạn (ngày)
            </label>
            <input
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value ? parseInt(e.target.value) : ''})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Để trống nếu vĩnh viễn"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL hình ảnh
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActiveItem"
            checked={formData.isActive}
            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isActiveItem" className="text-sm text-gray-700">
            Kích hoạt vật phẩm này
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {initialData ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Daily Quest Form
interface DailyQuestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const DailyQuestForm: React.FC<DailyQuestFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    type: initialData?.type || '',
    targetValue: initialData?.targetValue || 1,
    rewardType: initialData?.rewardType || 'points',
    rewardValue: initialData?.rewardValue || 50,
    rewardItemId: initialData?.rewardItemId || '',
    isActive: initialData?.isActive ?? true,
    validFrom: initialData?.validFrom || new Date().toISOString().split('T')[0],
    validTo: initialData?.validTo || ''
  });

  const questTypes = [
    { value: 'exercises_completed', label: 'Hoàn thành bài tập' },
    { value: 'points_earned', label: 'Kiếm điểm' },
    { value: 'streak_maintained', label: 'Duy trì streak' },
    { value: 'vocabulary_learned', label: 'Học từ vựng' }
  ];

  const rewardTypes = [
    { value: 'points', label: 'Điểm' },
    { value: 'xp', label: 'Kinh nghiệm' },
    { value: 'item', label: 'Vật phẩm' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Chỉnh sửa nhiệm vụ" : "Thêm nhiệm vụ mới"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiêu đề nhiệm vụ *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="VD: Hoàn thành 5 bài tập"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mô tả chi tiết về nhiệm vụ..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại nhiệm vụ *
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn loại nhiệm vụ</option>
              {questTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mục tiêu *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.targetValue}
              onChange={(e) => setFormData({...formData, targetValue: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: 5"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại phần thưởng *
            </label>
            <select
              required
              value={formData.rewardType}
              onChange={(e) => setFormData({...formData, rewardType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {rewardTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá trị phần thưởng *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.rewardValue}
              onChange={(e) => setFormData({...formData, rewardValue: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày bắt đầu *
            </label>
            <input
              type="date"
              required
              value={formData.validFrom}
              onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày kết thúc
            </label>
            <input
              type="date"
              value={formData.validTo}
              onChange={(e) => setFormData({...formData, validTo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Để trống nếu không có hạn"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActiveQuest"
            checked={formData.isActive}
            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isActiveQuest" className="text-sm text-gray-700">
            Kích hoạt nhiệm vụ này
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {initialData ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Gift Box Form
interface GiftBoxFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const GiftBoxForm: React.FC<GiftBoxFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    isActive: initialData?.isActive ?? true,
    contents: initialData?.contents || [
      { itemType: 'points', itemId: '', quantity: 50, probability: 0.5 }
    ]
  });

  const itemTypes = [
    { value: 'points', label: 'Điểm' },
    { value: 'xp', label: 'Kinh nghiệm' },
    { value: 'item', label: 'Vật phẩm' }
  ];

  const addContent = () => {
    setFormData({
      ...formData,
      contents: [...formData.contents, { itemType: 'points', itemId: '', quantity: 1, probability: 0.1 }]
    });
  };

  const removeContent = (index: number) => {
    const newContents = formData.contents.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, contents: newContents });
  };

  const updateContent = (index: number, field: string, value: any) => {
    const newContents = [...formData.contents];
    newContents[index] = { ...newContents[index], [field]: value };
    setFormData({ ...formData, contents: newContents });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate total probability
    const totalProbability = formData.contents.reduce((sum: number, content: any) => sum + content.probability, 0);
    if (Math.abs(totalProbability - 1) > 0.01) {
      alert('Tổng xác suất phải bằng 1.0 (100%)');
      return;
    }
    
    onSubmit(formData);
  };

  const totalProbability = formData.contents.reduce((sum: number, content: any) => sum + content.probability, 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Chỉnh sửa hộp quà" : "Thêm hộp quà mới"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên hộp quà *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="VD: Hộp quà hàng ngày"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mô tả về hộp quà này..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Nội dung hộp quà *
            </label>
            <button
              type="button"
              onClick={addContent}
              className="flex items-center px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              <Plus className="h-4 w-4 mr-1" />
              Thêm
            </button>
          </div>

          <div className="space-y-3">
            {formData.contents.map((content: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Nội dung #{index + 1}</span>
                  {formData.contents.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContent(index)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Loại</label>
                    <select
                      value={content.itemType}
                      onChange={(e) => updateContent(index, 'itemType', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {itemTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Số lượng</label>
                    <input
                      type="number"
                      min="1"
                      value={content.quantity}
                      onChange={(e) => updateContent(index, 'quantity', parseInt(e.target.value))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    Xác suất (0-1)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={content.probability}
                    onChange={(e) => updateContent(index, 'probability', parseFloat(e.target.value))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-2 text-sm ${Math.abs(totalProbability - 1) > 0.01 ? 'text-red-600' : 'text-green-600'}`}>
            Tổng xác suất: {totalProbability.toFixed(2)} / 1.00
            {Math.abs(totalProbability - 1) > 0.01 && (
              <span className="block text-xs">Tổng xác suất phải bằng 1.0</span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActiveGiftBox"
            checked={formData.isActive}
            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isActiveGiftBox" className="text-sm text-gray-700">
            Kích hoạt hộp quà này
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {initialData ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Demo Component
const GamificationForms: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'item' | 'quest' | 'giftbox' | null>(null);
  const [editingData, setEditingData] = useState<any>(null);

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setActiveForm(null);
    setEditingData(null);
  };

  const handleClose = () => {
    setActiveForm(null);
    setEditingData(null);
  };

  const handleEdit = (type: 'item' | 'quest' | 'giftbox', data: any) => {
    setEditingData(data);
    setActiveForm(type);
  };

  // Sample data for editing
  const sampleItem = {
    id: '1',
    name: 'Thẻ nhân XP x2',
    description: 'Tăng gấp đôi kinh nghiệm nhận được trong 7 ngày',
    type: 'xp_boost',
    price: 500,
    duration: 7,
    effectValue: 2,
    isActive: true,
    imageUrl: 'https://example.com/xp-boost.png'
  };

  const sampleQuest = {
    id: '1',
    title: 'Hoàn thành 5 bài tập',
    description: 'Hoàn thành 5 bài tập bất kỳ trong ngày',
    type: 'exercises_completed',
    targetValue: 5,
    rewardType: 'points',
    rewardValue: 100,
    isActive: true,
    validFrom: '2025-01-01',
    validTo: '2025-12-31'
  };

  const sampleGiftBox = {
    id: '1',
    name: 'Hộp quà hàng ngày',
    description: 'Hộp quà dành cho người dùng hoàn thành nhiệm vụ hàng ngày',
    isActive: true,
    contents: [
      { itemType: 'points', quantity: 50, probability: 0.6 },
      { itemType: 'xp', quantity: 30, probability: 0.3 },
      { itemType: 'item', itemId: 'boost_xp', quantity: 1, probability: 0.1 }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Demo Gamification Forms</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveForm('item')}
          className="flex items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 text-blue-600"
        >
          <Trophy className="h-6 w-6 mr-2" />
          Thêm vật phẩm
        </button>
        
        <button
          onClick={() => setActiveForm('quest')}
          className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 text-green-600"
        >
          <Target className="h-6 w-6 mr-2" />
          Thêm nhiệm vụ
        </button>
        
        <button
          onClick={() => setActiveForm('giftbox')}
          className="flex items-center justify-center p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 text-purple-600"
        >
          <Gift className="h-6 w-6 mr-2" />
          Thêm hộp quà
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Demo chỉnh sửa (với dữ liệu mẫu):</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleEdit('item', sampleItem)}
            className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
          >
            Chỉnh sửa vật phẩm mẫu
          </button>
          
          <button
            onClick={() => handleEdit('quest', sampleQuest)}
            className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100"
          >
            Chỉnh sửa nhiệm vụ mẫu
          </button>
          
          <button
            onClick={() => handleEdit('giftbox', sampleGiftBox)}
            className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100"
          >
            Chỉnh sửa hộp quà mẫu
          </button>
        </div>
      </div>

      {/* Forms */}
      <GameItemForm
        isOpen={activeForm === 'item'}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={activeForm === 'item' ? editingData : null}
      />

      <DailyQuestForm
        isOpen={activeForm === 'quest'}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={activeForm === 'quest' ? editingData : null}
      />

      <GiftBoxForm
        isOpen={activeForm === 'giftbox'}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={activeForm === 'giftbox' ? editingData : null}
      />
    </div>
  );
};

export { GameItemForm, DailyQuestForm, GiftBoxForm };