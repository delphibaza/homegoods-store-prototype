import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const CorporatePage = () => {
  const services = [
    {
      icon: 'Building',
      title: 'Комплексные поставки',
      description: 'Полное обеспечение строительных объектов всеми необходимыми материалами',
      features: ['Индивидуальные цены', 'Гибкие условия оплаты', 'Логистическая поддержка']
    },
    {
      icon: 'Truck',
      title: 'Логистические решения',
      description: 'Организация доставки материалов на объекты в нужное время',
      features: ['Доставка точно в срок', 'Разгрузка на объекте', 'Отслеживание поставок']
    },
    {
      icon: 'FileText',
      title: 'Документооборот',
      description: 'Полный пакет документов для юридических лиц',
      features: ['Договоры поставки', 'Счета-фактуры', 'Акты выполненных работ']
    },
    {
      icon: 'Users',
      title: 'Персональный менеджер',
      description: 'Индивидуальное сопровождение крупных клиентов',
      features: ['Личный менеджер', 'Консультации 24/7', 'Приоритетное обслуживание']
    }
  ];

  const advantages = [
    {
      icon: 'Percent',
      title: 'Оптовые скидки',
      description: 'Скидки до 15% при объеме закупок от 500,000 ₽ в месяц',
      value: 'до 15%'
    },
    {
      icon: 'Calendar',
      title: 'Отсрочка платежа',
      description: 'Гибкие условия оплаты для постоянных клиентов',
      value: 'до 30 дней'
    },
    {
      icon: 'Award',
      title: 'Качественные товары',
      description: 'Только сертифицированная продукция от проверенных поставщиков',
      value: '100%'
    },
    {
      icon: 'Clock',
      title: 'Быстрая доставка',
      description: 'Доставка по Москве и области в течение 24 часов',
      value: '24 часа'
    }
  ];

  const clients = [
    {
      name: 'ООО "СтройМонтаж"',
      industry: 'Строительство',
      cooperation: '2018',
      volume: '2.5 млн ₽/год'
    },
    {
      name: 'ЗАО "РемСервис"',
      industry: 'Ремонтные работы',
      cooperation: '2019',
      volume: '1.8 млн ₽/год'
    },
    {
      name: 'ИП Петров А.В.',
      industry: 'Сантехнические работы',
      cooperation: '2020',
      volume: '800 тыс ₽/год'
    },
    {
      name: 'ООО "ДомСтрой"',
      industry: 'Жилищное строительство',
      cooperation: '2017',
      volume: '3.2 млн ₽/год'
    }
  ];

  const discountTiers = [
    { volume: 'от 100,000 ₽', discount: '3%', color: 'bg-blue-100 text-blue-800' },
    { volume: 'от 300,000 ₽', discount: '5%', color: 'bg-green-100 text-green-800' },
    { volume: 'от 500,000 ₽', discount: '8%', color: 'bg-orange-100 text-orange-800' },
    { volume: 'от 1,000,000 ₽', discount: '12%', color: 'bg-purple-100 text-purple-800' },
    { volume: 'от 2,000,000 ₽', discount: '15%', color: 'bg-red-100 text-red-800' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Корпоративным клиентам</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Специальные условия для юридических лиц, строительных компаний и оптовых покупателей. 
          Индивидуальный подход к каждому клиенту.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {advantages.map((advantage, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Icon name={advantage.icon as any} size={48} className="mx-auto mb-4 text-blue-600" />
              <div className="text-3xl font-bold mb-2 text-blue-600">{advantage.value}</div>
              <h4 className="font-semibold mb-2">{advantage.title}</h4>
              <p className="text-sm text-gray-600">{advantage.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Наши услуги для бизнеса</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Icon name={service.icon as any} size={48} className="text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-3">Преимущества:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-green-600" />
                      <span className="text-sm">{feature}</span>
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
          <CardTitle>Система скидок для корпоративных клиентов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {discountTiers.map((tier, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Объем закупок {tier.volume}</div>
                    <div className="text-sm text-gray-600">в месяц</div>
                  </div>
                </div>
                <Badge className={tier.color}>
                  Скидка {tier.discount}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Gift" className="text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-green-900">Дополнительные бонусы</h4>
                <p className="text-sm text-green-700">
                  Постоянные клиенты получают дополнительные скидки на услуги монтажа, 
                  бесплатную доставку и приоритетное обслуживание.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Наши корпоративные клиенты</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clients.map((client, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Icon name="Building" size={24} className="text-gray-500" />
                </div>
                <h4 className="font-semibold mb-1">{client.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{client.industry}</p>
                <div className="text-xs text-gray-500">
                  <p>Сотрудничаем с {client.cooperation}</p>
                  <p>Оборот: {client.volume}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Стать корпоративным клиентом</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">Название организации</Label>
              <Input
                id="companyName"
                placeholder="ООО 'Ваша компания'"
              />
            </div>
            
            <div>
              <Label htmlFor="inn">ИНН</Label>
              <Input
                id="inn"
                placeholder="1234567890"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPerson">Контактное лицо</Label>
                <Input
                  id="contactPerson"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <Label htmlFor="position">Должность</Label>
                <Input
                  id="position"
                  placeholder="Генеральный директор"
                />
              </div>
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
              <Label htmlFor="monthlyVolume">Планируемый месячный объем закупок</Label>
              <select
                id="monthlyVolume"
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Выберите объем</option>
                <option value="100000">100,000 - 300,000 ₽</option>
                <option value="300000">300,000 - 500,000 ₽</option>
                <option value="500000">500,000 - 1,000,000 ₽</option>
                <option value="1000000">Более 1,000,000 ₽</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="needs">Основные потребности</Label>
              <Textarea
                id="needs"
                placeholder="Опишите, какие товары и услуги вас интересуют"
                rows={3}
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
            <CardTitle>Контакты отдела корпоративных продаж</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="User" size={32} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Анна Козлова</h4>
                  <p className="text-gray-600">Менеджер корпоративных продаж</p>
                  <p className="text-sm text-gray-500">Опыт работы: 7 лет</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Phone" size={32} className="text-green-600" />
                <div>
                  <h4 className="font-semibold">+7 (495) 123-45-71</h4>
                  <p className="text-gray-600">Прямой номер</p>
                  <p className="text-sm text-gray-500">Пн-Пт: 9:00-19:00</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Mail" size={32} className="text-purple-600" />
                <div>
                  <h4 className="font-semibold">corporate@hoztovary.ru</h4>
                  <p className="text-gray-600">Email для корпоративных клиентов</p>
                  <p className="text-sm text-gray-500">Ответим в течение 2 часов</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Handshake" className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Индивидуальный подход</h4>
                  <p className="text-sm text-blue-700">
                    Мы готовы обсудить особые условия сотрудничества 
                    для крупных и постоянных клиентов.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Процесс сотрудничества</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="FileText" size={24} className="text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">1. Заявка</h4>
              <p className="text-sm text-gray-600">Подача заявки на сотрудничество</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} className="text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">2. Встреча</h4>
              <p className="text-sm text-gray-600">Личная встреча с менеджером</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Calculator" size={24} className="text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">3. Расчет</h4>
              <p className="text-sm text-gray-600">Индивидуальный расчет условий</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="FileSignature" size={24} className="text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">4. Договор</h4>
              <p className="text-sm text-gray-600">Подписание договора поставки</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={24} className="text-red-600" />
              </div>
              <h4 className="font-semibold mb-2">5. Поставки</h4>
              <p className="text-sm text-gray-600">Регулярные поставки товаров</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Система скидок</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {discountTiers.map((tier, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-semibold">Объем закупок {tier.volume}</div>
                    <div className="text-sm text-gray-600">в месяц</div>
                  </div>
                  <Badge className={tier.color}>
                    Скидка {tier.discount}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Star" className="text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-yellow-900">VIP-клиенты</h4>
                  <p className="text-sm text-yellow-700">
                    Для клиентов с оборотом свыше 5 млн ₽ в год - 
                    индивидуальные условия и максимальные скидки.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Документы для сотрудничества</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Icon name="FileText" size={24} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Карточка предприятия</h4>
                  <p className="text-sm text-gray-600">Анкета с реквизитами компании</p>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} />
                </Button>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Icon name="FileCheck" size={24} className="text-green-600" />
                <div>
                  <h4 className="font-semibold">Договор поставки</h4>
                  <p className="text-sm text-gray-600">Типовой договор для юридических лиц</p>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} />
                </Button>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Icon name="Shield" size={24} className="text-purple-600" />
                <div>
                  <h4 className="font-semibold">Сертификаты качества</h4>
                  <p className="text-sm text-gray-600">Документы на продукцию</p>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Быстрое оформление</h4>
                  <p className="text-sm text-blue-700">
                    Подготовим все документы в течение 1 рабочего дня 
                    после получения ваших реквизитов.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Готовы начать сотрудничество?</h3>
        <p className="text-gray-600 mb-6">
          Свяжитесь с нами для обсуждения индивидуальных условий и получения коммерческого предложения.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Icon name="Phone" className="mr-2" />
            Позвонить менеджеру
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="Mail" className="mr-2" />
            Написать письмо
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="Calendar" className="mr-2" />
            Назначить встречу
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CorporatePage;