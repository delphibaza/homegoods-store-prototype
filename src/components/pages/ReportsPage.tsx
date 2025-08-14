import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Report {
  id: string;
  name: string;
  type: 'sales' | 'inventory' | 'financial' | 'customer';
  description: string;
  lastGenerated: string;
  format: 'PDF' | 'Excel' | 'CSV';
  size: string;
  automated: boolean;
}

const ReportsPage = () => {
  const [reports] = useState<Report[]>([
    {
      id: 'RPT-001',
      name: 'Отчет по продажам',
      type: 'sales',
      description: 'Детальный анализ продаж по периодам, категориям и товарам',
      lastGenerated: '16.12.2024 18:30',
      format: 'PDF',
      size: '2.3 МБ',
      automated: true
    },
    {
      id: 'RPT-002',
      name: 'Складские остатки',
      type: 'inventory',
      description: 'Текущие остатки товаров на складе с анализом оборачиваемости',
      lastGenerated: '16.12.2024 09:00',
      format: 'Excel',
      size: '1.8 МБ',
      automated: true
    },
    {
      id: 'RPT-003',
      name: 'Финансовый отчет',
      type: 'financial',
      description: 'Прибыли, убытки, движение денежных средств',
      lastGenerated: '15.12.2024 23:59',
      format: 'PDF',
      size: '3.1 МБ',
      automated: true
    },
    {
      id: 'RPT-004',
      name: 'Анализ клиентов',
      type: 'customer',
      description: 'Сегментация клиентов, анализ покупательского поведения',
      lastGenerated: '15.12.2024 12:00',
      format: 'Excel',
      size: '4.2 МБ',
      automated: false
    },
    {
      id: 'RPT-005',
      name: 'ABC-анализ товаров',
      type: 'inventory',
      description: 'Классификация товаров по важности и доходности',
      lastGenerated: '14.12.2024 16:45',
      format: 'PDF',
      size: '1.5 МБ',
      automated: false
    },
    {
      id: 'RPT-006',
      name: 'Отчет по возвратам',
      type: 'sales',
      description: 'Анализ возвращенных товаров и причин возвратов',
      lastGenerated: '13.12.2024 14:20',
      format: 'CSV',
      size: '0.8 МБ',
      automated: false
    }
  ]);

  const [customReport, setCustomReport] = useState({
    name: '',
    type: 'sales',
    dateFrom: '',
    dateTo: '',
    categories: [] as string[],
    format: 'PDF',
    includeCharts: true,
    includeDetails: true
  });

  const reportTemplates = [
    {
      name: 'Ежедневный отчет',
      description: 'Продажи, остатки, ключевые показатели за день',
      icon: 'Calendar',
      frequency: 'Ежедневно в 20:00'
    },
    {
      name: 'Недельный анализ',
      description: 'Сводка по неделе с трендами и сравнениями',
      icon: 'BarChart',
      frequency: 'Понедельник в 9:00'
    },
    {
      name: 'Месячный отчет',
      description: 'Полный анализ деятельности за месяц',
      icon: 'TrendingUp',
      frequency: '1 число в 10:00'
    },
    {
      name: 'Квартальная отчетность',
      description: 'Финансовые показатели и планы на квартал',
      icon: 'PieChart',
      frequency: 'Начало квартала'
    }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      'sales': 'bg-blue-100 text-blue-800',
      'inventory': 'bg-green-100 text-green-800',
      'financial': 'bg-purple-100 text-purple-800',
      'customer': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeText = (type: string) => {
    const texts = {
      'sales': 'Продажи',
      'inventory': 'Склад',
      'financial': 'Финансы',
      'customer': 'Клиенты'
    };
    return texts[type as keyof typeof texts] || type;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'sales': 'ShoppingBag',
      'inventory': 'Package',
      'financial': 'DollarSign',
      'customer': 'Users'
    };
    return icons[type as keyof typeof icons] || 'FileText';
  };

  const generateCustomReport = () => {
    if (customReport.name && customReport.dateFrom && customReport.dateTo) {
      alert(`Отчет "${customReport.name}" сгенерирован и отправлен на скачивание!`);
      setCustomReport({
        name: '',
        type: 'sales',
        dateFrom: '',
        dateTo: '',
        categories: [],
        format: 'PDF',
        includeCharts: true,
        includeDetails: true
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Отчеты и аналитика</h1>
          <p className="text-gray-600">Генерация отчетов и анализ бизнес-показателей</p>
        </div>
        <Button>
          <Icon name="Plus" className="mr-2" />
          Создать отчет
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="FileText" size={48} className="mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold mb-2">{reports.length}</div>
            <p className="text-gray-600">Доступных отчетов</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Zap" size={48} className="mx-auto mb-4 text-green-600" />
            <div className="text-3xl font-bold mb-2">{reports.filter(r => r.automated).length}</div>
            <p className="text-gray-600">Автоматических</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Download" size={48} className="mx-auto mb-4 text-purple-600" />
            <div className="text-3xl font-bold mb-2">1,234</div>
            <p className="text-gray-600">Скачиваний в месяц</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Clock" size={48} className="mx-auto mb-4 text-orange-600" />
            <div className="text-3xl font-bold mb-2">2.5</div>
            <p className="text-gray-600">Мин среднее время</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="available">Готовые отчеты</TabsTrigger>
          <TabsTrigger value="custom">Создать отчет</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
          <TabsTrigger value="scheduled">Расписание</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <div className="space-y-4">
            {reports.map(report => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Icon name={getTypeIcon(report.type) as any} size={32} className="text-blue-600" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{report.name}</h3>
                          <Badge className={getTypeColor(report.type)}>
                            {getTypeText(report.type)}
                          </Badge>
                          {report.automated && (
                            <Badge variant="outline">
                              <Icon name="Zap" size={12} className="mr-1" />
                              Авто
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{report.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Обновлен: {report.lastGenerated}</span>
                          <span>Формат: {report.format}</span>
                          <span>Размер: {report.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button size="sm">
                        <Icon name="Download" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Создать пользовательский отчет</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reportName">Название отчета</Label>
                    <Input
                      id="reportName"
                      value={customReport.name}
                      onChange={(e) => setCustomReport(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Мой отчет по продажам"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="reportType">Тип отчета</Label>
                    <select
                      id="reportType"
                      value={customReport.type}
                      onChange={(e) => setCustomReport(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="sales">Продажи</option>
                      <option value="inventory">Склад</option>
                      <option value="financial">Финансы</option>
                      <option value="customer">Клиенты</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateFrom">Дата с</Label>
                      <Input
                        id="dateFrom"
                        type="date"
                        value={customReport.dateFrom}
                        onChange={(e) => setCustomReport(prev => ({ ...prev, dateFrom: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateTo">Дата по</Label>
                      <Input
                        id="dateTo"
                        type="date"
                        value={customReport.dateTo}
                        onChange={(e) => setCustomReport(prev => ({ ...prev, dateTo: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="reportFormat">Формат</Label>
                    <select
                      id="reportFormat"
                      value={customReport.format}
                      onChange={(e) => setCustomReport(prev => ({ ...prev, format: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="PDF">PDF</option>
                      <option value="Excel">Excel</option>
                      <option value="CSV">CSV</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Дополнительные опции</Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="includeCharts"
                          checked={customReport.includeCharts}
                          onChange={(e) => setCustomReport(prev => ({ ...prev, includeCharts: e.target.checked }))}
                          className="rounded"
                        />
                        <Label htmlFor="includeCharts">Включить графики и диаграммы</Label>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="includeDetails"
                          checked={customReport.includeDetails}
                          onChange={(e) => setCustomReport(prev => ({ ...prev, includeDetails: e.target.checked }))}
                          className="rounded"
                        />
                        <Label htmlFor="includeDetails">Детализированные данные</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Предварительный просмотр</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>Тип: {getTypeText(customReport.type)}</p>
                      <p>Период: {customReport.dateFrom || 'не выбрано'} - {customReport.dateTo || 'не выбрано'}</p>
                      <p>Формат: {customReport.format}</p>
                      <p>Графики: {customReport.includeCharts ? 'Да' : 'Нет'}</p>
                    </div>
                  </div>
                  
                  <Button onClick={generateCustomReport} className="w-full">
                    <Icon name="FileText" className="mr-2" />
                    Сгенерировать отчет
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid md:grid-cols-2 gap-6">
            {reportTemplates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Icon name={template.icon as any} size={32} className="text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-gray-600">{template.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Частота генерации:</p>
                      <p className="font-semibold">{template.frequency}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Настроить
                      </Button>
                      <Button size="sm">
                        Создать
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Автоматические отчеты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.filter(report => report.automated).map(report => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Icon name={getTypeIcon(report.type) as any} size={24} className="text-blue-600" />
                      <div>
                        <h4 className="font-semibold">{report.name}</h4>
                        <p className="text-sm text-gray-600">
                          Последний: {report.lastGenerated} • Формат: {report.format}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        <Icon name="Zap" size={12} className="mr-1" />
                        Активен
                      </Badge>
                      <Button variant="outline" size="sm">
                        Настроить
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Ключевые показатели</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <Icon name="TrendingUp" size={32} className="mx-auto mb-3 text-green-600" />
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-sm text-gray-600">Рост продаж</p>
              <p className="text-xs text-gray-500">к прошлому месяцу</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="Users" size={32} className="mx-auto mb-3 text-blue-600" />
              <div className="text-2xl font-bold">87.3%</div>
              <p className="text-sm text-gray-600">Удержание клиентов</p>
              <p className="text-xs text-gray-500">повторные покупки</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="Package" size={32} className="mx-auto mb-3 text-purple-600" />
              <div className="text-2xl font-bold">4.2</div>
              <p className="text-sm text-gray-600">Оборачиваемость</p>
              <p className="text-xs text-gray-500">раз в месяц</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Icon name="Target" size={32} className="mx-auto mb-3 text-orange-600" />
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-sm text-gray-600">Конверсия</p>
              <p className="text-xs text-gray-500">посетители в покупатели</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Быстрые отчеты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Calendar" className="mr-3" />
              Продажи за сегодня
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="BarChart" className="mr-3" />
              Топ-10 товаров за неделю
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Users" className="mr-3" />
              Новые клиенты за месяц
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="AlertTriangle" className="mr-3" />
              Товары с низкими остатками
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="TrendingDown" className="mr-3" />
              Медленно продающиеся товары
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="RotateCcw" className="mr-3" />
              Возвраты за период
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Настройки отчетов</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Email-рассылка отчетов</h4>
                <Badge className="bg-green-100 text-green-800">Включена</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Автоматическая отправка ежедневных отчетов на email руководства
              </p>
              <Button variant="outline" size="sm">
                Настроить получателей
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Архивирование</h4>
                <Badge className="bg-blue-100 text-blue-800">Настроено</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Автоматическое архивирование отчетов старше 6 месяцев
              </p>
              <Button variant="outline" size="sm">
                Изменить настройки
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Уведомления</h4>
                <Badge className="bg-yellow-100 text-yellow-800">Частично</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Push-уведомления о готовности важных отчетов
              </p>
              <Button variant="outline" size="sm">
                Настроить уведомления
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Экспорт данных</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <Icon name="FileText" size={48} className="mx-auto mb-4 text-red-600" />
              <h4 className="font-semibold mb-2">PDF отчеты</h4>
              <p className="text-sm text-gray-600 mb-4">
                Готовые к печати отчеты с графиками и таблицами
              </p>
              <Button variant="outline" className="w-full">
                Скачать PDF
              </Button>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <Icon name="FileSpreadsheet" size={48} className="mx-auto mb-4 text-green-600" />
              <h4 className="font-semibold mb-2">Excel файлы</h4>
              <p className="text-sm text-gray-600 mb-4">
                Данные для дальнейшего анализа и обработки
              </p>
              <Button variant="outline" className="w-full">
                Скачать Excel
              </Button>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <Icon name="Database" size={48} className="mx-auto mb-4 text-blue-600" />
              <h4 className="font-semibold mb-2">CSV данные</h4>
              <p className="text-sm text-gray-600 mb-4">
                Сырые данные для импорта в другие системы
              </p>
              <Button variant="outline" className="w-full">
                Скачать CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Нужен специальный отчет?</h3>
        <p className="text-gray-600 mb-6">
          Наши аналитики могут подготовить индивидуальный отчет под ваши потребности.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Icon name="Users" className="mr-2" />
            Связаться с аналитиком
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="HelpCircle" className="mr-2" />
            Помощь по отчетам
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;