import React from 'react';
import { Users, BookOpen, PenTool, TrendingUp, Calendar, Award } from 'lucide-react';
import AdminLayout from './AdminLayout';
import StatsCard from '../common/StatsCard';
import Card from '../common/Card';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trang chủ Admin</h1>
          <p className="text-gray-600 mt-2">Tổng quan hệ thống học tiếng Anh</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={<Users className="h-8 w-8" />}
            title="Tổng người dùng"
            value="0"
            subtitle="Người dùng đang hoạt động"
            color="blue"
          />
          <StatsCard
            icon={<BookOpen className="h-8 w-8" />}
            title="Tổng bài học"
            value="0"
            subtitle="Across all levels"
            color="green"
          />
          <StatsCard
            icon={<PenTool className="h-8 w-8" />}
            title="Tổng bài tập"
            value="0"
            subtitle="Bài tập đã tạo"
            color="yellow"
          />
          <StatsCard
            icon={<TrendingUp className="h-8 w-8" />}
            title="Hoạt động hôm nay"
            value="0"
            subtitle="Lượt truy cập mới"
            color="purple"
          />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Activity Chart */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động người dùng (7 ngày qua)</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Biểu đồ hoạt động sẽ được hiển thị tại đây</p>
                <p className="text-sm">Kết nối với backend để hiển thị dữ liệu thực</p>
              </div>
            </div>
          </Card>

          {/* Learning Progress Chart */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiến độ học tập theo level</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <Award className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Biểu đồ tiến độ học tập</p>
                <p className="text-sm">Hiển thị phân bố người dùng theo từng level</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Người dùng mới</h3>
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">U</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Đang tải...</p>
                      <p className="text-xs text-gray-500">--</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Exercises */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bài tập mới nhất</h3>
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="py-2 border-b border-gray-100 last:border-b-0">
                  <p className="text-sm font-medium text-gray-900">Đang tải...</p>
                  <p className="text-xs text-gray-500">Level: -- | Loại: --</p>
                </div>
              ))}
            </div>
          </Card>

          {/* System Status */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái hệ thống</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Hoạt động
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Server</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Hoạt động
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  75% sử dụng
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cache</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Hoạt động
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;