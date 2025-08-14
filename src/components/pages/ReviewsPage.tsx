import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  product?: string;
  verified: boolean;
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: 'Алексей М.',
      rating: 5,
      date: '15.12.2024',
      title: 'Отличный магазин!',
      text: 'Заказывал инструменты для ремонта. Все пришло быстро, качество отличное. Консультанты помогли с выбором. Рекомендую!',
      product: 'Набор отверток',
      verified: true
    },
    {
      id: 2,
      name: 'Мария С.',
      rating: 4,
      date: '12.12.2024',
      title: 'Хорошее обслуживание',
      text: 'Покупала моющие средства. Цены приемлемые, доставка в срок. Единственный минус - не всегда есть в наличии нужные позиции.',
      product: 'Универсальное моющее средство',
      verified: true
    },
    {
      id: 3,
      name: 'Дмитрий К.',
      rating: 5,
      date: '10.12.2024',
      title: 'Профессиональный подход',
      text: 'Заказывал сантехнику для офиса. Менеджер подобрал все необходимое, предложил скидку. Монтажники работали аккуратно.',
      verified: true
    },
    {
      id: 4,
      name: 'Елена В.',
      rating: 3,
      date: '08.12.2024',
      title: 'Средне',
      text: 'Товар нормальный, но доставка задержалась на день. В целом неплохо, но есть куда расти.',
      product: 'Садовый шланг',
      verified: false
    },
    {
      id: 5,
      name: 'Игорь П.',
      rating: 5,
      date: '05.12.2024',
      title: 'Все супер!',
      text: 'Уже не первый раз заказываю здесь. Всегда качественные товары, быстрая доставка, адекватные цены. Спасибо!',
      verified: true
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    title: '',
    text: '',
    product: ''
  });

  const [filter, setFilter] = useState('all');

  const addReview = () => {
    if (newReview.name && newReview.title && newReview.text) {
      const review: Review = {
        id: Date.now(),
        name: newReview.name,
        rating: newReview.rating,
        date: new Date().toLocaleDateString('ru-RU'),
        title: newReview.title,
        text: newReview.text,
        product: newReview.product,
        verified: false
      };
      setReviews([review, ...reviews]);
      setNewReview({ name: '', rating: 5, title: '', text: '', product: '' });
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === 'verified') return review.verified;
    if (filter === '5') return review.rating === 5;
    if (filter === '4') return review.rating === 4;
    if (filter === '3') return review.rating <= 3;
    return true;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Отзывы покупателей</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мнения наших клиентов помогают нам становиться лучше. 
          Поделитесь своим опытом покупок!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Общая оценка</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl font-bold text-blue-600">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-gray-600">На основе {reviews.length} отзывов</p>
            
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-2 text-sm">
                  <span className="w-8">{rating}</span>
                  <Icon name="Star" size={14} className="text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Фильтры</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  Все отзывы
                </Button>
                <Button
                  variant={filter === 'verified' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('verified')}
                >
                  Проверенные
                </Button>
                <Button
                  variant={filter === '5' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('5')}
                >
                  5 звезд
                </Button>
                <Button
                  variant={filter === '4' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('4')}
                >
                  4 звезды
                </Button>
                <Button
                  variant={filter === '3' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('3')}
                >
                  3 и менее
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        {filteredReviews.map(review => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{review.name}</h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Icon name="CheckCircle" size={12} className="mr-1" />
                          Проверен
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{review.date}</span>
                      {review.product && (
                        <>
                          <span>•</span>
                          <span>{review.product}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              <h5 className="font-semibold mb-2">{review.title}</h5>
              <p className="text-gray-700">{review.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Оставить отзыв</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reviewName">Ваше имя</Label>
              <Input
                id="reviewName"
                value={newReview.name}
                onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Введите ваше имя"
              />
            </div>
            <div>
              <Label htmlFor="reviewProduct">Товар (необязательно)</Label>
              <Input
                id="reviewProduct"
                value={newReview.product}
                onChange={(e) => setNewReview(prev => ({ ...prev, product: e.target.value }))}
                placeholder="Название товара"
              />
            </div>
          </div>
          
          <div>
            <Label>Оценка</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                  className="p-1"
                >
                  <Icon
                    name="Star"
                    size={24}
                    className={rating <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="reviewTitle">Заголовок отзыва</Label>
            <Input
              id="reviewTitle"
              value={newReview.title}
              onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Краткое описание вашего опыта"
            />
          </div>
          
          <div>
            <Label htmlFor="reviewText">Текст отзыва</Label>
            <Textarea
              id="reviewText"
              value={newReview.text}
              onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Расскажите подробнее о вашем опыте покупки"
              rows={4}
            />
          </div>
          
          <Button onClick={addReview} className="w-full">
            <Icon name="Send" className="mr-2" />
            Отправить отзыв
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsPage;