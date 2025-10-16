import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { X } from 'lucide-react';
import { learningPathApi } from '../../services/learningPathApi';

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
  // SỬA: Khai báo rõ type cho unlockConditions là string[]
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    order: number;
    isLocked: boolean;
    unlockConditions: string[];
  }>({
    name: '',
    description: '',
    order: 1,
    isLocked: false,
    unlockConditions: []
  });

  // SỬA: Khai báo type cho availableLevels
  const [availableLevels, setAvailableLevels] = useState<Array<{
    id: string;
    name: string;
    order: number;
  }>>([]);
  
  const [selectedLevelId, setSelectedLevelId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLevels = async () => {
      if (isOpen && tierCode) {
        try {
          setLoading(true);
          // Lấy tier details để lấy ID
          const tierData = await learningPathApi.getTierByCode(tierCode);
          // Lấy levels của tier này
          const levelsData = await learningPathApi.getLevelsByTier(tierData.id);
          
          setAvailableLevels(levelsData.map((level: any) => ({
            id: level.id,
            name: level.name,
            order: level.order
          })));
        } catch (error) {
          console.error('Error fetching levels:', error);
          setAvailableLevels([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLevels();
  }, [isOpen, tierCode]);

  // CẬP NHẬT: useEffect để reset form data
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        order: initialData.order || 1,
        isLocked: initialData.isLocked ?? false,
        // SỬA: Đảm bảo unlockConditions là string[]
        unlockConditions: Array.isArray(initialData.unlockConditions) 
          ? initialData.unlockConditions 
          : []
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
    
    // CHUẨN HÓA DỮ LIỆU TRƯỚC KHI GỬI
    const submitData = {
      ...formData,
      // Đảm bảo unlockConditions là mảng rỗng nếu không bị khóa
      unlockConditions: formData.isLocked ? formData.unlockConditions : []
    };
    
    onSubmit(submitData);
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
      unlockConditions: formData.unlockConditions.filter(id => id !== levelId)
    });
  };

  // CẬP NHẬT: Lọc các level có thể chọn làm điều kiện
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
                  disabled={loading || getAvailableLevelsForCondition().length === 0}
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
                  disabled={!selectedLevelId || loading}
                  className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Thêm
                </button>
              </div>
              
              {loading && (
                <p className="text-sm text-gray-500">Đang tải danh sách levels...</p>
              )}

              {!loading && getAvailableLevelsForCondition().length === 0 && formData.order <= 1 && (
                <p className="text-sm text-yellow-600">
                  Không có level nào trước level này để chọn làm điều kiện
                </p>
              )}
              
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