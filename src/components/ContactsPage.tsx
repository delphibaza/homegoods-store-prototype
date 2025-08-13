import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ContactsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Контакты</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Наши контакты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={20} className="text-blue-600" />
              <span>+7 (495) 123-45-67</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Mail" size={20} className="text-blue-600" />
              <span>info@hoztovary.ru</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={20} className="text-blue-600" />
              <span>г. Москва, ул. Строительная, д. 10</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Clock" size={20} className="text-blue-600" />
              <span>Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-18:00</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Доставка и оплата</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Способы доставки:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Курьерская доставка по Москве</li>
                <li>Самовывоз из магазина</li>
                <li>Доставка в регионы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Способы оплаты:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Наличными при получении</li>
                <li>Банковской картой</li>
                <li>Безналичный расчет</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactsPage;