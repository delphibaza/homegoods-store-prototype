import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  created: string;
  lastUpdate: string;
  description: string;
}

const SupportPage = () => {
  const [tickets] = useState<SupportTicket[]>([
    {
      id: 'TICK-2024-001',
      subject: 'Проблема с доставкой заказа',
      status: 'in-progress',
      priority: 'high',
      category: 'Доставка',
      created: '15.12.2024',
      lastUpdate: '16.12.2024',
      description: 'Заказ не был доставлен в указанное время'
    },
    {
      id: 'TICK-2024-002',
      subject: 'Вопрос по гарантии на дрель',
      status: 'resolved',
      priority: 'medium',
      category: 'Гарантия',
      created: '10.12.2024',
      lastUpdate: '12.12.2024',
      description: 'Нужна информация о гарантийном обслуживании'
    },
    {
      id: 'TICK-2024-003',
      subject: 'Возврат товара',
      status: 'closed',
      priority: 'low',
      category: 'Возврат',
      created: '05.12.2024',
      lastUpdate: '08.12.2024',
      description: 'Товар не подошел по размеру'
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: '',
    name: '',
    email: '',
    phone: '',
    orderNumber: ''
  });

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const supportChannels = [
    {
      icon: 'Phone',
      title: 'Телефон',
      description: 'Горячая линия поддержки',
      contact: '+7 (495) 123-45-67',
      availability: 'Круглосуточно',
      responseTime: 'Мгновенно',
      color: 'text-blue-600'
    },
    {
      icon: 'MessageCircle',
      title: 'Онлайн-чат',
      description: 'Чат с оператором на сайте',
      contact: 'Кнопка чата на сайте',
      availability: 'Пн-Пт: 9:00-18:00',
      responseTime: '1-2 минуты',
      color: 'text-green-600'
    },
    {
      icon: 'Mail',
      title: 'Email',
      description: 'Письменное обращение',
      contact: 'support@hoztovary.ru',
      availability: '24/7',
      responseTime: 'До 2 часов',
      color: 'text-purple-600'
    },
    {
      icon: 'FileText',
      title: 'Тикет-система',
      description: 'Создание заявки в системе',
      contact: 'Форма на сайте',
      availability: '24/7',
      responseTime: 'До 4 часов',
      color: 'text-orange-600'
    }
  ];

  const faqCategories = [
    {
      category: 'Заказы',
      questions: [
        'Как оформить заказ?',
        'Можно ли изменить заказ?',
        'Как отменить заказ?'
      ]
    },
    {
      category: 'Доставка',
      questions: [
        'Сколько стоит доставка?',
        'Когда привезут заказ?',
        'Можно ли изменить адрес?'
      ]
    },
    {
      category: 'Оплата',
      questions: [
        'Какие способы оплаты?',
        'Безопасна ли оплата картой?',
        'Можно ли оплатить частями?'
      ]
    },
    {
      category: 'Возврат',
      questions: [
        'Как вернуть товар?',
        'Сроки возврата',
        'Возврат денег'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'open': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'open': 'Открыт',
      'in-progress': 'В работе',
      'resolved': 'Решен',
      'closed': 'Закрыт'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getPriorityText = (priority: string) => {
    const texts = {
      'low': 'Низкий',
      'medium': 'Средний',
      'high': 'Высокий',
      'urgent': 'Срочный'
    };
    return texts[priority as keyof typeof texts] || priority;
  };

  const submitTicket = () => {
    if (newTicket.subject && newTicket.description && newTicket.name && newTicket.email) {
      alert('Ваше обращение принято! Номер тикета: TICK-2024-004');
      setNewTicket({
        subject: '',
        category: '',
        priority: 'medium',
        description: '',
        name: '',
        email: '',
        phone: '',
        orderNumber: ''
      });
    }
  };

  if (selectedTicket) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedTicket(null)}>
            <Icon name="ArrowLeft" className="mr-2" />
            Назад к обращениям
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Тикет {selectedTicket.id}</CardTitle>
                <p className="text-gray-600">{selectedTicket.subject}</p>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(selectedTicket.status)}>
                  {getStatusText(selectedTicket.status)}
                </Badge>
                <Badge className={getPriorityColor(selectedTicket.priority)}>
                  {getPriorityText(selectedTicket.priority)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Детали обращения:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Категория:</span>
                    <span className="font-semibold">{selectedTicket.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Создано:</span>
                    <span className="font-semibold">{selectedTicket.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Последнее обновление:</span>
                    <span className="font-semibold">{selectedTicket.lastUpdate}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Описание проблемы:</h4>
                <p className="text-gray-700">{selectedTicket.description}</p>
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
        <h1 className="text-4xl font-bold mb-4">Служба поддержки</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мы готовы помочь вам решить любые вопросы. Выберите удобный способ связи 
          или создайте обращение в нашей системе поддержки.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportChannels.map((channel, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Icon name={channel.icon as any} size={48} className={`mx-auto mb-4 ${channel.color}`} />
              <h3 className="font-semibold mb-2">{channel.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p><strong>Контакт:</strong> {channel.contact}</p>
                <p><strong>Время работы:</strong> {channel.availability}</p>
                <p><strong>Ответ:</strong> {channel.responseTime}</p>
              </div>
              <Button className="w-full mt-4" size="sm">
                Связаться
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Создать обращение</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ticketSubject">Тема обращения</Label>
                  <Input
                    id="ticketSubject"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Кратко опишите проблему"
                  />
                </div>
                <div>
                  <Label htmlFor="ticketCategory">Категория</Label>
                  <select
                    id="ticketCategory"
                    value={newTicket.category}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Выберите категорию</option>
                    <option value="Заказы">Заказы</option>
                    <option value="Доставка">Доставка</option>
                    <option value="Оплата">Оплата</option>
                    <option value="Возврат">Возврат</option>
                    <option value="Гарантия">Гарантия</option>
                    <option value="Техническая поддержка">Техническая поддержка</option>
                    <option value="Другое">Другое</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ticketPriority">Приоритет</Label>
                  <select
                    id="ticketPriority"
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="urgent">Срочный</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="orderNumber">Номер заказа (если есть)</Label>
                  <Input
                    id="orderNumber"
                    value={newTicket.orderNumber}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, orderNumber: e.target.value }))}
                    placeholder="ORD-2024-001234"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ticketDescription">Подробное описание</Label>
                <Textarea
                  id="ticketDescription"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Опишите проблему как можно подробнее"
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="ticketName">Ваше имя</Label>
                  <Input
                    id="ticketName"
                    value={newTicket.name}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <Label htmlFor="ticketEmail">Email</Label>
                  <Input
                    id="ticketEmail"
                    type="email"
                    value={newTicket.email}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="ticketPhone">Телефон</Label>
                  <Input
                    id="ticketPhone"
                    value={newTicket.phone}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <Button onClick={submitTicket} className="w-full">
                <Icon name="Send" className="mr-2" />
                Отправить обращение
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Мои обращения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tickets.map(ticket => (
                  <div
                    key={ticket.id}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{ticket.subject}</h4>
                      <Badge className={getStatusColor(ticket.status)}>
                        {getStatusText(ticket.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{ticket.id}</span>
                      <span>{ticket.created}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Быстрые ответы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {faqCategories.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-semibold mb-2">{category.category}</h4>
                    <div className="space-y-1">
                      {category.questions.map((question, qIndex) => (
                        <button
                          key={qIndex}
                          className="text-left text-sm text-blue-600 hover:text-blue-800 block"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Время ответа службы поддержки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <Icon name="Zap" size={32} className="mx-auto mb-3 text-red-600" />
              <h4 className="font-semibold text-red-600">Срочные</h4>
              <p className="text-2xl font-bold">15 мин</p>
              <p className="text-sm text-gray-600">Критические проблемы</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="AlertTriangle" size={32} className="mx-auto mb-3 text-orange-600" />
              <h4 className="font-semibold text-orange-600">Высокий</h4>
              <p className="text-2xl font-bold">1 час</p>
              <p className="text-sm text-gray-600">Важные вопросы</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="Clock" size={32} className="mx-auto mb-3 text-yellow-600" />
              <h4 className="font-semibold text-yellow-600">Средний</h4>
              <p className="text-2xl font-bold">4 часа</p>
              <p className="text-sm text-gray-600">Обычные запросы</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="Calendar" size={32} className="mx-auto mb-3 text-green-600" />
              <h4 className="font-semibold text-green-600">Низкий</h4>
              <p className="text-2xl font-bold">24 часа</p>
              <p className="text-sm text-gray-600">Общие вопросы</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Контакты службы поддержки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Phone" size={32} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Горячая линия</h4>
                  <p className="text-gray-600">+7 (495) 123-45-67</p>
                  <p className="text-sm text-gray-500">Круглосуточно, бесплатно</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Mail" size={32} className="text-green-600" />
                <div>
                  <h4 className="font-semibold">Email поддержки</h4>
                  <p className="text-gray-600">support@hoztovary.ru</p>
                  <p className="text-sm text-gray-500">Ответим в течение 2 часов</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Headphones" className="text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Качественная поддержка</h4>
                    <p className="text-sm text-blue-700">
                      Наши специалисты имеют глубокие знания продукции и готовы помочь 
                      с любыми вопросами.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Clock" className="text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-900">Быстрое решение</h4>
                    <p className="text-sm text-green-700">
                      95% обращений решается с первого контакта без дополнительных звонков.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportPage;