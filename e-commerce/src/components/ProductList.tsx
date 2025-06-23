import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductListProps {
  initialProducts: Product[];
}

const ProductList = ({ initialProducts }: ProductListProps) => {
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({min: 0, max: 0});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const minPrice = Math.floor(Math.min(...initialProducts.map(p => p.price)));
  const maxPrice = Math.ceil(Math.max(...initialProducts.map(p => p.price)));
  
  useEffect(() => {
    setPriceRange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice]);
  
  const applyFilters = () => {
    let filtered = products;
    
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && 
      product.price <= priceRange.max
    );
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      );
    }
    
    setFilteredProducts(filtered);
  };
  
  useEffect(() => {
    const handlePriceFilterChange = (event: CustomEvent<{ min: number, max: number }>) => {
      const { min, max } = event.detail;
      setPriceRange({ min, max });
    };
    
    window.addEventListener('price-filter-change', handlePriceFilterChange as EventListener);
    
    return () => {
      window.removeEventListener('price-filter-change', handlePriceFilterChange as EventListener);
    };
  }, []);
  
  useEffect(() => {
    const handleNameSearch = (event: CustomEvent<{ query: string }>) => {
      const { query } = event.detail;
      setSearchQuery(query);
    };
    
    window.addEventListener('name-search-change', handleNameSearch as EventListener);
    
    return () => {
      window.removeEventListener('name-search-change', handleNameSearch as EventListener);
    };
  }, []);
  
  useEffect(() => {
    const handleCategoryFilter = (event: CustomEvent<{ category: string }>) => {
      const { category } = event.detail;
      setSelectedCategory(category);
    };
    
    window.addEventListener('category-filter-change', handleCategoryFilter as EventListener);
    
    return () => {
      window.removeEventListener('category-filter-change', handleCategoryFilter as EventListener);
    };
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [priceRange, searchQuery, selectedCategory, products]);

  return (
    <div>
      {/* Show count of filtered products */}
      <p className="mb-4 text-sm text-gray-600">
        Mostrando {filteredProducts.length} de {initialProducts.length} productos
        {(priceRange.min !== minPrice || priceRange.max !== maxPrice) && 
          <span className="ml-1">(filtrado por precio: ${priceRange.min} - ${priceRange.max})</span>}
        {searchQuery && 
          <span className="ml-1">(búsqueda: "{searchQuery}")</span>}
        {selectedCategory && 
          <span className="ml-1">(categoría: {selectedCategory})</span>}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center">
            {/* Imagen controlada */}
            <div className="w-full h-40 flex items-center justify-center overflow-hidden mb-4">
              <img 
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Título y precio */}
            <h2 className="text-md font-semibold mb-1 text-center line-clamp-2">{product.title}</h2>
            <p className="text-lg font-bold text-green-600 mb-4">${product.price}</p>

            {/* Botón */}
            <a 
              href={`/products/${product.id}`} 
              className="mt-auto bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition w-full"
            >
              Ver producto
            </a>
          </div>
        ))}
      </div>

      {/* Show message when no products match filter */}
      {filteredProducts.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600">No se encontraron productos en este rango de precios.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
