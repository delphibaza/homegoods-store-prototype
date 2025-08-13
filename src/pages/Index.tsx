import { useState } from 'react';
import Header from '@/components/Header';
import HomePage from '@/components/HomePage';
import CatalogPage from '@/components/CatalogPage';
import CategoriesPage from '@/components/CategoriesPage';
import CartPage from '@/components/CartPage';
import ContactsPage from '@/components/ContactsPage';

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
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <HomePage
            categories={categories}
            products={products}
            addToCart={addToCart}
            setActiveTab={setActiveTab}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogPage
            products={products}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            addToCart={addToCart}
            isAdminMode={isAdminMode}
            deleteProduct={deleteProduct}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            addProduct={addProduct}
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesPage
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            setActiveTab={setActiveTab}
            isAdminMode={isAdminMode}
            deleteCategory={deleteCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            addCategory={addCategory}
          />
        )}

        {activeTab === 'cart' && (
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'contacts' && <ContactsPage />}
      </div>
    </div>
  );
};

export default Index;