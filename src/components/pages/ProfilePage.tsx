import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  loyaltyLevel: 'bronze' | 'silver' | 'gold';
  totalSpent: number;
  ordersCount: number;
  bonusPoints: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Иван Петров',
    email: 'ivan.petrov@email.com',
    phone: '+7 (999) 123-45-67',
    address: 'г. Москва, ул. Ленина, д. 10, кв. 25',
    birthDate: '1985-03-15',
    loyaltyLevel: 'silver',
    totalSpent: 125000,
    ordersCount: 23,
    bonusPoints: 2500
  });

  const [orders] = useState<Order[]>([
    {
      id: 'ORD-2024-001234',
      date: '15.12.2024',
      status: 'Доставлен',
      total: 3898,
      items: 2
    },
    {
      id: 'ORD-2024-001198',
      date: '08.12.2024',
      status: 'Доставлен',
      total: 1299,
      items: 1
    },
    {
      id: 'ORD-2024-001156',
      date: '25.11.2024',
      status: 'Доставлен',
      total: 5670,
      items: 4
    },
    {
      id: 'ORD-2024-001089',
      date: '18.11.2024',
      status: 'Доставлен',
      total: 2340,
      items: 3
    },
    {
      id: 'ORD-2024-001023',
      date: '10.11.2024',
      status: 'Отменен',
      total: 890,
      items: 1
    }
  ];

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: 'Дом',
      address: 'г. Москва, ул. Ленина, д. 10, кв. 25',
      isDefault: true
    },
    {
      id: 2,
      title: 'Дача',
      address: 'Московская обл., г. Подольск, ул. Дачная, д. 15',
      isDefault: false
    },
    {
      id: 3,
      title: 'Офис',
      address: 'г. Москва, ул. Тверская, д. 20, оф. 305',
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    title: '',
    address: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const getLoyaltyInfo = (level: string) => {
    const info = {
      'bronze': { 
        name: 'Бронзовый', 
        discount: '3%', 
        color: 'bg-orange-100 text-orange-800',
        icon: 'Award',
        nextLevel: 'Серебряный (от 50,000 ₽)',
        progress: (profile.totalSpent / 50000) * 100
      },
      'silver': { 
        name: 'Серебряный', 
        discount: '5%', 
        color: 'bg-gray-100 text-gray-800',
        icon: 'Award',
        nextLevel: 'Золотой (от 150,000 ₽)',
        progress: ((profile.totalSpent - 50000) / 100000) * 100
      },
      'gold': { 
        name: 'Золотой', 
        discount: '7%', 
        color: 'bg-yellow-100 text-yellow-800',
        icon: 'Crown',
        nextLevel: 'Максимальный уровень',
        progress: 100
      }
    };
    return info[level as keyof typeof info];
  };

  const saveProfile = () => {
    setIsEditing(false);
    alert('Профиль успешно обновлен!');
  };

  const addAddress = () => {
    if (newAddress.title && newAddress.address) {
      setAddresses(prev => [...prev, {
        id: Date.now(),
        title: newAddress.title,
        address: newAddress.address,
        isDefault: false
      }]);
      setNewAddress({ title: '', address: '' });
    }
  };

  const setDefaultAddress = (id: number) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const loyaltyInfo = getLoyaltyInfo(profile.loyaltyLevel);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Личный кабинет</h1>
        <p className="text-xl text-gray-600">
          Управляйте своим профилем, отслеживайте заказы и получайте персональные предложения.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold mb-2">{profile.ordersCount}</div>
            <p className="text-gray-600">Заказов</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="DollarSign" size={48} className="mx-auto mb-4 text-green-600" />
            <div className="text-3xl font-bold mb-2">{profile.totalSpent.toLocaleString()}</div>
            <p className="text-gray-600">₽ потрачено</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Gift" size={48} className="mx-auto mb-4 text-purple-600" />
            <div className="text-3xl font-bold mb-2">{profile.bonusPoints}</div>
            <p className="text-gray-600">Бонусных баллов</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name={loyaltyInfo.icon as any} size={48} className="mx-auto mb-4 text-yellow-600" />
            <div className="text-lg font-bold mb-2">{loyaltyInfo.name}</div>
            <p className="text-gray-600">Статус</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="addresses">Адреса</TabsTrigger>
          <TabsTrigger value="loyalty">Программа лояльности</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Личная информация</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Icon name="Edit" className="mr-2" />
                  {isEditing ? 'Отменить' : 'Редактировать'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Адрес</Label>
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="birthDate">Дата рождения</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={profile.birthDate}
                      onChange={(e) => setProfile(prev => ({ ...prev, birthDate: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  {isEditing && (
                    <Button onClick={saveProfile} className="w-full">
                      <Icon name="Save" className="mr-2" />
                      Сохранить изменения
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>История заказов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon name="Package" size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.date} • {order.items} товара</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">{order.total.toLocaleString()} ₽</div>
                      <Badge variant={order.status === 'Доставлен' ? 'default' : 'destructive'}>
                        {order.status}
                      </Badge>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Мои адреса</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addresses.map(address => (
                    <div key={address.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{address.title}</h4>
                          {address.isDefault && (
                            <Badge variant="secondary">По умолчанию</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{address.address}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        {!address.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDefaultAddress(address.id)}
                          >
                            По умолчанию
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteAddress(address.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Добавить новый адрес</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="addressTitle">Название адреса</Label>
                  <Input
                    id="addressTitle"
                    value={newAddress.title}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Дом, Офис, Дача..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="addressText">Полный адрес</Label>
                  <Input
                    id="addressText"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Город, улица, дом, квартира"
                  />
                </div>
                
                <Button onClick={addAddress} className="w-full">
                  <Icon name="Plus" className="mr-2" />
                  Добавить адрес
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loyalty">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ваш статус в программе лояльности</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Icon name={loyaltyInfo.icon as any} size={64} className="mx-auto mb-4 text-yellow-600" />
                    <h3 className="text-2xl font-bold mb-2">{loyaltyInfo.name}</h3>
                    <Badge className={loyaltyInfo.color}>
                      Скидка {loyaltyInfo.discount}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Прогресс до следующего уровня:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Потрачено:</span>
                        <span className="font-semibold">{profile.totalSpent.toLocaleString()} ₽</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all" 
                          style={{ width: `${Math.min(loyaltyInfo.progress, 100)}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">{loyaltyInfo.nextLevel}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{profile.bonusPoints}</div>
                    <p className="text-gray-600">Бонусных баллов</p>
                    <p className="text-sm text-gray-500 mt-2">
                      1 балл = 1 рубль при оплате
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Icon name="Award" size={48} className="mx-auto mb-4 text-orange-600" />
                  <h4 className="font-semibold mb-2">Бронзовый</h4>
                  <p className="text-sm text-gray-600 mb-3">От 0 до 50,000 ₽</p>
                  <Badge className="bg-orange-100 text-orange-800">Скидка 3%</Badge>
                </CardContent>
              </Card>
              
              <Card className="text-center border-2 border-blue-500">
                <CardContent className="p-6">
                  <Icon name="Award" size={48} className="mx-auto mb-4 text-gray-600" />
                  <h4 className="font-semibold mb-2">Серебряный</h4>
                  <p className="text-sm text-gray-600 mb-3">От 50,000 до 150,000 ₽</p>
                  <Badge className="bg-gray-100 text-gray-800">Скидка 5%</Badge>
                  <div className="mt-2">
                    <Badge className="bg-blue-500">Ваш уровень</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Icon name="Crown" size={48} className="mx-auto mb-4 text-yellow-600" />
                  <h4 className="font-semibold mb-2">Золотой</h4>
                  <p className="text-sm text-gray-600 mb-3">От 150,000 ₽</p>
                  <Badge className="bg-yellow-100 text-yellow-800">Скидка 7%</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Email-уведомления</h4>
                    <p className="text-sm text-gray-600">О статусе заказов и акциях</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Включено
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">SMS-уведомления</h4>
                    <p className="text-sm text-gray-600">О доставке и важных событиях</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Включено
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Push-уведомления</h4>
                    <p className="text-sm text-gray-600">В мобильном приложении</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Выключено
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Безопасность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Icon name="Key" className="mr-2" />
                  Изменить пароль
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Icon name="Shield" className="mr-2" />
                  Двухфакторная аутентификация
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Icon name="Download" className="mr-2" />
                  Скачать данные
                </Button>
                
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Удаление аккаунта</h4>
                  <p className="text-sm text-red-700 mb-3">
                    Это действие нельзя отменить. Все ваши данные будут удалены.
                  </p>
                  <Button variant="destructive" size="sm">
                    Удалить аккаунт
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;