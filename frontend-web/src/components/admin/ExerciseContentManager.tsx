import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Eye,
  Download,
  Upload,
  Menu,
  X,
} from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Card from "../common/Card";
import Button from "../common/Button";
import QuestionEditor from "./QuestionEditor";

interface ExerciseContent {
  id?: string;
  questions: Question[];
  settings?: {
    shuffleQuestions?: boolean;
    showExplanation?: boolean;
    allowRetry?: boolean;
  };
}

interface Question {
  id: string;
  type: "multiple-choice" | "matching" | "fill-blank";
  questionText: string;
  points: number;
  imageUrl?: string;
  options?: MultipleChoiceOption[];
  matchingPairs?: MatchingPair[];
  blanks?: Blank[];
  explanation?: string;
}

interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

interface Blank {
  id: string;
  position: number;
  correctAnswer: string;
  hints?: string[];
}

const ExerciseContentManager: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<any>(null);
  const [content, setContent] = useState<ExerciseContent>({
    questions: [],
    settings: {
      shuffleQuestions: true,
      showExplanation: true,
      allowRetry: false,
    },
  });
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const getAvailableQuestionTypes = () => {
    if (!exercise?.type) return [];

    const typeMap: Record<string, Question["type"][]> = {
      "multiple-choice": ["multiple-choice"],
      matching: ["matching"],
      "fill-blank": ["fill-blank"],
      comprehensive: ["multiple-choice", "matching", "fill-blank"],
    };

    return typeMap[exercise.type] || [];
  };

  const handleImportExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log("Importing Excel file:", file.name);
  };

  const handleExportTemplate = () => {
    const templateData = generateExcelTemplate(exercise.type);
    console.log("Export template:", templateData);
  };

  const generateExcelTemplate = (exerciseType: string) => {
    const templates = {
      "multiple-choice": {
        headers: [
          "Câu hỏi",
          "Đáp án A",
          "Đáp án B",
          "Đáp án C",
          "Đáp án D",
          "Đáp án đúng",
          "Điểm",
          "Giải thích",
        ],
        example: [
          [
            'What does "hello" mean?',
            "Xin chào",
            "Tạm biệt",
            "Cảm ơn",
            "Chào mừng",
            "A",
            "5",
            '"Hello" nghĩa là xin chào',
          ],
        ],
      },
      matching: {
        headers: ["Cột trái", "Cột phải"],
        example: [
          ["hello", "xin chào"],
          ["goodbye", "tạm biệt"],
        ],
      },
      "fill-blank": {
        headers: [
          "Câu hỏi (dùng ___ cho chỗ trống)",
          "Đáp án 1",
          "Đáp án 2 (nếu có)",
          "Điểm",
          "Giải thích",
        ],
        example: [
          [
            "Hello, my name ___ John.",
            "is",
            "",
            "5",
            'Động từ "to be" cho ngôi thứ 3 số ít',
          ],
        ],
      },
    };

    return (
      templates[exerciseType as keyof typeof templates] ||
      templates["multiple-choice"]
    );
  };

  useEffect(() => {
    const fetchExercise = async () => {
      setLoading(true);
      setTimeout(() => {
        setExercise({
          id: exerciseId,
          title: "Bài tập trắc nghiệm cơ bản",
          type: "multiple-choice",
          description: "Chọn đáp án đúng cho các câu hỏi",
        });

        setContent({
          questions: [
            {
              id: "1",
              type: "multiple-choice",
              questionText: 'What does "hello" mean?',
              points: 5,
              options: [
                { id: "1", text: "Xin chào", isCorrect: true },
                { id: "2", text: "Tạm biệt", isCorrect: false },
                { id: "3", text: "Cảm ơn", isCorrect: false },
              ],
              explanation:
                '"Hello" là cách chào hỏi thông dụng trong tiếng Anh',
            },
          ],
          settings: {
            shuffleQuestions: true,
            showExplanation: true,
            allowRetry: false,
          },
        });
        setLoading(false);
      }, 500);
    };

    if (exerciseId) {
      fetchExercise();
    }
  }, [exerciseId]);

  const handleAddQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      questionText: "",
      points: 1,
      options:
        type === "multiple-choice"
          ? [
              { id: "1", text: "", isCorrect: false },
              { id: "2", text: "", isCorrect: false },
            ]
          : undefined,
      matchingPairs:
        type === "matching" ? [{ id: "1", left: "", right: "" }] : undefined,
      blanks:
        type === "fill-blank"
          ? [{ id: "1", position: 0, correctAnswer: "" }]
          : undefined,
    };

    setContent((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setActiveQuestionIndex(content.questions.length);
  };

  const handleSaveContent = async () => {
    try {
      console.log("Saving content:", content);
      alert("Đã lưu nội dung bài tập!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Lỗi khi lưu nội dung!");
    }
  };

  const handlePreview = () => {
    window.open(`/admin/exercises/${exerciseId}/preview`, "_blank");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout currentPage="learning-path">
      <div className="space-y-4 md:space-y-6 p-4 md:p-0">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
                Cấu hình nội dung bài tập
              </h1>
              <p className="text-gray-600 text-sm md:text-base truncate">
                {exercise?.title} - {getQuestionTypeLabel(exercise?.type)}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              icon={<Download className="h-4 w-4" />}
              onClick={handleExportTemplate}
              className="flex-1 sm:flex-none justify-center"
            >
              <span className="hidden sm:inline">Template</span>
              <span className="sm:hidden">Template</span>
            </Button>
            <Button
              variant="secondary"
              icon={<Upload className="h-4 w-4" />}
              onClick={() => setShowImportModal(true)}
              className="flex-1 sm:flex-none justify-center"
            >
              <span className="hidden sm:inline">Import</span>
              <span className="sm:hidden">Import</span>
            </Button>
            <Button
              variant="secondary"
              icon={<Eye className="h-4 w-4" />}
              onClick={handlePreview}
              className="flex-1 sm:flex-none justify-center"
            >
              <span className="hidden sm:inline">Xem trước</span>
              <span className="sm:hidden">Xem</span>
            </Button>
            <Button
              variant="primary"
              icon={<Save className="h-4 w-4" />}
              onClick={handleSaveContent}
              className="flex-1 sm:flex-none justify-center"
            >
              <span className="hidden sm:inline">Lưu nội dung</span>
              <span className="sm:hidden">Lưu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Sidebar Toggle */}
        <div className="block lg:hidden">
          <Button
            variant="secondary"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            icon={
              showMobileSidebar ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )
            }
            fullWidth
          >
            {showMobileSidebar
              ? "Đóng danh sách câu hỏi"
              : "Mở danh sách câu hỏi"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Sidebar - Danh sách câu hỏi */}
          <div
            className={`lg:col-span-1 ${
              showMobileSidebar ? "block" : "hidden lg:block"
            }`}
          >
            <div className="space-y-4 md:space-y-6">
              <Card>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                  <h3 className="font-semibold text-lg">
                    Câu hỏi ({content.questions.length})
                  </h3>
                  <div className="flex space-x-1">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          handleAddQuestion(e.target.value as Question["type"]);
                          setShowMobileSidebar(false);
                        }
                      }}
                      className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
                    >
                      <option value="">Thêm câu hỏi</option>
                      {getAvailableQuestionTypes().map((type) => (
                        <option key={type} value={type}>
                          {getQuestionTypeLabel(type)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {content.questions.map((question, index) => (
                    <div
                      key={question.id}
                      className={`p-3 border rounded cursor-pointer transition-colors ${
                        activeQuestionIndex === index
                          ? "bg-blue-50 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setActiveQuestionIndex(index);
                        setShowMobileSidebar(false);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">
                          Câu {index + 1}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {getQuestionTypeLabel(question.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {question.questionText || "Chưa có nội dung..."}
                      </p>
                      {question.imageUrl && (
                        <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                          <ImageIcon className="h-3 w-3" />
                          <span>Hình ảnh</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Cài đặt */}
              <Card>
                <h3 className="font-semibold mb-4">Cài đặt bài tập</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={content.settings?.shuffleQuestions || false}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          settings: {
                            ...prev.settings,
                            shuffleQuestions: e.target.checked,
                          },
                        }))
                      }
                    />
                    <span className="text-sm">Xáo trộn câu hỏi</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={content.settings?.showExplanation || false}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          settings: {
                            ...prev.settings,
                            showExplanation: e.target.checked,
                          },
                        }))
                      }
                    />
                    <span className="text-sm">Hiển thị giải thích</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={content.settings?.allowRetry || false}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          settings: {
                            ...prev.settings,
                            allowRetry: e.target.checked,
                          },
                        }))
                      }
                    />
                    <span className="text-sm">Cho phép làm lại</span>
                  </label>
                </div>
              </Card>
            </div>
          </div>

          {/* Main content - Editor câu hỏi */}
          <div className="lg:col-span-2">
            {activeQuestionIndex !== null ? (
              <QuestionEditor
                question={content.questions[activeQuestionIndex]}
                onChange={(updatedQuestion: Question) => {
                  const newQuestions = [...content.questions];
                  newQuestions[activeQuestionIndex] = updatedQuestion;
                  setContent({ ...content, questions: newQuestions });
                }}
                onDelete={() => {
                  const newQuestions = content.questions.filter(
                    (_, i) => i !== activeQuestionIndex
                  );
                  setContent({ ...content, questions: newQuestions });
                  setActiveQuestionIndex(null);
                }}
              />
            ) : (
              <Card>
                <div className="text-center py-8 md:py-12 text-gray-500">
                  <p>Chọn một câu hỏi từ danh sách bên trái để chỉnh sửa</p>
                  <p className="text-sm mt-1">hoặc thêm câu hỏi mới</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Import từ Excel</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Chọn file Excel
                  </label>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleImportExcel}
                    className="w-full border rounded p-2 text-sm"
                  />
                </div>

                <div className="bg-yellow-50 p-3 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Lưu ý:</strong> Tải template để biết cấu trúc file
                    Excel phù hợp.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => setShowImportModal(false)}
                    className="w-full sm:w-auto justify-center"
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleExportTemplate}
                    className="w-full sm:w-auto justify-center"
                  >
                    Tải Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// Helper function
const getQuestionTypeLabel = (
  type: "multiple-choice" | "matching" | "fill-blank"
) => {
  const labels = {
    "multiple-choice": "Trắc nghiệm",
    matching: "Nối từ",
    "fill-blank": "Điền từ",
  };
  return labels[type];
};

export default ExerciseContentManager;
