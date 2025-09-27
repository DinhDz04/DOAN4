import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { X } from 'lucide-react';

interface LevelFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  tierCode: string;
  initialData?: any;
}

const LevelForm: React.FC<LevelFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  tierCode, 
  initialData 
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    order: initialData?.order || 1,
    isLocked: initialData?.isLocked ?? false,
    unlockConditions: initialData?.unlockConditions || []
  });

  // Mock data - bạn sẽ thay thế bằng API call thực tế
  const [availableLevels, setAvailableLevels] = useState([
    { id: '1', name: 'Level 1 - Nhập môn', order: 1 },
    { id: '2', name: 'Level 2 - Cơ bản', order: 2 },
    { id: '3', name: 'Level 3 - Trung cấp', order: 3 },
    { id: '4', name: 'Level 4 - Nâng cao', order: 4 },
  ]);

  const [selectedLevelId, setSelectedLevelId] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        order: initialData.order || 1,
        isLocked: initialData.isLocked ?? false,
        unlockConditions: initialData.unlockConditions || []
      });
    } else {
      setFormData({
        name: '',
        description: '',
        order: 1,
        isLocked: false,
        unlockConditions: []
      });
    }
    setSelectedLevelId('');
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addCondition = () => {
    if (selectedLevelId) {
      const selectedLevel = availableLevels.find(level => level.id === selectedLevelId);
      if (selectedLevel && !formData.unlockConditions.includes(selectedLevel.id)) {
        setFormData({
          ...formData,
          unlockConditions: [...formData.unlockConditions, selectedLevel.id]
        });
        setSelectedLevelId('');
      }
    }
  };

  const removeCondition = (levelId: string) => {
    setFormData({
      ...formData,
      unlockConditions: formData.unlockConditions.filter((id: string) => id !== levelId)
    });
  };

  // Lọc ra các level có thể chọn làm điều kiện (các level có order nhỏ hơn)
  const getAvailableLevelsForCondition = () => {
    return availableLevels.filter(level => 
      level.order < formData.order && 
      !formData.unlockConditions.includes(level.id)
    );
  };

  const getLevelName = (levelId: string) => {
    const level = availableLevels.find(l => l.id === levelId);
    return level ? level.name : `Level ${levelId}`;
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? "Chỉnh sửa Level" : `Thêm Level mới - Bậc ${tierCode}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên Level *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="VD: Level 1 - Nhập môn"
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
            placeholder="Mô tả nội dung và mục tiêu của level này..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thứ tự *
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.order}
            onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isLocked"
            checked={formData.isLocked}
            onChange={(e) => setFormData({...formData, isLocked: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isLocked" className="text-sm text-gray-700">
            Level này bị khóa (cần điều kiện để mở)
          </label>
        </div>

        {formData.isLocked && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Điều kiện mở khóa (Chọn level cần hoàn thành)
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <select
                  value={selectedLevelId}
                  onChange={(e) => setSelectedLevelId(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Chọn level --</option>
                  {getAvailableLevelsForCondition().map(level => (
                    <option key={level.id} value={level.id}>
                      {level.name} (Thứ tự: {level.order})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addCondition}
                  disabled={!selectedLevelId}
                  className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Thêm
                </button>
              </div>
              
              {formData.unlockConditions.length > 0 && (
                <div className="border rounded-lg p-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Level cần hoàn thành:</p>
                  <div className="space-y-2">
                    {formData.unlockConditions.map((levelId: string) => (
                      <div key={levelId} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{getLevelName(levelId)}</span>
                        <button
                          type="button"
                          onClick={() => removeCondition(levelId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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

export default LevelForm;