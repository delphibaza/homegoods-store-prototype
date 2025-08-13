import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

interface CatalogPageProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product) => void;
  isAdminMode: boolean;
  deleteProduct: (id: number) => void;
  newProduct: {
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
  };
  setNewProduct: (product: any) => void;
  addProduct: () => void;
}

const CatalogPage = ({
  products,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  addToCart,
  isAdminMode,
  deleteProduct,
  newProduct,
  setNewProduct,
  addProduct
}: CatalogPageProps) => {
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
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
                  onChange={(e) => setNewProduct((prev: any) => ({ ...prev, name: e.target.value }))}
                  placeholder="Введите название товара"
                />
              </div>
              <div>
                <Label htmlFor="productPrice">Цена (₽)</Label>
                <Input
                  id="productPrice"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct((prev: any) => ({ ...prev, price: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="productCategory">Категория</Label>
                <select
                  id="productCategory"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct((prev: any) => ({ ...prev, category: e.target.value }))}
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
                  onChange={(e) => setNewProduct((prev: any) => ({ ...prev, description: e.target.value }))}
                  placeholder="Описание товара"
                />
              </div>
            </div>
            <Button onClick={addProduct}>Добавить товар</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CatalogPage;