import React, { useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Card from "../common/Card";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { useNavigate } from "react-router-dom";
import { Tier, Level } from "../../types";
import { TierForm } from "../forms";

const LearningPathManagement: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState<"tier" | "level">("tier");
  const [editingTier, setEditingTier] = useState<Tier | null>(null);
  const [showTierForm, setShowTierForm] = useState(false);
  const navigate = useNavigate();



   const handleCreateTier = () => {
    setEditingTier(null);
    setShowTierForm(true);
  };

  const handleEditTier = (tier: Tier) => {
    setEditingTier(tier);
    setShowTierForm(true);
  };

  const handleTierFormSubmit = (data: any) => {
    if (editingTier) {
      console.log('Update tier:', editingTier.id, data);
      // Call API to update tier
    } else {
      console.log('Create new tier:', data);
      // Call API to create tier
    }
    setShowTierForm(false);
    setEditingTier(null);
  };
  // Mock data - bạn có thể thay thế bằng API call
  const tiers: Tier[] = [
    {
      id: "1",
      name: "Beginner",
      code: "A1",
      description: "Cấp độ cơ bản cho người mới bắt đầu",
      order: 1,
      isActive: true,
      levelCount: 4,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Elementary",
      code: "A2",
      description: "Cấp độ sơ cấp",
      order: 2,
      isActive: true,
      levelCount: 5,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "3",
      name: "Intermediate",
      code: "B1",
      description: "Cấp độ trung cấp",
      order: 3,
      isActive: true,
      levelCount: 6,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "4",
      name: "Upper Intermediate",
      code: "B2",
      description: "Cấp độ trung cấp nâng cao",
      order: 4,
      isActive: true,
      levelCount: 6,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "5",
      name: "Advanced",
      code: "C1",
      description: "Cấp độ cao cấp",
      order: 5,
      isActive: true,
      levelCount: 5,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "6",
      name: "Proficiency",
      code: "C2",
      description: "Cấp độ thành thạo",
      order: 6,
      isActive: true,
      levelCount: 4,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  ];

  const handleCreateNew = (type: "tier" | "level") => {
    setModalType(type);
    setShowCreateModal(true);
  };

  const handleEditItem = (type: "tier" | "level", id: string) => {
    console.log(`Edit ${type}:`, id);
  };

  const handleDeleteItem = (type: "tier" | "level", id: string) => {
    console.log(`Delete ${type}:`, id);
  };

  const handleViewDetails = (tierCode: string) => {
    navigate(`/admin/learning-path/${tierCode}`);
  };

  const getTierDescription = (code: string) => {
    const descriptions = {
      A1: "Sơ cấp - Cho người mới bắt đầu",
      A2: "Sơ cấp - Có thể giao tiếp cơ bản",
      B1: "Trung cấp - Có thể giao tiếp hàng ngày",
      B2: "Trung cấp - Giao tiếp thành thạo hơn",
      C1: "Cao cấp - Sử dụng ngôn ngữ linh hoạt",
      C2: "Thành thạo - Gần như người bản xứ",
    };
    return descriptions[code as keyof typeof descriptions] || "Mô tả bậc học";
  };

  return (
    <AdminLayout currentPage="learning-path">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý lộ trình học
            </h1>
            <p className="text-gray-600 mt-2">
              Quản lý cấu trúc bậc học và các level
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="primary"
              onClick={handleCreateTier}
              icon={<Plus className="h-4 w-4" />}
            >
              Thêm Bậc
            </Button>
          </div>
        </div>

        {/* Tier Selection */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Chọn bậc học để quản lý
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`
                  p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                  ${
                    selectedTier === tier.code
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
                onClick={() => setSelectedTier(tier.code)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{tier.code}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(tier.code);
                      }}
                      className="text-gray-400 hover:text-green-600"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditItem("tier", tier.id);
                      }}
                      className="text-gray-400 hover:text-blue-600"
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem("tier", tier.id);
                      }}
                      className="text-gray-400 hover:text-red-600"
                      title="Xóa"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {getTierDescription(tier.code)}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{tier.levelCount} Levels</span>
                  <Badge
                    variant={tier.isActive ? "success" : "default"}
                    size="sm"
                  >
                    {tier.isActive ? "Đang hoạt động" : "Không hoạt động"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Level Management Section - Hiển thị khi chọn bậc */}
        {selectedTier && (
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Quản lý Levels - Bậc {selectedTier}
              </h2>
              <Button
                variant="primary"
                onClick={() => handleViewDetails(selectedTier)}
                icon={<Eye className="h-4 w-4" ></Eye>}
                size="md"
                className="flex items-center space-x-2"
              >
                Xem chi tiết
              </Button>
            </div>

            <div className="space-y-3">
              {/* Mock levels data - bạn có thể thay thế bằng API call */}
              {[1, 2, 3, 4].map((levelNum) => (
                <div
                  key={levelNum}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      {levelNum}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Level {levelNum}
                      </h4>
                      <p className="text-sm text-gray-600">
                        5 bài tập • 20 từ vựng
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="success" size="sm">
                      Đang hoạt động
                    </Badge>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleViewDetails(selectedTier)}
                        className="text-gray-400 hover:text-green-600 p-1"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleEditItem("level", `level-${levelNum}`)
                        }
                        className="text-gray-400 hover:text-blue-600 p-1"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteItem("level", `level-${levelNum}`)
                        }
                        className="text-gray-400 hover:text-red-600 p-1"
                        title="Xóa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
                <TierForm
          isOpen={showTierForm}
          onClose={() => {
            setShowTierForm(false);
            setEditingTier(null);
          }}
          onSubmit={handleTierFormSubmit}
          initialData={editingTier}
        />
      </div>
    </AdminLayout>
  );
};

export default LearningPathManagement;
