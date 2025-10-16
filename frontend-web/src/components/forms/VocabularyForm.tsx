import React, { useState, useEffect} from 'react';
import Modal from '../common/Modal';
import { X, Upload, Volume2 } from 'lucide-react';
interface VocabularyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  levelId: string;
  initialData?: any;
}

const VocabularyForm: React.FC<VocabularyFormProps> = ({ isOpen, onClose, onSubmit, levelId, initialData }) => {
  const [formData, setFormData] = useState({
    word: '',
    pronunciation: '',
    meaning: '',
    exampleSentence: '', // Giữ nguyên field name này
    partOfSpeech: '',
    audioUrl: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        word: initialData.word || '',
        pronunciation: initialData.pronunciation || '',
        meaning: initialData.meaning || '',
        exampleSentence: initialData.exampleSentence || '', // Backend mới sẽ trả về exampleSentence
        partOfSpeech: initialData.partOfSpeech || '',
        audioUrl: initialData.audioUrl || ''
      });
    } else {
      setFormData({
        word: '',
        pronunciation: '',
        meaning: '',
        exampleSentence: '',
        partOfSpeech: '',
        audioUrl: ''
      });
    }
  }, [initialData, isOpen]);

  const partOfSpeechOptions = [
    'noun', 'verb', 'adjective', 'adverb', 'pronoun', 
    'preposition', 'conjunction', 'interjection'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate file upload - in real app, upload to server
      const url = URL.createObjectURL(file);
      setFormData({...formData, audioUrl: url});
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Chỉnh sửa Từ vựng" : "Thêm Từ vựng mới"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Từ vựng *
          </label>
          <input
            type="text"
            required
            value={formData.word}
            onChange={(e) => setFormData({...formData, word: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="VD: hello"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phát âm
          </label>
          <input
            type="text"
            value={formData.pronunciation}
            onChange={(e) => setFormData({...formData, pronunciation: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="VD: /həˈloʊ/"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nghĩa *
          </label>
          <input
            type="text"
            required
            value={formData.meaning}
            onChange={(e) => setFormData({...formData, meaning: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="VD: Xin chào"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ví dụ *
          </label>
          <textarea
            required
            value={formData.exampleSentence}
            onChange={(e) => setFormData({...formData, exampleSentence: e.target.value})}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="VD: Hello, how are you?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loại từ *
          </label>
          <select
            required
            value={formData.partOfSpeech}
            onChange={(e) => setFormData({...formData, partOfSpeech: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn loại từ</option>
            {partOfSpeechOptions.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            File âm thanh
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioUpload}
              className="hidden"
              id="audioUpload"
            />
            <label
              htmlFor="audioUpload"
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <Upload className="h-4 w-4" />
              <span>Chọn file âm thanh</span>
            </label>
            {formData.audioUrl && (
              <button
                type="button"
                onClick={() => {
                  const audio = new Audio(formData.audioUrl);
                  audio.play();
                }}
                className="flex items-center space-x-1 px-2 py-1 text-blue-600 hover:text-blue-800"
              >
                <Volume2 className="h-4 w-4" />
                <span>Nghe</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {initialData ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default VocabularyForm;