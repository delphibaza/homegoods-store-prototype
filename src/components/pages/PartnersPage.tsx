import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const PartnersPage = () => {
  const partners = [
    {
      id: 1,
      name: 'Bosch',
      logo: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      category: 'Инструменты',
      description: 'Официальный дилер немецких электроинструментов',
      partnership: '2015',
      status: 'Премиум партнер'
    },
    {
      id: 2,
      name: 'Grohe',
      logo: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      category: 'Сантехника',
      description: 'Эксклюзивный представитель премиальной сантехники',
      partnership: '2017',
      status: 'Эксклюзивный дилер'
    },
    {
      id: 3,
      name: 'Makita',
      logo: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      category: 'Инструменты',
      description: 'Авторизованный дилер японских инструментов',
      partnership: '2016',
      status: 'Авторизованный дилер'
    },
    {
      id: 4,
      name: 'Karcher',
      logo: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      category: 'Уборка',
      description: 'Официальный партнер по технике для уборки',
      partnership: '2018',
      status: 'Официальный партнер'
    },
    {
      id: 5,
      name: 'Gardena',
      logo: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      category: 'Садовые товары',
      description: 'Дистрибьютор садовой техники и инструментов',
      partnership: '2019',
      status: 'Дистрибьютор'
    },
    {
      id: 6,
      name: 'Stanley',
      logo: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      category: 'Инструменты',
      description: 'Региональный представитель ручных инструментов',
      partnership: '2020',
      status: 'Региональный партнер'
    }
  ];

  const partnershipTypes = [
    {
      icon: 'Store',
      title: 'Розничное партнерство',
      description: 'Сотрудничество с розничными магазинами и торговыми сетями',
      benefits: ['Выгодные условия закупки', 'Маркетинговая поддержка', 'Обучение персонала']
    },
    {
      icon: 'Building',
      title: 'Оптовое сотрудничество',
      description: 'Партнерство с оптовыми компаниями и дистрибьюторами',
      benefits: ['Специальные цены', 'Гибкие условия оплаты', 'Логистическая поддержка']
    },
    {
      icon: 'Truck',
      title: 'Поставщики',
      description: 'Сотрудничество с производителями и импортерами',
      benefits: ['Прямые поставки', 'Эксклюзивные условия', 'Совместные акции']
    },
    {
      icon: 'Users',
      title: 'Франчайзинг',
      description: 'Развитие сети партнерских магазинов под нашим брендом',
      benefits: ['Готовая бизнес-модель', 'Поддержка на всех этапах', 'Узнаваемый бренд']
    }
  ];

  const advantages = [
    {
      icon: 'TrendingUp',
      title: 'Рост продаж',
      description: 'Увеличение оборота на 25-40% в первый год сотрудничества'
    },
    {
      icon: 'Shield',
      title: 'Надежность',
      description: '15 лет успешной работы на рынке хозяйственных товаров'
    },
    {
      icon: 'Award',
      title: 'Качество',
      description: 'Работаем только с проверенными брендами и поставщиками'
    },
    {
      icon: 'Headphones',
      title: 'Поддержка 24/7',
      description: 'Круглосуточная техническая и консультационная поддержка'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Премиум партнер': 'bg-yellow-100 text-yellow-800',
      'Эксклюзивный дилер': 'bg-purple-100 text-purple-800',
      'Авторизованный дилер': 'bg-blue-100 text-blue-800',
      'Официальный партнер': 'bg-green-100 text-green-800',
      'Дистрибьютор': 'bg-orange-100 text-orange-800',
      'Региональный партнер': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Партнерство</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мы строим долгосрочные отношения с надежными партнерами для взаимного развития 
          и достижения общих целей в сфере торговли хозяйственными товарами.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Handshake" size={48} className="mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold mb-2">50+</div>
            <p className="text-gray-600">Активных партнеров</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Globe" size={48} className="mx-auto mb-4 text-green-600" />
            <div className="text-3xl font-bold mb-2">15</div>
            <p className="text-gray-600">Стран-поставщиков</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="TrendingUp" size={48} className="mx-auto mb-4 text-purple-600" />
            <div className="text-3xl font-bold mb-2">25%</div>
            <p className="text-gray-600">Рост продаж партнеров</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 text-orange-600" />
            <div className="text-3xl font-bold mb-2">15</div>
            <p className="text-gray-600">Лет опыта</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Наши ключевые партнеры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map(partner => (
              <div key={partner.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{partner.name}</h4>
                    <p className="text-sm text-gray-600">{partner.category}</p>
                  </div>
                </div>
                
                <Badge className={getStatusColor(partner.status)} variant="secondary">
                  {partner.status}
                </Badge>
                
                <p className="text-sm text-gray-700 mt-3 mb-4">{partner.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Партнеры с {partner.partnership}</span>
                  <Button variant="outline" size="sm">
                    Подробнее
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Виды партнерства</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {partnershipTypes.map((type, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Icon name={type.icon as any} size={48} className="text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                    <p className="text-gray-600">{type.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-3">Преимущества:</h4>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-green-600" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Почему выбирают нас?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <Icon name={advantage.icon as any} size={48} className="mx-auto mb-4 text-blue-600" />
                <h4 className="font-semibold mb-2">{advantage.title}</h4>
                <p className="text-sm text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Стать партнером</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">Название компании</Label>
              <Input
                id="companyName"
                placeholder="ООО 'Ваша компания'"
              />
            </div>
            
            <div>
              <Label htmlFor="contactPerson">Контактное лицо</Label>
              <Input
                id="contactPerson"
                placeholder="Иван Иванов"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="info@company.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="partnershipType">Тип партнерства</Label>
              <select
                id="partnershipType"
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Выберите тип партнерства</option>
                <option value="retail">Розничное партнерство</option>
                <option value="wholesale">Оптовое сотрудничество</option>
                <option value="supplier">Поставщик</option>
                <option value="franchise">Франчайзинг</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="message">Сообщение</Label>
              <Textarea
                id="message"
                placeholder="Расскажите о вашей компании и планах сотрудничества"
                rows={4}
              />
            </div>
            
            <Button className="w-full">
              <Icon name="Send" className="mr-2" />
              Отправить заявку
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Контакты отдела партнерства</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="User" size={32} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Дмитрий Козлов</h4>
                  <p className="text-gray-600">Менеджер по партнерству</p>
                  <p className="text-sm text-gray-500">Опыт работы: 8 лет</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Phone" size={32} className="text-green-600" />
                <div>
                  <h4 className="font-semibold">+7 (495) 123-45-69</h4>
                  <p className="text-gray-600">Прямой номер</p>
                  <p className="text-sm text-gray-500">Пн-Пт: 9:00-18:00</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Mail" size={32} className="text-purple-600" />
                <div>
                  <h4 className="font-semibold">partners@hoztovary.ru</h4>
                  <p className="text-gray-600">Email для партнеров</p>
                  <p className="text-sm text-gray-500">Ответим в течение 24 часов</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Быстрый старт</h4>
                  <p className="text-sm text-blue-700">
                    Заполните заявку, и мы свяжемся с вами в течение 24 часов 
                    для обсуждения условий сотрудничества.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Этапы сотрудничества</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Заявка</h4>
              <p className="text-sm text-gray-600">
                Подача заявки на партнерство через форму или по телефону
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Анализ</h4>
              <p className="text-sm text-gray-600">
                Изучение вашей компании и определение возможностей сотрудничества
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Переговоры</h4>
              <p className="text-sm text-gray-600">
                Обсуждение условий сотрудничества и подписание договора
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h4 className="font-semibold mb-2">Запуск</h4>
              <p className="text-sm text-gray-600">
                Начало сотрудничества и поддержка на всех этапах
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnersPage;