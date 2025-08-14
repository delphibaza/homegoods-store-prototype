import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Sale {
  id: string;
  date: string;
  time: string;
  customer: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  cashier: string;
  status: 'completed' | 'refunded' | 'partial-refund';
}

const SalesPage = () => {
  const [sales] = useState<Sale[]>([
    {
      id: 'SALE-2024-001234',
      date: '16.12.2024',
      time: '14:30',
      customer: 'Иван Петров',
      items: [
        { name: 'Дрель Bosch PSB 500 RE', quantity: 1, price: 3299, total: 3299 },
        { name: 'Набор сверл', quantity: 1, price: 599, total: 599 }
      ],
      subtotal: 3898,
      discount: 195,
      total: 3703,
      paymentMethod: 'Банковская карта',
      cashier: 'Мария Сидорова',
      status: 'completed'
    },
    {
      id: 'SALE-2024-001235',
      date: '16.12.2024',
      time: '15:45',
      customer: 'Елена Козлова',
      items: [
        { name: 'Универсальное моющее средство', quantity: 3, price: 299, total: 897 },
        { name: 'Губки для посуды', quantity: 2, price: 89, total: 178 }
      ],
      subtotal: 1075,
      discount: 0,
      total: 1075,
      paymentMethod: 'Наличные',
      cashier: 'Алексей Петров',
      status: 'completed'
    },
    {
      id: 'SALE-2024-001236',
      date: '16.12.2024',
      time: '16:20',
      customer: 'Дмитрий Волков',
      items: [
        { name: 'Смеситель Grohe Eurosmart', quantity: 1, price: 4599, total: 4599 }
      ],
      subtotal: 4599,
      discount: 230,
      total: 4369,
      paymentMethod: 'Банковская карта',
      cashier: 'Мария Сидорова',
      status: 'completed'
    },
    {
      id: 'SALE-2024-001237',
      date: '16.12.2024',
      time: '17:10',
      customer: 'Анна Смирнова',
      items: [
        { name: 'Садовый шланг 15м', quantity: 1, price: 899, total: 899 },
        { name: 'Распылитель', quantity: 1, price: 299, total: 299 }
      ],
      subtotal: 1198,
      discount: 60,
      total: 1138,
      paymentMethod: 'Наличные',
      cashier: 'Алексей Петров',
      status: 'partial-refund'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState('2024-12-16');
  const [selectedCashier, setSelectedCashier] = useState('all');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const cashiers = ['all', 'Мария Сидорова', 'Алексей Петров', 'Дмитрий Козлов'];

  const filteredSales = sales.filter(sale => {
    const matchesDate = sale.date === selectedDate.split('-').reverse().join('.');
    const matchesCashier = selectedCashier === 'all' || sale.cashier === selectedCashier;
    return matchesDate && matchesCashier;
  });

  const dailyStats = {
    totalSales: filteredSales.reduce((sum, sale) => sum + sale.total, 0),
    totalTransactions: filteredSales.length,
    averageTransaction: filteredSales.length > 0 
      ? filteredSales.reduce((sum, sale) => sum + sale.total, 0) / filteredSales.length 
      : 0,
    totalDiscount: filteredSales.reduce((sum, sale) => sum + sale.discount, 0),
    cashSales: filteredSales.filter(sale => sale.paymentMethod === 'Наличные').length,
    cardSales: filteredSales.filter(sale => sale.paymentMethod === 'Банковская карта').length
  };

  const hourlyData = [
    { hour: '9:00', sales: 2, amount: 1450 },
    { hour: '10:00', sales: 5, amount: 3200 },
    { hour: '11:00', sales: 8, amount: 5670 },
    { hour: '12:00', sales: 12, amount: 8900 },
    { hour: '13:00', sales: 15, amount: 12300 },
    { hour: '14:00', sales: 18, amount: 15600 },
    { hour: '15:00', sales: 22, amount: 18900 },
    { hour: '16:00', sales: 25, amount: 21200 },
    { hour: '17:00', sales: 20, amount: 17800 },
    { hour: '18:00', sales: 16, amount: 14500 },
    { hour: '19:00', sales: 8, amount: 6700 }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'completed': 'bg-green-100 text-green-800',
      'refunded': 'bg-red-100 text-red-800',
      'partial-refund': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'completed': 'Завершена',
      'refunded': 'Возврат',
      'partial-refund': 'Частичный возврат'
    };
    return texts[status as keyof typeof texts] || status;
  };

  if (selectedSale) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedSale(null)}>
            <Icon name="ArrowLeft" className="mr-2" />
            Назад к продажам
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Чек {selectedSale.id}</CardTitle>
                <p className="text-gray-600">{selectedSale.date} в {selectedSale.time}</p>
              </div>
              <Badge className={getStatusColor(selectedSale.status)}>
                {getStatusText(selectedSale.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Информация о продаже</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Покупатель:</span>
                    <span className="font-semibold">{selectedSale.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Кассир:</span>
                    <span className="font-semibold">{selectedSale.cashier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Способ оплаты:</span>
                    <span className="font-semibold">{selectedSale.paymentMethod}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Товары</h3>
                <div className="space-y-3">
                  {selectedSale.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          {item.quantity} × {item.price.toLocaleString()} ₽
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{item.total.toLocaleString()} ₽</div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between">
                      <span>Подытог:</span>
                      <span>{selectedSale.subtotal.toLocaleString()} ₽</span>
                    </div>
                    {selectedSale.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Скидка:</span>
                        <span>-{selectedSale.discount.toLocaleString()} ₽</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold">
                      <span>Итого:</span>
                      <span>{selectedSale.total.toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button variant="outline">
                <Icon name="Printer" className="mr-2" />
                Печать чека
              </Button>
              <Button variant="outline">
                <Icon name="Mail" className="mr-2" />
                Отправить на email
              </Button>
              <Button variant="destructive">
                <Icon name="RotateCcw" className="mr-2" />
                Оформить возврат
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Продажи</h1>
          <p className="text-gray-600">Управление продажами и кассовыми операциями</p>
        </div>
        <Button>
          <Icon name="Plus" className="mr-2" />
          Новая продажа
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Продажи за день</p>
                <p className="text-3xl font-bold">{dailyStats.totalSales.toLocaleString()} ₽</p>
              </div>
              <Icon name="DollarSign" size={32} className="text-green-600" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Icon name="TrendingUp" size={16} className="text-green-600" />
              <span className="text-sm text-green-600">+15.2% к вчера</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Количество чеков</p>
                <p className="text-3xl font-bold">{dailyStats.totalTransactions}</p>
              </div>
              <Icon name="Receipt" size={32} className="text-blue-600" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Icon name="TrendingUp" size={16} className="text-green-600" />
              <span className="text-sm text-green-600">+8.7% к вчера</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Средний чек</p>
                <p className="text-3xl font-bold">{dailyStats.averageTransaction.toLocaleString()} ₽</p>
              </div>
              <Icon name="BarChart" size={32} className="text-purple-600" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Icon name="TrendingUp" size={16} className="text-green-600" />
              <span className="text-sm text-green-600">+5.3% к вчера</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <div>
            <Label htmlFor="saleDate">Дата</Label>
            <Input
              id="saleDate"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="cashierSelect">Кассир</Label>
            <select
              id="cashierSelect"
              value={selectedCashier}
              onChange={(e) => setSelectedCashier(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {cashiers.map(cashier => (
                <option key={cashier} value={cashier}>
                  {cashier === 'all' ? 'Все кассиры' : cashier}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="Download" className="mr-2" />
            Экспорт
          </Button>
          <Button variant="outline">
            <Icon name="Printer" className="mr-2" />
            Печать
          </Button>
        </div>
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Транзакции</TabsTrigger>
          <TabsTrigger value="hourly">По часам</TabsTrigger>
          <TabsTrigger value="payment">Способы оплаты</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Продажи за {selectedDate.split('-').reverse().join('.')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSales.map(sale => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedSale(sale)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon name="Receipt" size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{sale.id}</h4>
                        <p className="text-sm text-gray-600">
                          {sale.time} • {sale.customer} • {sale.items.length} товара
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold">{sale.total.toLocaleString()} ₽</div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(sale.status)}>
                          {getStatusText(sale.status)}
                        </Badge>
                        <span className="text-sm text-gray-500">{sale.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredSales.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Receipt" size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">Нет продаж</h3>
                    <p className="text-gray-500">За выбранную дату продаж не найдено</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hourly">
          <Card>
            <CardHeader>
              <CardTitle>Продажи по часам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hourlyData.map((hour, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-blue-600">{hour.hour}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{hour.sales} продаж</h4>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(hour.sales / 25) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold">{hour.amount.toLocaleString()} ₽</div>
                      <div className="text-sm text-gray-500">
                        {hour.sales > 0 ? (hour.amount / hour.sales).toFixed(0) : 0} ₽ средний чек
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Способы оплаты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name="CreditCard" size={24} className="text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Банковские карты</h4>
                        <p className="text-sm text-gray-600">{dailyStats.cardSales} транзакций</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {filteredSales
                          .filter(sale => sale.paymentMethod === 'Банковская карта')
                          .reduce((sum, sale) => sum + sale.total, 0)
                          .toLocaleString()} ₽
                      </div>
                      <div className="text-sm text-gray-500">
                        {((dailyStats.cardSales / dailyStats.totalTransactions) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name="Banknote" size={24} className="text-green-600" />
                      <div>
                        <h4 className="font-semibold">Наличные</h4>
                        <p className="text-sm text-gray-600">{dailyStats.cashSales} транзакций</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {filteredSales
                          .filter(sale => sale.paymentMethod === 'Наличные')
                          .reduce((sum, sale) => sum + sale.total, 0)
                          .toLocaleString()} ₽
                      </div>
                      <div className="text-sm text-gray-500">
                        {((dailyStats.cashSales / dailyStats.totalTransactions) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика кассиров</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cashiers.filter(c => c !== 'all').map(cashier => {
                    const cashierSales = filteredSales.filter(sale => sale.cashier === cashier);
                    const cashierTotal = cashierSales.reduce((sum, sale) => sum + sale.total, 0);
                    
                    return (
                      <div key={cashier} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon name="User" size={20} className="text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{cashier}</h4>
                            <p className="text-sm text-gray-600">{cashierSales.length} продаж</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold">{cashierTotal.toLocaleString()} ₽</div>
                          <div className="text-sm text-gray-500">
                            {cashierSales.length > 0 ? (cashierTotal / cashierSales.length).toFixed(0) : 0} ₽ средний чек
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Итоги дня</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <Icon name="DollarSign" size={32} className="mx-auto mb-3 text-green-600" />
              <div className="text-2xl font-bold">{dailyStats.totalSales.toLocaleString()} ₽</div>
              <p className="text-sm text-gray-600">Общая выручка</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="Receipt" size={32} className="mx-auto mb-3 text-blue-600" />
              <div className="text-2xl font-bold">{dailyStats.totalTransactions}</div>
              <p className="text-sm text-gray-600">Количество чеков</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="BarChart" size={32} className="mx-auto mb-3 text-purple-600" />
              <div className="text-2xl font-bold">{dailyStats.averageTransaction.toLocaleString()} ₽</div>
              <p className="text-sm text-gray-600">Средний чек</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="Percent" size={32} className="mx-auto mb-3 text-orange-600" />
              <div className="text-2xl font-bold">{dailyStats.totalDiscount.toLocaleString()} ₽</div>
              <p className="text-sm text-gray-600">Общая скидка</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Управление кассой</h3>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Icon name="Calculator" className="mr-2" />
            Открыть кассу
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="FileText" className="mr-2" />
            Z-отчет
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="Lock" className="mr-2" />
            Закрыть смену
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;