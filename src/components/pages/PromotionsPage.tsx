import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  category: string;
  type: 'discount' | 'gift' | 'cashback' | 'special';
  image: string;
  conditions: string[];
  products: string[];
  active: boolean;
}

const PromotionsPage = () => {
  const [promotions] = useState<Promotion[]>([
    {
      id: 1,
      title: 'Скидка 25% на все инструменты Bosch',
      description: 'Большая распродажа немецких электроинструментов. Успейте купить по выгодной цене!',
      discount: '25%',
      validUntil: '31.12.2024',
      category: 'Инструменты',
      type: 'discount',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      conditions: [
        'Скидка действует на все товары бренда Bosch',
        'Не суммируется с другими скидками',
        'Действует до 31 декабря 2024 года'
      ],
      products: ['Дрели', 'Шуруповерты', 'Болгарки', 'Перфораторы'],
      active: true
    },
    {
      id: 2,
      title: 'Подарок при покупке сантехники',
      description: 'При покупке смесителя или душевой кабины - комплект для установки в подарок!',
      discount: 'Подарок',
      validUntil: '15.01.2025',
      category: 'Сантехника',
      type: 'gift',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      conditions: [
        'При покупке от 5000 рублей',
        'Подарок - комплект для установки',
        'Количество подарков ограничено'
      ],
      products: ['Смесители', 'Душевые кабины', 'Унитазы', 'Раковины'],
      active: true
    },
    {
      id: 3,
      title: 'Кэшбэк 10% на садовые товары',
      description: 'Покупайте товары для сада и получайте 10% кэшбэка на следующие покупки',
      discount: '10%',
      validUntil: '28.02.2025',
      category: 'Садовые товары',
      type: 'cashback',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      conditions: [
        'Кэшбэк начисляется в течение 7 дней',
        'Можно использовать в течение 6 месяцев',
        'Минимальная сумма покупки 2000 рублей'
      ],
      products: ['Лопаты', 'Грабли', 'Шланги', 'Секаторы'],
      active: true
    },
    {
      id: 4,
      title: '3 по цене 2 на моющие средства',
      description: 'Покупайте любые 3 моющих средства и платите только за 2!',
      discount: '33%',
      validUntil: '20.01.2025',
      category: 'Уборка',
      type: 'special',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      conditions: [
        'Акция распространяется на все моющие средства',
        'Скидка применяется к товару с наименьшей стоимостью',
        'Можно комбинировать разные товары'
      ],
      products: ['Универсальные средства', 'Для стекол', 'Для пола', 'Для кухни'],
      active: true
    },
    {
      id: 5,
      title: 'Новогодняя распродажа',
      description: 'Скидки до 50% на товары для дома. Встречайте Новый год с обновками!',
      discount: 'до 50%',
      validUntil: '10.01.2025',
      category: 'Все категории',
      type: 'discount',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      conditions: [
        'Скидки на выбранные товары',
        'Количество товаров ограничено',
        'Действует в период новогодних праздников'
      ],
      products: ['Декор', 'Освещение', 'Текстиль', 'Посуда'],
      active: true
    },
    {
      id: 6,
      title: 'Бесплатная доставка',
      description: 'Бесплатная доставка при заказе от 3000 рублей по Москве и области',
      discount: 'Бесплатно',
      validUntil: '31.01.2025',
      category: 'Доставка',
      type: 'special',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      conditions: [
        'Минимальная сумма заказа 3000 рублей',
        'Действует по Москве и области',
        'Не распространяется на крупногабаритные товары'
      ],
      products: ['Все товары'],
      active: true
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(promotions.map(promo => promo.category)))];
  const types = ['all', 'discount', 'gift', 'cashback', 'special'];

  const filteredPromotions = promotions.filter(promo => {
    const matchesCategory = selectedCategory === 'all' || promo.category === selectedCategory;
    const matchesType = selectedType === 'all' || promo.type === selectedType;
    const matchesSearch = promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         promo.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch && promo.active;
  });

  const getTypeColor = (type: string) => {
    const colors = {
      'discount': 'bg-red-100 text-red-800',
      'gift': 'bg-green-100 text-green-800',
      'cashback': 'bg-blue-100 text-blue-800',
      'special': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeText = (type: string) => {
    const texts = {
      'discount': 'Скидка',
      'gift': 'Подарок',
      'cashback': 'Кэшбэк',
      'special': 'Спецпредложение'
    };
    return texts[type as keyof typeof texts] || type;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'discount': 'Percent',
      'gift': 'Gift',
      'cashback': 'ArrowLeftRight',
      'special': 'Star'
    };
    return icons[type as keyof typeof icons] || 'Tag';
  };

  const isExpiringSoon = (validUntil: string) => {
    const endDate = new Date(validUntil.split('.').reverse().join('-'));
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Акции и скидки</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Выгодные предложения и специальные акции на товары для дома и дачи. 
          Экономьте с нашими скидками!
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Percent" size={48} className="mx-auto mb-4 text-red-600" />
            <div className="text-3xl font-bold mb-2">{promotions.filter(p => p.type === 'discount').length}</div>
            <p className="text-gray-600">Скидочных акций</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Gift" size={48} className="mx-auto mb-4 text-green-600" />
            <div className="text-3xl font-bold mb-2">{promotions.filter(p => p.type === 'gift').length}</div>
            <p className="text-gray-600">Подарков</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="ArrowLeftRight" size={48} className="mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold mb-2">{promotions.filter(p => p.type === 'cashback').length}</div>
            <p className="text-gray-600">Кэшбэк программ</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Star" size={48} className="mx-auto mb-4 text-purple-600" />
            <div className="text-3xl font-bold mb-2">{promotions.filter(p => p.type === 'special').length}</div>
            <p className="text-gray-600">Спецпредложений</p>
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
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">Все типы</option>
            <option value="discount">Скидки</option>
            <option value="gift">Подарки</option>
            <option value="cashback">Кэшбэк</option>
            <option value="special">Спецпредложения</option>
          </select>
          
          <Input
            placeholder="Поиск акций..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map(promo => (
          <Card key={promo.id} className="hover:shadow-lg transition-shadow relative overflow-hidden">
            {isExpiringSoon(promo.validUntil) && (
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-semibold">
                Скоро закончится!
              </div>
            )}
            
            <CardContent className="p-0">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getTypeColor(promo.type)}>
                    <Icon name={getTypeIcon(promo.type) as any} size={12} className="mr-1" />
                    {getTypeText(promo.type)}
                  </Badge>
                  <Badge variant="outline">{promo.category}</Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{promo.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-red-600">{promo.discount}</div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Действует до:</div>
                    <div className="font-semibold">{promo.validUntil}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Товары по акции:</h4>
                    <div className="flex flex-wrap gap-1">
                      {promo.products.slice(0, 3).map((product, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                      {promo.products.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{promo.products.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Перейти к товарам
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPromotions.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Акции не найдены</h3>
          <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Программа лояльности</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <Icon name="Award" size={48} className="mx-auto mb-4 text-bronze-600" />
              <h4 className="font-semibold mb-2">Бронзовый</h4>
              <p className="text-sm text-gray-600 mb-3">От 0 до 50,000 ₽</p>
              <div className="text-2xl font-bold text-bronze-600 mb-2">3%</div>
              <p className="text-xs text-gray-500">Скидка на все товары</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg border-yellow-200 bg-yellow-50">
              <Icon name="Award" size={48} className="mx-auto mb-4 text-yellow-600" />
              <h4 className="font-semibold mb-2">Серебряный</h4>
              <p className="text-sm text-gray-600 mb-3">От 50,000 до 150,000 ₽</p>
              <div className="text-2xl font-bold text-yellow-600 mb-2">5%</div>
              <p className="text-xs text-gray-500">Скидка на все товары</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg border-yellow-400 bg-yellow-100">
              <Icon name="Crown" size={48} className="mx-auto mb-4 text-yellow-700" />
              <h4 className="font-semibold mb-2">Золотой</h4>
              <p className="text-sm text-gray-600 mb-3">От 150,000 ₽</p>
              <div className="text-2xl font-bold text-yellow-700 mb-2">7%</div>
              <p className="text-xs text-gray-500">Скидка на все товары</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" className="text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900">Как стать участником?</h4>
                <p className="text-sm text-blue-700">
                  Зарегистрируйтесь на сайте и начните делать покупки. 
                  Статус обновляется автоматически при достижении суммы покупок.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Подписка на акции</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Не пропустите выгодные предложения!</h3>
              <p className="text-gray-600 mb-4">
                Подпишитесь на нашу рассылку и первыми узнавайте о новых акциях, 
                скидках и специальных предложениях.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Ваш email" className="flex-1" />
                <Button>
                  <Icon name="Bell" className="mr-2" />
                  Подписаться
                </Button>
              </div>
            </div>
            <div className="text-center">
              <Icon name="Mail" size={64} className="text-blue-600 mb-4" />
              <p className="text-sm text-gray-500">Еженедельная рассылка<br />с лучшими предложениями</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Условия участия в акциях</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Общие условия:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                  <span>Акции не суммируются, если не указано иное</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                  <span>Количество товаров по акции может быть ограничено</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                  <span>Акции действуют только на товары в наличии</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                  <span>Организатор оставляет за собой право изменить условия</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Как получить скидку:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="ShoppingCart" size={16} className="text-blue-600 mt-0.5" />
                  <span>Добавьте товары по акции в корзину</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Tag" size={16} className="text-blue-600 mt-0.5" />
                  <span>Скидка применится автоматически</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CreditCard" size={16} className="text-blue-600 mt-0.5" />
                  <span>Оплатите заказ любым удобным способом</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Truck" size={16} className="text-blue-600 mt-0.5" />
                  <span>Получите товар с учетом скидки</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionsPage;