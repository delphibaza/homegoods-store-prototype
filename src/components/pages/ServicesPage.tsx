import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const ServicesPage = () => {
  const services = [
    {
      icon: 'Wrench',
      title: 'Монтаж сантехники',
      description: 'Профессиональная установка смесителей, унитазов, душевых кабин',
      price: 'от 1,500 ₽',
      features: ['Гарантия на работы', 'Опытные мастера', 'Качественные материалы'],
      popular: true
    },
    {
      icon: 'Zap',
      title: 'Электромонтажные работы',
      description: 'Установка розеток, выключателей, подключение электроприборов',
      price: 'от 800 ₽',
      features: ['Соблюдение ПУЭ', 'Сертифицированные электрики', 'Гарантия 2 года']
    },
    {
      icon: 'Hammer',
      title: 'Мелкий ремонт',
      description: 'Сборка мебели, навешивание полок, мелкие строительные работы',
      price: 'от 500 ₽',
      features: ['Быстрое выполнение', 'Свои инструменты', 'Уборка после работ']
    },
    {
      icon: 'Paintbrush',
      title: 'Отделочные работы',
      description: 'Покраска, поклейка обоев, укладка плитки',
      price: 'от 300 ₽/м²',
      features: ['Качественные материалы', 'Ровные поверхности', 'Гарантия результата']
    },
    {
      icon: 'Truck',
      title: 'Доставка и подъем',
      description: 'Доставка крупногабаритных товаров с подъемом на этаж',
      price: 'от 200 ₽',
      features: ['Аккуратная доставка', 'Подъем без лифта', 'Страхование груза']
    },
    {
      icon: 'Users',
      title: 'Консультации',
      description: 'Помощь в выборе материалов и инструментов',
      price: 'Бесплатно',
      features: ['Опытные консультанты', 'Индивидуальный подход', 'Расчет материалов']
    }
  ];

  const advantages = [
    {
      icon: 'Award',
      title: 'Опытные мастера',
      description: 'Все специалисты имеют профильное образование и опыт работы от 5 лет'
    },
    {
      icon: 'Shield',
      title: 'Гарантия качества',
      description: 'Предоставляем гарантию на все виды выполненных работ'
    },
    {
      icon: 'Clock',
      title: 'Соблюдение сроков',
      description: 'Выполняем работы точно в оговоренные сроки'
    },
    {
      icon: 'DollarSign',
      title: 'Честные цены',
      description: 'Прозрачное ценообразование без скрытых доплат'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Заявка',
      description: 'Оставьте заявку по телефону или на сайте'
    },
    {
      step: 2,
      title: 'Консультация',
      description: 'Наш специалист свяжется с вами для уточнения деталей'
    },
    {
      step: 3,
      title: 'Выезд мастера',
      description: 'Мастер приедет в удобное для вас время'
    },
    {
      step: 4,
      title: 'Выполнение работ',
      description: 'Качественное выполнение работ с гарантией'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Наши услуги</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Помимо продажи товаров, мы предоставляем широкий спектр услуг 
          по монтажу, установке и ремонту. Доверьте работу профессионалам!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className={`hover:shadow-lg transition-shadow ${service.popular ? 'ring-2 ring-blue-500' : ''}`}>
            <CardHeader className="text-center">
              {service.popular && (
                <Badge className="absolute top-4 right-4 bg-blue-500">
                  Популярно
                </Badge>
              )}
              <Icon name={service.icon as any} size={48} className="mx-auto mb-4 text-blue-600" />
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <p className="text-sm text-gray-600">{service.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{service.price}</div>
              </div>
              
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full">
                Заказать услугу
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Как мы работаем</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">{item.step}</span>
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {advantages.map((advantage, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <Icon name={advantage.icon as any} size={48} className="mx-auto mb-4 text-blue-600" />
              <h4 className="font-semibold mb-2">{advantage.title}</h4>
              <p className="text-sm text-gray-600">{advantage.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Прайс-лист основных услуг</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border-b">
                <span>Установка смесителя</span>
                <span className="font-semibold">1,500 ₽</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b">
                <span>Установка унитаза</span>
                <span className="font-semibold">2,500 ₽</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b">
                <span>Установка розетки</span>
                <span className="font-semibold">800 ₽</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b">
                <span>Сборка мебели (за час)</span>
                <span className="font-semibold">1,200 ₽</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b">
                <span>Навешивание полки</span>
                <span className="font-semibold">500 ₽</span>
              </div>
              <div className="flex justify-between items-center p-3">
                <span>Укладка плитки (м²)</span>
                <span className="font-semibold">от 800 ₽</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Точная стоимость</h4>
                  <p className="text-sm text-blue-700">
                    Окончательная стоимость работ определяется после осмотра объекта мастером.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Заказать услугу</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Phone" size={32} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">По телефону</h4>
                  <p className="text-gray-600">+7 (495) 123-45-67</p>
                  <p className="text-sm text-gray-500">Пн-Пт: 9:00-19:00</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="MessageCircle" size={32} className="text-green-600" />
                <div>
                  <h4 className="font-semibold">Онлайн-заявка</h4>
                  <p className="text-gray-600">Форма на сайте</p>
                  <p className="text-sm text-gray-500">Ответим в течение часа</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="MapPin" size={32} className="text-purple-600" />
                <div>
                  <h4 className="font-semibold">В магазине</h4>
                  <p className="text-gray-600">ул. Строительная, д. 10</p>
                  <p className="text-sm text-gray-500">Консультация бесплатно</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <Icon name="Phone" className="mr-2" />
                Заказать звонок
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Icon name="Calculator" className="mr-2" />
                Рассчитать стоимость
              </Button>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Gift" className="text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-900">Скидка 10%</h4>
                  <p className="text-sm text-green-700">
                    При заказе услуги вместе с покупкой товаров на сумму от 10,000 ₽
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

export default ServicesPage;