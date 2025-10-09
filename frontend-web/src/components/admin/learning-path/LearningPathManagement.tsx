// frontend-web/src/components/admin/learning-path/LearningPathManagement.tsx
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import AdminLayout from "../AdminLayout";
import Card from "../../common/Card";
import Button from "../../common/Button";
import Badge from "../../common/Badge";
import { useNavigate } from "react-router-dom";
import { Tier } from "../../../types";
import { TierForm } from "../../forms";
import { learningPathApi } from "../../../services/learningPathApi";

const LearningPathManagement: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [showTierForm, setShowTierForm] = useState(false);
  const [editingTier, setEditingTier] = useState<Tier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      setLoading(true);
      const data = await learningPathApi.getTiers();
      setTiers(data);
    } catch (err: any) {
      setError(err.message || "Failed to load tiers");
      console.error("Error fetching tiers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTier = () => {
    setEditingTier(null);
    setShowTierForm(true);
  };

  const handleEditTier = (tier: Tier) => {
    setEditingTier(tier);
    setShowTierForm(true);
  };

  const handleTierFormSubmit = async (data: any) => {
    try {
      if (editingTier) {
        await learningPathApi.updateTier(editingTier.id, data);
        console.log('Tier updated:', editingTier.id, data);
      } else {
        await learningPathApi.createTier(data);
        console.log('Tier created:', data);
      }
      setShowTierForm(false);
      setEditingTier(null);
      fetchTiers(); // Refresh the list
    } catch (err: any) {
      setError(err.message || "Failed to save tier");
      console.error("Error saving tier:", err);
    }
  };

  const handleDeleteTier = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this tier?")) {
      try {
        await learningPathApi.deleteTier(id);
        fetchTiers(); // Refresh the list
      } catch (err: any) {
        setError(err.message || "Failed to delete tier");
        console.error("Error deleting tier:", err);
      }
    }
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

  if (loading) {
    return (
      <AdminLayout currentPage="learning-path">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="learning-path">
      <div className="space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <p className="text-red-700">{error}</p>
              <button onClick={() => setError("")} className="text-red-500">×</button>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý lộ trình học</h1>
            <p className="text-gray-600 mt-2">Quản lý cấu trúc bậc học và các level</p>
          </div>
          <Button
            variant="primary"
            onClick={handleCreateTier}
            icon={<Plus className="h-4 w-4" />}
          >
            Thêm Bậc
          </Button>
        </div>

        {/* Tier Selection */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Chọn bậc học để quản lý</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedTier === tier.code
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
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
                        handleEditTier(tier);
                      }}
                      className="text-gray-400 hover:text-blue-600"
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTier(tier.id);
                      }}
                      className="text-gray-400 hover:text-red-600"
                      title="Xóa"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{getTierDescription(tier.code)}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{tier.levelCount} Levels</span>
                  <Badge variant={tier.isActive ? "success" : "default"} size="sm">
                    {tier.isActive ? "Đang hoạt động" : "Không hoạt động"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Rest of your component remains the same */}
        {/* ... */}

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