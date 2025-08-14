import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface InstallationService {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tools: string[];
  steps: string[];
  tips: string[];
  image: string;
}

const InstallationPage = () => {
  const [services] = useState<InstallationService[]>([
    {
      id: 1,
      name: 'Установка смесителя',
      category: 'Сантехника',
      description: 'Профессиональная установка смесителя для кухни или ванной комнаты',
      price: 'от 1,500 ₽',
      duration: '1-2 часа',
      difficulty: 'medium',
      tools: ['Разводной ключ', 'Герметик', 'ФУМ-лента', 'Отвертка'],
      steps: [
        'Перекрыть подачу воды',
        'Демонтировать старый смеситель',
        'Подготовить место установки',
        'Установить новый смеситель',
        'Подключить водопроводные трубы',
        'Проверить герметичность соединений'
      ],
      tips: [
        'Используйте качественный герметик',
        'Не перетягивайте соединения',
        'Проверьте давление воды перед установкой'
      ],
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg'
    },
    {
      id: 2,
      name: 'Монтаж полок',
      category: 'Мебель',
      description: 'Навешивание полок различных типов на стены',
      price: 'от 500 ₽',
      duration: '30-60 мин',
      difficulty: 'easy',
      tools: ['Дрель', 'Уровень', 'Дюбели', 'Саморезы'],
      steps: [
        'Разметить места крепления',
        'Просверлить отверстия',
        'Установить дюбели',
        'Закрепить кронштейны',
        'Навесить полку',
        'Проверить горизонтальность'
      ],
      tips: [
        'Используйте уровень для точной разметки',
        'Выбирайте дюбели по типу стены',
        'Проверьте несущую способность стены'
      ],
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg'
    },
    {
      id: 3,
      name: 'Установка розеток',
      category: 'Электрика',
      description: 'Монтаж электрических розеток и выключателей',
      price: 'от 800 ₽',
      duration: '1-1.5 часа',
      difficulty: 'hard',
      tools: ['Отвертки', 'Индикатор напряжения', 'Кусачки', 'Изолента'],
      steps: [
        'Отключить электричество',
        'Демонтировать старую розетку',
        'Проверить проводку',
        'Подключить новую розетку',
        'Закрепить в подрозетнике',
        'Проверить работоспособность'
      ],
      tips: [
        'Обязательно отключите электричество',
        'Используйте индикатор напряжения',
        'Соблюдайте цветовую маркировку проводов'
      ],
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg'
    },
    {
      id: 4,
      name: 'Сборка мебели',
      category: 'Мебель',
      description: 'Профессиональная сборка корпусной мебели',
      price: 'от 1,200 ₽',
      duration: '2-4 часа',
      difficulty: 'medium',
      tools: ['Шуруповерт', 'Отвертки', 'Шестигранники', 'Молоток'],
      steps: [
        'Проверить комплектность',
        'Изучить инструкцию',
        'Подготовить детали',
        'Собрать каркас',
        'Установить фурнитуру',
        'Проверить качество сборки'
      ],
      tips: [
        'Внимательно изучите схему сборки',
        'Не затягивайте крепеж до конца сразу',
        'Проверяйте перпендикулярность углов'
      ],
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg'
    }
  ]);

  const [selectedService, setSelectedService] = useState<InstallationService | null>(null);
  const [orderForm, setOrderForm] = useState({
    service: '',
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    description: ''
  });

  const categories = Array.from(new Set(services.map(service => service.category)));

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'easy': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'hard': 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyText = (difficulty: string) => {
    const texts = {
      'easy': 'Простая',
      'medium': 'Средняя',
      'hard': 'Сложная'
    };
    return texts[difficulty as keyof typeof texts] || difficulty;
  };

  const submitOrder = () => {
    if (orderForm.service && orderForm.name && orderForm.phone) {
      alert('Ваша заявка принята! Мы свяжемся с вами для уточнения деталей.');
      setOrderForm({
        service: '',
        name: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        description: ''
      });
    }
  };

  if (selectedService) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedService(null)}>
            <Icon name="ArrowLeft" className="mr-2" />
            Назад к услугам
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{selectedService.name}</h1>
                      <Badge variant="secondary" className="mb-2">
                        {selectedService.category}
                      </Badge>
                      <p className="text-gray-600">{selectedService.description}</p>
                    </div>
                    <Badge className={getDifficultyColor(selectedService.difficulty)}>
                      {getDifficultyText(selectedService.difficulty)}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 border rounded-lg">
                      <Icon name="DollarSign" size={32} className="mx-auto mb-2 text-green-600" />
                      <div className="font-semibold">{selectedService.price}</div>
                      <div className="text-sm text-gray-500">Стоимость</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Icon name="Clock" size={32} className="mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold">{selectedService.duration}</div>
                      <div className="text-sm text-gray-500">Время работы</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Icon name="Award" size={32} className="mx-auto mb-2 text-purple-600" />
                      <div className="font-semibold">Гарантия</div>
                      <div className="text-sm text-gray-500">1 год</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Необходимые инструменты</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.tools.map((tool, index) => (
                          <Badge key={index} variant="outline">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Этапы выполнения</h3>
                      <div className="space-y-3">
                        {selectedService.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                            </div>
                            <p className="text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Полезные советы</h3>
                      <div className="space-y-2">
                        {selectedService.tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Icon name="Lightbulb" size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                            <p className="text-gray-700">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Заказать услугу</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Выбранная услуга</Label>
                  <Input value={selectedService.name} disabled />
                </div>

                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Адрес</Label>
                  <Input
                    id="address"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Адрес выполнения работ"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="date">Дата</Label>
                    <Input
                      id="date"
                      type="date"
                      value={orderForm.date}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Время</Label>
                    <select
                      id="time"
                      value={orderForm.time}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Выберите время</option>
                      <option value="9:00">9:00</option>
                      <option value="11:00">11:00</option>
                      <option value="14:00">14:00</option>
                      <option value="16:00">16:00</option>
                      <option value="18:00">18:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Дополнительная информация</Label>
                  <Textarea
                    id="description"
                    value={orderForm.description}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Особые требования или пожелания"
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={() => {
                    setOrderForm(prev => ({ ...prev, service: selectedService.name }));
                    submitOrder();
                  }} 
                  className="w-full"
                >
                  <Icon name="Calendar" className="mr-2" />
                  Заказать услугу
                </Button>

                <div className="p-3 bg-blue-50 rounded-lg text-sm">
                  <div className="flex items-start gap-2">
                    <Icon name="Info" className="text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-blue-900 font-semibold">Стоимость: {selectedService.price}</p>
                      <p className="text-blue-700">Время выполнения: {selectedService.duration}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Услуги по установке</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Профессиональная установка и монтаж товаров с гарантией качества. 
          Опытные мастера выполнят работы быстро и надежно.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Users" size={48} className="mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold mb-2">25+</div>
            <p className="text-gray-600">Опытных мастеров</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-green-600" />
            <div className="text-3xl font-bold mb-2">1000+</div>
            <p className="text-gray-600">Выполненных работ</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Shield" size={48} className="mx-auto mb-4 text-purple-600" />
            <div className="text-3xl font-bold mb-2">1 год</div>
            <p className="text-gray-600">Гарантия на работы</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Clock" size={48} className="mx-auto mb-4 text-orange-600" />
            <div className="text-3xl font-bold mb-2">24ч</div>
            <p className="text-gray-600">Выезд мастера</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Наши услуги</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">{service.category}</Badge>
                    <Badge className={getDifficultyColor(service.difficulty)}>
                      {getDifficultyText(service.difficulty)}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                    <div className="text-sm text-gray-500">{service.duration}</div>
                  </div>
                  
                  <Button 
                    onClick={() => setSelectedService(service)}
                    className="w-full"
                  >
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Почему выбирают нас?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Icon name="Award" size={48} className="mx-auto mb-4 text-blue-600" />
              <h4 className="font-semibold mb-2">Профессионализм</h4>
              <p className="text-sm text-gray-600">Сертифицированные мастера с опытом работы от 5 лет</p>
            </div>
            <div className="text-center">
              <Icon name="Shield" size={48} className="mx-auto mb-4 text-green-600" />
              <h4 className="font-semibold mb-2">Гарантия качества</h4>
              <p className="text-sm text-gray-600">Гарантия на все виды выполненных работ</p>
            </div>
            <div className="text-center">
              <Icon name="Clock" size={48} className="mx-auto mb-4 text-purple-600" />
              <h4 className="font-semibold mb-2">Точность сроков</h4>
              <p className="text-sm text-gray-600">Выполняем работы в оговоренные сроки</p>
            </div>
            <div className="text-center">
              <Icon name="DollarSign" size={48} className="mx-auto mb-4 text-orange-600" />
              <h4 className="font-semibold mb-2">Честные цены</h4>
              <p className="text-sm text-gray-600">Прозрачное ценообразование без скрытых доплат</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Заказать услугу</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="serviceSelect">Выберите услугу</Label>
              <select
                id="serviceSelect"
                value={orderForm.service}
                onChange={(e) => setOrderForm(prev => ({ ...prev, service: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Выберите услугу</option>
                {services.map(service => (
                  <option key={service.id} value={service.name}>
                    {service.name} - {service.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="orderName">Ваше имя</Label>
                <Input
                  id="orderName"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <Label htmlFor="orderPhone">Телефон</Label>
                <Input
                  id="orderPhone"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="orderAddress">Адрес</Label>
              <Input
                id="orderAddress"
                value={orderForm.address}
                onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Адрес выполнения работ"
              />
            </div>

            <Button onClick={submitOrder} className="w-full">
              <Icon name="Phone" className="mr-2" />
              Заказать звонок мастера
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Контакты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Icon name="Phone" size={32} className="text-blue-600" />
              <div>
                <h4 className="font-semibold">Диспетчерская служба</h4>
                <p className="text-gray-600">+7 (495) 123-45-70</p>
                <p className="text-sm text-gray-500">Круглосуточно</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Icon name="MessageCircle" size={32} className="text-green-600" />
              <div>
                <h4 className="font-semibold">WhatsApp</h4>
                <p className="text-gray-600">+7 (999) 123-45-67</p>
                <p className="text-sm text-gray-500">Быстрая связь с мастером</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Icon name="Mail" size={32} className="text-purple-600" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-600">install@hoztovary.ru</p>
                <p className="text-sm text-gray-500">Для письменных заявок</p>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Gift" className="text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-900">Скидка 15%</h4>
                  <p className="text-sm text-green-700">
                    При заказе установки вместе с покупкой товара
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstallationPage;