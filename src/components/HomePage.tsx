import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

interface HomePageProps {
  categories: Category[];
  products: Product[];
  addToCart: (product: Product) => void;
  setActiveTab: (tab: string) => void;
  setSelectedCategory: (category: string) => void;
}

const HomePage = ({ categories, products, addToCart, setActiveTab, setSelectedCategory }: HomePageProps) => {
  return (
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
  );
};

export default HomePage;