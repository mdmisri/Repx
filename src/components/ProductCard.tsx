import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({ ...product, quantity: 1, selectedSize });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">${product.price}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 rounded-md ${
                selectedSize === size
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800"
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              if (selectedSize) {
                // Handle buy now logic
              } else {
                alert('Please select a size');
              }
            }}
            className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-500"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}