import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  price: number;
  supplier: string;
  lastRestocked: string;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstock';
}

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: 'Дрель Bosch PSB 500 RE',
      sku: 'BSH-PSB-500',
      category: 'Инструменты',
      currentStock: 15,
      minStock: 5,
      maxStock: 50,
      price: 3299,
      supplier: 'Bosch Russia',
      lastRestocked: '10.12.2024',
      location: 'A-1-15',
      status: 'in-stock'
    },
    {
      id: 2,
      name: 'Смеситель Grohe Eurosmart',
      sku: 'GRH-EUR-001',
      category: 'Сантехника',
      currentStock: 3,
      minStock: 5,
      maxStock: 25,
      price: 4599,
      supplier: 'Grohe AG',
      lastRestocked: '05.12.2024',
      location: 'B-2-08',
      status: 'low-stock'
    },
    {
      id: 3,
      name: 'Садовый шланг 25м',
      sku: 'GRD-HSE-25',
      category: 'Садовые товары',
      currentStock: 0,
      minStock: 10,
      maxStock: 100,
      price: 1299,
      supplier: 'Gardena',
      lastRestocked: '20.11.2024',
      location: 'C-3-22',
      status: 'out-of-stock'
    },
    {
      id: 4,
      name: 'Универсальное моющее средство',
      sku: 'CLN-UNI-001',
      category: 'Уборка',
      currentStock: 85,
      minStock: 20,
      maxStock: 60,
      price: 299,
      supplier: 'ChemClean',
      lastRestocked: '15.12.2024',
      location: 'D-1-05',
      status: 'overstock'
    },
    {
      id: 5,
      name: 'Набор отверток Stanley',
      sku: 'STN-SCR-SET',
      category: 'Инструменты',
      currentStock: 25,
      minStock: 10,
      maxStock: 40,
      price: 899,
      supplier: 'Stanley Tools',
      lastRestocked: '12.12.2024',
      location: 'A-2-10',
      status: 'in-stock'
    },
    {
      id: 6,
      name: 'Унитаз Roca Victoria',
      sku: 'RCA-VIC-WC',
      category: 'Сантехника',
      currentStock: 2,
      minStock: 3,
      maxStock: 15,
      price: 8900,
      supplier: 'Roca',
      lastRestocked: '01.12.2024',
      location: 'B-3-01',
      status: 'low-stock'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [restockForm, setRestockForm] = useState({
    itemId: 0,
    quantity: '',
    supplier: '',
    cost: '',
    notes: ''
  });

  const categories = ['all', ...Array.from(new Set(inventory.map(item => item.category)))];
  const statuses = ['all', 'in-stock', 'low-stock', 'out-of-stock', 'overstock'];

  const filteredInventory = inventory.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'in-stock': 'bg-green-100 text-green-800',
      'low-stock': 'bg-yellow-100 text-yellow-800',
      'out-of-stock': 'bg-red-100 text-red-800',
      'overstock': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'in-stock': 'В наличии',
      'low-stock': 'Мало на складе',
      'out-of-stock': 'Нет в наличии',
      'overstock': 'Избыток'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'in-stock': 'CheckCircle',
      'low-stock': 'AlertTriangle',
      'out-of-stock': 'XCircle',
      'overstock': 'TrendingUp'
    };
    return icons[status as keyof typeof icons] || 'Package';
  };

  const updateStock = (itemId: number, newStock: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        let newStatus: InventoryItem['status'] = 'in-stock';
        if (newStock === 0) newStatus = 'out-of-stock';
        else if (newStock < item.minStock) newStatus = 'low-stock';
        else if (newStock > item.maxStock) newStatus = 'overstock';
        
        return { ...item, currentStock: newStock, status: newStatus };
      }
      return item;
    }));
  };

  const restockItem = () => {
    if (restockForm.itemId && restockForm.quantity) {
      const item = inventory.find(i => i.id === restockForm.itemId);
      if (item) {
        updateStock(restockForm.itemId, item.currentStock + parseInt(restockForm.quantity));
        setRestockForm({ itemId: 0, quantity: '', supplier: '', cost: '', notes: '' });
        alert('Товар успешно пополнен!');
      }
    }
  };

  const inventoryStats = {
    totalItems: inventory.length,
    inStock: inventory.filter(item => item.status === 'in-stock').length,
    lowStock: inventory.filter(item => item.status === 'low-stock').length,
    outOfStock: inventory.filter(item => item.status === 'out-of-stock').length,
    overstock: inventory.filter(item => item.status === 'overstock').length,
    totalValue: inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0)
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Управление складом</h1>
          <p className="text-gray-600">Контроль остатков и движения товаров</p>
        </div>
        <Button>
          <Icon name="Plus" className="mr-2" />
          Добавить товар
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Общая стоимость склада</p>
                <p className="text-3xl font-bold">{inventoryStats.totalValue.toLocaleString()} ₽</p>
              </div>
              <Icon name="DollarSign" size={32} className="text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего позиций</p>
                <p className="text-3xl font-bold">{inventoryStats.totalItems}</p>
              </div>
              <Icon name="Package" size={32} className="text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Требуют внимания</p>
                <p className="text-3xl font-bold text-red-600">
                  {inventoryStats.lowStock + inventoryStats.outOfStock}
                </p>
              </div>
              <Icon name="AlertTriangle" size={32} className="text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Icon name="CheckCircle" size={32} className="mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{inventoryStats.inStock}</div>
            <p className="text-sm text-gray-600">В наличии</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Icon name="AlertTriangle" size={32} className="mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold">{inventoryStats.lowStock}</div>
            <p className="text-sm text-gray-600">Мало на складе</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Icon name="XCircle" size={32} className="mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold">{inventoryStats.outOfStock}</div>
            <p className="text-sm text-gray-600">Нет в наличии</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Icon name="TrendingUp" size={32} className="mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{inventoryStats.overstock}</div>
            <p className="text-sm text-gray-600">Избыток</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'Все категории' : category}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">Все статусы</option>
            <option value="in-stock">В наличии</option>
            <option value="low-stock">Мало на складе</option>
            <option value="out-of-stock">Нет в наличии</option>
            <option value="overstock">Избыток</option>
          </select>
          
          <Input
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Складские остатки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Товар</th>
                  <th className="text-left p-3">SKU</th>
                  <th className="text-center p-3">Остаток</th>
                  <th className="text-center p-3">Мин/Макс</th>
                  <th className="text-center p-3">Статус</th>
                  <th className="text-center p-3">Местоположение</th>
                  <th className="text-center p-3">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {item.sku}
                      </code>
                    </td>
                    <td className="text-center p-3">
                      <div className="text-lg font-bold">{item.currentStock}</div>
                      <div className="text-sm text-gray-500">шт</div>
                    </td>
                    <td className="text-center p-3">
                      <div className="text-sm">
                        <span className="text-red-600">{item.minStock}</span>
                        <span className="text-gray-400"> / </span>
                        <span className="text-green-600">{item.maxStock}</span>
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <Badge className={getStatusColor(item.status)}>
                        <Icon name={getStatusIcon(item.status) as any} size={12} className="mr-1" />
                        {getStatusText(item.status)}
                      </Badge>
                    </td>
                    <td className="text-center p-3">
                      <code className="text-sm">{item.location}</code>
                    </td>
                    <td className="text-center p-3">
                      <div className="flex gap-1 justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRestockForm(prev => ({ ...prev, itemId: item.id }))}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Пополнение склада</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="restockItem">Выберите товар</Label>
              <select
                id="restockItem"
                value={restockForm.itemId}
                onChange={(e) => setRestockForm(prev => ({ ...prev, itemId: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value={0}>Выберите товар</option>
                {inventory.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} (остаток: {item.currentStock})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="restockQuantity">Количество</Label>
                <Input
                  id="restockQuantity"
                  type="number"
                  value={restockForm.quantity}
                  onChange={(e) => setRestockForm(prev => ({ ...prev, quantity: e.target.value }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="restockCost">Стоимость закупки</Label>
                <Input
                  id="restockCost"
                  type="number"
                  value={restockForm.cost}
                  onChange={(e) => setRestockForm(prev => ({ ...prev, cost: e.target.value }))}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="restockSupplier">Поставщик</Label>
              <Input
                id="restockSupplier"
                value={restockForm.supplier}
                onChange={(e) => setRestockForm(prev => ({ ...prev, supplier: e.target.value }))}
                placeholder="Название поставщика"
              />
            </div>
            
            <div>
              <Label htmlFor="restockNotes">Примечания</Label>
              <Input
                id="restockNotes"
                value={restockForm.notes}
                onChange={(e) => setRestockForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Дополнительная информация"
              />
            </div>
            
            <Button onClick={restockItem} className="w-full">
              <Icon name="Package" className="mr-2" />
              Пополнить склад
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Критические остатки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventory
                .filter(item => item.status === 'low-stock' || item.status === 'out-of-stock')
                .map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon 
                        name={getStatusIcon(item.status) as any} 
                        size={24} 
                        className={item.status === 'out-of-stock' ? 'text-red-600' : 'text-yellow-600'} 
                      />
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          Остаток: {item.currentStock} / Мин: {item.minStock}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant={item.status === 'out-of-stock' ? 'destructive' : 'default'}
                      size="sm"
                      onClick={() => setRestockForm(prev => ({ ...prev, itemId: item.id }))}
                    >
                      Пополнить
                    </Button>
                  </div>
                ))}
              
              {inventory.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length === 0 && (
                <div className="text-center py-8">
                  <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-semibold mb-2">Все в порядке!</h3>
                  <p className="text-gray-500">Нет товаров с критическими остатками</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Движение товаров за месяц</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <Icon name="ArrowDown" size={32} className="mx-auto mb-3 text-green-600" />
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-sm text-gray-600">Поступило товаров</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="ArrowUp" size={32} className="mx-auto mb-3 text-blue-600" />
              <div className="text-2xl font-bold">1,189</div>
              <p className="text-sm text-gray-600">Продано товаров</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="RotateCcw" size={32} className="mx-auto mb-3 text-orange-600" />
              <div className="text-2xl font-bold">23</div>
              <p className="text-sm text-gray-600">Возвращено товаров</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="AlertCircle" size={32} className="mx-auto mb-3 text-red-600" />
              <div className="text-2xl font-bold">5</div>
              <p className="text-sm text-gray-600">Списано (брак)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Автоматические уведомления</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Bell" size={24} className="text-blue-600" />
                <h4 className="font-semibold">Низкие остатки</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Уведомления когда товар достигает минимального остатка
              </p>
              <Badge className="bg-green-100 text-green-800">Включено</Badge>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="TrendingDown" size={24} className="text-orange-600" />
                <h4 className="font-semibold">Медленные продажи</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Товары, которые не продавались более 30 дней
              </p>
              <Badge className="bg-green-100 text-green-800">Включено</Badge>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Calendar" size={24} className="text-purple-600" />
                <h4 className="font-semibold">Срок годности</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Товары с истекающим сроком годности
              </p>
              <Badge className="bg-yellow-100 text-yellow-800">Настроить</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Отчеты и экспорт данных</h3>
        <p className="text-gray-600 mb-6">
          Получите детальные отчеты по движению товаров и состоянию склада.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Icon name="Download" className="mr-2" />
            Скачать отчет по остаткам
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="FileText" className="mr-2" />
            Отчет по движению
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="BarChart" className="mr-2" />
            Аналитический отчет
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;