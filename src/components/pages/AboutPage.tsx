import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const AboutPage = () => {
  const achievements = [
    { icon: 'Award', title: '15 лет на рынке', description: 'Опыт работы с 2009 года' },
    { icon: 'Users', title: '50,000+ клиентов', description: 'Довольных покупателей' },
    { icon: 'Package', title: '10,000+ товаров', description: 'В нашем ассортименте' },
    { icon: 'Truck', title: 'Быстрая доставка', description: 'По всей России' }
  ];

  const team = [
    { name: 'Алексей Петров', position: 'Генеральный директор', experience: '15 лет' },
    { name: 'Мария Сидорова', position: 'Менеджер по продажам', experience: '8 лет' },
    { name: 'Дмитрий Козлов', position: 'Технический специалист', experience: '12 лет' },
    { name: 'Елена Волкова', position: 'Менеджер по закупкам', experience: '10 лет' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">О компании ХозТовары</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мы являемся ведущим поставщиком качественных хозяйственных товаров, 
          инструментов и материалов для дома и дачи уже более 15 лет.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Icon name={achievement.icon as any} size={48} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
              <p className="text-gray-500">{achievement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Наша история</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Компания "ХозТовары" была основана в 2009 году с целью предоставления качественных 
            товаров для дома, дачи и профессиональной деятельности. За годы работы мы завоевали 
            доверие тысяч клиентов благодаря надежности, качеству продукции и отличному сервису.
          </p>
          <p>
            Наш ассортимент включает более 10,000 наименований товаров от ведущих производителей. 
            Мы постоянно расширяем каталог, следим за новинками рынка и предлагаем только 
            проверенные временем решения.
          </p>
          <p>
            Сегодня мы обслуживаем как частных клиентов, так и крупные строительные компании, 
            предлагая индивидуальный подход и гибкие условия сотрудничества.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Наша команда</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="User" size={32} className="text-gray-500" />
                </div>
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.position}</p>
                <Badge variant="secondary" className="mt-2">
                  Опыт: {member.experience}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Наши преимущества</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Качественные товары</h4>
                  <p className="text-sm text-gray-600">Работаем только с проверенными поставщиками</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Конкурентные цены</h4>
                  <p className="text-sm text-gray-600">Прямые поставки от производителей</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Быстрая доставка</h4>
                  <p className="text-sm text-gray-600">Собственная служба доставки</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Профессиональные консультации</h4>
                  <p className="text-sm text-gray-600">Опытные специалисты помогут с выбором</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Гарантия качества</h4>
                  <p className="text-sm text-gray-600">Официальная гарантия на все товары</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Индивидуальный подход</h4>
                  <p className="text-sm text-gray-600">Особые условия для постоянных клиентов</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;