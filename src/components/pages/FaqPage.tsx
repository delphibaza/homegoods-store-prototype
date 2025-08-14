import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FaqPage = () => {
  const [faqs] = useState<FAQ[]>([
    {
      id: 1,
      question: 'Как оформить заказ?',
      answer: 'Вы можете оформить заказ несколькими способами: через наш сайт, по телефону +7 (495) 123-45-67 или посетив наш магазин. При оформлении заказа через сайт добавьте нужные товары в корзину и следуйте инструкциям на странице оформления заказа.',
      category: 'Заказы'
    },
    {
      id: 2,
      question: 'Какие способы оплаты вы принимаете?',
      answer: 'Мы принимаем оплату банковскими картами (Visa, MasterCard, МИР), наличными при получении, безналичный расчет для юридических лиц, а также электронные кошельки (ЮMoney, QIWI, WebMoney).',
      category: 'Оплата'
    },
    {
      id: 3,
      question: 'Сколько стоит доставка?',
      answer: 'Стоимость доставки зависит от зоны: в пределах МКАД - 300₽, до 10 км от МКАД - 400₽, до 30 км - 600₽, до 50 км - 800₽. При заказе от 5000₽ доставка по Москве бесплатная.',
      category: 'Доставка'
    },
    {
      id: 4,
      question: 'Можно ли вернуть товар?',
      answer: 'Да, вы можете вернуть товар в течение 14 дней с момента покупки, если он не был в употреблении и сохранил товарный вид. Для возврата необходим чек и упаковка товара.',
      category: 'Возврат'
    },
    {
      id: 5,
      question: 'Есть ли гарантия на товары?',
      answer: 'На все товары предоставляется гарантия согласно законодательству РФ. На инструменты и технику - гарантия производителя от 1 до 3 лет. Подробную информацию о гарантии уточняйте у консультантов.',
      category: 'Гарантия'
    },
    {
      id: 6,
      question: 'Работаете ли вы с юридическими лицами?',
      answer: 'Да, мы работаем с юридическими лицами. Предоставляем все необходимые документы, работаем по безналичному расчету, предлагаем специальные условия для оптовых покупателей.',
      category: 'Юридические лица'
    },
    {
      id: 7,
      question: 'Как узнать о наличии товара?',
      answer: 'Актуальную информацию о наличии товара можно узнать на сайте, по телефону или в магазине. На сайте статус наличия обновляется в режиме реального времени.',
      category: 'Товары'
    },
    {
      id: 8,
      question: 'Предоставляете ли скидки?',
      answer: 'Да, мы регулярно проводим акции и предоставляем скидки. Постоянным клиентам предлагаем накопительную систему скидок. Следите за новостями на сайте и в наших социальных сетях.',
      category: 'Скидки'
    },
    {
      id: 9,
      question: 'Можно ли заказать товар, которого нет в наличии?',
      answer: 'Да, мы можем заказать товар под заказ. Срок поставки обычно составляет 3-7 дней. Для оформления заказа свяжитесь с нашими менеджерами.',
      category: 'Товары'
    },
    {
      id: 10,
      question: 'Есть ли у вас программа лояльности?',
      answer: 'Да, у нас действует программа лояльности. Постоянные клиенты получают накопительные скидки, доступ к специальным предложениям и приоритетное обслуживание.',
      category: 'Программа лояльности'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [questionText, setQuestionText] = useState('');

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const submitQuestion = () => {
    if (question && email && questionText) {
      // Здесь можно добавить логику отправки вопроса
      alert('Ваш вопрос отправлен! Мы ответим в ближайшее время.');
      setQuestion('');
      setEmail('');
      setQuestionText('');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Часто задаваемые вопросы</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Здесь вы найдете ответы на самые популярные вопросы наших клиентов. 
          Если не нашли ответ, задайте свой вопрос!
        </p>
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
              {category === 'all' ? 'Все вопросы' : category}
            </Button>
          ))}
        </div>
        
        <div className="w-full md:w-auto">
          <Input
            placeholder="Поиск по вопросам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-64"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map(faq => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon name="HelpCircle" size={20} className="text-blue-600 flex-shrink-0" />
                    <span className="font-medium">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <div className="flex items-start gap-3">
                    <Icon name="MessageCircle" size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Вопросы не найдены</h3>
              <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Задать вопрос</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="questionTitle">Тема вопроса</Label>
              <Input
                id="questionTitle"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Кратко опишите суть вопроса"
              />
            </div>
            
            <div>
              <Label htmlFor="questionEmail">Email для ответа</Label>
              <Input
                id="questionEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <Label htmlFor="questionText">Подробное описание</Label>
              <Textarea
                id="questionText"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Опишите ваш вопрос подробнее"
                rows={4}
              />
            </div>
            
            <Button onClick={submitQuestion} className="w-full">
              <Icon name="Send" className="mr-2" />
              Отправить вопрос
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Другие способы связи</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Phone" size={32} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Телефон</h4>
                  <p className="text-gray-600">+7 (495) 123-45-67</p>
                  <p className="text-sm text-gray-500">Пн-Пт: 9:00-19:00</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="Mail" size={32} className="text-green-600" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">info@hoztovary.ru</p>
                  <p className="text-sm text-gray-500">Ответим в течение 24 часов</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="MessageCircle" size={32} className="text-purple-600" />
                <div>
                  <h4 className="font-semibold">Онлайн-чат</h4>
                  <p className="text-gray-600">Чат на сайте</p>
                  <p className="text-sm text-gray-500">Пн-Пт: 9:00-18:00</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Icon name="MapPin" size={32} className="text-orange-600" />
                <div>
                  <h4 className="font-semibold">Адрес магазина</h4>
                  <p className="text-gray-600">г. Москва, ул. Строительная, д. 10</p>
                  <p className="text-sm text-gray-500">Пн-Сб: 9:00-19:00, Вс: 10:00-18:00</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Быстрый ответ</h4>
                  <p className="text-sm text-blue-700">
                    Для получения быстрого ответа рекомендуем сначала ознакомиться с FAQ, 
                    а затем обращаться по телефону или в онлайн-чат.
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

export default FaqPage;