import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, Bookmark, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import Card from '../../common/Card';
import Button from '../../common/Button';

interface Vocabulary {
  id: string;
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  audioUrl?: string;
  partOfSpeech: string;
  imageUrl?: string;
}

const VocabularyPreviewPage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  // Mock data - thay bằng API call
  useEffect(() => {
    const fetchVocabulary = async () => {
      // API call sẽ ở đây
      setTimeout(() => {
        setVocabulary([
          {
            id: '1',
            word: 'hello',
            pronunciation: '/həˈloʊ/',
            definition: 'Xin chào',
            example: 'Hello, my name is John.',
            audioUrl: '/audio/hello.mp3',
            partOfSpeech: 'interjection'
          },
          {
            id: '2',
            word: 'goodbye',
            pronunciation: '/ɡʊdˈbaɪ/',
            definition: 'Tạm biệt',
            example: 'Goodbye, see you tomorrow!',
            partOfSpeech: 'interjection'
          }
        ]);
      }, 500);
    };

    if (levelId) {
      fetchVocabulary();
    }
  }, [levelId]);

  const currentVocab = vocabulary[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % vocabulary.length);
    setShowDefinition(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + vocabulary.length) % vocabulary.length);
    setShowDefinition(false);
  };

  const handleShuffle = () => {
    const shuffledVocab = [...vocabulary].sort(() => Math.random() - 0.5);
    setVocabulary(shuffledVocab);
    setCurrentIndex(0);
    setShuffled(!shuffled);
    setShowDefinition(false);
  };

  const handlePlayAudio = (audioUrl: string) => {
    // Implement audio playback
    console.log('Playing audio:', audioUrl);
  };

  const toggleBookmark = (vocabId: string) => {
    const newBookmarked = new Set(bookmarked);
    if (newBookmarked.has(vocabId)) {
      newBookmarked.delete(vocabId);
    } else {
      newBookmarked.add(vocabId);
    }
    setBookmarked(newBookmarked);
  };

  if (!currentVocab) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout currentPage="learning-path">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold">Xem trước từ vựng</h1>
              <p className="text-gray-600">Level {levelId} - {vocabulary.length} từ</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{currentIndex + 1} / {vocabulary.length}</span>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">
            <strong>Chế độ xem trước:</strong> Đây là cách từ vựng sẽ hiển thị cho người dùng
          </p>
        </div>

        {/* Flashcard */}
        <Card className="max-w-2xl mx-auto">
          <div className="text-center p-8">
            {/* Word and Pronunciation */}
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <h2 className="text-4xl font-bold text-gray-900">{currentVocab.word}</h2>
                <button 
                  onClick={() => handlePlayAudio(currentVocab.audioUrl!)}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full bg-blue-50"
                >
                  <Volume2 className="h-6 w-6" />
                </button>
                <button 
                  onClick={() => toggleBookmark(currentVocab.id)}
                  className={`p-2 rounded-full ${
                    bookmarked.has(currentVocab.id) 
                      ? 'text-yellow-600 bg-yellow-50' 
                      : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                  }`}
                >
                  <Bookmark className="h-6 w-6" fill={bookmarked.has(currentVocab.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <p className="text-lg text-gray-600">{currentVocab.pronunciation}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mt-2">
                {currentVocab.partOfSpeech}
              </span>
            </div>

            {/* Definition (hidden until revealed) */}
            {showDefinition ? (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Nghĩa:</h3>
                  <p className="text-xl text-gray-900">{currentVocab.definition}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Ví dụ:</h3>
                  <p className="text-lg text-gray-900 italic">"{currentVocab.example}"</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowDefinition(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                👆 Nhấn để xem nghĩa
              </button>
            )}
          </div>
        </Card>

        {/* Navigation Controls */}
        <div className="flex justify-center space-x-4 mt-6">
          <Button variant="secondary" icon={<ChevronLeft className="h-4 w-4" />} onClick={handlePrev}>
            Trước
          </Button>
          
          <Button 
            variant="secondary" 
            icon={<Shuffle className="h-4 w-4" />}
            onClick={handleShuffle}
          >
            {shuffled ? 'Bỏ xáo trộn' : 'Xáo trộn'}
          </Button>
          
          <Button variant="secondary" icon={<ChevronRight className="h-4 w-4" />} onClick={handleNext}>
            Sau
          </Button>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Tiến độ: {Math.round(((currentIndex + 1) / vocabulary.length) * 100)}%</span>
            <span>Đã đánh dấu: {bookmarked.size} từ</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / vocabulary.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Vocabulary List */}
        <Card className="mt-8">
          <h3 className="font-semibold mb-4">Danh sách từ vựng ({vocabulary.length} từ)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {vocabulary.map((vocab, index) => (
              <div 
                key={vocab.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  index === currentIndex ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowDefinition(false);
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{vocab.word}</span>
                  {bookmarked.has(vocab.id) && <Bookmark className="h-4 w-4 text-yellow-500" fill="currentColor" />}
                </div>
                <p className="text-sm text-gray-600 truncate">{vocab.definition}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default VocabularyPreviewPage;