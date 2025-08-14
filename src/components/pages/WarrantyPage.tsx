import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface WarrantyCase {
  id: number;
  productName: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyPeriod: string;
  status: 'active' | 'expired' | 'claimed';
  description: string;
  category: string;
}

const WarrantyPage = () => {
  const [warrantyCases] = useState<WarrantyCase[]>([
    {
      id: 1,
      productName: 'Дрель Bosch PSB 500 RE',
      serialNumber: 'BSH123456789',
      purchaseDate: '15.10.2024',
      warrantyPeriod: '2 года',
      status: 'active',
      description: 'Профессиональная ударная дрель',
      category: 'Инструменты'
    },
    {
      id: 2,
      productName: 'Смеситель Grohe Eurosmart',
      serialNumber: 'GRH987654321',
      purchaseDate: '20.08.2024',
      warrantyPeriod: '5 лет',
      status: 'active',
      description: 'Однорычажный смеситель для кухни',
      category: 'Сантехника'
    },
    {
      id: 3,
      productName: 'Пылесос Karcher WD 3',
      serialNumber: 'KAR456789123',
      purchaseDate: '10.05.2023',
      warrantyPeriod: '2 года',
      status: 'claimed',
      description: 'Хозяйственный пылесос для влажной и сухой уборки',
      category: 'Уборка'
    }
  ]);

  const [warrantyForm, setWarrantyForm] = useState({
    productName: '',
    serialNumber: '',
    purchaseDate: '',
    issueDescription: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const warrantyTerms = [
    {
      category: 'Электроинструменты',
      period: '1-3 года',
      conditions: 'Гарантия производителя, сервисное обслуживание',
      icon: 'Zap'
    },
    {
      category: 'Сантехника',
      period: '2-10 лет',
      conditions: 'Гарантия на материалы и комплектующие',
      icon: 'Droplets'
    },
    {
      category: 'Садовая техника',
      period: '1-2 года',
      conditions: 'Сезонная гарантия, исключая расходные материалы',
      icon: 'Trees'
    },
    {
      category: 'Ручные инструменты',
      period: '1-5 лет',
      conditions: 'Гарантия на производственные дефекты',
      icon: 'Wrench'
    },
    {
      category: 'Бытовая техника',
      period: '1-3 года',
      conditions: 'Полная гарантия производителя',
      icon: 'Home'
    },
    {
      category: 'Расходные материалы',
      period: '6-12 месяцев',
      conditions: 'Ограниченная гарантия качества',
      icon: 'Package'
    }
  ];

  const serviceSteps = [
    {
      step: 1,
      title: 'Обращение',
      description: 'Заполните форму или обратитесь в сервисный центр',
      icon: 'FileText'
    },
    {
      step: 2,
      title: 'Диагностика',
      description: 'Специалист проведет диагностику товара',
      icon: 'Search'
    },
    {
      step: 3,
      title: 'Решение',
      description: 'Ремонт, замена или возврат средств',
      icon: 'CheckCircle'
    },
    {
      step: 4,
      title: 'Получение',
      description: 'Получите отремонтированный или новый товар',
      icon: 'Package'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'expired': 'bg-red-100 text-red-800',
      'claimed': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'active': 'Активна',
      'expired': 'Истекла',
      'claimed': 'Обращение'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const submitWarrantyClaim = () => {
    if (warrantyForm.productName && warrantyForm.serialNumber && warrantyForm.contactName) {
      alert('Ваше обращение принято! Мы свяжемся с вами в ближайшее время.');
      setWarrantyForm({
        productName: '',
        serialNumber: '',
        purchaseDate: '',
        issueDescription: '',
        contactName: '',
        contactPhone: '',
        contactEmail: ''
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Гарантийное обслуживание</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мы предоставляем полную гарантийную поддержку на все товары. 
          Качественный сервис и быстрое решение любых вопросов.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Shield" size={48} className="mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold mb-2">100%</div>
            <p className="text-gray-600">Гарантия качества</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Clock" size={48} className="mx-auto mb-4 text-green-600" />
            <div className="text-3xl font-bold mb-2">24ч</div>
            <p className="text-gray-600">Время ответа</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Users" size={48} className="mx-auto mb-4 text-purple-600" />
            <div className="text-3xl font-bold mb-2">15</div>
            <p className="text-gray-600">Сервисных центров</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Гарантийные сроки по категориям</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {warrantyTerms.map((term, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name={term.icon as any} size={32} className="text-blue-600" />
                  <div>
                    <h4 className="font-semibold">{term.category}</h4>
                    <p className="text-sm text-gray-600">{term.period}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{term.conditions}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Мои гарантийные случаи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {warrantyCases.map(item => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{item.productName}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Серийный номер:</span>
                      <p className="font-mono">{item.serialNumber}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Дата покупки:</span>
                      <p>{item.purchaseDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Гарантия:</span>
                      <p>{item.warrantyPeriod}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Статус:</span>
                      <p>{getStatusText(item.status)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Проверка гарантии</h4>
                  <p className="text-sm text-blue-700">
                    Введите серийный номер товара для проверки гарантийного статуса
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Input placeholder="Серийный номер" className="flex-1" />
                    <Button size="sm">Проверить</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Подать гарантийную заявку</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="productName">Название товара</Label>
              <Input
                id="productName"
                value={warrantyForm.productName}
                onChange={(e) => setWarrantyForm(prev => ({ ...prev, productName: e.target.value }))}
                placeholder="Например: Дрель Bosch PSB 500 RE"
              />
            </div>
            
            <div>
              <Label htmlFor="serialNumber">Серийный номер</Label>
              <Input
                id="serialNumber"
                value={warrantyForm.serialNumber}
                onChange={(e) => setWarrantyForm(prev => ({ ...prev, serialNumber: e.target.value }))}
                placeholder="Серийный номер с упаковки или товара"
              />
            </div>
            
            <div>
              <Label htmlFor="purchaseDate">Дата покупки</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={warrantyForm.purchaseDate}
                onChange={(e) => setWarrantyForm(prev => ({ ...prev, purchaseDate: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="issueDescription">Описание проблемы</Label>
              <Textarea
                id="issueDescription"
                value={warrantyForm.issueDescription}
                onChange={(e) => setWarrantyForm(prev => ({ ...prev, issueDescription: e.target.value }))}
                placeholder="Подробно опишите неисправность"
                rows={3}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Ваше имя</Label>
                <Input
                  id="contactName"
                  value={warrantyForm.contactName}
                  onChange={(e) => setWarrantyForm(prev => ({ ...prev, contactName: e.target.value }))}
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Телефон</Label>
                <Input
                  id="contactPhone"
                  value={warrantyForm.contactPhone}
                  onChange={(e) => setWarrantyForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={warrantyForm.contactEmail}
                onChange={(e) => setWarrantyForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>
            
            <Button onClick={submitWarrantyClaim} className="w-full">
              <Icon name="Send" className="mr-2" />
              Подать заявку
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Процесс гарантийного обслуживания</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            {serviceSteps.map((step, index) => (
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
            <CardTitle>Условия гарантии</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Гарантия распространяется на:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                    <span>Производственные дефекты</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                    <span>Неисправности при нормальной эксплуатации</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5" />
                    <span>Дефекты материалов и комплектующих</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Гарантия НЕ распространяется на:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                    <span>Механические повреждения</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                    <span>Неправильную эксплуатацию</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                    <span>Естественный износ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                    <span>Самостоятельный ремонт</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Контакты сервисного центра</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Icon name="Phone" size={32} className="text-blue-600" />
              <div>
                <h4 className="font-semibold">Горячая линия</h4>
                <p className="text-gray-600">8-800-123-45-67</p>
                <p className="text-sm text-gray-500">Бесплатно по России</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Icon name="Mail" size={32} className="text-green-600" />
              <div>
                <h4 className="font-semibold">Email поддержки</h4>
                <p className="text-gray-600">warranty@hoztovary.ru</p>
                <p className="text-sm text-gray-500">Ответим в течение 24 часов</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Icon name="MapPin" size={32} className="text-purple-600" />
              <div>
                <h4 className="font-semibold">Сервисный центр</h4>
                <p className="text-gray-600">г. Москва, ул. Сервисная, д. 5</p>
                <p className="text-sm text-gray-500">Пн-Пт: 9:00-18:00</p>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Clock" className="text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-900">Быстрое решение</h4>
                  <p className="text-sm text-green-700">
                    90% обращений решается в течение 3 рабочих дней
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

export default WarrantyPage;