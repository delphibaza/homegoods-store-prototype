import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  rating: number;
  inStock: boolean;
  specifications: { [key: string]: string };
}

const ComparisonPage = () => {
  const [comparisonList, setComparisonList] = useState<Product[]>([
    {
      id: 1,
      name: 'Дрель Bosch PSB 500 RE',
      price: 3299,
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      brand: 'Bosch',
      rating: 4.5,
      inStock: true,
      specifications: {
        'Мощность': '500 Вт',
        'Максимальный диаметр сверления': '13 мм',
        'Количество скоростей': '2',
        'Вес': '1.5 кг',
        'Гарантия': '2 года',
        'Тип патрона': 'Быстрозажимной'
      }
    },
    {
      id: 2,
      name: 'Дрель Makita HP1631K',
      price: 4199,
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      brand: 'Makita',
      rating: 4.7,
      inStock: true,
      specifications: {
        'Мощность': '710 Вт',
        'Максимальный диаметр сверления': '16 мм',
        'Количество скоростей': '1',
        'Вес': '1.8 кг',
        'Гарантия': '3 года',
        'Тип патрона': 'Ключевой'
      }
    },
    {
      id: 3,
      name: 'Дрель DeWalt DWD024',
      price: 3899,
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      brand: 'DeWalt',
      rating: 4.3,
      inStock: false,
      specifications: {
        'Мощность': '650 Вт',
        'Максимальный диаметр сверления': '13 мм',
        'Количество скоростей': '1',
        'Вес': '1.6 кг',
        'Гарантия': '3 года',
        'Тип патрона': 'Быстрозажимной'
      }
    }
  ]);

  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);

  const removeFromComparison = (productId: number) => {
    setComparisonList(prev => prev.filter(product => product.id !== productId));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const addToCart = (product: Product) => {
    // Логика добавления в корзину
    alert(`${product.name} добавлен в корзину`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  // Получаем все уникальные характеристики
  const allSpecs = Array.from(
    new Set(comparisonList.flatMap(product => Object.keys(product.specifications)))
  );

  // Фильтруем характеристики, если включен режим "только различия"
  const visibleSpecs = showDifferencesOnly 
    ? allSpecs.filter(spec => {
        const values = comparisonList.map(product => product.specifications[spec] || 'Не указано');
        return new Set(values).size > 1;
      })
    : allSpecs;

  if (comparisonList.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Сравнение товаров</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Добавьте товары в сравнение, чтобы выбрать наиболее подходящий вариант.
          </p>
        </div>

        <div className="text-center py-12">
          <Icon name="Scale" size={64} className="mx-auto mb-6 text-gray-400" />
          <h3 className="text-2xl font-semibold mb-4">Список сравнения пуст</h3>
          <p className="text-gray-600 mb-6">
            Добавьте товары в сравнение из каталога, чтобы сравнить их характеристики и выбрать лучший вариант.
          </p>
          <Button size="lg">
            <Icon name="ShoppingBag" className="mr-2" />
            Перейти в каталог
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Как пользоваться сравнением?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Plus" size={24} className="text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">1. Добавьте товары</h4>
                <p className="text-sm text-gray-600">
                  Нажмите кнопку "Сравнить" на странице товара или в каталоге
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Scale" size={24} className="text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">2. Сравните</h4>
                <p className="text-sm text-gray-600">
                  Изучите характеристики, цены и отзывы в удобной таблице
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="ShoppingCart" size={24} className="text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">3. Выберите лучший</h4>
                <p className="text-sm text-gray-600">
                  Добавьте подходящий товар в корзину одним кликом
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
          <h1 className="text-4xl font-bold mb-2">Сравнение товаров</h1>
          <p className="text-gray-600">Сравните {comparisonList.length} товара</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowDifferencesOnly(!showDifferencesOnly)}
          >
            <Icon name="Filter" className="mr-2" />
            {showDifferencesOnly ? 'Показать все' : 'Только различия'}
          </Button>
          <Button variant="destructive" onClick={clearComparison}>
            <Icon name="Trash2" className="mr-2" />
            Очистить
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Карточки товаров */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {comparisonList.map(product => (
              <Card key={product.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => removeFromComparison(product.id)}
                >
                  <Icon name="X" size={16} />
                </Button>
                
                <CardContent className="p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  
                  <Badge variant="secondary" className="mb-2">
                    {product.brand}
                  </Badge>
                  
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  
                  <div className="text-2xl font-bold text-blue-600 mb-4">
                    {product.price.toLocaleString()} ₽
                  </div>
                  
                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      disabled={!product.inStock}
                      onClick={() => addToCart(product)}
                    >
                      {product.inStock ? 'В корзину' : 'Нет в наличии'}
                    </Button>
                    <Button variant="outline" className="w-full">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Таблица сравнения характеристик */}
          <Card>
            <CardHeader>
              <CardTitle>Сравнение характеристик</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Характеристика</th>
                      {comparisonList.map(product => (
                        <th key={product.id} className="text-center p-4 font-semibold min-w-48">
                          {product.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Цена</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="text-center p-4">
                          <span className="text-lg font-bold text-blue-600">
                            {product.price.toLocaleString()} ₽
                          </span>
                        </td>
                      ))}
                    </tr>
                    
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Рейтинг</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="text-center p-4">
                          <div className="flex justify-center items-center gap-2">
                            <div className="flex">
                              {renderStars(product.rating)}
                            </div>
                            <span>{product.rating}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Наличие</td>
                      {comparisonList.map(product => (
                        <td key={product.id} className="text-center p-4">
                          <Badge variant={product.inStock ? 'default' : 'destructive'}>
                            {product.inStock ? 'В наличии' : 'Нет в наличии'}
                          </Badge>
                        </td>
                      ))}
                    </tr>

                    {visibleSpecs.map((spec, index) => (
                      <tr key={spec} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-4 font-semibold">{spec}</td>
                        {comparisonList.map(product => (
                          <td key={product.id} className="text-center p-4">
                            {product.specifications[spec] || 'Не указано'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Рекомендации */}
          <Card>
            <CardHeader>
              <CardTitle>Наши рекомендации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <Icon name="DollarSign" size={32} className="text-green-600 mb-3" />
                  <h4 className="font-semibold mb-2">Лучшая цена</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {comparisonList.reduce((min, product) => 
                      product.price < min.price ? product : min
                    ).name}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {Math.min(...comparisonList.map(p => p.price)).toLocaleString()} ₽
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <Icon name="Star" size={32} className="text-yellow-600 mb-3" />
                  <h4 className="font-semibold mb-2">Лучший рейтинг</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {comparisonList.reduce((max, product) => 
                      product.rating > max.rating ? product : max
                    ).name}
                  </p>
                  <p className="text-lg font-bold text-yellow-600">
                    {Math.max(...comparisonList.map(p => p.rating))} ★
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <Icon name="Award" size={32} className="text-blue-600 mb-3" />
                  <h4 className="font-semibold mb-2">Наш выбор</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Оптимальное соотношение цены и качества
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    {comparisonList[0]?.name}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;