import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');

  const salesData = {
    totalRevenue: 2450000,
    totalOrders: 1234,
    averageOrder: 1986,
    newCustomers: 156,
    returningCustomers: 1078,
    conversionRate: 3.2
  };

  const categoryData = [
    { name: 'Инструменты', sales: 890000, orders: 445, growth: 12.5 },
    { name: 'Сантехника', sales: 650000, orders: 234, growth: 8.3 },
    { name: 'Садовые товары', sales: 420000, orders: 312, growth: -2.1 },
    { name: 'Уборка', sales: 290000, orders: 189, growth: 15.7 },
    { name: 'Прочее', sales: 200000, orders: 54, growth: 5.2 }
  ];

  const topProducts = [
    { name: 'Дрель Bosch PSB 500 RE', sales: 45, revenue: 148455 },
    { name: 'Смеситель Grohe Eurosmart', sales: 32, revenue: 147168 },
    { name: 'Набор отверток Stanley', sales: 67, revenue: 60233 },
    { name: 'Универсальное моющее средство', sales: 156, revenue: 46644 },
    { name: 'Садовый шланг 25м', sales: 28, revenue: 36372 }
  ];

  const customerMetrics = [
    { metric: 'Новые клиенты', value: 156, change: 23.5, icon: 'UserPlus' },
    { metric: 'Повторные покупки', value: 1078, change: 8.7, icon: 'RotateCcw' },
    { metric: 'Средний чек', value: 1986, change: 12.3, icon: 'DollarSign' },
    { metric: 'Время на сайте', value: '4:32', change: 15.2, icon: 'Clock' }
  ];

  const trafficSources = [
    { source: 'Прямые заходы', visitors: 2340, percentage: 35.2 },
    { source: 'Поисковые системы', visitors: 1890, percentage: 28.4 },
    { source: 'Социальные сети', visitors: 1234, percentage: 18.6 },
    { source: 'Реклама', visitors: 890, percentage: 13.4 },
    { source: 'Email-рассылка', visitors: 289, percentage: 4.4 }
  ];

  const monthlyTrends = [
    { month: 'Янв', revenue: 1800000, orders: 890 },
    { month: 'Фев', revenue: 1950000, orders: 945 },
    { month: 'Мар', revenue: 2100000, orders: 1023 },
    { month: 'Апр', revenue: 2250000, orders: 1156 },
    { month: 'Май', revenue: 2180000, orders: 1089 },
    { month: 'Июн', revenue: 2350000, orders: 1198 },
    { month: 'Июл', revenue: 2420000, orders: 1245 },
    { month: 'Авг', revenue: 2380000, orders: 1223 },
    { month: 'Сен', revenue: 2290000, orders: 1167 },
    { month: 'Окт', revenue: 2450000, orders: 1234 },
    { month: 'Ноя', revenue: 2380000, orders: 1201 },
    { month: 'Дек', revenue: 2520000, orders: 1289 }
  ];

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Аналитика продаж</h1>
          <p className="text-gray-600">Детальная статистика работы магазина</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            Неделя
          </Button>
          <Button
            variant={timeRange === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            Месяц
          </Button>
          <Button
            variant={timeRange === 'year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('year')}
          >
            Год
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Общая выручка</p>
                <p className="text-3xl font-bold">{salesData.totalRevenue.toLocaleString()} ₽</p>
              </div>
              <Icon name="DollarSign" size={32} className="text-green-600" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Icon name="TrendingUp" size={16} className="text-green-600" />
              <span className="text-sm text-green-600">+12.5% к прошлому месяцу</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Количество заказов</p>
                <p className="text-3xl font-bold">{salesData.totalOrders}</p>
              </div>
              <Icon name="ShoppingBag" size={32} className="text-blue-600" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Icon name="TrendingUp" size={16} className="text-green-600" />
              <span className="text-sm text-green-600">+8.3% к прошлому месяцу</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Средний чек</p>
                <p className="text-3xl font-bold">{salesData.averageOrder.toLocaleString()} ₽</p>
              </div>
              <Icon name="Receipt" size={32} className="text-purple-600" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Icon name="TrendingUp" size={16} className="text-green-600" />
              <span className="text-sm text-green-600">+3.7% к прошлому месяцу</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Новые клиенты</p>
                <p className="text-3xl font-bold">{salesData.newCustomers}</p>
              </div>
              <Icon name="UserPlus" size={32} className="text-orange-600" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Icon name="TrendingUp" size={16} className="text-green-600" />
              <span className="text-sm text-green-600">+18.2% к прошлому месяцу</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Постоянные клиенты</p>
                <p className="text-3xl font-bold">{salesData.returningCustomers}</p>
              </div>
              <Icon name="Users" size={32} className="text-indigo-600" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Icon name="TrendingUp" size={16} className="text-green-600" />
              <span className="text-sm text-green-600">+5.1% к прошлому месяцу</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Конверсия</p>
                <p className="text-3xl font-bold">{salesData.conversionRate}%</p>
              </div>
              <Icon name="Target" size={32} className="text-red-600" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Icon name="TrendingUp" size={16} className="text-green-600" />
              <span className="text-sm text-green-600">+0.8% к прошлому месяцу</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="categories">По категориям</TabsTrigger>
          <TabsTrigger value="products">Топ товары</TabsTrigger>
          <TabsTrigger value="customers">Клиенты</TabsTrigger>
          <TabsTrigger value="traffic">Трафик</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Продажи по категориям</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.orders} заказов</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold">{category.sales.toLocaleString()} ₽</p>
                      <div className="flex items-center gap-1">
                        <Icon 
                          name={getGrowthIcon(category.growth) as any} 
                          size={14} 
                          className={getGrowthColor(category.growth)} 
                        />
                        <span className={`text-sm ${getGrowthColor(category.growth)}`}>
                          {Math.abs(category.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Топ-5 товаров по продажам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-blue-600">{index + 1}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-gray-600">Продано: {product.sales} шт</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold">{product.revenue.toLocaleString()} ₽</p>
                      <p className="text-sm text-gray-600">Выручка</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Метрики клиентов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name={metric.icon as any} size={24} className="text-blue-600" />
                        <div>
                          <h4 className="font-semibold">{metric.metric}</h4>
                          <div className="flex items-center gap-1">
                            <Icon 
                              name={getGrowthIcon(metric.change) as any} 
                              size={14} 
                              className={getGrowthColor(metric.change)} 
                            />
                            <span className={`text-sm ${getGrowthColor(metric.change)}`}>
                              {metric.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Сегментация клиентов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">VIP-клиенты</h4>
                      <p className="text-sm text-gray-600">Покупки свыше 100,000 ₽</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-600">23</div>
                      <div className="text-sm text-gray-500">1.9%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Постоянные</h4>
                      <p className="text-sm text-gray-600">Покупки 20,000-100,000 ₽</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <div className="text-sm text-gray-500">12.6%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Активные</h4>
                      <p className="text-sm text-gray-600">Покупки 5,000-20,000 ₽</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">445</div>
                      <div className="text-sm text-gray-500">36.1%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Новички</h4>
                      <p className="text-sm text-gray-600">Покупки до 5,000 ₽</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-600">610</div>
                      <div className="text-sm text-gray-500">49.4%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Источники трафика</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{source.source}</span>
                        <span className="text-sm text-gray-600">{source.visitors} посетителей</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold">{source.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Поведение пользователей</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="MousePointer" size={32} className="mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">6,543</div>
                    <p className="text-sm text-gray-600">Уникальных посетителей</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="Eye" size={32} className="mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">12,890</div>
                    <p className="text-sm text-gray-600">Просмотров страниц</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="Clock" size={32} className="mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold">4:32</div>
                    <p className="text-sm text-gray-600">Среднее время на сайте</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="BarChart" size={32} className="mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold">68%</div>
                    <p className="text-sm text-gray-600">Показатель отказов</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Тренды продаж по месяцам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-6 lg:grid-cols-12 gap-2">
              {monthlyTrends.map((month, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{month.month}</div>
                  <div 
                    className="bg-blue-600 rounded-t-md mx-auto"
                    style={{ 
                      height: `${(month.revenue / 2520000) * 100}px`,
                      width: '20px'
                    }}
                  />
                  <div className="text-xs font-semibold mt-1">
                    {(month.revenue / 1000000).toFixed(1)}М
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center text-sm text-gray-600">
              Выручка по месяцам (в миллионах рублей)
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Ключевые показатели</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border-b">
                <span>Коэффициент удержания клиентов</span>
                <span className="font-bold text-green-600">87.3%</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b">
                <span>Средняя частота покупок</span>
                <span className="font-bold">2.4 раза в месяц</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b">
                <span>Время жизни клиента (LTV)</span>
                <span className="font-bold">45,600 ₽</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b">
                <span>Стоимость привлечения (CAC)</span>
                <span className="font-bold">890 ₽</span>
              </div>
              <div className="flex justify-between items-center p-3">
                <span>ROI маркетинга</span>
                <span className="font-bold text-green-600">340%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Прогнозы на следующий месяц</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-900">Ожидаемая выручка</h4>
                    <p className="text-sm text-blue-700">На основе трендов</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    2.6М ₽
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-green-900">Прогноз заказов</h4>
                    <p className="text-sm text-green-700">Ожидаемое количество</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    1,350
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-purple-900">Новые клиенты</h4>
                    <p className="text-sm text-purple-700">Планируемое привлечение</p>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    180
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-orange-900">Рост продаж</h4>
                    <p className="text-sm text-orange-700">Прогнозируемый рост</p>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    +8.5%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Рекомендации для роста</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 border rounded-lg">
              <Icon name="TrendingUp" size={32} className="text-blue-600 mb-3" />
              <h4 className="font-semibold mb-2">Увеличить конверсию</h4>
              <p className="text-sm text-gray-600">
                Оптимизировать страницы товаров и упростить процесс заказа
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <Icon name="Users" size={32} className="text-green-600 mb-3" />
              <h4 className="font-semibold mb-2">Удержание клиентов</h4>
              <p className="text-sm text-gray-600">
                Развивать программу лояльности и персональные предложения
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <Icon name="Package" size={32} className="text-purple-600 mb-3" />
              <h4 className="font-semibold mb-2">Расширить ассортимент</h4>
              <p className="text-sm text-gray-600">
                Добавить товары в популярных категориях
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <Icon name="Megaphone" size={32} className="text-orange-600 mb-3" />
              <h4 className="font-semibold mb-2">Усилить маркетинг</h4>
              <p className="text-sm text-gray-600">
                Увеличить инвестиции в рекламу в соцсетях
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button size="lg">
          <Icon name="Download" className="mr-2" />
          Скачать полный отчет
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsPage;