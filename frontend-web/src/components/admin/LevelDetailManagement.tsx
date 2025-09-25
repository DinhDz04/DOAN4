import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Lock,
  Unlock,
  Eye,
  FileText,
  Link2,
  CheckCircle,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import Card from "../common/Card";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { Tier, Level, Vocabulary, Exercise } from "../../types";
import { LevelForm } from "../forms";

const LevelDetailManagement: React.FC = () => {
  const { tierCode } = useParams<{ tierCode: string }>();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [showLevelForm, setShowLevelForm] = useState(false);
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);

  const [activeTab, setActiveTab] = useState<
    "levels" | "vocabulary" | "exercises"
  >("levels");


  const handleCreateLevel = () => {
    setEditingLevel(null);
    setShowLevelForm(true);
  };

  const handleEditLevel = (level: Level) => {
    setEditingLevel(level);
    setShowLevelForm(true);
  };

  const handleLevelFormSubmit = (data: any) => {
    if (editingLevel) {
      console.log('Update level:', editingLevel.id, data);
    } else {
      console.log('Create new level for tier:', tierCode, data);
    }
    setShowLevelForm(false);
    setEditingLevel(null);
  };
  // Mock data - bạn có thể thay thế bằng API call
  const tier: Tier = {
    id: "1",
    name: getTierName(tierCode || ""),
    code: tierCode as "A1" | "A2" | "B1" | "B2" | "C1" | "C2",
    description: getTierDescription(tierCode || ""),
    order: 1,
    isActive: true,
    levelCount: 4,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  };

  const levels: Level[] = [
    {
      id: "1",
      tierId: tier.id,
      name: "Level 1 - Nhập môn",
      description: "Làm quen với tiếng Anh cơ bản",
      order: 1,
      isLocked: false,
      vocabularyCount: 20,
      exerciseCount: 5,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "2",
      tierId: tier.id,
      name: "Level 2 - Cơ bản",
      description: "Học các cấu trúc cơ bản",
      order: 2,
      isLocked: true,
      unlockConditions: ["Hoàn thành Level 1"],
      vocabularyCount: 25,
      exerciseCount: 6,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  ];

  const vocabulary: Vocabulary[] = [
    {
      id: "1",
      levelId: "1",
      word: "hello",
      pronunciation: "/həˈloʊ/",
      definition: "Xin chào",
      example: "Hello, how are you?",
      partOfSpeech: "interjection",
      createdAt: "2024-01-01",
    },
  ];

  const exercises: Exercise[] = [
    {
      id: "1",
      levelId: "1",
      title: "Bài tập trắc nghiệm cơ bản",
      description: "Chọn đáp án đúng",
      type: "multiple-choice",
      content: {},
      points: 10,
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  ];

  function getTierName(code: string): string {
    const names = {
      A1: "Beginner",
      A2: "Elementary",
      B1: "Intermediate",
      B2: "Upper Intermediate",
      C1: "Advanced",
      C2: "Proficiency",
    };
    return names[code as keyof typeof names] || "Unknown";
  }

  function getTierDescription(code: string): string {
    const descriptions = {
      A1: "Cấp độ cơ bản cho người mới bắt đầu",
      A2: "Cấp độ sơ cấp - Có thể giao tiếp cơ bản",
      B1: "Cấp độ trung cấp - Có thể giao tiếp hàng ngày",
      B2: "Cấp độ trung cấp nâng cao - Giao tiếp thành thạo hơn",
      C1: "Cấp độ cao cấp - Sử dụng ngôn ngữ linh hoạt",
      C2: "Cấp độ thành thạo - Gần như người bản xứ",
    };
    return descriptions[code as keyof typeof descriptions] || "Mô tả bậc học";
  }

  const handleBack = () => {
    navigate("/admin/learning-path");
  };

  const handleCreateNew = (type: "level" | "vocabulary" | "exercise") => {
    console.log(`Create new ${type} for tier ${tierCode}`);
  };

  const handleEditItem = (
    type: "level" | "vocabulary" | "exercise",
    id: string
  ) => {
    console.log(`Edit ${type}:`, id);
  };

  const handleDeleteItem = (
    type: "level" | "vocabulary" | "exercise",
    id: string
  ) => {
    console.log(`Delete ${type}:`, id);
  };

  return (
    <AdminLayout currentPage="learning-path">
      <div className="space-y-6">
        {/* Header với breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại quản lý lộ trình</span>
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">Bậc {tierCode}</span>
        </div>

        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý Bậc {tierCode}
            </h1>
            <p className="text-gray-600 mt-2">{tier.description}</p>
          </div>
          <Badge variant="success" size="lg">
            {tier.levelCount} Levels
          </Badge>
        </div>

        {/* Tab Navigation */}
        <Card padding="sm">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("levels")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "levels"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Quản lý Levels
            </button>
            
          </div>
        </Card>

        {/* Content based on active tab */}
        {activeTab === "levels" && (
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Danh sách Levels
              </h2>
              <Button
                variant="primary"
                onClick={handleCreateLevel}
                icon={<Plus className="h-4 w-4" />}
              >
                Thêm Level
              </Button>
            </div>

            <div className="space-y-4">
              {levels.map((level) => (
                <div
                  key={level.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {level.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {level.description}
                        </p>
                        <div className="flex space-x-4 mt-1 text-xs text-gray-500">
                          <span>{level.vocabularyCount} từ vựng</span>
                          <span>{level.exerciseCount} bài tập</span>
                          <span>Thứ tự: {level.order}</span>
                        </div>
                        {/* Admin có thể thấy điều kiện mở khóa nhưng không bị giới hạn */}
                        {level.unlockConditions && (
                          <div className="mt-2">
                            <Badge variant="info" size="sm">
                              Điều kiện user:{" "}
                              {level.unlockConditions.join(", ")}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
<Button
  variant="secondary"
  size="sm"
  icon={<Eye className="h-4 w-4" />}
  onClick={() => navigate(`/admin/learning-path/${tierCode}/levels/${level.id}`)}
>
  Xem chi tiết
</Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Edit className="h-4 w-4" />}
                        onClick={() => handleEditItem("level", level.id)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<Trash2 className="h-4 w-4" />}
                        onClick={() => handleDeleteItem("level", level.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
        <LevelForm
          isOpen={showLevelForm}
          onClose={() => {
            setShowLevelForm(false);
            setEditingLevel(null);
          }}
          onSubmit={handleLevelFormSubmit}
          tierCode={tierCode || ''}
          initialData={editingLevel}
        />

      </div>
    </AdminLayout>
  );
};

export default LevelDetailManagement;
