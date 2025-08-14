import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface JobVacancy {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  posted: string;
  urgent: boolean;
}

const CareersPage = () => {
  const [vacancies] = useState<JobVacancy[]>([
    {
      id: 1,
      title: 'Менеджер по продажам',
      department: 'Продажи',
      location: 'Москва',
      type: 'Полная занятость',
      salary: '60,000 - 80,000 ₽',
      description: 'Ищем активного менеджера по продажам для работы с клиентами и развития продаж хозяйственных товаров.',
      requirements: [
        'Опыт работы в продажах от 2 лет',
        'Знание товаров для дома и ремонта',
        'Коммуникабельность и клиентоориентированность',
        'Знание ПК на уровне пользователя'
      ],
      responsibilities: [
        'Консультирование клиентов по товарам',
        'Обработка заказов и ведение клиентской базы',
        'Достижение плановых показателей продаж',
        'Участие в выставках и презентациях'
      ],
      benefits: [
        'Официальное трудоустройство',
        'Медицинская страховка',
        'Обучение за счет компании',
        'Корпоративные скидки'
      ],
      posted: '10.12.2024',
      urgent: true
    },
    {
      id: 2,
      title: 'Кладовщик',
      department: 'Склад',
      location: 'Москва',
      type: 'Полная занятость',
      salary: '45,000 - 55,000 ₽',
      description: 'Требуется ответственный кладовщик для работы на складе хозяйственных товаров.',
      requirements: [
        'Опыт работы на складе от 1 года',
        'Знание складских программ',
        'Внимательность и ответственность',
        'Физическая выносливость'
      ],
      responsibilities: [
        'Приемка и размещение товара',
        'Комплектация заказов',
        'Ведение складской документации',
        'Инвентаризация товаров'
      ],
      benefits: [
        'Стабильная заработная плата',
        'Социальный пакет',
        'Спецодежда',
        'Питание на рабочем месте'
      ],
      posted: '08.12.2024',
      urgent: false
    },
    {
      id: 3,
      title: 'Водитель-экспедитор',
      department: 'Логистика',
      location: 'Москва и область',
      type: 'Полная занятость',
      salary: '50,000 - 65,000 ₽',
      description: 'Ищем надежного водителя-экспедитора для доставки товаров клиентам.',
      requirements: [
        'Водительские права категории B',
        'Опыт вождения от 3 лет',
        'Знание Москвы и области',
        'Ответственность и пунктуальность'
      ],
      responsibilities: [
        'Доставка товаров клиентам',
        'Погрузка и разгрузка товара',
        'Ведение путевых листов',
        'Контроль состояния автомобиля'
      ],
      benefits: [
        'Служебный автомобиль',
        'Оплата ГСМ',
        'Премии за качественную работу',
        'Гибкий график'
      ],
      posted: '05.12.2024',
      urgent: false
    },
    {
      id: 4,
      title: 'Специалист по закупкам',
      department: 'Закупки',
      location: 'Москва',
      type: 'Полная занятость',
      salary: '70,000 - 90,000 ₽',
      description: 'Требуется опытный специалист по закупкам для работы с поставщиками и формирования ассортимента.',
      requirements: [
        'Высшее образование',
        'Опыт работы в закупках от 3 лет',
        'Знание рынка хозяйственных товаров',
        'Навыки ведения переговоров'
      ],
      responsibilities: [
        'Поиск и работа с поставщиками',
        'Анализ рынка и ценообразование',
        'Контроль качества товаров',
        'Ведение договорной работы'
      ],
      benefits: [
        'Высокая заработная плата',
        'Премии по результатам работы',
        'Профессиональное развитие',
        'Командировки'
      ],
      posted: '03.12.2024',
      urgent: true
    }
  ]);

  const [selectedVacancy, setSelectedVacancy] = useState<JobVacancy | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    motivation: ''
  });

  const benefits = [
    {
      icon: 'DollarSign',
      title: 'Конкурентная зарплата',
      description: 'Достойная оплата труда и премии по результатам'
    },
    {
      icon: 'Heart',
      title: 'Медицинская страховка',
      description: 'Полис ДМС для сотрудников и их семей'
    },
    {
      icon: 'GraduationCap',
      title: 'Обучение и развитие',
      description: 'Корпоративные тренинги и курсы повышения квалификации'
    },
    {
      icon: 'Coffee',
      title: 'Комфортные условия',
      description: 'Современный офис, кухня, зона отдыха'
    },
    {
      icon: 'Calendar',
      title: 'Гибкий график',
      description: 'Возможность удаленной работы и гибкого графика'
    },
    {
      icon: 'Gift',
      title: 'Корпоративные льготы',
      description: 'Скидки на товары, корпоративные мероприятия'
    }
  ];

  const submitApplication = () => {
    if (applicationForm.name && applicationForm.email && applicationForm.phone) {
      alert('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      setApplicationForm({ name: '', email: '', phone: '', experience: '', motivation: '' });
      setSelectedVacancy(null);
    }
  };

  if (selectedVacancy) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedVacancy(null)}>
            <Icon name="ArrowLeft" className="mr-2" />
            Назад к вакансиям
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{selectedVacancy.title}</CardTitle>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Icon name="Building" size={16} />
                        <span>{selectedVacancy.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={16} />
                        <span>{selectedVacancy.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>{selectedVacancy.type}</span>
                      </div>
                    </div>
                  </div>
                  {selectedVacancy.urgent && (
                    <Badge className="bg-red-500">Срочно</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Описание вакансии</h3>
                  <p className="text-gray-700">{selectedVacancy.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Требования</h3>
                  <ul className="space-y-2">
                    {selectedVacancy.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-600 mt-1 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Обязанности</h3>
                  <ul className="space-y-2">
                    {selectedVacancy.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon name="ArrowRight" size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Мы предлагаем</h3>
                  <ul className="space-y-2">
                    {selectedVacancy.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon name="Star" size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Откликнуться на вакансию</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg mb-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {selectedVacancy.salary}
                  </div>
                  <p className="text-sm text-blue-700">Заработная плата</p>
                </div>

                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    value={applicationForm.name}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationForm.email}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={applicationForm.phone}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Опыт работы</Label>
                  <Textarea
                    id="experience"
                    value={applicationForm.experience}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="Расскажите о вашем опыте работы"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="motivation">Мотивационное письмо</Label>
                  <Textarea
                    id="motivation"
                    value={applicationForm.motivation}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, motivation: e.target.value }))}
                    placeholder="Почему вы хотите работать у нас?"
                    rows={3}
                  />
                </div>

                <Button onClick={submitApplication} className="w-full">
                  <Icon name="Send" className="mr-2" />
                  Отправить заявку
                </Button>

                <p className="text-xs text-gray-500">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Карьера в ХозТовары</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Присоединяйтесь к нашей команде профессионалов! Мы предлагаем интересную работу, 
          достойную оплату и возможности для развития.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Users" size={48} className="mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold mb-2">50+</div>
            <p className="text-gray-600">Сотрудников в команде</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="TrendingUp" size={48} className="mx-auto mb-4 text-green-600" />
            <div className="text-3xl font-bold mb-2">15</div>
            <p className="text-gray-600">Лет успешной работы</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Award" size={48} className="mx-auto mb-4 text-purple-600" />
            <div className="text-3xl font-bold mb-2">95%</div>
            <p className="text-gray-600">Довольных сотрудников</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Почему стоит работать с нами?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <Icon name={benefit.icon as any} size={32} className="text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-6">Открытые вакансии</h2>
        <div className="space-y-4">
          {vacancies.map(vacancy => (
            <Card key={vacancy.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{vacancy.title}</h3>
                      {vacancy.urgent && (
                        <Badge className="bg-red-500">Срочно</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Icon name="Building" size={16} />
                        <span>{vacancy.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={16} />
                        <span>{vacancy.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>{vacancy.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={16} />
                        <span>{vacancy.posted}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{vacancy.description}</p>
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {vacancy.salary}
                    </div>
                    <Button onClick={() => setSelectedVacancy(vacancy)}>
                      Подробнее
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Не нашли подходящую вакансию?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Отправьте нам свое резюме, и мы свяжемся с вами, когда появится подходящая позиция.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg">
                <Icon name="Mail" className="mr-2" />
                Отправить резюме
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="Phone" className="mr-2" />
                Связаться с HR
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Контакты HR-отдела</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Icon name="User" size={24} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Елена Петрова</h4>
                  <p className="text-sm text-gray-600">HR-менеджер</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Phone" size={24} className="text-green-600" />
                <div>
                  <h4 className="font-semibold">+7 (495) 123-45-68</h4>
                  <p className="text-sm text-gray-600">Прямой номер HR</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Mail" size={24} className="text-purple-600" />
                <div>
                  <h4 className="font-semibold">hr@hoztovary.ru</h4>
                  <p className="text-sm text-gray-600">Email для резюме</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Время работы HR-отдела:</h4>
              <p className="text-sm text-gray-600">
                Понедельник - Пятница: 9:00 - 18:00<br />
                Суббота: 10:00 - 16:00<br />
                Воскресенье: выходной
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareersPage;