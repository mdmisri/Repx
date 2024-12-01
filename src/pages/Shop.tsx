import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { Filter, Grid, List } from 'lucide-react';

export function Shop() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || 'all');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
  }, [categoryFilter]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const categories = ['all', 'Hoodies', 'T-Shirts', 'Vests', 'Track Pants'];

  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-8">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">REPX Store</h1>
      </header>

      {/* View and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-gray-800 rounded-full p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-full ${
              viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-full ${
              viewMode === 'list' ? 'bg-white text-black' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' 
          : 'flex flex-col space-y-4'
        }`}
      >
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            viewMode={viewMode} 
          />
        ))}
      </div>

      {/* No Products Placeholder */}
      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No products found in this category.
        </div>
      )}
    </div>
  );
}

export default Shop;