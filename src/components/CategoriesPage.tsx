import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface CategoriesPageProps {
  categories: Category[];
  setSelectedCategory: (category: string) => void;
  setActiveTab: (tab: string) => void;
  isAdminMode: boolean;
  deleteCategory: (id: number) => void;
  newCategory: {
    name: string;
    description: string;
    icon: string;
  };
  setNewCategory: (category: any) => void;
  addCategory: () => void;
}

const CategoriesPage = ({
  categories,
  setSelectedCategory,
  setActiveTab,
  isAdminMode,
  deleteCategory,
  newCategory,
  setNewCategory,
  addCategory
}: CategoriesPageProps) => {
  return (
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
                  onChange={(e) => setNewCategory((prev: any) => ({ ...prev, name: e.target.value }))}
                  placeholder="Введите название категории"
                />
              </div>
              <div>
                <Label htmlFor="categoryIcon">Иконка</Label>
                <select
                  id="categoryIcon"
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory((prev: any) => ({ ...prev, icon: e.target.value }))}
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
                onChange={(e) => setNewCategory((prev: any) => ({ ...prev, description: e.target.value }))}
                placeholder="Описание категории"
              />
            </div>
            <Button onClick={addCategory}>Добавить категорию</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CategoriesPage;