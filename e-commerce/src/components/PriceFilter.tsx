import { useState, useEffect } from 'react';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
}

type PriceFilterEvent = CustomEvent<{
  min: number;
  max: number;
}>;

declare global {
  interface WindowEventMap {
    'price-filter-change': PriceFilterEvent;
  }
}

const PriceFilter = ({ minPrice, maxPrice }: PriceFilterProps) => {
  const [minValue, setMinValue] = useState<number>(minPrice);
  const [maxValue, setMaxValue] = useState<number>(maxPrice);


  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinValue(value <= maxValue ? value : minValue);
  };


  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMaxValue(value >= minValue ? value : maxValue);
  };


  useEffect(() => {
    const event = new CustomEvent('price-filter-change', {
      detail: { min: minValue, max: maxValue },
      bubbles: true,
    }) as PriceFilterEvent;
    
    window.dispatchEvent(event);
  }, [minValue, maxValue]);

  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Filtrar por precio</h2>
      
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm">Precio mínimo: ${minValue}</span>
          <span className="text-sm">Precio máximo: ${maxValue}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="min-price" className="block text-sm mb-1">Mínimo:</label>
            <input
              type="range"
              id="min-price"
              min={minPrice}
              max={maxPrice}
              value={minValue}
              onChange={handleMinChange}
              className="w-full accent-blue-600"
            />
          </div>
          
          <div>
            <label htmlFor="max-price" className="block text-sm mb-1">Máximo:</label>
            <input
              type="range"
              id="max-price"
              min={minPrice}
              max={maxPrice}
              value={maxValue}
              onChange={handleMaxChange}
              className="w-full accent-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Show current active filter status */}
      <div className="mt-4 text-sm text-gray-600">
        Filtro activo: ${minValue} - ${maxValue}
      </div>
    </div>
  );
};

export default PriceFilter;
