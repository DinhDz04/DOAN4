// src/components/user/Shop.tsx
import React, { useState } from 'react';
import { Star, ShoppingBag, Zap, Clock, Gift, Check } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: 'xp_boost' | 'point_boost' | 'streak_freeze' | 'theme' | 'avatar';
  price: number;
  duration?: number;
  effectValue?: number;
  imageUrl?: string;
  isOwned?: boolean;
}

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'boosts' | 'cosmetics'>('all');
  const [userPoints, setUserPoints] = useState(1250);

  // Mock data - items cửa hàng
  const shopItems: ShopItem[] = [
    {
      id: '1',
      name: 'XP Boost 2x',
      description: 'Tăng gấp đôi XP trong 24 giờ',
      type: 'xp_boost',
      price: 300,
      duration: 24,
      effectValue: 2
    },
    {
      id: '2',
      name: 'Điểm tăng 50%',
      description: 'Tăng 50% điểm nhận được',
      type: 'point_boost',
      price: 250,
      duration: 24,
      effectValue: 1.5
    },
    {
      id: '3',
      name: 'Bảo vệ Streak',
      description: 'Bảo vệ streak của bạn trong 24h nếu quên học',
      type: 'streak_freeze',
      price: 200,
      duration: 24
    },
    {
      id: '4',
      name: 'Chủ đề Tối',
      description: 'Giao diện tối cho ứng dụng',
      type: 'theme',
      price: 500,
      isOwned: false
    },
    {
      id: '5',
      name: 'Avatar Đặc biệt',
      description: 'Avatar độc quyền cho hội viên',
      type: 'avatar',
      price: 800,
      isOwned: false
    },
    {
      id: '6',
      name: 'XP Boost 3x',
      description: 'Tăng gấp ba XP trong 12 giờ',
      type: 'xp_boost',
      price: 450,
      duration: 12,
      effectValue: 3
    }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả', count: shopItems.length },
    { id: 'boosts', label: 'Tăng cường', count: shopItems.filter(item => ['xp_boost', 'point_boost', 'streak_freeze'].includes(item.type)).length },
    { id: 'cosmetics', label: 'Trang trí', count: shopItems.filter(item => ['theme', 'avatar'].includes(item.type)).length }
  ];

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'xp_boost':
        return <Zap className="h-6 w-6" />;
      case 'point_boost':
        return <Star className="h-6 w-6" />;
      case 'streak_freeze':
        return <Clock className="h-6 w-6" />;
      case 'theme':
        return <span className="text-2xl">🎨</span>;
      case 'avatar':
        return <span className="text-2xl">👤</span>;
      default:
        return <Gift className="h-6 w-6" />;
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'xp_boost':
        return 'from-purple-500 to-pink-500';
      case 'point_boost':
        return 'from-yellow-500 to-orange-500';
      case 'streak_freeze':
        return 'from-blue-500 to-cyan-500';
      case 'theme':
        return 'from-gray-600 to-gray-800';
      case 'avatar':
        return 'from-green-500 to-teal-500';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const filteredItems = shopItems.filter(item => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'boosts') return ['xp_boost', 'point_boost', 'streak_freeze'].includes(item.type);
    if (activeCategory === 'cosmetics') return ['theme', 'avatar'].includes(item.type);
    return true;
  });

  const handlePurchase = (item: ShopItem) => {
    if (userPoints >= item.price) {
      setUserPoints(prev => prev - item.price);
      // TODO: Gọi API purchase
      alert(`Bạn đã mua ${item.name} thành công!`);
    } else {
      alert('Bạn không đủ điểm để mua vật phẩm này!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cửa Hàng</h1>
          <p className="text-gray-600">Mua vật phẩm tăng cường và trang trí</p>
        </div>
        
        {/* Points Display */}
        <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-xl text-white">
          <Star className="h-5 w-5" />
          <span className="font-bold text-lg">{userPoints}</span>
          <span className="text-yellow-100">điểm</span>
        </div>
      </div>

      {/* Categories */}
      <Card>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="font-medium">{category.label}</span>
              <Badge variant="default" size="sm">
                {category.count}
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id} hover className="overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${getItemColor(item.type)}`} />
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getItemColor(item.type)} rounded-lg flex items-center justify-center text-white`}>
                    {getItemIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>

              {/* Item Details */}
              <div className="space-y-2 mb-4">
                {item.duration && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Thời gian:</span>
                    <span className="font-medium">{item.duration} giờ</span>
                  </div>
                )}
                {item.effectValue && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Hiệu ứng:</span>
                    <span className="font-medium">{item.effectValue}x</span>
                  </div>
                )}
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-bold text-gray-900">{item.price}</span>
                </div>
                
                {item.isOwned ? (
                  <Badge variant="success" className="flex items-center space-x-1">
                    <Check className="h-3 w-3" />
                    <span>Đã sở hữu</span>
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant={userPoints >= item.price ? "primary" : "secondary"}
                    disabled={userPoints < item.price}
                    onClick={() => handlePurchase(item)}
                    icon={<ShoppingBag className="h-4 w-4" />}
                  >
                    Mua
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Card className="text-center py-12">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không có vật phẩm</h3>
          <p className="text-gray-600">Hiện không có vật phẩm nào trong danh mục này</p>
        </Card>
      )}
    </div>
  );
};

export default Shop;