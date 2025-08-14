import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Brand {
  id: number;
  name: string;
  logo: string;
  description: string;
  country: string;
  category: string;
  productsCount: number;
  featured: boolean;
  website: string;
}

const BrandsPage = () => {
  const [brands] = useState<Brand[]>([
    {
      id: 1,
      name: 'Bosch',
      logo: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      description: 'Немецкий производитель профессиональных инструментов и оборудования',
      country: 'Германия',
      category: 'Инструменты',
      productsCount: 245,
      featured: true,
      website: 'bosch.com'
    },
    {
      id: 2,
      name: 'Makita',
      logo: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      description: 'Японский бренд электроинструментов и садовой техники',
      country: 'Япония',
      category: 'Инструменты',
      productsCount: 189,
      featured: true,
      website: 'makita.com'
    },
    {
      id: 3,
      name: 'Grohe',
      logo: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      description: 'Премиальная сантехника и смесители из Германии',
      country: 'Германия',
      category: 'Сантехника',
      productsCount: 156,
      featured: true,
      website: 'grohe.com'
    },
    {
      id: 4,
      name: 'Karcher',
      logo: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      description: 'Мировой лидер в области техники для уборки',
      country: 'Германия',
      category: 'Уборка',
      productsCount: 78,
      featured: false,
      website: 'karcher.com'
    },
    {
      id: 5,
      name: 'Fiskars',
      logo: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      description: 'Финский производитель садовых инструментов',
      country: 'Финляндия',
      category: 'Садовые товары',
      productsCount: 92,
      featured: false,
      website: 'fiskars.com'
    },
    {
      id: 6,
      name: 'Stanley',
      logo: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      description: 'Американский бренд ручных инструментов',
      country: 'США',
      category: 'Инструменты',
      productsCount: 134,
      featured: false,
      website: 'stanley.com'
    },
    {
      id: 7,
      name: 'Hansgrohe',
      logo: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      description: 'Немецкая сантехника премиум-класса',
      country: 'Германия',
      category: 'Сантехника',
      productsCount: 167,
      featured: true,
      website: 'hansgrohe.com'
    },
    {
      id: 8,
      name: 'Vileda',
      logo: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      description: 'Товары для уборки и хозяйственные принадлежности',
      country: 'Германия',
      category: 'Уборка',
      productsCount: 89,
      featured: false,
      website: 'vileda.com'
    },
    {
      id: 9,
      name: 'Gardena',
      logo: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      description: 'Системы полива и садовые инструменты',
      country: 'Германия',
      category: 'Садовые товары',
      productsCount: 123,
      featured: true,
      website: 'gardena.com'
    },
    {
      id: 10,
      name: 'DeWalt',
      logo: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      description: 'Профессиональные электроинструменты',
      country: 'США',
      category: 'Инструменты',
      productsCount: 201,
      featured: true,
      website: 'dewalt.com'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(brands.map(brand => brand.category)))];
  const countries = Array.from(new Set(brands.map(brand => brand.country)));

  const filteredBrands = brands.filter(brand => {
    const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBrands = brands.filter(brand => brand.featured);
  const totalProducts = brands.reduce((sum, brand) => sum + brand.productsCount, 0);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Наши бренды</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мы работаем только с проверенными производителями, которые зарекомендовали себя 
          качественной продукцией и надежностью.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">{brands.length}</div>
            <p className="text-gray-600">Брендов в каталоге</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">{totalProducts}</div>
            <p className="text-gray-600">Товаров в наличии</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">{countries.length}</div>
            <p className="text-gray-600">Стран-производителей</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Рекомендуемые бренды</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredBrands.map(brand => (
              <div key={brand.id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{brand.name}</h4>
                  <p className="text-sm text-gray-600">{brand.category}</p>
                  <p className="text-xs text-gray-500">{brand.productsCount} товаров</p>
                </div>
                <Badge variant="secondary">
                  <Icon name="Star" size={12} className="mr-1" />
                  ТОП
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
        
        <div className="w-full md:w-auto">
          <Input
            placeholder="Поиск брендов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-64"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map(brand => (
          <Card key={brand.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                {brand.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Icon name="Star" size={12} className="mr-1" />
                    Рекомендуем
                  </Badge>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="MapPin" size={16} className="text-gray-400" />
                  <span>{brand.country}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Tag" size={16} className="text-gray-400" />
                  <span>{brand.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Package" size={16} className="text-gray-400" />
                  <span>{brand.productsCount} товаров</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Globe" size={16} className="text-gray-400" />
                  <span>{brand.website}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1" size="sm">
                  Смотреть товары
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="ExternalLink" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Бренды не найдены</h3>
          <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Почему мы выбираем эти бренды?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Icon name="Award" size={48} className="mx-auto mb-4 text-blue-600" />
              <h4 className="font-semibold mb-2">Качество</h4>
              <p className="text-sm text-gray-600">Только проверенные временем производители</p>
            </div>
            <div className="text-center">
              <Icon name="Shield" size={48} className="mx-auto mb-4 text-green-600" />
              <h4 className="font-semibold mb-2">Гарантия</h4>
              <p className="text-sm text-gray-600">Официальная гарантия на все товары</p>
            </div>
            <div className="text-center">
              <Icon name="Truck" size={48} className="mx-auto mb-4 text-purple-600" />
              <h4 className="font-semibold mb-2">Доступность</h4>
              <p className="text-sm text-gray-600">Регулярные поставки и наличие на складе</p>
            </div>
            <div className="text-center">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-orange-600" />
              <h4 className="font-semibold mb-2">Поддержка</h4>
              <p className="text-sm text-gray-600">Сервисная поддержка и запчасти</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Не нашли нужный бренд?</h3>
        <p className="text-gray-600 mb-6">
          Мы постоянно расширяем ассортимент и добавляем новых производителей. 
          Свяжитесь с нами, и мы поможем найти нужный товар.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Icon name="Phone" className="mr-2" />
            Связаться с нами
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="Mail" className="mr-2" />
            Написать письмо
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;