import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  validUntil: string;
  category: string;
  description: string;
  documentNumber: string;
  image: string;
  verified: boolean;
}

const CertificatesPage = () => {
  const [certificates] = useState<Certificate[]>([
    {
      id: 1,
      name: 'Сертификат соответствия на электроинструменты',
      issuer: 'Росстандарт',
      validUntil: '15.06.2025',
      category: 'Инструменты',
      description: 'Подтверждает соответствие электроинструментов требованиям безопасности ГОСТ Р',
      documentNumber: 'РОСС RU.АЯ46.Н08187',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Декларация соответствия на сантехнику',
      issuer: 'Росаккредитация',
      validUntil: '20.08.2025',
      category: 'Сантехника',
      description: 'Декларация о соответствии сантехнических изделий техническим регламентам',
      documentNumber: 'ЕАЭС N RU Д-RU.РА01.В.49853/20',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      verified: true
    },
    {
      id: 3,
      name: 'Сертификат качества на моющие средства',
      issuer: 'Роспотребнадзор',
      validUntil: '10.12.2025',
      category: 'Уборка',
      description: 'Подтверждает безопасность и качество бытовой химии',
      documentNumber: 'RU.77.99.11.003.Е.012345.12.20',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      verified: true
    },
    {
      id: 4,
      name: 'Фитосанитарный сертификат',
      issuer: 'Россельхознадзор',
      validUntil: '30.04.2025',
      category: 'Садовые товары',
      description: 'Сертификат на садовый инвентарь и средства защиты растений',
      documentNumber: 'ФС-77-123456',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      verified: true
    },
    {
      id: 5,
      name: 'Сертификат пожарной безопасности',
      issuer: 'МЧС России',
      validUntil: '05.03.2026',
      category: 'Безопасность',
      description: 'Подтверждает соответствие товаров требованиям пожарной безопасности',
      documentNumber: 'С-RU.ПБ25.В.12345',
      image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg',
      verified: true
    },
    {
      id: 6,
      name: 'Экологический сертификат',
      issuer: 'Росприроднадзор',
      validUntil: '18.07.2025',
      category: 'Экология',
      description: 'Подтверждает экологическую безопасность продукции',
      documentNumber: 'ЭС-77.99.88.123.Е',
      image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg',
      verified: true
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const categories = ['all', ...Array.from(new Set(certificates.map(cert => cert.category)))];

  const filteredCertificates = certificates.filter(cert => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.documentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const certificationBodies = [
    {
      name: 'Росстандарт',
      description: 'Федеральное агентство по техническому регулированию и метрологии',
      website: 'gost.ru',
      icon: 'Award'
    },
    {
      name: 'Росаккредитация',
      description: 'Федеральная служба по аккредитации',
      website: 'fsa.gov.ru',
      icon: 'Shield'
    },
    {
      name: 'Роспотребнадзор',
      description: 'Федеральная служба по надзору в сфере защиты прав потребителей',
      website: 'rospotrebnadzor.ru',
      icon: 'Users'
    },
    {
      name: 'МЧС России',
      description: 'Министерство Российской Федерации по делам гражданской обороны',
      website: 'mchs.gov.ru',
      icon: 'Flame'
    }
  ];

  const isExpiringSoon = (validUntil: string) => {
    const endDate = new Date(validUntil.split('.').reverse().join('-'));
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  if (selectedCertificate) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedCertificate(null)}>
            <Icon name="ArrowLeft" className="mr-2" />
            Назад к сертификатам
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0">
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary">{selectedCertificate.category}</Badge>
                  {selectedCertificate.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      Проверен
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-2xl font-bold mb-4">{selectedCertificate.name}</h1>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-700">Выдан:</h4>
                    <p>{selectedCertificate.issuer}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700">Номер документа:</h4>
                    <p className="font-mono text-sm">{selectedCertificate.documentNumber}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700">Действителен до:</h4>
                    <p className={isExpiringSoon(selectedCertificate.validUntil) ? 'text-orange-600 font-semibold' : ''}>
                      {selectedCertificate.validUntil}
                      {isExpiringSoon(selectedCertificate.validUntil) && (
                        <span className="ml-2 text-sm">(скоро истекает)</span>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700">Описание:</h4>
                    <p className="text-gray-600">{selectedCertificate.description}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Icon name="Download" className="mr-2" />
                    Скачать PDF
                  </Button>
                  <Button variant="outline">
                    <Icon name="ExternalLink" className="mr-2" />
                    Проверить
                  </Button>
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
        <h1 className="text-4xl font-bold mb-4">Сертификаты и документы</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Все наши товары имеют необходимые сертификаты качества и соответствия. 
          Мы гарантируем безопасность и законность всей продукции.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="FileCheck" size={48} className="mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold mb-2">{certificates.length}</div>
            <p className="text-gray-600">Сертификатов</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Shield" size={48} className="mx-auto mb-4 text-green-600" />
            <div className="text-3xl font-bold mb-2">100%</div>
            <p className="text-gray-600">Проверенных</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Building" size={48} className="mx-auto mb-4 text-purple-600" />
            <div className="text-3xl font-bold mb-2">{certificationBodies.length}</div>
            <p className="text-gray-600">Органов сертификации</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 text-orange-600" />
            <div className="text-3xl font-bold mb-2">2025</div>
            <p className="text-gray-600">Актуальные до</p>
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
        
        <div className="w-full md:w-auto">
          <Input
            placeholder="Поиск сертификатов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-64"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map(cert => (
          <Card key={cert.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {isExpiringSoon(cert.validUntil) && (
                  <Badge className="absolute top-2 right-2 bg-orange-500">
                    Скоро истекает
                  </Badge>
                )}
                {cert.verified && (
                  <Badge className="absolute top-2 left-2 bg-green-500">
                    <Icon name="CheckCircle" size={12} className="mr-1" />
                    Проверен
                  </Badge>
                )}
              </div>
              
              <div className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {cert.category}
                </Badge>
                
                <h3 className="font-semibold mb-2 line-clamp-2">{cert.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{cert.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Выдан:</span>
                    <span className="font-semibold">{cert.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Действует до:</span>
                    <span className={`font-semibold ${isExpiringSoon(cert.validUntil) ? 'text-orange-600' : ''}`}>
                      {cert.validUntil}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Номер:</span>
                    <span className="font-mono text-xs">{cert.documentNumber}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => setSelectedCertificate(cert)}
                    className="flex-1"
                    size="sm"
                  >
                    Подробнее
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Сертификаты не найдены</h3>
          <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Органы сертификации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificationBodies.map((body, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <Icon name={body.icon as any} size={48} className="mx-auto mb-4 text-blue-600" />
                <h4 className="font-semibold mb-2">{body.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{body.description}</p>
                <p className="text-xs text-blue-600">{body.website}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Проверка подлинности сертификатов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Как проверить сертификат?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Найдите номер сертификата</h4>
                    <p className="text-sm text-gray-600">На упаковке товара или в документах</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Введите номер в форму</h4>
                    <p className="text-sm text-gray-600">Воспользуйтесь формой проверки справа</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Получите результат</h4>
                    <p className="text-sm text-gray-600">Система покажет статус и детали сертификата</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Проверить сертификат</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="certNumber">Номер сертификата</Label>
                  <Input
                    id="certNumber"
                    placeholder="РОСС RU.АЯ46.Н08187"
                    className="font-mono"
                  />
                </div>
                
                <Button className="w-full">
                  <Icon name="Search" className="mr-2" />
                  Проверить подлинность
                </Button>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" className="text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Официальная проверка</h4>
                      <p className="text-sm text-blue-700">
                        Проверка осуществляется через официальные базы данных 
                        органов сертификации.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Зачем нужны сертификаты?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Icon name="Shield" size={48} className="mx-auto mb-4 text-blue-600" />
              <h4 className="font-semibold mb-2">Безопасность</h4>
              <p className="text-sm text-gray-600">
                Подтверждают безопасность товаров для здоровья и окружающей среды
              </p>
            </div>
            
            <div className="text-center">
              <Icon name="Award" size={48} className="mx-auto mb-4 text-green-600" />
              <h4 className="font-semibold mb-2">Качество</h4>
              <p className="text-sm text-gray-600">
                Гарантируют соответствие товаров заявленным характеристикам
              </p>
            </div>
            
            <div className="text-center">
              <Icon name="Scale" size={48} className="mx-auto mb-4 text-purple-600" />
              <h4 className="font-semibold mb-2">Законность</h4>
              <p className="text-sm text-gray-600">
                Подтверждают право на продажу товаров на территории РФ
              </p>
            </div>
            
            <div className="text-center">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-orange-600" />
              <h4 className="font-semibold mb-2">Доверие</h4>
              <p className="text-sm text-gray-600">
                Повышают доверие покупателей к качеству продукции
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Вопросы о сертификации?</h3>
        <p className="text-gray-600 mb-6">
          Наши специалисты ответят на все вопросы о сертификатах и документах на товары.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Icon name="Phone" className="mr-2" />
            Связаться со специалистом
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="Download" className="mr-2" />
            Скачать все сертификаты
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;