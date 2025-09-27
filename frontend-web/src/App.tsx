import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Admin Pages
import Dashboard from './components/admin/Dashboard';
import LearningPathManagement from './components/admin/LearningPathManagement';
import LevelDetailManagement from './components/admin/LevelDetailManagement';
import LevelDetail from './components/admin/LevelDetail';
import UserManagement from './components/admin/UserManagement';
import GamificationManagement from './components/admin/GamificationManagement';
import ExerciseContentManager from './components/admin/ExerciseContentManager';
import VocabularyPreviewPage from './components/admin/VocabularyPreviewPage';
import ExercisePreviewPage from './components/admin/ExercisePreviewPage';
// import SystemSettings from './components/admin/SystemSettings';

// Auth Pages (placeholder - bạn sẽ tạo sau)
import AdminLogin from './components/auth/AdminLogin';

// User Pages (placeholder - bạn sẽ tạo sau)


function App() {
  // Placeholder cho authentication logic
  const isAdminAuthenticated = () => {
    // Logic kiểm tra authentication
    const token = localStorage.getItem('adminToken');
    return !!token; // Đơn giản hóa, thực tế cần validate token
  };

  const isUserAuthenticated = () => {
    // Logic kiểm tra authentication cho user
    const token = localStorage.getItem('userToken');
    return !!token;
  };

  return (
    <Router>
      <div className="App">
        <Routes>

          
          {/* User Auth Routes */}
          <Route path="/login" element={<div>User Login Page - Chưa implement</div>} />
          <Route path="/register" element={<div>User Register Page - Chưa implement</div>} />

          {/* Admin Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            isAdminAuthenticated() ? <Dashboard /> : <Navigate to="/admin/login" replace />
          } />
          
          <Route path="/admin/learning-path" element={
            isAdminAuthenticated() ? <LearningPathManagement /> : <Navigate to="/admin/login" replace />
          } />
          <Route path="/admin/learning-path/:tierCode" element={
            isAdminAuthenticated() ? <LevelDetailManagement /> : <Navigate to="/admin/login" replace />
          } />
          <Route path="/admin/learning-path/:tierCode/levels/:levelId" element={
            isAdminAuthenticated() ? <LevelDetail /> : <Navigate to="/admin/login" replace />
          } />
          <Route path="/admin/exercises/:exerciseId" element={
            isAdminAuthenticated() ? <ExerciseContentManager /> : <Navigate to="/admin/login" replace />
          } />
          <Route path = '/admin/exercises/:exerciseId/preview' element={
            isAdminAuthenticated() ? <ExercisePreviewPage /> : <Navigate to="/admin/login" replace />
          } />
          <Route path = '/admin/levels/:levelId/vocabulary-preview' element={
            isAdminAuthenticated() ? <VocabularyPreviewPage /> : <Navigate to="/admin/login" replace />
          } />

          
          <Route path="/admin/users" element={
            isAdminAuthenticated() ? <UserManagement /> : <Navigate to="/admin/login" replace />
          } />
          
          <Route path="/admin/gamification" element={
            isAdminAuthenticated() ? <GamificationManagement /> : <Navigate to="/admin/login" replace />
          } /> 
          
          {/* <Route path="/admin/system" element={
            isAdminAuthenticated() ? <SystemSettings /> : <Navigate to="/admin/login" replace />
          } /> */} 

          {/* 404 Page */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Trang không tồn tại</p>
                <a 
                  href="/" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                 aaaaa
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;