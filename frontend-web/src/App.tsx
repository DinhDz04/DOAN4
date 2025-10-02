import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import ErrorBoundary from "./components/common/ErrorBoundary";

// Admin Pages
import Dashboard from "./components/admin/Dashboard";
import LearningPathManagement from "./components/admin/LearningPathManagement";
import LevelDetailManagement from "./components/admin/LevelDetailManagement";
import LevelDetail from "./components/admin/LevelDetail";
import UserManagement from "./components/admin/UserManagement";
import GamificationManagement from "./components/admin/GamificationManagement";
import ExerciseContentManager from "./components/admin/ExerciseContentManager";
import VocabularyPreviewPage from "./components/admin/VocabularyPreviewPage";
import ExercisePreviewPage from "./components/admin/ExercisePreviewPage";
import UserLayouts from "./components/user/UserLayout";
import UserHomepage from "./components/user/UserHomepage";
import LearningLevels from "./components/user/LearningLevels";
import LevelDetails from "./components/user/LevelDetail";
import ExercisePage from "./components/user/ExercisePage";
import TierDetail from "./components/user/TierDetail";
import ExerciseReview from "./components/user/ExerciseReview";
import Shop from "./components/user/Shop";
import Quests from "./components/user/Quests";
import Leaderboard from "./components/user/Leaderboard";
import Friends from "./components/user/Friends";
// import Friends from "./components/user/Friends";

// import SystemSettings from './components/admin/SystemSettings';

// Auth Pages (placeholder - bạn sẽ tạo sau)
import AdminLogin from "./components/auth/AdminLogin";
import UserLogin from "./components/auth/UserLogin";

// User Pages (placeholder - bạn sẽ tạo sau)

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* User Auth Routes */}
            {/* <Route path="/login" element={<div>User Login Page - Chưa implement</div>} />
          <Route path="/register" element={<div>User Register Page - Chưa implement</div>} /> */}

            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/user/login" element={<UserLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute requireUser>
                  <UserLayouts currentPage="home" />
                </ProtectedRoute>
              }
            >
              <Route path="home" element={<UserHomepage />} />
              {/* Thêm các route user khác sau này */}
            </Route>
            <Route
              path="/learning"
              element={
                <ProtectedRoute requireUser>
                  <UserLayouts currentPage="learning" />
                </ProtectedRoute>
              }
            >
              <Route index element={<LearningLevels />} />
              <Route path="tier/:tierCode" element={<TierDetail />} />
              <Route path="level/:levelId" element={<LevelDetails />} />
              <Route path="exercise/:exerciseId" element={<ExercisePage />} />
              <Route
                path="exercise/:exerciseId/review"
                element={<ExerciseReview />}
              />
            </Route>
            <Route
              path="/shop"
              element={
                <ProtectedRoute requireUser>
                  <UserLayouts currentPage="shop" />
                </ProtectedRoute>
              }
            >
              <Route index element={<Shop />} />
            </Route>

            <Route
              path="/quests"
              element={
                <ProtectedRoute requireUser>
                  <UserLayouts currentPage="quests" />
                </ProtectedRoute>
              }
            >
              <Route index element={<Quests />} />
            </Route>
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute requireUser>
                  <UserLayouts currentPage="leaderboard" />
                </ProtectedRoute>
              }
            >
              <Route index element={<Leaderboard />} />
            </Route>

            <Route
              path="/friends"
              element={
                <ProtectedRoute requireUser>
                  <UserLayouts currentPage="friends" />
                </ProtectedRoute>
              }
            >
              <Route index element={<Friends />} />
            </Route>

            <Route
              path="/admin/learning-path"
              element={
                <ProtectedRoute requireAdmin>
                  <LearningPathManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/learning-path/:tierCode"
              element={
                <ProtectedRoute requireAdmin>
                  <LevelDetailManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/learning-path/:tierCode/levels/:levelId"
              element={
                <ProtectedRoute requireAdmin>
                  <LevelDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/exercises/:exerciseId"
              element={
                <ProtectedRoute requireAdmin>
                  <ExerciseContentManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/exercises/:exerciseId/preview"
              element={
                <ProtectedRoute requireAdmin>
                  <ExercisePreviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/levels/:levelId/vocabulary-preview"
              element={
                <ProtectedRoute requireAdmin>
                  <VocabularyPreviewPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireAdmin>
                  <UserManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/gamification"
              element={
                <ProtectedRoute requireAdmin>
                  <GamificationManagement />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/admin/system" element={
            isAdminAuthenticated() ? <SystemSettings /> : <Navigate to="/admin/login" replace />
          } /> */}

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">
                      404
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      Trang không tồn tại
                    </p>
                    <a
                      href="/"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      aaaaa
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
