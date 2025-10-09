import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { MultipleChoiceOption, MatchingPair, Blank } from '../../../types/index';
import { Image as ImageIcon } from 'lucide-react';

interface QuestionEditorProps {
  question: any;
  onChange: (question: any) => void;
  onDelete: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onChange, onDelete }) => {
  const updateQuestion = (updates: Partial<typeof question>) => {
    onChange({ ...question, ...updates });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Uploading image:', file.name);
    }
  };

  const renderMultipleChoiceEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Lựa chọn</label>
        <div className="space-y-2">
          {question.options.map((option: any, index: number) => (
            <div key={option.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center space-x-2 flex-1">
                <input
                  type="radio"
                  name="correct-option"
                  checked={option.isCorrect}
                  onChange={() => {
                    const newOptions = question.options.map((opt: any) => ({
                      ...opt,
                      isCorrect: opt.id === option.id
                    }));
                    updateQuestion({ options: newOptions });
                  }}
                  className="flex-shrink-0"
                />
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[index].text = e.target.value;
                    updateQuestion({ options: newOptions });
                  }}
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  placeholder={`Lựa chọn ${index + 1}`}
                />
              </div>
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 className="h-3 w-3" />}
                onClick={() => {
                  const newOptions = question.options.filter((_: any, i: number) => i !== index);
                  updateQuestion({ options: newOptions });
                }}
                className="w-full sm:w-auto justify-center"
              >
                Xóa
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<Plus className="h-3 w-3" />}
          onClick={() => {
            const newOptions = [
              ...question.options,
              { id: Date.now().toString(), text: '', isCorrect: false }
            ];
            updateQuestion({ options: newOptions });
          }}
          className="mt-2 w-full sm:w-auto justify-center"
        >
          Thêm lựa chọn
        </Button>
      </div>
    </div>
  );

  const renderMatchingEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Cặp nối</label>
        <div className="space-y-2">
          {question.matchingPairs.map((pair: any, index: number) => (
            <div key={pair.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center space-x-2 flex-1">
                <input
                  type="text"
                  value={pair.left}
                  onChange={(e) => {
                    const newPairs = [...question.matchingPairs];
                    newPairs[index].left = e.target.value;
                    updateQuestion({ matchingPairs: newPairs });
                  }}
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  placeholder="Từ tiếng Anh"
                />
                <span className="text-gray-500 hidden sm:inline">→</span>
                <input
                  type="text"
                  value={pair.right}
                  onChange={(e) => {
                    const newPairs = [...question.matchingPairs];
                    newPairs[index].right = e.target.value;
                    updateQuestion({ matchingPairs: newPairs });
                  }}
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  placeholder="Nghĩa tiếng Việt"
                />
              </div>
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 className="h-3 w-3" />}
                onClick={() => {
                  const newPairs = question.matchingPairs.filter((_: any, i: number) => i !== index);
                  updateQuestion({ matchingPairs: newPairs });
                }}
                className="w-full sm:w-auto justify-center"
              >
                Xóa
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<Plus className="h-3 w-3" />}
          onClick={() => {
            const newPairs = [
              ...question.matchingPairs,
              { id: Date.now().toString(), left: '', right: '' }
            ];
            updateQuestion({ matchingPairs: newPairs });
          }}
          className="mt-2 w-full sm:w-auto justify-center"
        >
          Thêm cặp nối
        </Button>
      </div>
    </div>
  );

  const renderFillBlankEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Chỗ trống cần điền</label>
        <div className="space-y-2">
          {question.blanks.map((blank: any, index: number) => (
            <div key={blank.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center space-x-2 flex-1">
                <span className="w-16 text-sm text-gray-600">Vị trí {blank.position + 1}:</span>
                <input
                  type="text"
                  value={blank.correctAnswer}
                  onChange={(e) => {
                    const newBlanks = [...question.blanks];
                    newBlanks[index].correctAnswer = e.target.value;
                    updateQuestion({ blanks: newBlanks });
                  }}
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  placeholder="Đáp án đúng"
                />
              </div>
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 className="h-3 w-3" />}
                onClick={() => {
                  const newBlanks = question.blanks.filter((_: any, i: number) => i !== index);
                  updateQuestion({ blanks: newBlanks });
                }}
                className="w-full sm:w-auto justify-center"
              >
                Xóa
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h3 className="font-semibold text-lg">Chỉnh sửa câu hỏi</h3>
        <Button 
          variant="danger" 
          size="sm" 
          icon={<Trash2 className="h-3 w-3" />} 
          onClick={onDelete}
          className="w-full sm:w-auto justify-center"
        >
          Xóa câu hỏi
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Hình ảnh (tùy chọn)</label>
          <div className="flex items-center space-x-4">
            {question.imageUrl ? (
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <img src={question.imageUrl} alt="Question" className="h-16 w-16 object-cover rounded" />
                <Button variant="danger" size="sm" onClick={() => updateQuestion({ imageUrl: undefined })}>
                  Xóa ảnh
                </Button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer border rounded p-2 inline-block text-sm">
                  <ImageIcon className="h-4 w-4 inline mr-2" />
                  Chọn hình ảnh
                </label>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Nội dung câu hỏi *</label>
          <textarea
            value={question.questionText}
            onChange={(e) => updateQuestion({ questionText: e.target.value })}
            rows={3}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Nhập nội dung câu hỏi..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Điểm số</label>
          <input
            type="number"
            min="1"
            value={question.points}
            onChange={(e) => updateQuestion({ points: parseInt(e.target.value) })}
            className="border rounded px-3 py-2 text-sm w-24"
          />
        </div>

        {/* Render editor tùy theo loại câu hỏi */}
        {question.type === 'multiple-choice' && renderMultipleChoiceEditor()}
        {question.type === 'matching' && renderMatchingEditor()}
        {question.type === 'fill-blank' && renderFillBlankEditor()}

        <div>
          <label className="block text-sm font-medium mb-2">Giải thích (tùy chọn)</label>
          <textarea
            value={question.explanation || ''}
            onChange={(e) => updateQuestion({ explanation: e.target.value })}
            rows={2}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Giải thích đáp án..."
          />
        </div>
      </div>
    </Card>
  );
};

export default QuestionEditor;