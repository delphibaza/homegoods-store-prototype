import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface ReturnRequest {
  id: string;
  orderNumber: string;
  productName: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestDate: string;
  refundAmount: number;
}

const ReturnPage = () => {
  const [returnRequests] = useState<ReturnRequest[]>([
    {
      id: 'RET-2024-001',
      orderNumber: 'ORD-2024-001156',
      productName: 'Дрель Makita HP1631K',
      reason: 'Товар не подошел',
      status: 'completed',
      requestDate: '20.11.2024',
      refundAmount: 4199
    },
    {
      id: 'RET-2024-002',
      orderNumber: 'ORD-2024-001089',
      productName: 'Садовый шланг 25м',
      reason: 'Производственный брак',
      status: 'approved',
      requestDate: '25.11.2024',
      refundAmount: 1299
    }
  ]);

  const [returnForm, setReturnForm] = useState({
    orderNumber: '',
    productName: '',
    reason: '',
    description: '',
    name: '',
    email: '',
    phone: '',
    bankDetails: ''
  });

  const returnReasons = [
    'Товар не подошел',
    'Производственный брак',
    'Повреждение при доставке',
    'Не соответствует описанию',
    'Передумал покупать',
    'Другая причина'
  ];

  const returnConditions = [
    {
      icon: 'Calendar',
      title: '14 дней на возврат',
      description: 'С момента получения товара'
    },
    {
      icon: 'Package',
      title: 'Оригинальная упаковка',
      description: 'Товар должен быть в заводской упаковке'
    },
    {
      icon: 'Receipt',
      title: 'Документы',
      description: 'Чек или документ об оплате'
    },
    {
      icon: 'Eye',
      title: 'Товарный вид',
      description: 'Без следов использования'
    }
  ];

  const returnProcess = [
    {
      step: 1,
      title: 'Заявка на возврат',
      description: 'Заполните форму возврата на сайте или обратитесь по телефону',
      icon: 'FileText'
    },
    {
      step: 2,
      title: 'Рассмотрение заявки',
      description: 'Мы рассмотрим вашу заявку в течение 24 часов',
      icon: 'Search'
    },
    {
      step: 3,
      title: 'Передача товара',
      description: 'Передайте товар курьеру или привезите в магазин',
      icon: 'Truck'
    },
    {
      step: 4,
      title: 'Проверка товара',
      description: 'Специалист проверит состояние и комплектность товара',
      icon: 'CheckCircle'
    },
    {
      step: 5,
      title: 'Возврат средств',
      description: 'Деньги вернутся на ваш счет в течение 3-10 рабочих дней',
      icon: 'CreditCard'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-blue-100 text-blue-800',
      'rejected': 'bg-red-100 text-red-800',
      'completed': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'pending': 'На рассмотрении',
      'approved': 'Одобрен',
      'rejected': 'Отклонен',
      'completed': 'Завершен'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const submitReturn = () => {
    if (returnForm.orderNumber && returnForm.productName && returnForm.reason && returnForm.name && returnForm.email) {
      alert('Заявка на возврат принята! Номер заявки: RET-2024-003');
      setReturnForm({
        orderNumber: '',
        productName: '',
        reason: '',
        description: '',
        name: '',
        email: '',
        phone: '',
        bankDetails: ''
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Возврат товаров</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мы заботимся о ваших правах как покупателя. Если товар не подошел или имеет дефекты, 
          мы поможем оформить возврат быстро и без лишних вопросов.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {returnConditions.map((condition, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <Icon name={condition.icon as any} size={48} className="mx-auto mb-4 text-blue-600" />
              <h4 className="font-semibold mb-2">{condition.title}</h4>
              <p className="text-sm text-gray-600">{condition.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Оформить возврат</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="returnOrderNumber">Номер заказа</Label>
                  <Input
                    id="returnOrderNumber"
                    value={returnForm.orderNumber}
                    onChange={(e) => setReturnForm(prev => ({ ...prev, orderNumber: e.target.value }))}
                    placeholder="ORD-2024-001234"
                  />
                </div>
                <div>
                  <Label htmlFor="returnProductName">Название товара</Label>
                  <Input
                    id="returnProductName"
                    value={returnForm.productName}
                    onChange={(e) => setReturnForm(prev => ({ ...prev, productName: e.target.value }))}
                    placeholder="Точное название товара"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="returnReason">Причина возврата</Label>
                <select
                  id="returnReason"
                  value={returnForm.reason}
                  onChange={(e) => setReturnForm(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Выберите причину</option>
                  {returnReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="returnDescription">Подробное описание</Label>
                <Textarea
                  id="returnDescription"
                  value={returnForm.description}
                  onChange={(e) => setReturnForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Опишите проблему подробнее (необязательно)"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="returnName">Ваше имя</Label>
                  <Input
                    id="returnName"
                    value={returnForm.name}
                    onChange={(e) => setReturnForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <Label htmlFor="returnEmail">Email</Label>
                  <Input
                    id="returnEmail"
                    type="email"
                    value={returnForm.email}
                    onChange={(e) => setReturnForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="returnPhone">Телефон</Label>
                  <Input
                    id="returnPhone"
                    value={returnForm.phone}
                    onChange={(e) => setReturnForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bankDetails">Реквизиты для возврата (если оплата была картой)</Label>
                <Input
                  id="bankDetails"
                  value={returnForm.bankDetails}
                  onChange={(e) => setReturnForm(prev => ({ ...prev, bankDetails: e.target.value }))}
                  placeholder="Номер карты или банковские реквизиты"
                />
              </div>

              <Button onClick={submitReturn} className="w-full">
                <Icon name="RotateCcw" className="mr-2" />
                Оформить возврат
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Мои возвраты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {returnRequests.map(request => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{request.id}</h4>
                        <p className="text-sm text-gray-600">{request.productName}</p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusText(request.status)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Заказ:</span>
                        <span className="font-semibold">{request.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Причина:</span>
                        <span>{request.reason}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Дата заявки:</span>
                        <span>{request.requestDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Сумма возврата:</span>
                        <span className="font-semibold">{request.refundAmount.toLocaleString()} ₽</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Способы возврата товара</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Truck" size={24} className="text-blue-600" />
                  <h4 className="font-semibold">Курьером</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Курьер заберет товар по вашему адресу бесплатно
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="MapPin" size={24} className="text-green-600" />
                  <h4 className="font-semibold">В магазине</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Принесите товар в наш магазин по адресу: ул. Строительная, д. 10
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Package" size={24} className="text-purple-600" />
                  <h4 className="font-semibold">Почтой</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Отправьте товар почтой (стоимость доставки компенсируем)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Процесс возврата товара</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-6">
            {returnProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={step.icon as any} size={24} className="text-blue-600" />
                </div>
                <div className="text-sm font-semibold text-blue-600 mb-2">Шаг {step.step}</div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Что можно вернуть?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-green-900">✅ Подлежит возврату:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                    <span>Инструменты в оригинальной упаковке</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                    <span>Сантехника без следов установки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                    <span>Садовый инвентарь без использования</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                    <span>Товары с производственным браком</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                    <span>Неиспользованные расходные материалы</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Что нельзя вернуть?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-red-900">❌ Не подлежит возврату:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                    <span>Товары, изготовленные по индивидуальному заказу</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                    <span>Использованные расходные материалы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                    <span>Товары с нарушенной упаковкой</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                    <span>Электроинструменты со следами использования</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                    <span>Товары без документов об оплате</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Сроки возврата денежных средств</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <Icon name="CreditCard" size={32} className="mx-auto mb-3 text-blue-600" />
              <h4 className="font-semibold">Банковская карта</h4>
              <p className="text-2xl font-bold text-blue-600">3-5 дней</p>
              <p className="text-sm text-gray-600">Рабочих дней</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="Banknote" size={32} className="mx-auto mb-3 text-green-600" />
              <h4 className="font-semibold">Наличные</h4>
              <p className="text-2xl font-bold text-green-600">В день</p>
              <p className="text-sm text-gray-600">Возврата товара</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="Building" size={32} className="mx-auto mb-3 text-purple-600" />
              <h4 className="font-semibold">Безналичный расчет</h4>
              <p className="text-2xl font-bold text-purple-600">5-10 дней</p>
              <p className="text-sm text-gray-600">Рабочих дней</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Часто задаваемые вопросы о возврате</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Можно ли вернуть товар без чека?</h4>
              <p className="text-sm text-gray-600">
                Да, если у вас есть номер заказа или другие документы, подтверждающие покупку. 
                Мы можем найти информацию о покупке в нашей системе.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Что делать, если товар сломался через неделю?</h4>
              <p className="text-sm text-gray-600">
                Если товар сломался в течение гарантийного срока, это гарантийный случай. 
                Обратитесь в службу гарантийного обслуживания.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Можно ли обменять товар на другой?</h4>
              <p className="text-sm text-gray-600">
                Да, вы можете обменять товар на аналогичный другого размера, цвета или модели 
                при наличии такого товара в магазине.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Кто оплачивает доставку при возврате?</h4>
              <p className="text-sm text-gray-600">
                Если причина возврата - брак или наша ошибка, доставку оплачиваем мы. 
                В остальных случаях - покупатель, но мы можем компенсировать расходы.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Нужна помощь с возвратом?</h3>
        <p className="text-gray-600 mb-6">
          Наши специалисты помогут вам оформить возврат и ответят на все вопросы.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Icon name="Phone" className="mr-2" />
            Позвонить в поддержку
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="MessageCircle" className="mr-2" />
            Написать в чат
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReturnPage;