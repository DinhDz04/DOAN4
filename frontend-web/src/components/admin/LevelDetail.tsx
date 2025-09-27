import React, { useState } from "react";
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
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import Card from "../common/Card";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { Level, Vocabulary, Exercise } from "../../types";
import { VocabularyForm } from "../forms";
import { ExerciseForm } from "../forms";

const LevelDetail: React.FC = () => {
  const { tierCode, levelId } = useParams<{
    tierCode: string;
    levelId: string;
  }>();
  const navigate = useNavigate();
  const [showVocabForm, setShowVocabForm] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [editingVocab, setEditingVocab] = useState<Vocabulary | null>(null);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "vocabulary" | "exercises" | "comprehensive"
  >("overview");

  // Mock data - bạn có thể thay thế bằng API call

  const handleAddVocabulary = () => {
    setEditingVocab(null);
    setShowVocabForm(true);
  };

  const handleEditVocabulary = (vocab: Vocabulary) => {
    setEditingVocab(vocab);
    setShowVocabForm(true);
  };
  const handleVocabFormSubmit = (data: any) => {
    if (editingVocab) {
      console.log("Update vocabulary:", editingVocab.id, data);
    } else {
      console.log("Create new vocabulary for level:", levelId, data);
    }
    setShowVocabForm(false);
    setEditingVocab(null);
  };

  const handleAddExercise = () => {
    setEditingExercise(null);
    setShowExerciseForm(true);
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setShowExerciseForm(true);
  };

  const handleExerciseFormSubmit = (data: any) => {
    if (editingExercise) {
      console.log("Update exercise:", editingExercise.id, data);
    } else {
      console.log("Create new exercise for level:", levelId, data);
    }
    setShowExerciseForm(false);
    setEditingExercise(null);
  };

  const level: Level = {
    id: levelId || "1",
    tierId: "1",
    name: "Level 1 - Nhập môn",
    description:
      "Làm quen với tiếng Anh cơ bản, các từ vựng và cấu trúc đơn giản",
    order: 1,
    isLocked: false,
    vocabularyCount: 25,
    exerciseCount: 8,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  };

  const vocabulary: Vocabulary[] = [
    {
      id: "1",
      levelId: level.id,
      word: "hello",
      pronunciation: "/həˈloʊ/",
      definition: "Xin chào",
      example: "Hello, my name is John.",
      audioUrl: "/audio/hello.mp3",
      partOfSpeech: "interjection",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      levelId: level.id,
      word: "goodbye",
      pronunciation: "/ɡʊdˈbaɪ/",
      definition: "Tạm biệt",
      example: "Goodbye, see you tomorrow!",
      partOfSpeech: "interjection",
      createdAt: "2024-01-01",
    },
  ];

  const exercises: Exercise[] = [
    {
      id: "1",
      levelId: level.id,
      title: "Bài tập trắc nghiệm cơ bản",
      description: "Chọn đáp án đúng cho các câu hỏi về từ vựng",
      type: "multiple-choice",
      content: {},
      points: 10,
      timeLimit: 300,
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "2",
      levelId: level.id,
      title: "Bài tập nối từ",
      description: "Nối từ tiếng Anh với nghĩa tiếng Việt tương ứng",
      type: "matching",
      content: {},
      points: 15,
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "3",
      levelId: level.id,
      title: "Bài tập điền từ",
      description: "Điền từ thích hợp vào chỗ trống",
      type: "fill-blank",
      content: {},
      points: 20,
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  ];

  const comprehensiveExercise: Exercise = {
    id: "4",
    levelId: level.id,
    title: "Bài tập tổng hợp Level",
    description: "Tổng hợp kiến thức toàn bộ level",
    type: "comprehensive",
    content: {},
    points: 50,
    timeLimit: 600,
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
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
        return "🔘";
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

  return (
    <AdminLayout currentPage="learning-path">
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <button
            onClick={() => navigate("/admin/learning-path")}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Lộ trình học</span>
          </button>
          <span>/</span>
          <button
            onClick={handleBack}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          >
            <span>Bậc {tierCode}</span>
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{level.name}</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{level.name}</h1>
            <p className="text-gray-600 mt-2">{level.description}</p>
            <div className="flex space-x-4 mt-3 text-sm text-gray-500">
              <span>📚 {level.vocabularyCount} từ vựng</span>
              <span>🎯 {level.exerciseCount} bài tập</span>
              <span>🔢 Thứ tự: {level.order}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" icon={<Edit className="h-4 w-4" />}>
              Chỉnh sửa Level
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <Card padding="sm">
          <div className="flex space-x-1">
            {[
              { id: "overview", label: "Tổng quan", icon: "📊" },
              { id: "vocabulary", label: "Sổ tay từ vựng", icon: "📖" },
              { id: "exercises", label: "Bài tập", icon: "🎯" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <div>
                      <div className="font-medium">{vocab.word}</div>
                      <div className="text-sm text-gray-600">
                        {vocab.definition}
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlayAudio(vocab.audioUrl!)}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
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
                  <span>Bài tập </span>
                </h3>
                <Badge variant="info">{exercises.length} bài</Badge>
              </div>
              <div className="space-y-3">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {getExerciseIcon(exercise.type)}
                      </span>
                      <div>
                        <div className="font-medium">{exercise.title}</div>
                        <div className="text-sm text-gray-600">
                          {exercise.points} điểm
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Sổ tay từ vựng</span>
              </h2>
              <Button
                variant="primary"
                icon={<Plus className="h-4 w-4" />}
                onClick={handleAddVocabulary}
              >
                Thêm từ vựng
              </Button>
            </div>
            <Button
              variant="secondary"
              fullWidth
              className="mt-4"
              onClick={() =>
                window.open(
                  `/admin/levels/${levelId}/vocabulary-preview`,
                  "_blank"
                )
              }
            >
              👁️ Xem trước tất cả từ vựng
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vocabulary.map((vocab) => (
                <div
                  key={vocab.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{vocab.word}</h3>
                      <button
                        onClick={() => handlePlayAudio(vocab.audioUrl!)}
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEditVocabulary(vocab)}
                        className="text-gray-400 hover:text-blue-600 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-yellow-600 p-1">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Phát âm:</span>
                      <p className="text-gray-700">{vocab.pronunciation}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Nghĩa:</span>
                      <p className="text-gray-700">{vocab.definition}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Ví dụ:</span>
                      <p className="text-gray-700 italic">"{vocab.example}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <Badge variant="info" size="sm">
                        {vocab.partOfSpeech}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "exercises" && (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Bài tập</span>
              </h2>
              <Button
                variant="primary"
                icon={<Plus className="h-4 w-4" />}
                onClick={handleAddExercise}
              >
                Thêm bài tập
              </Button>
            </div>

            <div className="space-y-4">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">
                        {getExerciseIcon(exercise.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {exercise.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {exercise.description}
                        </p>
                        <div className="flex space-x-4 mt-1 text-xs text-gray-500">
                          <span>🎯 {exercise.points} điểm</span>
                          {exercise.timeLimit && (
                            <span>⏱️ {exercise.timeLimit}s</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<Play className="h-4 w-4" />}
                          onClick={() =>
                            window.open(
                              `/admin/exercises/${exercise.id}/preview`,
                              "_blank"
                            )
                          }
                        >
                          Xem trước
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<Settings className="h-4 w-4" />}
                          onClick={() =>
                            navigate(`/admin/exercises/${exercise.id}`)
                          }
                        >
                          Cấu hình
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={<Trash2 className="h-4 w-4" />}
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
        />
      </div>
    </AdminLayout>
  );
};

export default LevelDetail;
