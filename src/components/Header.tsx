import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  quantity: number;
}

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
}

const Header = ({ activeTab, setActiveTab, cart, isAdminMode, setIsAdminMode }: HeaderProps) => {
  return (
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
  );
};

export default Header;