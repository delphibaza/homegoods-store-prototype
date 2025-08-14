import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const DeliveryPage = () => {
  const deliveryOptions = [
    {
      icon: 'Truck',
      title: 'Курьерская доставка',
      description: 'Доставка по Москве и области',
      price: 'от 300 ₽',
      time: '1-2 дня',
      features: ['Доставка до двери', 'Подъем на этаж', 'Звонок за час']
    },
    {
      icon: 'MapPin',
      title: 'Самовывоз',
      description: 'Забрать из нашего магазина',
      price: 'Бесплатно',
      time: 'В день заказа',
      features: ['Бесплатная упаковка', 'Помощь с погрузкой', 'Парковка у магазина']
    },
    {
      icon: 'Package',
      title: 'Почта России',
      description: 'Доставка в регионы',
      price: 'от 200 ₽',
      time: '3-7 дней',
      features: ['Доставка до отделения', 'Страхование груза', 'Отслеживание посылки']
    },
    {
      icon: 'Zap',
      title: 'Экспресс-доставка',
      description: 'Срочная доставка по Москве',
      price: 'от 800 ₽',
      time: '2-4 часа',
      features: ['В день заказа', 'Точное время', 'SMS уведомления']
    }
  ];

  const zones = [
    { zone: 'МКАД', price: '300 ₽', time: '1 день' },
    { zone: 'До 10 км от МКАД', price: '400 ₽', time: '1-2 дня' },
    { zone: 'До 30 км от МКАД', price: '600 ₽', time: '1-2 дня' },
    { zone: 'До 50 км от МКАД', price: '800 ₽', time: '2-3 дня' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Доставка и оплата</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мы предлагаем различные способы доставки для вашего удобства. 
          Выберите наиболее подходящий вариант.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deliveryOptions.map((option, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Icon name={option.icon as any} size={48} className="mx-auto mb-4 text-blue-600" />
              <CardTitle className="text-lg">{option.title}</CardTitle>
              <p className="text-sm text-gray-600">{option.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{option.price}</div>
                <div className="text-sm text-gray-500">{option.time}</div>
              </div>
              <div className="space-y-2">
                {option.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Зоны доставки по Москве и области</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {zones.map((zone, index) => (
                <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <div className="font-semibold">{zone.zone}</div>
                    <div className="text-sm text-gray-500">Срок: {zone.time}</div>
                  </div>
                  <Badge variant="outline" className="text-lg">
                    {zone.price}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Бесплатная доставка</h4>
                  <p className="text-sm text-blue-700">
                    При заказе от 5,000 ₽ доставка по Москве бесплатно!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Способы оплаты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="CreditCard" size={32} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Банковской картой</h4>
                  <p className="text-sm text-gray-600">Visa, MasterCard, МИР</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Banknote" size={32} className="text-green-600" />
                <div>
                  <h4 className="font-semibold">Наличными</h4>
                  <p className="text-sm text-gray-600">При получении товара</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Building" size={32} className="text-purple-600" />
                <div>
                  <h4 className="font-semibold">Безналичный расчет</h4>
                  <p className="text-sm text-gray-600">Для юридических лиц</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Smartphone" size={32} className="text-orange-600" />
                <div>
                  <h4 className="font-semibold">Электронные кошельки</h4>
                  <p className="text-sm text-gray-600">ЮMoney, QIWI, WebMoney</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Shield" className="text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-900">Безопасность платежей</h4>
                  <p className="text-sm text-green-700">
                    Все платежи защищены SSL-шифрованием. Мы не храним данные ваших карт.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Условия доставки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Общие условия:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="Dot" size={16} className="mt-1" />
                  <span>Доставка осуществляется в рабочие дни с 9:00 до 18:00</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Dot" size={16} className="mt-1" />
                  <span>Курьер звонит за час до доставки</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Dot" size={16} className="mt-1" />
                  <span>Возможна доставка в выходные дни (доплата 200 ₽)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Dot" size={16} className="mt-1" />
                  <span>Подъем на этаж включен в стоимость доставки</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Крупногабаритные товары:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="Dot" size={16} className="mt-1" />
                  <span>Доставка рассчитывается индивидуально</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Dot" size={16} className="mt-1" />
                  <span>Возможна доставка манипулятором</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Dot" size={16} className="mt-1" />
                  <span>Предварительное согласование времени</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Dot" size={16} className="mt-1" />
                  <span>Помощь с разгрузкой и заносом</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button size="lg" className="mr-4">
          <Icon name="Phone" className="mr-2" />
          Связаться с нами
        </Button>
        <Button variant="outline" size="lg">
          <Icon name="Calculator" className="mr-2" />
          Рассчитать доставку
        </Button>
      </div>
    </div>
  );
};

export default DeliveryPage;