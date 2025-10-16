// Component Props Types
export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}
export interface Blank {
  id: string;
  position: number;
  correctAnswer: string;
}
export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  as?: React.ElementType;
  to?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export interface ProgressBarProps {
  progress: number;
  height?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'yellow' | 'purple';
  showPercentage?: boolean;
  className?: string;
}

export interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
}

// Admin Data Types
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  createdAt: string;
  lastLogin?: string;
}

export interface Tier {
  id: string;
  name: string;
  code: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  description: string;
  order: number;
  isActive: boolean;
  levelCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Level {
  id: string;
  tierId: string;
  name: string;
  description: string;
  order: number;
  isLocked: boolean;
  unlockConditions?: string[];
  vocabularyCount: number;
  exerciseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Vocabulary {
  id: string;
  levelId: string;
  word: string;
  pronunciation: string;
  meaning: string;
  exampleSentence: string;
  audioUrl?: string;
  imageUrl?: string;
  partOfSpeech: string;
  createdAt: string;
}

export interface Exercise {
  id: string;
  levelId: string;
  title: string;
  description: string;
  type: 'multiple-choice' | 'matching' | 'fill-blank' | 'comprehensive';
  content: any; // JSON content specific to exercise type
  points: number;
  timeLimit?: number; // in seconds
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// User Data Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  currentTier: string;
  currentLevel: string;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'banned';
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: string;
  notifications: boolean;
  dailyGoal: number;
  theme: 'light' | 'dark';
}

export interface UserProgress {
  userId: string;
  levelId: string;
  tierId: string;
  progress: number; // 0-100
  completedExercises: string[];
  totalExercises: number;
  vocabularyProgress: number;
  lastAccessed: string;
  completedAt?: string;
}

export interface UserExerciseResult {
  id: string;
  userId: string;
  exerciseId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in seconds
  completedAt: string;
  answers: any[]; // Specific to exercise type
}

// Gamification Types
export interface GameItem {
  id: string;
  name: string;
  description: string;
  type: 'xp_boost' | 'point_boost' | 'streak_freeze' | 'theme' | 'avatar';
  price: number;
  duration?: number; // in days for temporary items
  effectValue?: number; // multiplier for boosts
  isActive: boolean;
  imageUrl?: string;
  createdAt: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  type: 'exercises_completed' | 'points_earned' | 'streak_maintained' | 'vocabulary_learned';
  targetValue: number;
  rewardType: 'points' | 'xp' | 'item';
  rewardValue: number;
  rewardItemId?: string;
  isActive: boolean;
  validFrom: string;
  validTo: string;
}

export interface UserDailyQuest {
  id: string;
  userId: string;
  questId: string;
  currentProgress: number;
  isCompleted: boolean;
  completedAt?: string;
  rewardClaimed: boolean;
  date: string;
}

export interface GiftBox {
  id: string;
  name: string;
  description: string;
  contents: GiftBoxContent[];
  isActive: boolean;
  createdAt: string;
}

export interface GiftBoxContent {
  itemType: 'points' | 'xp' | 'item';
  itemId?: string;
  quantity: number;
  probability: number; // 0-1
}

// System Settings Types
export interface SystemSettings {
  id: string;
  category: 'scoring' | 'gamification' | 'notifications' | 'general';
  key: string;
  value: any;
  description: string;
  updatedAt: string;
  updatedBy: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

// Filter and Search Types
export interface FilterOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface ExerciseFilters extends FilterOptions {
  tierId?: string;
  levelId?: string;
  type?: string;
  isActive?: boolean;
}

export interface UserFilters extends FilterOptions {
  status?: string;
  tierId?: string;
  joinDateFrom?: string;
  joinDateTo?: string;
  lastActiveFrom?: string;
  lastActiveTo?: string;
}

// Dashboard Statistics Types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalExercises: number;
  totalLevels: number;
  totalVocabulary: number;
  averageProgress: number;
  topUsers: Array<{
    id: string;
    name: string;
    points: number;
    streak: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'user_registration' | 'exercise_completed' | 'level_completed';
    description: string;
    timestamp: string;
  }>;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  token: string;
  refreshToken: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Form Types
export interface TierFormData {
  name: string;
  code: string;
  description: string;
  order: number;
  isActive: boolean;
}

export interface LevelFormData {
  tierId: string;
  name: string;
  description: string;
  order: number;
  isLocked: boolean;
  unlockConditions: string[];
}

export interface ExerciseFormData {
  levelId: string;
  title: string;
  description: string;
  type: string;
  content: any;
  points: number;
  timeLimit?: number;
  isActive: boolean;
}

export interface VocabularyFormData {
  levelId: string;
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  audioUrl?: string;
  imageUrl?: string;
  partOfSpeech: string;
}
