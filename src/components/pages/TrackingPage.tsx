import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  deliveryAddress: string;
  estimatedDelivery: string;
  trackingSteps: Array<{
    status: string;
    date: string;
    time: string;
    description: string;
    completed: boolean;
  }>;
}

const TrackingPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);

  const sampleOrders: Order[] = [
    {
      id: 'ORD-2024-001234',
      date: '15.12.2024',
      status: 'shipped',
      items: [
        { name: 'Дрель Bosch PSB 500 RE', quantity: 1, price: 3299 },
        { name: 'Набор сверл', quantity: 1, price: 599 }
      ],
      total: 3898,
      deliveryAddress: 'г. Москва, ул. Ленина, д. 10, кв. 25',
      estimatedDelivery: '17.12.2024',
      trackingSteps: [
        {
          status: 'Заказ оформлен',
          date: '15.12.2024',
          time: '10:30',
          description: 'Ваш заказ принят в обработку',
          completed: true
        },
        {
          status: 'Заказ подтвержден',
          date: '15.12.2024',
          time: '11:15',
          description: 'Заказ подтвержден, товары зарезервированы',
          completed: true
        },
        {
          status: 'Заказ собран',
          date: '16.12.2024',
          time: '09:45',
          description: 'Заказ собран на складе и готов к отправке',
          completed: true
        },
        {
          status: 'Передан в доставку',
          date: '16.12.2024',
          time: '14:20',
          description: 'Заказ передан курьерской службе',
          completed: true
        },
        {
          status: 'В пути',
          date: '17.12.2024',
          time: '08:00',
          description: 'Заказ находится в пути к получателю',
          completed: false
        },
        {
          status: 'Доставлен',
          date: '17.12.2024',
          time: '',
          description: 'Заказ доставлен получателю',
          completed: false
        }
      ]
    }
  ];

  const searchOrder = () => {
    const order = sampleOrders.find(o => o.id === orderNumber);
    setFoundOrder(order || null);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'processing': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'processing': 'Обрабатывается',
      'confirmed': 'Подтвержден',
      'shipped': 'Отправлен',
      'delivered': 'Доставлен',
      'cancelled': 'Отменен'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'processing': 'Clock',
      'confirmed': 'CheckCircle',
      'shipped': 'Truck',
      'delivered': 'Package',
      'cancelled': 'XCircle'
    };
    return icons[status as keyof typeof icons] || 'Package';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Отслеживание заказа</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Следите за статусом вашего заказа в режиме реального времени. 
          Введите номер заказа для получения актуальной информации.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Поиск заказа</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="orderNumber">Номер заказа</Label>
              <Input
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="ORD-2024-001234"
                className="text-lg"
              />
            </div>
            <Button onClick={searchOrder} size="lg">
              <Icon name="Search" className="mr-2" />
              Найти заказ
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" className="text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900">Где найти номер заказа?</h4>
                <p className="text-sm text-blue-700">
                  Номер заказа указан в email-подтверждении, SMS-уведомлении 
                  или в личном кабинете на сайте.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {foundOrder ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Заказ {foundOrder.id}</CardTitle>
                  <p className="text-gray-600">от {foundOrder.date}</p>
                </div>
                <Badge className={getStatusColor(foundOrder.status)}>
                  <Icon name={getStatusIcon(foundOrder.status) as any} size={16} className="mr-2" />
                  {getStatusText(foundOrder.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Товары в заказе:</h4>
                  <div className="space-y-2">
                    {foundOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span className="font-semibold">{item.price.toLocaleString()} ₽</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Итого:</span>
                      <span>{foundOrder.total.toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Адрес доставки:</h4>
                  <p className="text-sm text-gray-600">{foundOrder.deliveryAddress}</p>
                  
                  <h4 className="font-semibold mb-2 mt-4">Ожидаемая доставка:</h4>
                  <p className="text-sm text-gray-600">{foundOrder.estimatedDelivery}</p>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Icon name="Phone" className="mr-2" />
                    Связаться с курьером
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Icon name="Edit" className="mr-2" />
                    Изменить адрес
                  </Button>
                  <Button className="w-full" variant="destructive">
                    <Icon name="X" className="mr-2" />
                    Отменить заказ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>История заказа</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {foundOrder.trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Icon 
                        name={step.completed ? 'Check' : 'Clock'} 
                        size={16} 
                        className={step.completed ? 'text-green-600' : 'text-gray-400'} 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.status}
                        </h4>
                        <div className="text-sm text-gray-500">
                          {step.date} {step.time}
                        </div>
                      </div>
                      <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : orderNumber && (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">Заказ не найден</h3>
            <p className="text-gray-500 mb-4">
              Проверьте правильность введенного номера заказа или обратитесь в службу поддержки.
            </p>
            <Button variant="outline">
              <Icon name="Phone" className="mr-2" />
              Связаться с поддержкой
            </Button>
          </CardContent>
        </Card>
      )}

      {!foundOrder && !orderNumber && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Icon name="Package" size={48} className="mx-auto mb-4 text-blue-600" />
              <h4 className="font-semibold mb-2">Быстрая обработка</h4>
              <p className="text-sm text-gray-600">
                Заказы обрабатываются в течение 2 часов в рабочее время
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Icon name="Truck" size={48} className="mx-auto mb-4 text-green-600" />
              <h4 className="font-semibold mb-2">Надежная доставка</h4>
              <p className="text-sm text-gray-600">
                Собственная служба доставки и проверенные партнеры
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Icon name="Bell" size={48} className="mx-auto mb-4 text-purple-600" />
              <h4 className="font-semibold mb-2">SMS-уведомления</h4>
              <p className="text-sm text-gray-600">
                Получайте уведомления о каждом этапе доставки
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Icon name="MapPin" size={48} className="mx-auto mb-4 text-orange-600" />
              <h4 className="font-semibold mb-2">GPS-отслеживание</h4>
              <p className="text-sm text-gray-600">
                Отслеживайте местоположение курьера в реальном времени
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Статусы заказов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Icon name="Clock" size={24} className="text-yellow-600" />
              <div>
                <h4 className="font-semibold">Обрабатывается</h4>
                <p className="text-sm text-gray-600">Заказ принят и проверяется</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Icon name="CheckCircle" size={24} className="text-blue-600" />
              <div>
                <h4 className="font-semibold">Подтвержден</h4>
                <p className="text-sm text-gray-600">Товары зарезервированы</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Icon name="Package" size={24} className="text-purple-600" />
              <div>
                <h4 className="font-semibold">Собран</h4>
                <p className="text-sm text-gray-600">Заказ готов к отправке</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Icon name="Truck" size={24} className="text-orange-600" />
              <div>
                <h4 className="font-semibold">Отправлен</h4>
                <p className="text-sm text-gray-600">Заказ передан в доставку</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Icon name="MapPin" size={24} className="text-indigo-600" />
              <div>
                <h4 className="font-semibold">В пути</h4>
                <p className="text-sm text-gray-600">Курьер направляется к вам</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Icon name="CheckCircle2" size={24} className="text-green-600" />
              <div>
                <h4 className="font-semibold">Доставлен</h4>
                <p className="text-sm text-gray-600">Заказ успешно доставлен</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Часто задаваемые вопросы о доставке</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Как долго обрабатывается заказ?</h4>
              <p className="text-sm text-gray-600">
                Заказы обрабатываются в течение 2 часов в рабочее время (9:00-18:00). 
                Заказы, оформленные после 18:00, обрабатываются на следующий день.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Можно ли изменить адрес доставки?</h4>
              <p className="text-sm text-gray-600">
                Адрес доставки можно изменить до момента передачи заказа курьеру. 
                Свяжитесь с нами по телефону +7 (495) 123-45-67.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Что делать, если товар не подошел?</h4>
              <p className="text-sm text-gray-600">
                Вы можете вернуть товар в течение 14 дней с момента получения, 
                если он не был в употреблении и сохранил товарный вид.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Как связаться с курьером?</h4>
              <p className="text-sm text-gray-600">
                Номер телефона курьера будет отправлен вам в SMS в день доставки. 
                Также вы можете связаться с диспетчерской службой.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Служба поддержки</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Icon name="Phone" size={32} className="text-blue-600" />
              <div>
                <h4 className="font-semibold">Горячая линия</h4>
                <p className="text-gray-600">+7 (495) 123-45-67</p>
                <p className="text-sm text-gray-500">Круглосуточно</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Icon name="MessageCircle" size={32} className="text-green-600" />
              <div>
                <h4 className="font-semibold">Онлайн-чат</h4>
                <p className="text-gray-600">Чат на сайте</p>
                <p className="text-sm text-gray-500">Пн-Пт: 9:00-18:00</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Icon name="Mail" size={32} className="text-purple-600" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-600">support@hoztovary.ru</p>
                <p className="text-sm text-gray-500">Ответим в течение часа</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Полезная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Truck" className="text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-900">Бесплатная доставка</h4>
                  <p className="text-sm text-green-700">
                    При заказе от 5,000 ₽ доставка по Москве бесплатно
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Clock" className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Экспресс-доставка</h4>
                  <p className="text-sm text-blue-700">
                    Доставка в день заказа за 800 ₽ (при заказе до 14:00)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" className="text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-purple-900">Самовывоз</h4>
                  <p className="text-sm text-purple-700">
                    Забрать заказ можно в нашем магазине бесплатно
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Shield" className="text-orange-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-orange-900">Страхование</h4>
                  <p className="text-sm text-orange-700">
                    Все заказы застрахованы на полную стоимость
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Для демонстрации попробуйте ввести номер заказа: <strong>ORD-2024-001234</strong>
        </p>
      </div>
    </div>
  );
};

export default TrackingPage;