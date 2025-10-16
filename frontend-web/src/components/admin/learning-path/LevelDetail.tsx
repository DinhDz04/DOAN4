import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  FileText,
  Play,
  Volume2,
  Bookmark,
  Settings,
  Menu,
  X,
} from "lucide-react";
import AdminLayout from "../AdminLayout";
import Card from "../../common/Card";
import Button from "../../common/Button";
import Badge from "../../common/Badge";
import { Level, Vocabulary, Exercise } from "../../../types";
import { VocabularyForm } from "../../forms";
import { ExerciseForm } from "../../forms";
import { learningPathApi } from "../../../services/learningPathApi";

const LevelDetail: React.FC = () => {
  const { tierCode, levelId } = useParams<{
    tierCode: string;
    levelId: string;
  }>();
  const navigate = useNavigate();
  
  // State management
  const [level, setLevel] = useState<Level | null>(null);
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<Array<{ id: string; name: string; display_name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  
  const [showVocabForm, setShowVocabForm] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [editingVocab, setEditingVocab] = useState<Vocabulary | null>(null);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "vocabulary" | "exercises" | "comprehensive"
  >("overview");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Fetch level data
  useEffect(() => {
    if (levelId) {
      fetchLevelData();
      fetchExerciseTypes();
    }
  }, [levelId]);

  const fetchLevelData = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch level detail
      const levelData = await learningPathApi.getLevelDetail(levelId!);
      setLevel(levelData);
      
      // Fetch vocabulary for this level
      const vocabData = await learningPathApi.getVocabularyByLevel(levelId!);
      setVocabulary(vocabData);
      console.log('Vocabulary data:', vocabData); 
      
      // Fetch exercises for this level
      const exerciseData = await learningPathApi.getExercisesByLevel(levelId!);
      setExercises(exerciseData);
      
    } catch (err: any) {
      setError(err.message || "Failed to load level data");
      console.error("Error fetching level data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchExerciseTypes = async () => {
    try {
      const types = await learningPathApi.getExerciseTypes();
      setExerciseTypes(types);
      console.log('🔍 Exercise types từ API:', types);
    } catch (err: any) {
      console.error("Error fetching exercise types:", err);
      // Vẫn set dữ liệu mặc định nếu có lỗi
      setExerciseTypes([
        { id: '1', name: 'multiple-choice', display_name: 'Trắc nghiệm' },
        { id: '2', name: 'fill-blank', display_name: 'Điền vào chỗ trống' },
        { id: '3', name: 'matching', display_name: 'Nối đáp án' },
      ]);
    }
  };

  // Vocabulary handlers
  const handleAddVocabulary = () => {
    setEditingVocab(null);
    setShowVocabForm(true);
  };

  const handleEditVocabulary = (vocab: Vocabulary) => {
    setEditingVocab(vocab);
    setShowVocabForm(true);
  };

  const handleVocabFormSubmit = async (data: any) => {
    try {
      if (editingVocab) {
        await learningPathApi.updateVocabulary(editingVocab.id, {
          ...data,
          levelId: levelId
        });
      } else {
        await learningPathApi.createVocabulary({
          ...data,
          levelId: levelId
        });
      }
      setShowVocabForm(false);
      setEditingVocab(null);
      // Refresh vocabulary list
      const vocabData = await learningPathApi.getVocabularyByLevel(levelId!);
      setVocabulary(vocabData);
    } catch (err: any) {
      setError(err.message || "Failed to save vocabulary");
      console.error("Error saving vocabulary:", err);
    }
  };

  const handleDeleteVocabulary = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this vocabulary?")) {
      try {
        await learningPathApi.deleteVocabulary(id);
        // Refresh vocabulary list
        const vocabData = await learningPathApi.getVocabularyByLevel(levelId!);
        setVocabulary(vocabData);
      } catch (err: any) {
        setError(err.message || "Failed to delete vocabulary");
        console.error("Error deleting vocabulary:", err);
      }
    }
  };

  // Exercise handlers
  const handleAddExercise = () => {
    setEditingExercise(null);
    setShowExerciseForm(true);
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setShowExerciseForm(true);
  };

  const handleExerciseFormSubmit = async (data: any) => {
    try {
      if (editingExercise) {
        await learningPathApi.updateExercise(editingExercise.id, {
          ...data,
          levelId: levelId
        });
      } else {
        await learningPathApi.createExercise({
          ...data,
          levelId: levelId
        });
      }
      setShowExerciseForm(false);
      setEditingExercise(null);
      // Refresh exercises list
      const exerciseData = await learningPathApi.getExercisesByLevel(levelId!);
      setExercises(exerciseData);
    } catch (err: any) {
      setError(err.message || "Failed to save exercise");
      console.error("Error saving exercise:", err);
    }
  };

  const handleDeleteExercise = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      try {
        await learningPathApi.deleteExercise(id);
        // Refresh exercises list
        const exerciseData = await learningPathApi.getExercisesByLevel(levelId!);
        setExercises(exerciseData);
      } catch (err: any) {
        setError(err.message || "Failed to delete exercise");
        console.error("Error deleting exercise:", err);
      }
    }
  };

  const handleBack = () => {
    navigate(`/admin/learning-path/${tierCode}`);
  };

  const handlePlayAudio = (audioUrl: string) => {
    console.log("Play audio:", audioUrl);
    // Implement audio playback
  };

  const handlePreviewExercise = (exercise: Exercise) => {
    console.log("Preview exercise:", exercise.id);
    // Implement exercise preview
  };

  const getExerciseIcon = (type: string) => {
    switch (type) {
      case "multiple-choice":
        return "📘";
      case "matching":
        return "🔗";
      case "fill-blank":
        return "📝";
      case "comprehensive":
        return "🎯";
      default:
        return "📄";
    }
  };

  // Loading state
  if (loading) {
    return (
      <AdminLayout currentPage="learning-path">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  // Error state
  if (error && !level) {
    return (
      <AdminLayout currentPage="learning-path">
        <div className="space-y-4 md:space-y-6 p-4 md:p-0">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <p className="text-red-700">{error}</p>
              <button onClick={() => setError("")} className="text-red-500">
                ×
              </button>
            </div>
          </div>
          <Button onClick={handleBack} variant="secondary">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </div>
      </AdminLayout>
    );
  }

  if (!level) {
    return (
      <AdminLayout currentPage="learning-path">
        <div className="text-center p-8">
          <p className="text-gray-500">Level không tồn tại</p>
          <Button onClick={handleBack} variant="secondary" className="mt-4">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="learning-path">
      <div className="space-y-4 md:space-y-6 p-4 md:p-0">
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <p className="text-red-700">{error}</p>
              <button onClick={() => setError("")} className="text-red-500">
                ×
              </button>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="flex items-center flex-wrap space-x-2 text-sm text-gray-500 gap-1">
          <button
            onClick={() => navigate("/admin/learning-path")}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden xs:inline">Lộ trình học</span>
            <span className="xs:hidden">Lộ trình</span>
          </button>
          <span>/</span>
          <button
            onClick={handleBack}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>Bậc {tierCode}</span>
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[150px] xs:max-w-none">
            {level.name}
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">
              {level.name}
            </h1>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base break-words">
              {level.description}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-4 mt-2 md:mt-3 text-xs md:text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
                {vocabulary.length} từ vựng
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3 md:h-4 md:w-4" />
                {exercises.length} bài tập
              </span>
              <span className="flex items-center gap-1">
                <span>🔢</span>
                Thứ tự: {level.order}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start">
            <Button 
              variant="secondary" 
              icon={<Edit className="h-4 w-4" />}
              className="w-full sm:w-auto justify-center"
            >
              <span className="hidden sm:inline">Chỉnh sửa Level</span>
              <span className="sm:hidden">Sửa Level</span>
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
            {showMobileMenu ? "Đóng menu" : "Mở menu tab"}
          </Button>
        </div>

        {/* Tab Navigation */}
        <Card padding="sm" className={`${showMobileMenu ? 'block' : 'hidden'} lg:block`}>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-1">
            {[
              { id: "overview", label: "Tổng quan", icon: "📊" },
              { id: "vocabulary", label: "Sổ tay từ vựng", icon: "📖" },
              { id: "exercises", label: "Bài tập", icon: "🎯" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setShowMobileMenu(false);
                }}
                className={`flex items-center justify-center sm:justify-start space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
            {/* Vocabulary Summary */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span>Sổ tay từ vựng</span>
                </h3>
                <Badge variant="success">{vocabulary.length} từ</Badge>
              </div>
              <div className="space-y-3">
                {vocabulary.slice(0, 5).map((vocab) => (
                  <div
                    key={vocab.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 truncate">
                        {vocab.word}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {vocab.meaning}
                      </div>
                    </div>
                    {vocab.audioUrl && (
                      <button
                        onClick={() => handlePlayAudio(vocab.audioUrl!)}
                        className="text-gray-400 hover:text-blue-600 ml-2 flex-shrink-0"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                {vocabulary.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Chưa có từ vựng nào</p>
                )}
              </div>
              <Button
                variant="secondary"
                fullWidth
                className="mt-4"
                onClick={() => setActiveTab("vocabulary")}
              >
                Xem tất cả từ vựng
              </Button>
            </Card>

            {/* Exercises Summary */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Bài tập</span>
                </h3>
                <Badge variant="info">{exercises.length} bài</Badge>
              </div>
              <div className="space-y-3">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <span className="text-lg flex-shrink-0">
                        {getExerciseIcon(exercise.type)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 truncate">
                          {exercise.title}
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {exercise.points} điểm
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {exercises.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Chưa có bài tập nào</p>
                )}
              </div>
              <Button
                variant="secondary"
                fullWidth
                className="mt-4"
                onClick={() => setActiveTab("exercises")}
              >
                Xem tất cả bài tập
              </Button>
            </Card>
          </div>
        )}

        {activeTab === "vocabulary" && (
          <Card>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Sổ tay từ vựng</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/admin/levels/${levelId}/vocabulary-preview`)}
                  className="justify-center"
                >
                  <span className="hidden sm:inline">👁️ Xem trước tất cả từ vựng</span>
                  <span className="sm:hidden">👁️ Xem trước</span>
                </Button>
                <Button
                  variant="primary"
                  icon={<Plus className="h-4 w-4" />}
                  onClick={handleAddVocabulary}
                  className="justify-center"
                >
                  <span className="hidden sm:inline">Thêm từ vựng</span>
                  <span className="sm:hidden">Thêm từ</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {vocabulary.map((vocab) => (
                <div
                  key={vocab.id}
                  className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <h3 className="font-semibold text-base md:text-lg truncate">
                        {vocab.word}
                      </h3>
                      {vocab.audioUrl && (
                        <button
                          onClick={() => handlePlayAudio(vocab.audioUrl!)}
                          className="text-gray-400 hover:text-blue-600 flex-shrink-0"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="flex space-x-1 ml-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditVocabulary(vocab)}
                        className="text-gray-400 hover:text-blue-600 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteVocabulary(vocab.id)}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-xs text-gray-500">Phát âm:</span>
                      <p className="text-gray-700 text-sm truncate">{vocab.pronunciation}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Nghĩa:</span>
                      <p className="text-gray-700 text-sm line-clamp-2">{vocab.meaning}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Ví dụ:</span>
                      <p className="text-gray-700 text-sm italic line-clamp-2">"{vocab.exampleSentence}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <Badge variant="info" size="sm">
                        {vocab.partOfSpeech}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              {vocabulary.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Chưa có từ vựng nào</p>
                  <Button
                    variant="primary"
                    icon={<Plus className="h-4 w-4" />}
                    onClick={handleAddVocabulary}
                    className="mt-4"
                  >
                    Thêm từ vựng đầu tiên
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}

        {activeTab === "exercises" && (
          <Card>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Bài tập</span>
              </h2>
              <Button
                variant="primary"
                icon={<Plus className="h-4 w-4" />}
                onClick={handleAddExercise}
                className="w-full sm:w-auto justify-center"
              >
                <span className="hidden sm:inline">Thêm bài tập</span>
                <span className="sm:hidden">Thêm bài tập</span>
              </Button>
            </div>

            <div className="space-y-4">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1 min-w-0">
                      <div className="text-2xl flex-shrink-0">
                        {getExerciseIcon(exercise.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg md:text-base break-words">
                          {exercise.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 break-words">
                          {exercise.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            🎯 {exercise.points} điểm
                          </span>
                          {exercise.timeLimit && (
                            <span className="flex items-center gap-1">
                              ⏱️ {exercise.timeLimit}s
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 lg:justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Play className="h-4 w-4" />}
                        onClick={() => navigate(`/admin/exercises/${exercise.id}/preview`)}
                        className="justify-center"
                      >
                        <span className="hidden sm:inline">Xem trước</span>
                        <span className="sm:hidden">Xem</span>
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Edit className="h-4 w-4" />}
                        onClick={() => handleEditExercise(exercise)}
                        className="justify-center"
                      >
                        <span className="hidden sm:inline">Chỉnh sửa</span>
                        <span className="sm:hidden">Sửa</span>
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Settings className="h-4 w-4" />}
                        onClick={() => navigate(`/admin/exercises/${exercise.id}`)}
                        className="justify-center"
                      >
                        <span className="hidden sm:inline">Cấu hình</span>
                        <span className="sm:hidden">Cài đặt</span>
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<Trash2 className="h-4 w-4" />}
                        onClick={() => handleDeleteExercise(exercise.id)}
                        className="justify-center"
                      >
                        <span className="hidden sm:inline">Xóa</span>
                        <span className="sm:hidden">Xóa</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {exercises.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Chưa có bài tập nào</p>
                  <Button
                    variant="primary"
                    icon={<Plus className="h-4 w-4" />}
                    onClick={handleAddExercise}
                    className="mt-4"
                  >
                    Thêm bài tập đầu tiên
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}
        
        <VocabularyForm
          isOpen={showVocabForm}
          onClose={() => {
            setShowVocabForm(false);
            setEditingVocab(null);
          }}
          onSubmit={handleVocabFormSubmit}
          levelId={levelId || ""}
          initialData={editingVocab}
        />

        <ExerciseForm
          isOpen={showExerciseForm}
          onClose={() => {
            setShowExerciseForm(false);
            setEditingExercise(null);
          }}
          onSubmit={handleExerciseFormSubmit}
          levelId={levelId || ""}
          initialData={editingExercise}
          exerciseTypes={exerciseTypes}
        />
      </div>
    </AdminLayout>
  );
};

export default LevelDetail;