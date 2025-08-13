import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface CartItem extends Product {
  quantity: number;
}

interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  setActiveTab: (tab: string) => void;
}

const CartPage = ({
  cart,
  removeFromCart,
  updateQuantity,
  setActiveTab
}: CartPageProps) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
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
  );
};

export default CartPage;