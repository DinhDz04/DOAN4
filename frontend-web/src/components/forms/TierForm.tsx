import React, { useState, useEffect } from 'react'; // THÊM useEffect
import Modal from '../common/Modal';

interface TierFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const TierForm: React.FC<TierFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    order: 1,
    isActive: true
  });

  // THÊM useEffect để cập nhật formData khi initialData thay đổi
  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        description: initialData.description || '',
        order: initialData.order || 1,
        isActive: initialData.isActive ?? true
      });
    } else {
      setFormData({
        code: '',
        description: '',
        order: 1,
        isActive: true
      });
    }
  }, [initialData, isOpen]); // THÊM isOpen để reset khi mở form mới

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const tierCodes = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Chỉnh sửa Bậc học" : "Thêm Bậc học mới"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên Bậc Học (Mã) 
          </label>
          <select
            required
            value={formData.code}
            onChange={(e) => setFormData({...formData, code: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!!initialData} // VÔ HIỆU HÓA KHI CHỈNH SỬA
          >
            <option value="">Chọn</option>
            {tierCodes.map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
          {initialData && (
            <p className="text-xs text-gray-500 mt-1">Không thể thay đổi mã bậc học khi chỉnh sửa</p>
          )}
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
            placeholder="Mô tả về cấp độ này..."
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
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            Kích hoạt bậc học này
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

export default TierForm;