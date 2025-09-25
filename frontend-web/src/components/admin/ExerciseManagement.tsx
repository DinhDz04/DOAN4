import React, { useState } from 'react';
import { Plus, Filter, Search, Edit, Trash2, Eye, Upload, Download } from 'lucide-react';
import AdminLayout from './AdminLayout';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

interface Exercise {
  id: string;
  title: string;
  type: 'multiple-choice' | 'matching' | 'fill-blank' | 'comprehensive';
  level: string;
  tier: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
  status: 'active' | 'draft';
}

const ExerciseManagement: React.FC = () => {
  const [filters, setFilters] = useState({
    tier: '',
    level: '',
    type: '',
    difficulty: '',
    status: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - sẽ được thay thế bằng API calls
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const exerciseTypes = [
    { value: 'multiple-choice', label: 'Trắc nghiệm' },
    { value: 'matching', label: 'Nối từ' },
    { value: 'fill-blank', label: 'Điền từ' },
    { value: 'comprehensive', label: 'Tổng hợp' }
  ];

  const difficultyColors = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger'
  } as const;

  const typeColors = {
    'multiple-choice': 'info',
    'matching': 'default',
    'fill-blank': 'success',
    'comprehensive': 'warning'
  } as const;

  const handleCreateNew = () => {
    console.log('Create new exercise');
  };

  const handleEdit = (id: string) => {
    console.log('Edit exercise:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete exercise:', id);
  };

  const handlePreview = (id: string) => {
    console.log('Preview exercise:', id);
  };

  const handleImport = () => {
    console.log('Import exercises');
  };

  const handleExport = () => {
    console.log('Export exercises');
  };

  const getTypeLabel = (type: string) => {
    const typeObj = exerciseTypes.find(t => t.value === type);
    return typeObj?.label || type;
  };

  return (
    <AdminLayout currentPage="exercises">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý bài tập</h1>
            <p className="text-gray-600 mt-2">Tạo và quản lý các loại bài tập</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={handleImport}
              icon={<Upload className="h-4 w-4" />}
            >
              Import
            </Button>
            <Button
              variant="secondary"
              onClick={handleExport}
              icon={<Download className="h-4 w-4" />}
            >
              Export
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateNew}
              icon={<Plus className="h-4 w-4" />}
            >
              Tạo bài tập mới
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài tập..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                icon={<Filter className="h-4 w-4" />}
              >
                Bộ lọc
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bậc</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={filters.tier}
                    onChange={(e) => setFilters({...filters, tier: e.target.value})}
                  >
                    <option value="">Tất cả</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={filters.level}
                    onChange={(e) => setFilters({...filters, level: e.target.value})}
                  >
                    <option value="">Tất cả</option>
                    {/* Options sẽ được load từ API */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại bài tập</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                  >
                    <option value="">Tất cả</option>
                    {exerciseTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Độ khó</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={filters.difficulty}
                    onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                  >
                    <option value="">Tất cả</option>
                    <option value="easy">Dễ</option>
                    <option value="medium">Trung bình</option>
                    <option value="hard">Khó</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="">Tất cả</option>
                    <option value="active">Đã xuất bản</option>
                    <option value="draft">Nháp</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Exercise Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-600">Tổng bài tập</p>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-sm text-gray-600">Trắc nghiệm</p>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">0</p>
              <p className="text-sm text-gray-600">Nối từ</p>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">0</p>
              <p className="text-sm text-gray-600">Điền từ</p>
            </div>
          </Card>
        </div>

        {/* Exercise List */}
        <Card>
          <div className="overflow-x-auto">
            {exercises.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có bài tập nào</h3>
                <p className="text-gray-600 mb-4">Bắt đầu tạo bài tập đầu tiên của bạn</p>
                <Button variant="primary" onClick={handleCreateNew}>
                  Tạo bài tập mới
                </Button>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên bài tập
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Độ khó
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {exercises.map((exercise) => (
                    <tr key={exercise.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{exercise.title}</div>
                          <div className="text-sm text-gray-500">{exercise.tier}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={typeColors[exercise.type]} size="sm">
                          {getTypeLabel(exercise.type)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {exercise.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={difficultyColors[exercise.difficulty]} size="sm">
                          {exercise.difficulty === 'easy' ? 'Dễ' : exercise.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={exercise.status === 'active' ? 'success' : 'default'} size="sm">
                          {exercise.status === 'active' ? 'Đã xuất bản' : 'Nháp'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {exercise.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handlePreview(exercise.id)}
                            className="text-gray-400 hover:text-blue-600 p-1"
                            title="Xem trước"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(exercise.id)}
                            className="text-gray-400 hover:text-blue-600 p-1"
                            title="Chỉnh sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(exercise.id)}
                            className="text-gray-400 hover:text-red-600 p-1"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>

        {/* Bulk Actions */}
        {exercises.length > 0 && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác hàng loạt</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="sm">
                Xuất bản đã chọn
              </Button>
              <Button variant="secondary" size="sm">
                Chuyển về nháp
              </Button>
              <Button variant="danger" size="sm">
                Xóa đã chọn
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default ExerciseManagement;