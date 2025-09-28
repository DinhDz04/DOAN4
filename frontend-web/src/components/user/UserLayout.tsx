import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Trophy,
  User,
  Menu,
  X,
  ShoppingBag,
  Target,
  Award,
  Users,
  Settings,
  LogOut,
  Star,
  Flame,
} from "lucide-react";
import { Outlet } from "react-router-dom";

interface UserLayoutProps {
  children?: React.ReactNode;
  currentPage?: string;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Nguyễn Văn A",
    avatar: null,
    currentTier: "A1",
    currentLevel: "Level 2",
    totalPoints: 1250,
    currentStreak: 7,
    level: 15,
  };

  const menuItems = [
    {
      id: "home",
      label: "Trang chủ",
      icon: Home,
      href: "/user/home",
    },
    {
      id: "learning",
      label: "Học tập",
      icon: BookOpen,
      href: "/learning",
    },
    {
      id: "shop",
      label: "Cửa hàng",
      icon: ShoppingBag,
      href: "/shop",
    },
    {
      id: "quests",
      label: "Nhiệm vụ",
      icon: Target,
      href: "/quests",
    },
    {
      id: "leaderboard",
      label: "Bảng xếp hạng",
      icon: Trophy,
      href: "/leaderboard",
    },
    {
      id: "friends",
      label: "Bạn bè",
      icon: Users,
      href: "/friends",
    },
  ];

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Global Header với stats */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo và tên app */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EnglishApp
            </h1>
          </div>

          {/* Top stats - Nằm bên phải header */}
          <div className="flex items-center space-x-4">
            {/* Points */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full">
                <Star className="h-3 w-3 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">
                  {user.totalPoints}
                </p>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-red-50 px-3 py-1 rounded-xl border border-orange-200">
              <div className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full">
                <Flame className="h-3 w-3 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">
                  {user.currentStreak}
                </p>
              </div>
            </div>

            {/* Level */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 rounded-xl border border-blue-200">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                <Award className="h-3 w-3 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{user.level}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
  fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
  h-[calc(100vh-4rem)] mt-16 lg:mt-0 lg:h-screen
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
`}
        >
          <div className="flex flex-col h-full pt-16">
            {" "}
            {/* Thêm pt-16 để tránh bị header che */}
            {/* User Info */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <User className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.currentTier} - {user.currentLevel}
                  </p>
                </div>
              </div>
            </div>
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;

                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className={`
                          flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                          ${
                            isActive
                              ? "bg-blue-50 text-blue-700 shadow-sm"
                              : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          }
                        `}
                      >
                        <Icon
                          className={`mr-3 h-5 w-5 ${
                            isActive ? "text-blue-700" : "text-gray-400"
                          }`}
                        />
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            {/* Settings and logout */}
            <div className="border-t border-gray-200 p-4 space-y-2">
              <a
                href="/settings"
                className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <Settings className="mr-3 h-4 w-4 text-gray-400" />
                Cài đặt
              </a>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <LogOut className="mr-3 h-4 w-4 text-gray-400" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          {/* Page title bar */}
          <div className=" border-gray-200">
            <div className="flex items-center h-12 px-6">
              <h2 className="text-lg font-semibold text-gray-800">
                {currentPage === "home" && "Trang chủ"}
                {currentPage === "learning" && "Học tập"}
                {currentPage === "shop" && "Cửa hàng"}
                {currentPage === "quests" && "Nhiệm vụ hàng ngày"}
                {currentPage === "leaderboard" && "Bảng xếp hạng"}
                {currentPage === "friends" && "Bạn bè"}
              </h2>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 p-6"><Outlet /></main>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
