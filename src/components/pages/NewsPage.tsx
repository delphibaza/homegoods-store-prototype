import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  views: number;
}

const NewsPage = () => {
  const [news] = useState<NewsItem[]>([
    {
      id: 1,
      title: 'Новое поступление инструментов Bosch',
      excerpt: 'В наш магазин поступила новая партия профессиональных инструментов от немецкого производителя Bosch.',
      content: 'Мы рады сообщить о поступлении новой коллекции инструментов Bosch. В ассортименте представлены дрели, шуруповерты, болгарки и другие инструменты для профессионального использования. Все товары имеют официальную гарантию и сертификаты качества.',
      date: '15.12.2024',
      category: 'Новинки',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      views: 245
    },
    {
      id: 2,
      title: 'Скидки на садовый инвентарь до 30%',
      excerpt: 'Специальное предложение на садовые инструменты и инвентарь. Акция действует до конца месяца.',
      content: 'В рамках подготовки к весеннему сезону мы объявляем большую распродажу садового инвентаря. Скидки до 30% на лопаты, грабли, секаторы, поливочные системы и многое другое. Не упустите возможность подготовиться к дачному сезону по выгодным ценам!',
      date: '12.12.2024',
      category: 'Акции',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      views: 189
    },
    {
      id: 3,
      title: 'Открытие нового отдела сантехники',
      excerpt: 'В нашем магазине открылся расширенный отдел сантехнических товаров с большим выбором смесителей и аксессуаров.',
      content: 'Мы расширили торговые площади и открыли новый отдел сантехники. Теперь у нас представлен еще больший выбор смесителей, душевых кабин, унитазов, раковин и аксессуаров для ванной комнаты. Опытные консультанты помогут подобрать оптимальное решение для вашего дома.',
      date: '10.12.2024',
      category: 'Новости компании',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      views: 156
    },
    {
      id: 4,
      title: 'Зимние товары: соль, лопаты, антигололед',
      excerpt: 'Подготовьтесь к зиме! Большой выбор противогололедных средств и зимнего инвентаря.',
      content: 'С наступлением зимы особенно актуальными становятся товары для борьбы с гололедом и снегом. В нашем ассортименте представлены: техническая соль, песко-соляные смеси, антигололедные реагенты, снеговые лопаты, скребки и другой зимний инвентарь.',
      date: '08.12.2024',
      category: 'Сезонные товары',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      views: 203
    },
    {
      id: 5,
      title: 'Программа лояльности для постоянных клиентов',
      excerpt: 'Запускаем новую программу лояльности с накопительными скидками и специальными предложениями.',
      content: 'Мы ценим наших постоянных клиентов и запускаем программу лояльности. Теперь с каждой покупки вы получаете бонусные баллы, которые можно использовать для оплаты следующих заказов. Также участники программы получают доступ к эксклюзивным скидкам и предложениям.',
      date: '05.12.2024',
      category: 'Новости компании',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      views: 312
    },
    {
      id: 6,
      title: 'Мастер-класс по укладке плитки',
      excerpt: 'Приглашаем на бесплатный мастер-класс по укладке керамической плитки от профессионального плиточника.',
      content: 'В субботу, 20 декабря, в 14:00 состоится бесплатный мастер-класс по укладке керамической плитки. Опытный мастер расскажет о выборе материалов, подготовке поверхности, технологии укладки и затирке швов. Количество мест ограничено, требуется предварительная запись.',
      date: '03.12.2024',
      category: 'События',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      views: 178
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const categories = ['all', 'Новинки', 'Акции', 'Новости компании', 'Сезонные товары', 'События'];

  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Новинки': 'bg-blue-100 text-blue-800',
      'Акции': 'bg-red-100 text-red-800',
      'Новости компании': 'bg-green-100 text-green-800',
      'Сезонные товары': 'bg-orange-100 text-orange-800',
      'События': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (selectedNews) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedNews(null)}>
            <Icon name="ArrowLeft" className="mr-2" />
            Назад к новостям
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <img
              src={selectedNews.image}
              alt={selectedNews.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Badge className={getCategoryColor(selectedNews.category)}>
                  {selectedNews.category}
                </Badge>
                <span className="text-gray-500">{selectedNews.date}</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <Icon name="Eye" size={16} />
                  <span>{selectedNews.views}</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{selectedNews.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{selectedNews.excerpt}</p>
              <div className="prose max-w-none">
                <p>{selectedNews.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Новости и акции</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Следите за последними новостями нашего магазина, акциями и специальными предложениями.
        </p>
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
              {category === 'all' ? 'Все новости' : category}
            </Button>
          ))}
        </div>
        
        <div className="w-full md:w-auto">
          <Input
            placeholder="Поиск новостей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-64"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getCategoryColor(item.category)}>
                    {item.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                
                <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedNews(item)}
                  >
                    Читать далее
                  </Button>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Icon name="Eye" size={14} />
                    <span>{item.views}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Новости не найдены</h3>
          <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Подписка на новости</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <p className="text-gray-600 mb-4">
                Подпишитесь на нашу рассылку, чтобы первыми узнавать о новых товарах, акциях и специальных предложениях.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Ваш email" className="flex-1" />
                <Button>
                  <Icon name="Mail" className="mr-2" />
                  Подписаться
                </Button>
              </div>
            </div>
            <div className="text-center">
              <Icon name="Bell" size={48} className="text-blue-600 mb-2" />
              <p className="text-sm text-gray-500">Будьте в курсе всех новостей!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsPage;