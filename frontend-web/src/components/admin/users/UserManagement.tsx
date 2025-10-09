// UserManagement.tsx
import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Mail, UserCheck, UserX, Download, Upload, Eye } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import ProgressBar from '../../common/ProgressBar';
import { User, UserFilters } from '../../../types';

const UserManagement: React.FC = () => {
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
    search: '',
    status: '',
    tierId: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock data - sẽ được thay thế bằng API calls
  const [users, setUsers] = useState<User[]>([]);

  const statusColors = {
    active: 'success',
    inactive: 'default',
    banned: 'danger'
  } as const;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value, page: 1 });
  };

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  const handleUserAction = (action: 'activate' | 'deactivate' | 'ban', userId: string) => {
    console.log(`${action} user:`, userId);
  };

  const handleSendEmail = (userId: string) => {
    console.log('Send email to user:', userId);
  };

  const handleViewDetails = (userId: string) => {
    console.log('View user details:', userId);
  };

  const handleExportUsers = () => {
    console.log('Export users data');
  };

  const handleImportUsers = () => {
    console.log('Import users data');
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedUsers(prev =>
      prev.length === users.length ? [] : users.map(user => user.id)
    );
  };

  return (
    <AdminLayout currentPage="users">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý người dùng</h1>
            <p className="text-gray-600 mt-2">Quản lý thông tin và trạng thái người dùng</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={handleExportUsers}
              icon={<Download className="h-4 w-4" />}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm người dùng..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.search}
                  onChange={handleSearch}
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

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="active">Đang hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                    <option value="banned">Đã khóa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bậc học</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={filters.tierId}
                    onChange={(e) => handleFilterChange('tierId', e.target.value)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={filters.joinDateFrom}
                    onChange={(e) => handleFilterChange('joinDateFrom', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={filters.joinDateTo}
                    onChange={(e) => handleFilterChange('joinDateTo', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-600">Tổng người dùng</p>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-sm text-gray-600">Đang hoạt động</p>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">0</p>
              <p className="text-sm text-gray-600">Mới hôm nay</p>
            </div>
          </Card>
          <Card padding="md">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">0</p>
              <p className="text-sm text-gray-600">Đã khóa</p>
            </div>
          </Card>
        </div>

        {/* Users List */}
        <Card>
          <div className="overflow-x-auto">
            {users.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <UserX className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có người dùng nào</h3>
                <p className="text-gray-600">Dữ liệu người dùng sẽ xuất hiện tại đây</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-12 px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === users.length && users.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Người dùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bậc/Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tiến độ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Điểm số
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hoạt động cuối
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleUserSelection(user.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {user.avatar ? (
                              <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-white font-medium">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <span className="font-medium">{user.currentTier}</span>
                          <span className="text-gray-500"> / {user.currentLevel}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-32">
                          <ProgressBar progress={50} height="sm" showPercentage />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <span className="font-medium">{user.totalPoints}</span>
                          <span className="ml-2 text-xs text-gray-500">({user.currentStreak} ngày)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={statusColors[user.status]} size="sm">
                          {user.status === 'active' ? 'Đang hoạt động' : 
                           user.status === 'inactive' ? 'Không hoạt động' : 'Đã khóa'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewDetails(user.id)}
                            className="text-gray-400 hover:text-blue-600 p-1"
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleSendEmail(user.id)}
                            className="text-gray-400 hover:text-green-600 p-1"
                            title="Gửi email"
                          >
                            <Mail className="h-4 w-4" />
                          </button>
                          {user.status === 'active' ? (
                            <button
                              onClick={() => handleUserAction('ban', user.id)}
                              className="text-gray-400 hover:text-red-600 p-1"
                              title="Khóa tài khoản"
                            >
                              <UserX className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUserAction('activate', user.id)}
                              className="text-gray-400 hover:text-green-600 p-1"
                              title="Kích hoạt"
                            >
                              <UserCheck className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">0</span> đến <span className="font-medium">0</span> của{' '}
              <span className="font-medium">0</span> kết quả
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm" disabled>
                Trước
              </Button>
              <Button variant="secondary" size="sm" disabled>
                Sau
              </Button>
            </div>
          </div>
        </Card>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thao tác hàng loạt ({selectedUsers.length} người dùng đã chọn)
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="success" size="sm" icon={<UserCheck className="h-4 w-4" />}>
                Kích hoạt
              </Button>
              <Button variant="warning" size="sm" icon={<UserX className="h-4 w-4" />}>
                Tạm khóa
              </Button>
              <Button variant="danger" size="sm" icon={<Trash2 className="h-4 w-4" />}>
                Xóa
              </Button>
              <Button variant="secondary" size="sm" icon={<Mail className="h-4 w-4" />}>
                Gửi email
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;