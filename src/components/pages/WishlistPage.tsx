import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  dateAdded: string;
  priceChanged: boolean;
  priceDirection?: 'up' | 'down';
}

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: 1,
      name: 'Дрель Bosch PSB 500 RE',
      price: 2999,
      originalPrice: 3299,
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      category: 'Инструменты',
      inStock: true,
      dateAdded: '10.12.2024',
      priceChanged: true,
      priceDirection: 'down'
    },
    {
      id: 2,
      name: 'Смеситель для кухни Grohe',
      price: 4599,
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      category: 'Сантехника',
      inStock: true,
      dateAdded: '08.12.2024',
      priceChanged: false
    },
    {
      id: 3,
      name: 'Садовый шланг 25м',
      price: 1399,
      originalPrice: 1299,
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      category: 'Садовые товары',
      inStock: false,
      dateAdded: '05.12.2024',
      priceChanged: true,
      priceDirection: 'up'
    },
    {
      id: 4,
      name: 'Универсальное моющее средство',
      price: 299,
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      category: 'Уборка',
      inStock: true,
      dateAdded: '03.12.2024',
      priceChanged: false
    },
    {
      id: 5,
      name: 'Набор отверток Stanley',
      price: 899,
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      category: 'Инструменты',
      inStock: true,
      dateAdded: '01.12.2024',
      priceChanged: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(wishlist.map(item => item.category)))];

  const removeFromWishlist = (itemId: number) => {
    setWishlist(prev => prev.filter(item => item.id !== itemId));
  };

  const addToCart = (item: WishlistItem) => {
    alert(`${item.name} добавлен в корзину`);
  };

  const moveAllToCart = () => {
    const inStockItems = wishlist.filter(item => item.inStock);
    if (inStockItems.length > 0) {
      alert(`${inStockItems.length} товаров добавлено в корзину`);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const filteredWishlist = wishlist
    .filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'dateAdded':
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);
  const inStockCount = wishlist.filter(item => item.inStock).length;
  const priceChangedCount = wishlist.filter(item => item.priceChanged).length;

  if (wishlist.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Список желаний</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Сохраняйте понравившиеся товары и следите за изменением цен.
          </p>
        </div>

        <div className="text-center py-12">
          <Icon name="Heart" size={64} className="mx-auto mb-6 text-gray-400" />
          <h3 className="text-2xl font-semibold mb-4">Список желаний пуст</h3>
          <p className="text-gray-600 mb-6">
            Добавляйте товары в избранное, чтобы не потерять их и следить за изменением цен.
          </p>
          <Button size="lg">
            <Icon name="ShoppingBag" className="mr-2" />
            Перейти в каталог
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Преимущества списка желаний</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Icon name="Bell" size={48} className="mx-auto mb-4 text-blue-600" />
                <h4 className="font-semibold mb-2">Уведомления о скидках</h4>
                <p className="text-sm text-gray-600">
                  Получайте уведомления, когда цена на товар снижается
                </p>
              </div>
              <div className="text-center">
                <Icon name="Bookmark" size={48} className="mx-auto mb-4 text-green-600" />
                <h4 className="font-semibold mb-2">Сохранение товаров</h4>
                <p className="text-sm text-gray-600">
                  Не теряйте понравившиеся товары из виду
                </p>
              </div>
              <div className="text-center">
                <Icon name="TrendingDown" size={48} className="mx-auto mb-4 text-purple-600" />
                <h4 className="font-semibold mb-2">Отслеживание цен</h4>
                <p className="text-sm text-gray-600">
                  Следите за изменением цен и покупайте выгодно
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Список желаний</h1>
          <p className="text-gray-600">{wishlist.length} товаров на сумму {totalValue.toLocaleString()} ₽</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={moveAllToCart} disabled={inStockCount === 0}>
            <Icon name="ShoppingCart" className="mr-2" />
            В корзину ({inStockCount})
          </Button>
          <Button variant="destructive" onClick={clearWishlist}>
            <Icon name="Trash2" className="mr-2" />
            Очистить
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Package" size={32} className="mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{wishlist.length}</div>
            <p className="text-gray-600">Товаров в списке</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="CheckCircle" size={32} className="mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{inStockCount}</div>
            <p className="text-gray-600">В наличии</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="TrendingDown" size={32} className="mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">{priceChangedCount}</div>
            <p className="text-gray-600">Изменилась цена</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Все категории' : category}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="dateAdded">По дате добавления</option>
            <option value="price">По цене</option>
            <option value="name">По названию</option>
          </select>
          
          <Input
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWishlist.map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Icon name="X" size={16} />
                </Button>
                
                {item.priceChanged && (
                  <Badge 
                    className={`absolute top-2 left-2 ${
                      item.priceDirection === 'down' 
                        ? 'bg-green-500' 
                        : 'bg-red-500'
                    }`}
                  >
                    <Icon 
                      name={item.priceDirection === 'down' ? 'TrendingDown' : 'TrendingUp'} 
                      size={12} 
                      className="mr-1" 
                    />
                    Цена изменилась
                  </Badge>
                )}
              </div>
              
              <Badge variant="secondary" className="mb-2">
                {item.category}
              </Badge>
              
              <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
              
              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {item.price.toLocaleString()} ₽
                  </span>
                  {item.originalPrice && item.originalPrice !== item.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {item.originalPrice.toLocaleString()} ₽
                    </span>
                  )}
                </div>
                {item.priceChanged && item.originalPrice && (
                  <div className={`text-sm ${
                    item.priceDirection === 'down' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.priceDirection === 'down' ? 'Скидка' : 'Подорожал на'} {' '}
                    {Math.abs(item.price - item.originalPrice)} ₽
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Добавлено: {item.dateAdded}</span>
                <Badge variant={item.inStock ? 'default' : 'destructive'}>
                  {item.inStock ? 'В наличии' : 'Нет в наличии'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Button
                  className="w-full"
                  disabled={!item.inStock}
                  onClick={() => addToCart(item)}
                >
                  {item.inStock ? 'В корзину' : 'Нет в наличии'}
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    Подробнее
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Scale" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWishlist.length === 0 && wishlist.length > 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Товары не найдены</h3>
          <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Уведомления о ценах</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <Icon name="Bell" size={32} className="text-blue-600" />
              <div>
                <h4 className="font-semibold">Отслеживание цен</h4>
                <p className="text-sm text-gray-600">
                  Получайте уведомления об изменении цен на товары из вашего списка желаний
                </p>
              </div>
            </div>
            <Button>
              Настроить уведомления
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WishlistPage;