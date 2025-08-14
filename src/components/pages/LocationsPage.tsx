import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Location {
  id: number;
  name: string;
  type: 'store' | 'warehouse' | 'service';
  address: string;
  phone: string;
  email: string;
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  services: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  manager: string;
  parking: boolean;
  accessibility: boolean;
  image: string;
}

const LocationsPage = () => {
  const [locations] = useState<Location[]>([
    {
      id: 1,
      name: 'Главный магазин',
      type: 'store',
      address: 'г. Москва, ул. Строительная, д. 10',
      phone: '+7 (495) 123-45-67',
      email: 'store1@hoztovary.ru',
      workingHours: {
        weekdays: '9:00 - 19:00',
        saturday: '9:00 - 18:00',
        sunday: '10:00 - 17:00'
      },
      services: ['Продажа товаров', 'Консультации', 'Самовывоз', 'Возврат товаров'],
      coordinates: { lat: 55.7558, lng: 37.6176 },
      manager: 'Петров Алексей Иванович',
      parking: true,
      accessibility: true,
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg'
    },
    {
      id: 2,
      name: 'Филиал на Юго-Западе',
      type: 'store',
      address: 'г. Москва, ул. Профсоюзная, д. 45',
      phone: '+7 (495) 123-45-68',
      email: 'store2@hoztovary.ru',
      workingHours: {
        weekdays: '10:00 - 20:00',
        saturday: '10:00 - 19:00',
        sunday: '11:00 - 18:00'
      },
      services: ['Продажа товаров', 'Консультации', 'Самовывоз'],
      coordinates: { lat: 55.6774, lng: 37.5625 },
      manager: 'Сидорова Мария Петровна',
      parking: true,
      accessibility: false,
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg'
    },
    {
      id: 3,
      name: 'Склад-магазин на Севере',
      type: 'warehouse',
      address: 'г. Москва, Дмитровское шоссе, д. 89',
      phone: '+7 (495) 123-45-69',
      email: 'warehouse@hoztovary.ru',
      workingHours: {
        weekdays: '8:00 - 18:00',
        saturday: '9:00 - 16:00',
        sunday: 'Выходной'
      },
      services: ['Оптовые продажи', 'Самовывоз', 'Погрузка товара'],
      coordinates: { lat: 55.8431, lng: 37.6156 },
      manager: 'Козлов Дмитрий Сергеевич',
      parking: true,
      accessibility: true,
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg'
    },
    {
      id: 4,
      name: 'Сервисный центр',
      type: 'service',
      address: 'г. Москва, ул. Сервисная, д. 5',
      phone: '+7 (495) 123-45-70',
      email: 'service@hoztovary.ru',
      workingHours: {
        weekdays: '9:00 - 18:00',
        saturday: '10:00 - 16:00',
        sunday: 'Выходной'
      },
      services: ['Гарантийный ремонт', 'Диагностика', 'Запчасти'],
      coordinates: { lat: 55.7387, lng: 37.6032 },
      manager: 'Волкова Елена Александровна',
      parking: false,
      accessibility: true,
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg'
    },
    {
      id: 5,
      name: 'Точка выдачи в ТЦ "Мега"',
      type: 'store',
      address: 'г. Москва, МКАД 24 км, ТЦ "Мега Белая Дача"',
      phone: '+7 (495) 123-45-71',
      email: 'mega@hoztovary.ru',
      workingHours: {
        weekdays: '10:00 - 22:00',
        saturday: '10:00 - 22:00',
        sunday: '10:00 - 22:00'
      },
      services: ['Самовывоз', 'Возврат товаров'],
      coordinates: { lat: 55.6579, lng: 37.7506 },
      manager: 'Иванов Игорь Владимирович',
      parking: true,
      accessibility: true,
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg'
    },
    {
      id: 6,
      name: 'Филиал в Подольске',
      type: 'store',
      address: 'г. Подольск, ул. Революционная, д. 25',
      phone: '+7 (4967) 12-34-56',
      email: 'podolsk@hoztovary.ru',
      workingHours: {
        weekdays: '9:00 - 19:00',
        saturday: '9:00 - 18:00',
        sunday: '10:00 - 17:00'
      },
      services: ['Продажа товаров', 'Консультации', 'Самовывоз', 'Доставка по району'],
      coordinates: { lat: 55.4297, lng: 37.5444 },
      manager: 'Смирнов Андрей Николаевич',
      parking: true,
      accessibility: false,
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg'
    }
  ];

  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const types = ['all', 'store', 'warehouse', 'service'];

  const filteredLocations = locations.filter(location => {
    return selectedType === 'all' || location.type === selectedType;
  });

  const getTypeColor = (type: string) => {
    const colors = {
      'store': 'bg-blue-100 text-blue-800',
      'warehouse': 'bg-green-100 text-green-800',
      'service': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeText = (type: string) => {
    const texts = {
      'store': 'Магазин',
      'warehouse': 'Склад',
      'service': 'Сервис'
    };
    return texts[type as keyof typeof texts] || type;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'store': 'Store',
      'warehouse': 'Warehouse',
      'service': 'Wrench'
    };
    return icons[type as keyof typeof icons] || 'MapPin';
  };

  if (selectedLocation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedLocation(null)}>
            <Icon name="ArrowLeft" className="mr-2" />
            Назад к адресам
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <img
              src={selectedLocation.image}
              alt={selectedLocation.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{selectedLocation.name}</h1>
                  <Badge className={getTypeColor(selectedLocation.type)}>
                    <Icon name={getTypeIcon(selectedLocation.type) as any} size={16} className="mr-2" />
                    {getTypeText(selectedLocation.type)}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {selectedLocation.parking && (
                    <Badge variant="outline">
                      <Icon name="Car" size={12} className="mr-1" />
                      Парковка
                    </Badge>
                  )}
                  {selectedLocation.accessibility && (
                    <Badge variant="outline">
                      <Icon name="Accessibility" size={12} className="mr-1" />
                      Доступно
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Контактная информация</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Icon name="MapPin" size={20} className="text-blue-600" />
                        <span>{selectedLocation.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon name="Phone" size={20} className="text-green-600" />
                        <span>{selectedLocation.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon name="Mail" size={20} className="text-purple-600" />
                        <span>{selectedLocation.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon name="User" size={20} className="text-orange-600" />
                        <span>{selectedLocation.manager}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Режим работы</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Понедельник - Пятница:</span>
                        <span className="font-semibold">{selectedLocation.workingHours.weekdays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Суббота:</span>
                        <span className="font-semibold">{selectedLocation.workingHours.saturday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Воскресенье:</span>
                        <span className="font-semibold">{selectedLocation.workingHours.sunday}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Доступные услуги</h3>
                    <div className="space-y-2">
                      {selectedLocation.services.map((service, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Icon name="Check" size={16} className="text-green-600" />
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full">
                      <Icon name="Navigation" className="mr-2" />
                      Построить маршрут
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Phone" className="mr-2" />
                      Позвонить
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Mail" className="mr-2" />
                      Написать письмо
                    </Button>
                  </div>
                </div>
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
        <h1 className="text-4xl font-bold mb-4">Наши адреса</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Сеть магазинов, складов и сервисных центров по Москве и области. 
          Выберите ближайший к вам адрес для покупок или получения услуг.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Store" size={48} className="mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold mb-2">{locations.filter(l => l.type === 'store').length}</div>
            <p className="text-gray-600">Магазинов</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Warehouse" size={48} className="mx-auto mb-4 text-green-600" />
            <div className="text-3xl font-bold mb-2">{locations.filter(l => l.type === 'warehouse').length}</div>
            <p className="text-gray-600">Складов</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Wrench" size={48} className="mx-auto mb-4 text-purple-600" />
            <div className="text-3xl font-bold mb-2">{locations.filter(l => l.type === 'service').length}</div>
            <p className="text-gray-600">Сервисных центров</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="MapPin" size={48} className="mx-auto mb-4 text-orange-600" />
            <div className="text-3xl font-bold mb-2">{locations.length}</div>
            <p className="text-gray-600">Всего точек</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {types.map(type => (
          <Button
            key={type}
            variant={selectedType === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType(type)}
          >
            {type === 'all' ? 'Все точки' : getTypeText(type)}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map(location => (
          <Card key={location.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={getTypeColor(location.type)}>
                    <Icon name={getTypeIcon(location.type) as any} size={16} className="mr-2" />
                    {getTypeText(location.type)}
                  </Badge>
                  <div className="flex gap-1">
                    {location.parking && (
                      <Icon name="Car" size={16} className="text-blue-600" title="Парковка" />
                    )}
                    {location.accessibility && (
                      <Icon name="Accessibility" size={16} className="text-green-600" title="Доступная среда" />
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <Icon name="MapPin" size={16} className="text-gray-400 mt-1" />
                    <span className="text-sm text-gray-600">{location.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{location.workingHours.weekdays}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Услуги:</h4>
                  <div className="flex flex-wrap gap-1">
                    {location.services.slice(0, 2).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {location.services.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{location.services.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedLocation(location)}
                    className="flex-1"
                    size="sm"
                  >
                    Подробнее
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Navigation" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Как добраться</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <Icon name="Car" size={48} className="mx-auto mb-4 text-blue-600" />
              <h4 className="font-semibold mb-2">На автомобиле</h4>
              <p className="text-sm text-gray-600">
                Бесплатная парковка у всех магазинов. Удобный подъезд и разгрузка.
              </p>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <Icon name="Train" size={48} className="mx-auto mb-4 text-green-600" />
              <h4 className="font-semibold mb-2">На общественном транспорте</h4>
              <p className="text-sm text-gray-600">
                Все магазины расположены рядом со станциями метро и остановками автобусов.
              </p>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <Icon name="Navigation" size={48} className="mx-auto mb-4 text-purple-600" />
              <h4 className="font-semibold mb-2">GPS-навигация</h4>
              <p className="text-sm text-gray-600">
                Точные координаты для навигаторов. Легко найти любую нашу точку.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Планы развития сети</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ближайшие планы (2025 год):</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="Plus" size={16} className="text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Новый магазин в Химках</h4>
                    <p className="text-sm text-gray-600">Открытие планируется на март 2025</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon name="Plus" size={16} className="text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Расширение склада</h4>
                    <p className="text-sm text-gray-600">Увеличение складских площадей в 2 раза</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon name="Plus" size={16} className="text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Точки выдачи в ТЦ</h4>
                    <p className="text-sm text-gray-600">5 новых точек в торговых центрах</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Долгосрочные планы:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="Target" size={16} className="text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Расширение в регионы</h4>
                    <p className="text-sm text-gray-600">Открытие филиалов в крупных городах</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon name="Target" size={16} className="text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Сеть сервисных центров</h4>
                    <p className="text-sm text-gray-600">Развитие сервисного обслуживания</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon name="Target" size={16} className="text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Автоматизированные склады</h4>
                    <p className="text-sm text-gray-600">Внедрение современных технологий</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Не нашли удобный адрес?</h3>
        <p className="text-gray-600 mb-6">
          Мы постоянно расширяем сеть наших точек. Предложите нам удобное для вас место!
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Icon name="MapPin" className="mr-2" />
            Предложить адрес
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="Truck" className="mr-2" />
            Заказать доставку
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;