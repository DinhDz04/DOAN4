import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

interface ExerciseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  levelId: string;
  initialData?: any;
  exerciseTypes: Array<{ id: string; name: string; display_name: string }>;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  levelId, 
  initialData,
  exerciseTypes 
}) => {
  const [formData, setFormData] = useState({
    levelId: levelId,
    exerciseTypeId: initialData?.exerciseTypeId || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    content: initialData?.content || {},
    difficulty: initialData?.difficulty || 1,
    points: initialData?.points || 10,
    order: initialData?.order || 1,
    timeLimit: initialData?.timeLimit || null,
    isActive: initialData?.isActive ?? true
  });

  const navigate = useNavigate();

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        levelId: levelId,
        exerciseTypeId: initialData?.exerciseTypeId || '',
        title: initialData?.title || '',
        description: initialData?.description || '',
        content: initialData?.content || {},
        difficulty: initialData?.difficulty || 1,
        points: initialData?.points || 10,
        order: initialData?.order || 1,
        timeLimit: initialData?.timeLimit || null,
        isActive: initialData?.isActive ?? true
      });
    }
  }, [isOpen, initialData, levelId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.exerciseTypeId) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    onSubmit(formData);
  };

  const handleContentConfig = () => {
    if (initialData?.id) {
      navigate(`/admin/exercises/${initialData.id}/content`);
      onClose(); // Đóng modal sau khi chuyển trang
    }
  };

  const getExerciseTypeName = (typeId: string) => {
    const type = exerciseTypes.find(t => t.id === typeId);
    return type ? type.display_name : 'Chưa chọn';
  };

  // Hàm lấy tên loại bài tập từ name (thay vì id)
  const getExerciseTypeDisplayName = (typeName: string) => {
    const type = exerciseTypes.find(t => t.name === typeName);
    return type ? type.display_name : typeName;
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? "Chỉnh sửa Bài tập" : "Thêm Bài tập mới"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tiêu đề */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiêu đề bài tập *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tiêu đề bài tập..."
          />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mô tả về bài tập này..."
          />
        </div>

        {/* Loại bài tập và Độ khó */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại bài tập *
            </label>
            <select
              required
              value={formData.exerciseTypeId}
              onChange={(e) => setFormData({...formData, exerciseTypeId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn loại bài tập</option>
              {exerciseTypes.map(type => (
  <option key={type.id} value={type.id}>  {/* Sửa từ type.name thành type.id */}
    {type.display_name}
  </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Độ khó *
            </label>
            <select
              required
              value={formData.difficulty}
              onChange={(e) => setFormData({...formData, difficulty: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>★ Dễ</option>
              <option value={2}>★★ Trung bình</option>
              <option value={3}>★★★ Khó</option>
              <option value={4}>★★★★ Rất khó</option>
              <option value={5}>★★★★★ Cực khó</option>
            </select>
          </div>
        </div>

        {/* Điểm và Thứ tự */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Điểm thưởng *
            </label>
            <input
              type="number"
              required
              min="1"
              max="1000"
              value={formData.points}
              onChange={(e) => setFormData({...formData, points: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>

        {/* Giới hạn thời gian */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Giới hạn thời gian (giây)
          </label>
          <input
            type="number"
            min="0"
            step="30"
            value={formData.timeLimit || ''}
            onChange={(e) => setFormData({...formData, timeLimit: e.target.value ? parseInt(e.target.value) : null})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0 = Không giới hạn"
          />
          <p className="text-xs text-gray-500 mt-1">
            Để 0 hoặc trống nếu không giới hạn thời gian
          </p>
        </div>

        {/* Trạng thái */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActiveExercise"
            checked={formData.isActive}
            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isActiveExercise" className="text-sm text-gray-700">
            Kích hoạt bài tập này
          </label>
        </div>

        {/* Thông báo về nội dung */}
        {formData.exerciseTypeId && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Loại bài tập:</strong> {getExerciseTypeDisplayName(formData.exerciseTypeId)}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              <strong>Lưu ý:</strong> Nội dung chi tiết (câu hỏi, đáp án) sẽ được cấu hình sau khi tạo bài tập.
            </p>
          </div>
        )}

        {/* Nút cấu hình nội dung (chỉ hiện khi edit) */}
        {initialData && initialData.id && (
          <div className="border-t pt-4 mt-4">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleContentConfig}
            >
              ⚙️ Cấu hình nội dung bài tập
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Cấu hình câu hỏi, đáp án và nội dung chi tiết
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {initialData ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ExerciseForm;