import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  inStock: boolean;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Сантехника', description: 'Трубы, фитинги, краны', icon: 'Wrench' },
    { id: 2, name: 'Инструменты', description: 'Ручные и электроинструменты', icon: 'Hammer' },
    { id: 3, name: 'Уборка', description: 'Моющие средства, инвентарь', icon: 'Spray' },
    { id: 4, name: 'Садовые товары', description: 'Для дачи и огорода', icon: 'Trees' }
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Универсальное моющее средство', price: 299, category: 'Уборка', description: 'Эффективное средство для всех поверхностей', image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg', inStock: true },
    { id: 2, name: 'Набор отверток', price: 899, category: 'Инструменты', description: 'Профессиональный набор отверток', image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg', inStock: true },
    { id: 3, name: 'Смеситель для кухни', price: 3499, category: 'Сантехника', description: 'Качественный однорычажный смеситель', image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg', inStock: true },
    { id: 4, name: 'Садовый шланг 25м', price: 1299, category: 'Садовые товары', description: 'Прочный поливочный шланг', image: '/img/51242ed8-ca8a-4d87-9daa-2ceb0472cfb7.jpg', inStock: false }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Новая категория
  const [newCategory, setNewCategory] = useState({ name: '', description: '', icon: 'Package' });
  
  // Новый товар
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
    image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg'
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addCategory = () => {
    if (newCategory.name.trim()) {
      setCategories(prev => [...prev, {
        id: Date.now(),
        name: newCategory.name,
        description: newCategory.description,
        icon: newCategory.icon
      }]);
      setNewCategory({ name: '', description: '', icon: 'Package' });
    }
  };

  const deleteCategory = (id: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const addProduct = () => {
    if (newProduct.name.trim() && newProduct.price > 0) {
      setProducts(prev => [...prev, {
        id: Date.now(),
        name: newProduct.name,
        price: newProduct.price,
        category: newProduct.category,
        description: newProduct.description,
        image: newProduct.image,
        inStock: true
      }]);
      setNewProduct({
        name: '',
        price: 0,
        category: '',
        description: '',
        image: '/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg'
      });
    }
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">ХозТовары</h1>
              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`${activeTab === 'home' ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition-colors`}
                >
                  Главная
                </button>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`${activeTab === 'catalog' ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition-colors`}
                >
                  Каталог
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`${activeTab === 'categories' ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition-colors`}
                >
                  Категории
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`${activeTab === 'contacts' ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition-colors`}
                >
                  Контакты
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={isAdminMode ? "default" : "outline"}
                onClick={() => setIsAdminMode(!isAdminMode)}
                size="sm"
              >
                <Icon name="Settings" size={16} />
                Админ
              </Button>
              <Button
                onClick={() => setActiveTab('cart')}
                variant="outline"
                className="relative"
              >
                <Icon name="ShoppingCart" size={16} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Главная страница */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Всё для дома<br />и ремонта
                  </h2>
                  <p className="text-xl mb-6 text-blue-100">
                    Широкий ассортимент качественных хозяйственных товаров по доступным ценам
                  </p>
                  <Button
                    onClick={() => setActiveTab('catalog')}
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Перейти в каталог
                  </Button>
                </div>
                <div className="text-center">
                  <img
                    src="/img/e9e39758-e5f6-47eb-a8b1-aa65fa91cb4e.jpg"
                    alt="Хозяйственные товары"
                    className="rounded-lg shadow-lg max-w-full h-auto"
                  />
                </div>
              </div>
            </section>

            {/* Популярные категории */}
            <section>
              <h3 className="text-2xl font-bold mb-6">Популярные категории</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map(category => (
                  <Card
                    key={category.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setActiveTab('catalog');
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <Icon name={category.icon as any} size={32} className="mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Популярные товары */}
            <section>
              <h3 className="text-2xl font-bold mb-6">Популярные товары</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map(product => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <h4 className="font-semibold mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-600">{product.price} ₽</span>
                        <Button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          size="sm"
                        >
                          {product.inStock ? 'В корзину' : 'Нет в наличии'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Каталог товаров */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <h2 className="text-2xl font-bold">Каталог товаров</h2>
              <div className="flex gap-4 w-full md:w-auto">
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Все категории</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h4 className="font-semibold mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">{product.price} ₽</span>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          size="sm"
                        >
                          {product.inStock ? 'В корзину' : 'Нет в наличии'}
                        </Button>
                        {isAdminMode && (
                          <Button
                            onClick={() => deleteProduct(product.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {isAdminMode && (
              <Card>
                <CardHeader>
                  <CardTitle>Добавить новый товар</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productName">Название товара</Label>
                      <Input
                        id="productName"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Введите название товара"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productPrice">Цена (₽)</Label>
                      <Input
                        id="productPrice"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productCategory">Категория</Label>
                      <select
                        id="productCategory"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="">Выберите категорию</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="productDescription">Описание</Label>
                      <Textarea
                        id="productDescription"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Описание товара"
                      />
                    </div>
                  </div>
                  <Button onClick={addProduct}>Добавить товар</Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Категории товаров */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Категории товаров</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon name={category.icon as any} size={32} className="text-blue-600" />
                      {isAdminMode && (
                        <Button
                          onClick={() => deleteCategory(category.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-500 mb-4">{category.description}</p>
                    <Button
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setActiveTab('catalog');
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Перейти в категорию
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {isAdminMode && (
              <Card>
                <CardHeader>
                  <CardTitle>Добавить новую категорию</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="categoryName">Название категории</Label>
                      <Input
                        id="categoryName"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Введите название категории"
                      />
                    </div>
                    <div>
                      <Label htmlFor="categoryIcon">Иконка</Label>
                      <select
                        id="categoryIcon"
                        value={newCategory.icon}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, icon: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="Package">Package</option>
                        <option value="Wrench">Wrench</option>
                        <option value="Hammer">Hammer</option>
                        <option value="Spray">Spray</option>
                        <option value="Trees">Trees</option>
                        <option value="Home">Home</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="categoryDescription">Описание</Label>
                    <Textarea
                      id="categoryDescription"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Описание категории"
                    />
                  </div>
                  <Button onClick={addCategory}>Добавить категорию</Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Корзина покупок */}
        {activeTab === 'cart' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Корзина покупок</h2>
            {cart.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Корзина пуста</h3>
                  <p className="text-gray-500 mb-4">Добавьте товары из каталога</p>
                  <Button onClick={() => setActiveTab('catalog')}>
                    Перейти в каталог
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map(item => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.category}</p>
                            <p className="text-blue-600 font-semibold">{item.price} ₽</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              variant="outline"
                              size="sm"
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              variant="outline"
                              size="sm"
                            >
                              +
                            </Button>
                            <Button
                              onClick={() => removeFromCart(item.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Итого</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Сумма:</span>
                        <span>{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                      <Button
                        onClick={() => setActiveTab('catalog')}
                        variant="outline"
                        className="w-full"
                      >
                        Продолжить покупки
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Контакты */}
        {activeTab === 'contacts' && (
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
        )}
      </div>
    </div>
  );
};

export default Index;