import React, { useState } from 'react';
import { Plus, Filter, Search, Edit, Trash2, Eye, Upload, Download, Menu, X } from 'lucide-react';
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
      <div className="space-y-4 md:space-y-6 p-4 md:p-0">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quản lý bài tập</h1>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Tạo và quản lý các loại bài tập</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={handleImport}
              icon={<Upload className="h-4 w-4" />}
              className="flex-1 sm:flex-none justify-center"
            >
              <span className="hidden sm:inline">Import</span>
              <span className="sm:hidden">Import</span>
            </Button>
            <Button
              variant="secondary"
              onClick={handleExport}
              icon={<Download className="h-4 w-4" />}
              className="flex-1 sm:flex-none justify-center"
            >
              <span className="hidden sm:inline">Export</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateNew}
              icon={<Plus className="h-4 w-4" />}
              className="flex-1 sm:flex-none justify-center"
            >
              <span className="hidden sm:inline">Tạo bài tập mới</span>
              <span className="sm:hidden">Tạo mới</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="block lg:hidden">
          <Button
            variant="secondary"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            icon={showMobileMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            fullWidth
          >
            {showMobileMenu ? "Đóng menu" : "Mở menu tìm kiếm"}
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className={`${showMobileMenu ? 'block' : 'hidden'} lg:block`}>
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài tập..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                icon={<Filter className="h-4 w-4" />}
                className="w-full sm:w-auto justify-center"
              >
                <span className="hidden sm:inline">Bộ lọc</span>
                <span className="sm:hidden">Lọc</span>
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bậc</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-2 md:px-3 py-2 text-sm"
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
                    className="w-full border border-gray-300 rounded-md px-2 md:px-3 py-2 text-sm"
                    value={filters.level}
                    onChange={(e) => setFilters({...filters, level: e.target.value})}
                  >
                    <option value="">Tất cả</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại bài tập</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-2 md:px-3 py-2 text-sm"
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
                    className="w-full border border-gray-300 rounded-md px-2 md:px-3 py-2 text-sm"
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
                    className="w-full border border-gray-300 rounded-md px-2 md:px-3 py-2 text-sm"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card padding="md">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-blue-600">0</p>
              <p className="text-xs md:text-sm text-gray-600">Tổng bài tập</p>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-green-600">0</p>
              <p className="text-xs md:text-sm text-gray-600">Trắc nghiệm</p>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-yellow-600">0</p>
              <p className="text-xs md:text-sm text-gray-600">Nối từ</p>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-purple-600">0</p>
              <p className="text-xs md:text-sm text-gray-600">Điền từ</p>
            </div>
          </Card>
        </div>

        {/* Exercise List */}
        <Card>
          <div className="overflow-x-auto">
            {exercises.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có bài tập nào</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">Bắt đầu tạo bài tập đầu tiên của bạn</p>
                <Button variant="primary" onClick={handleCreateNew} className="w-full sm:w-auto">
                  Tạo bài tập mới
                </Button>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên bài tập
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Loại
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Level
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Độ khó
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Trạng thái
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                      Ngày tạo
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {exercises.map((exercise) => (
                    <tr key={exercise.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-[150px] md:max-w-none">
                            {exercise.title}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center space-x-2 mt-1">
                            <Badge variant={typeColors[exercise.type]} size="sm" className="sm:hidden">
                              {getTypeLabel(exercise.type)}
                            </Badge>
                            <span className="hidden sm:inline">{exercise.tier}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                        <Badge variant={typeColors[exercise.type]} size="sm">
                          {getTypeLabel(exercise.type)}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {exercise.level}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                        <Badge variant={difficultyColors[exercise.difficulty]} size="sm">
                          {exercise.difficulty === 'easy' ? 'Dễ' : exercise.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                        <Badge variant={exercise.status === 'active' ? 'success' : 'default'} size="sm">
                          {exercise.status === 'active' ? 'Đã xuất bản' : 'Nháp'}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden xl:table-cell">
                        {exercise.createdAt}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-1">
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
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="flex-1 sm:flex-none justify-center">
                Xuất bản đã chọn
              </Button>
              <Button variant="secondary" size="sm" className="flex-1 sm:flex-none justify-center">
                Chuyển về nháp
              </Button>
              <Button variant="danger" size="sm" className="flex-1 sm:flex-none justify-center">
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