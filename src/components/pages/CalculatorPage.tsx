import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const CalculatorPage = () => {
  // Калькулятор плитки
  const [tileCalc, setTileCalc] = useState({
    roomLength: '',
    roomWidth: '',
    tileLength: '',
    tileWidth: '',
    reserve: 10
  });

  // Калькулятор краски
  const [paintCalc, setPaintCalc] = useState({
    wallHeight: '',
    wallLength: '',
    wallWidth: '',
    doors: 1,
    windows: 2,
    coats: 2
  });

  // Калькулятор обоев
  const [wallpaperCalc, setWallpaperCalc] = useState({
    roomHeight: '',
    roomLength: '',
    roomWidth: '',
    rollWidth: 1.06,
    rollLength: 10,
    patternRepeat: 0
  });

  // Калькулятор ламината
  const [laminateCalc, setLaminateCalc] = useState({
    roomLength: '',
    roomWidth: '',
    plankLength: 1.2,
    plankWidth: 0.2,
    reserve: 7
  });

  const calculateTiles = () => {
    const roomArea = parseFloat(tileCalc.roomLength) * parseFloat(tileCalc.roomWidth);
    const tileArea = (parseFloat(tileCalc.tileLength) / 100) * (parseFloat(tileCalc.tileWidth) / 100);
    const tilesNeeded = Math.ceil(roomArea / tileArea);
    const tilesWithReserve = Math.ceil(tilesNeeded * (1 + tileCalc.reserve / 100));
    
    return {
      roomArea: roomArea.toFixed(2),
      tilesNeeded,
      tilesWithReserve,
      packagesNeeded: Math.ceil(tilesWithReserve / 10) // предполагаем 10 плиток в упаковке
    };
  };

  const calculatePaint = () => {
    const wallArea1 = parseFloat(paintCalc.wallLength) * parseFloat(paintCalc.wallHeight) * 2;
    const wallArea2 = parseFloat(paintCalc.wallWidth) * parseFloat(paintCalc.wallHeight) * 2;
    const totalArea = wallArea1 + wallArea2;
    const doorArea = paintCalc.doors * 2; // 2 м² на дверь
    const windowArea = paintCalc.windows * 1.5; // 1.5 м² на окно
    const paintableArea = totalArea - doorArea - windowArea;
    const paintNeeded = (paintableArea * paintCalc.coats) / 10; // 1 литр на 10 м²
    
    return {
      totalArea: totalArea.toFixed(2),
      paintableArea: paintableArea.toFixed(2),
      paintNeeded: Math.ceil(paintNeeded),
      cansNeeded: Math.ceil(paintNeeded / 2.5) // банки по 2.5 литра
    };
  };

  const calculateWallpaper = () => {
    const roomPerimeter = 2 * (parseFloat(wallpaperCalc.roomLength) + parseFloat(wallpaperCalc.roomWidth));
    const stripsNeeded = Math.ceil(roomPerimeter / wallpaperCalc.rollWidth);
    const stripLength = parseFloat(wallpaperCalc.roomHeight) + wallpaperCalc.patternRepeat;
    const stripsPerRoll = Math.floor(wallpaperCalc.rollLength / stripLength);
    const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);
    
    return {
      roomPerimeter: roomPerimeter.toFixed(2),
      stripsNeeded,
      rollsNeeded,
      totalLength: (rollsNeeded * wallpaperCalc.rollLength).toFixed(1)
    };
  };

  const calculateLaminate = () => {
    const roomArea = parseFloat(laminateCalc.roomLength) * parseFloat(laminateCalc.roomWidth);
    const plankArea = laminateCalc.plankLength * laminateCalc.plankWidth;
    const planksNeeded = Math.ceil(roomArea / plankArea);
    const planksWithReserve = Math.ceil(planksNeeded * (1 + laminateCalc.reserve / 100));
    const packagesNeeded = Math.ceil(planksWithReserve / 8); // 8 планок в упаковке
    
    return {
      roomArea: roomArea.toFixed(2),
      planksNeeded,
      planksWithReserve,
      packagesNeeded
    };
  };

  const calculators = [
    {
      id: 'tile',
      title: 'Калькулятор плитки',
      icon: 'Grid3x3',
      description: 'Рассчитайте количество керамической плитки для вашего помещения'
    },
    {
      id: 'paint',
      title: 'Калькулятор краски',
      icon: 'Paintbrush',
      description: 'Определите необходимое количество краски для покраски стен'
    },
    {
      id: 'wallpaper',
      title: 'Калькулятор обоев',
      icon: 'Wallpaper',
      description: 'Рассчитайте количество рулонов обоев для комнаты'
    },
    {
      id: 'laminate',
      title: 'Калькулятор ламината',
      icon: 'Square',
      description: 'Узнайте, сколько упаковок ламината вам потребуется'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Калькуляторы материалов</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Точно рассчитайте необходимое количество материалов для вашего проекта. 
          Избегайте переплат и нехватки материалов.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {calculators.map((calc, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Icon name={calc.icon as any} size={48} className="mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">{calc.title}</h3>
              <p className="text-sm text-gray-600">{calc.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="tile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tile">Плитка</TabsTrigger>
          <TabsTrigger value="paint">Краска</TabsTrigger>
          <TabsTrigger value="wallpaper">Обои</TabsTrigger>
          <TabsTrigger value="laminate">Ламинат</TabsTrigger>
        </TabsList>

        <TabsContent value="tile">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Калькулятор плитки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roomLength">Длина помещения (м)</Label>
                    <Input
                      id="roomLength"
                      type="number"
                      value={tileCalc.roomLength}
                      onChange={(e) => setTileCalc(prev => ({ ...prev, roomLength: e.target.value }))}
                      placeholder="3.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roomWidth">Ширина помещения (м)</Label>
                    <Input
                      id="roomWidth"
                      type="number"
                      value={tileCalc.roomWidth}
                      onChange={(e) => setTileCalc(prev => ({ ...prev, roomWidth: e.target.value }))}
                      placeholder="2.8"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tileLength">Длина плитки (см)</Label>
                    <Input
                      id="tileLength"
                      type="number"
                      value={tileCalc.tileLength}
                      onChange={(e) => setTileCalc(prev => ({ ...prev, tileLength: e.target.value }))}
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tileWidth">Ширина плитки (см)</Label>
                    <Input
                      id="tileWidth"
                      type="number"
                      value={tileCalc.tileWidth}
                      onChange={(e) => setTileCalc(prev => ({ ...prev, tileWidth: e.target.value }))}
                      placeholder="30"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="reserve">Запас (%)</Label>
                  <Input
                    id="reserve"
                    type="number"
                    value={tileCalc.reserve}
                    onChange={(e) => setTileCalc(prev => ({ ...prev, reserve: parseInt(e.target.value) }))}
                    placeholder="10"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Результат расчета</CardTitle>
              </CardHeader>
              <CardContent>
                {tileCalc.roomLength && tileCalc.roomWidth && tileCalc.tileLength && tileCalc.tileWidth ? (
                  <div className="space-y-4">
                    {(() => {
                      const result = calculateTiles();
                      return (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">{result.roomArea}</div>
                              <div className="text-sm text-gray-600">м² площадь</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{result.tilesWithReserve}</div>
                              <div className="text-sm text-gray-600">плиток с запасом</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Плиток без запаса:</span>
                              <span className="font-semibold">{result.tilesNeeded} шт</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Упаковок (по 10 шт):</span>
                              <span className="font-semibold">{result.packagesNeeded} уп</span>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-yellow-50 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Icon name="Info" className="text-yellow-600 mt-0.5" />
                              <p className="text-sm text-yellow-700">
                                Рекомендуем добавить 10-15% запаса на подрезку и возможный брак.
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Calculator" size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Заполните все поля для расчета</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="paint">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Калькулятор краски</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="wallHeight">Высота стен (м)</Label>
                  <Input
                    id="wallHeight"
                    type="number"
                    value={paintCalc.wallHeight}
                    onChange={(e) => setPaintCalc(prev => ({ ...prev, wallHeight: e.target.value }))}
                    placeholder="2.7"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wallLength">Длина комнаты (м)</Label>
                    <Input
                      id="wallLength"
                      type="number"
                      value={paintCalc.wallLength}
                      onChange={(e) => setPaintCalc(prev => ({ ...prev, wallLength: e.target.value }))}
                      placeholder="4.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="wallWidth">Ширина комнаты (м)</Label>
                    <Input
                      id="wallWidth"
                      type="number"
                      value={paintCalc.wallWidth}
                      onChange={(e) => setPaintCalc(prev => ({ ...prev, wallWidth: e.target.value }))}
                      placeholder="3.0"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="doors">Количество дверей</Label>
                    <Input
                      id="doors"
                      type="number"
                      value={paintCalc.doors}
                      onChange={(e) => setPaintCalc(prev => ({ ...prev, doors: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="windows">Количество окон</Label>
                    <Input
                      id="windows"
                      type="number"
                      value={paintCalc.windows}
                      onChange={(e) => setPaintCalc(prev => ({ ...prev, windows: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="coats">Количество слоев</Label>
                  <select
                    id="coats"
                    value={paintCalc.coats}
                    onChange={(e) => setPaintCalc(prev => ({ ...prev, coats: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value={1}>1 слой</option>
                    <option value={2}>2 слоя</option>
                    <option value={3}>3 слоя</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Результат расчета</CardTitle>
              </CardHeader>
              <CardContent>
                {paintCalc.wallHeight && paintCalc.wallLength && paintCalc.wallWidth ? (
                  <div className="space-y-4">
                    {(() => {
                      const result = calculatePaint();
                      return (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">{result.paintableArea}</div>
                              <div className="text-sm text-gray-600">м² под покраску</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{result.paintNeeded}</div>
                              <div className="text-sm text-gray-600">литров краски</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Общая площадь стен:</span>
                              <span className="font-semibold">{result.totalArea} м²</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Банок краски (2.5л):</span>
                              <span className="font-semibold">{result.cansNeeded} шт</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Paintbrush" size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Заполните размеры комнаты</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wallpaper">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Калькулятор обоев</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="roomHeight">Высота комнаты (м)</Label>
                  <Input
                    id="roomHeight"
                    type="number"
                    value={wallpaperCalc.roomHeight}
                    onChange={(e) => setWallpaperCalc(prev => ({ ...prev, roomHeight: e.target.value }))}
                    placeholder="2.7"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roomLengthWp">Длина комнаты (м)</Label>
                    <Input
                      id="roomLengthWp"
                      type="number"
                      value={wallpaperCalc.roomLength}
                      onChange={(e) => setWallpaperCalc(prev => ({ ...prev, roomLength: e.target.value }))}
                      placeholder="4.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roomWidthWp">Ширина комнаты (м)</Label>
                    <Input
                      id="roomWidthWp"
                      type="number"
                      value={wallpaperCalc.roomWidth}
                      onChange={(e) => setWallpaperCalc(prev => ({ ...prev, roomWidth: e.target.value }))}
                      placeholder="3.0"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rollWidth">Ширина рулона (м)</Label>
                    <select
                      id="rollWidth"
                      value={wallpaperCalc.rollWidth}
                      onChange={(e) => setWallpaperCalc(prev => ({ ...prev, rollWidth: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value={0.53}>0.53 м</option>
                      <option value={1.06}>1.06 м</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="rollLength">Длина рулона (м)</Label>
                    <Input
                      id="rollLength"
                      type="number"
                      value={wallpaperCalc.rollLength}
                      onChange={(e) => setWallpaperCalc(prev => ({ ...prev, rollLength: parseFloat(e.target.value) }))}
                      placeholder="10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="patternRepeat">Раппорт рисунка (м)</Label>
                  <Input
                    id="patternRepeat"
                    type="number"
                    value={wallpaperCalc.patternRepeat}
                    onChange={(e) => setWallpaperCalc(prev => ({ ...prev, patternRepeat: parseFloat(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Результат расчета</CardTitle>
              </CardHeader>
              <CardContent>
                {wallpaperCalc.roomHeight && wallpaperCalc.roomLength && wallpaperCalc.roomWidth ? (
                  <div className="space-y-4">
                    {(() => {
                      const result = calculateWallpaper();
                      return (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">{result.roomPerimeter}</div>
                              <div className="text-sm text-gray-600">м периметр</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{result.rollsNeeded}</div>
                              <div className="text-sm text-gray-600">рулонов</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Полос обоев:</span>
                              <span className="font-semibold">{result.stripsNeeded} шт</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Общая длина:</span>
                              <span className="font-semibold">{result.totalLength} м</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Wallpaper" size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Введите размеры комнаты</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="laminate">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Калькулятор ламината</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roomLengthLam">Длина комнаты (м)</Label>
                    <Input
                      id="roomLengthLam"
                      type="number"
                      value={laminateCalc.roomLength}
                      onChange={(e) => setLaminateCalc(prev => ({ ...prev, roomLength: e.target.value }))}
                      placeholder="4.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roomWidthLam">Ширина комнаты (м)</Label>
                    <Input
                      id="roomWidthLam"
                      type="number"
                      value={laminateCalc.roomWidth}
                      onChange={(e) => setLaminateCalc(prev => ({ ...prev, roomWidth: e.target.value }))}
                      placeholder="3.0"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="plankLength">Длина планки (м)</Label>
                    <Input
                      id="plankLength"
                      type="number"
                      value={laminateCalc.plankLength}
                      onChange={(e) => setLaminateCalc(prev => ({ ...prev, plankLength: parseFloat(e.target.value) }))}
                      placeholder="1.2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="plankWidth">Ширина планки (м)</Label>
                    <Input
                      id="plankWidth"
                      type="number"
                      value={laminateCalc.plankWidth}
                      onChange={(e) => setLaminateCalc(prev => ({ ...prev, plankWidth: parseFloat(e.target.value) }))}
                      placeholder="0.2"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="reserveLam">Запас (%)</Label>
                  <Input
                    id="reserveLam"
                    type="number"
                    value={laminateCalc.reserve}
                    onChange={(e) => setLaminateCalc(prev => ({ ...prev, reserve: parseInt(e.target.value) }))}
                    placeholder="7"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Результат расчета</CardTitle>
              </CardHeader>
              <CardContent>
                {laminateCalc.roomLength && laminateCalc.roomWidth ? (
                  <div className="space-y-4">
                    {(() => {
                      const result = calculateLaminate();
                      return (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">{result.roomArea}</div>
                              <div className="text-sm text-gray-600">м² площадь</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{result.packagesNeeded}</div>
                              <div className="text-sm text-gray-600">упаковок</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Планок без запаса:</span>
                              <span className="font-semibold">{result.planksNeeded} шт</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Планок с запасом:</span>
                              <span className="font-semibold">{result.planksWithReserve} шт</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Square" size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Введите размеры комнаты</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Полезные советы по расчетам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Icon name="Ruler" size={48} className="mx-auto mb-4 text-blue-600" />
              <h4 className="font-semibold mb-2">Точные измерения</h4>
              <p className="text-sm text-gray-600">
                Измеряйте помещение несколько раз для получения точных размеров
              </p>
            </div>
            <div className="text-center">
              <Icon name="Plus" size={48} className="mx-auto mb-4 text-green-600" />
              <h4 className="font-semibold mb-2">Запас материала</h4>
              <p className="text-sm text-gray-600">
                Всегда добавляйте 10-15% запаса на подрезку и возможный брак
              </p>
            </div>
            <div className="text-center">
              <Icon name="Calculator" size={48} className="mx-auto mb-4 text-purple-600" />
              <h4 className="font-semibold mb-2">Проверка расчетов</h4>
              <p className="text-sm text-gray-600">
                Перепроверьте расчеты перед покупкой материалов
              </p>
            </div>
            <div className="text-center">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-orange-600" />
              <h4 className="font-semibold mb-2">Консультация</h4>
              <p className="text-sm text-gray-600">
                Обратитесь к нашим специалистам за дополнительной консультацией
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Нужна помощь с расчетами?</h3>
        <p className="text-gray-600 mb-6">
          Наши специалисты помогут вам точно рассчитать необходимое количество материалов 
          и подберут оптимальные решения для вашего проекта.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Icon name="Phone" className="mr-2" />
            Консультация специалиста
          </Button>
          <Button variant="outline" size="lg">
            <Icon name="Calculator" className="mr-2" />
            Заказать расчет
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;