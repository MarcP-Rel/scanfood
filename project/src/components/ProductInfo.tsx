import React from 'react';

interface Product {
  product_name?: string;
  brands?: string;
  image_url?: string;
  nutriments?: Record<string, number>;
  ingredients_text?: string;
}

interface ProductInfoProps {
  product: Product | null;
  onScanAgain: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onScanAgain }) => {
  if (!product) {
    return <div>No product data available</div>;
  }

  const renderNutrients = () => {
    if (!product.nutriments) return <p>No hay información nutricional disponible</p>;

    return (
      <ul className="bg-[#1a1a1a] p-4 rounded-lg">
        {Object.entries(product.nutriments)
          .filter(([_, value]) => typeof value === 'number')
          .slice(0, 10) // Limit to 10 nutrients to avoid overwhelming the user
          .map(([key, value]) => (
            <li key={key} className="py-1 border-b border-gray-700 last:border-none">
              <span className="capitalize">{key.replace(/_/g, ' ')}</span>: {value}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <section className="w-full max-w-md bg-[#121212] p-5 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Información del Producto</h2>
      
      {product.image_url && (
        <div className="flex justify-center mb-4">
          <img 
            src={product.image_url} 
            alt={product.product_name || 'Product image'} 
            className="max-h-[200px] rounded-lg object-contain bg-white p-2"
          />
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-[#4CAF50]">
        {product.product_name || 'Nombre no disponible'}
      </h3>
      <p className="text-gray-300 mb-4">{product.brands || 'Marca no disponible'}</p>
      
      <div className="mb-4">
        <h4 className="text-lg font-medium mb-2 border-b border-gray-700 pb-1">Nutrientes</h4>
        {renderNutrients()}
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2 border-b border-gray-700 pb-1">Ingredientes</h4>
        <p className="bg-[#1a1a1a] p-4 rounded-lg text-sm">
          {product.ingredients_text || 'No disponible'}
        </p>
      </div>
      
      <button 
        onClick={onScanAgain} 
        className="w-full bg-[#4CAF50] text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-[#3e8e41] transition-colors"
      >
        Escanear otro producto
      </button>
    </section>
  );
};

export default ProductInfo;