import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
  views: number;
  tags: string[];
}

const BlogPage = () => {
  const [posts] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'Как выбрать дрель для дома: полное руководство',
      excerpt: 'Подробный гид по выбору дрели для домашних нужд. Рассматриваем типы дрелей, основные характеристики и рекомендации.',
      content: 'Выбор дрели для дома - важная задача, которая требует понимания основных характеристик и типов инструментов...',
      author: 'Алексей Петров',
      date: '15.12.2024',
      category: 'Инструменты',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      readTime: 8,
      views: 1245,
      tags: ['дрель', 'инструменты', 'выбор', 'дом']
    },
    {
      id: 2,
      title: 'Монтаж смесителя своими руками: пошаговая инструкция',
      excerpt: 'Детальная инструкция по самостоятельной установке смесителя в ванной и на кухне с фотографиями каждого этапа.',
      content: 'Установка смесителя - задача, которую можно выполнить самостоятельно при наличии базовых навыков...',
      author: 'Мария Сидорова',
      date: '12.12.2024',
      category: 'Сантехника',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      readTime: 12,
      views: 892,
      tags: ['смеситель', 'монтаж', 'сантехника', 'DIY']
    },
    {
      id: 3,
      title: 'Подготовка сада к зиме: чек-лист садовода',
      excerpt: 'Полный список работ для подготовки сада и огорода к зимнему периоду. Что нужно сделать до наступления морозов.',
      content: 'Подготовка сада к зиме - важный этап, от которого зависит здоровье растений и будущий урожай...',
      author: 'Дмитрий Козлов',
      date: '10.12.2024',
      category: 'Садоводство',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      readTime: 6,
      views: 567,
      tags: ['сад', 'зима', 'подготовка', 'растения']
    },
    {
      id: 4,
      title: 'Экологичная уборка: натуральные средства для дома',
      excerpt: 'Рецепты безопасных моющих средств из натуральных ингредиентов. Эффективная уборка без химии.',
      content: 'Натуральные моющие средства становятся все более популярными среди заботящихся о здоровье людей...',
      author: 'Елена Волкова',
      date: '08.12.2024',
      category: 'Уборка',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      readTime: 5,
      views: 734,
      tags: ['уборка', 'экология', 'натуральные средства', 'здоровье']
    },
    {
      id: 5,
      title: 'Организация хранения в гараже: практические советы',
      excerpt: 'Как эффективно организовать пространство в гараже для хранения инструментов, материалов и сезонных вещей.',
      content: 'Правильная организация гаража поможет сэкономить время и сделать работу более комфортной...',
      author: 'Игорь Петров',
      date: '05.12.2024',
      category: 'Организация',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      readTime: 7,
      views: 423,
      tags: ['гараж', 'хранение', 'организация', 'порядок']
    },
    {
      id: 6,
      title: 'Ремонт кафельной плитки: устранение сколов и трещин',
      excerpt: 'Методы восстановления поврежденной керамической плитки без полной замены. Материалы и инструменты.',
      content: 'Небольшие повреждения плитки можно устранить самостоятельно, не прибегая к полной замене...',
      author: 'Андрей Смирнов',
      date: '03.12.2024',
      category: 'Ремонт',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      readTime: 9,
      views: 656,
      tags: ['плитка', 'ремонт', 'реставрация', 'керамика']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];
  const popularTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).slice(0, 10);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Инструменты': 'bg-blue-100 text-blue-800',
      'Сантехника': 'bg-green-100 text-green-800',
      'Садоводство': 'bg-orange-100 text-orange-800',
      'Уборка': 'bg-purple-100 text-purple-800',
      'Организация': 'bg-yellow-100 text-yellow-800',
      'Ремонт': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (selectedPost) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedPost(null)}>
            <Icon name="ArrowLeft" className="mr-2" />
            Назад к статьям
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Badge className={getCategoryColor(selectedPost.category)}>
                  {selectedPost.category}
                </Badge>
                <span className="text-gray-500">{selectedPost.date}</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <Icon name="Clock" size={16} />
                  <span>{selectedPost.readTime} мин</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Icon name="Eye" size={16} />
                  <span>{selectedPost.views}</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{selectedPost.title}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold">{selectedPost.author}</p>
                  <p className="text-sm text-gray-500">Автор статьи</p>
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-600 mb-6">{selectedPost.excerpt}</p>
                <p>{selectedPost.content}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Heart" className="mr-2" />
                    Нравится
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Share2" className="mr-2" />
                    Поделиться
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="Bookmark" className="mr-2" />
                  Сохранить
                </Button>
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
        <h1 className="text-4xl font-bold mb-4">Блог</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Полезные статьи, советы и инструкции по выбору, использованию и уходу 
          за товарами для дома и дачи.
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
              {category === 'all' ? 'Все статьи' : category}
            </Button>
          ))}
        </div>
        
        <div className="w-full md:w-auto">
          <Input
            placeholder="Поиск статей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-64"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          <span>{post.readTime} мин</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Eye" size={14} />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <Icon name="User" size={12} className="text-gray-500" />
                        </div>
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedPost(post)}
                    >
                      Читать статью
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Статьи не найдены</h3>
              <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Популярные теги</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setSearchQuery(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Популярные статьи</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map(post => (
                    <div
                      key={post.id}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                      onClick={() => setSelectedPost(post)}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.views} просмотров</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Подписка на блог</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Получайте уведомления о новых статьях и полезных советах.
              </p>
              <div className="space-y-2">
                <Input placeholder="Ваш email" />
                <Button className="w-full">
                  <Icon name="Mail" className="mr-2" />
                  Подписаться
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;