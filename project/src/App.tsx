import React, { useState } from 'react';
import Scanner from './components/Scanner';
import ProductInfo from './components/ProductInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

interface Product {
  product_name?: string;
  brands?: string;
  image_url?: string;
  nutriments?: Record<string, number>;
  ingredients_text?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'scanner' | 'product'>('scanner');
  const [productData, setProductData] = useState<Product | null>(null);

  const handleCodeDetected = (barcode: string) => {
    fetchProductData(barcode);
  };

  const fetchProductData = async (barcode: string) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const data = await response.json();
      
      if (data.status === 1) {
        setProductData(data.product);
        setCurrentPage('product');
      } else {
        alert("Producto no encontrado en OpenFoodFacts");
      }
    } catch (err) {
      console.error("Error al buscar producto:", err);
      alert("Error al buscar el producto.");
    }
  };

  const handleScanAgain = () => {
    setCurrentPage('scanner');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow flex flex-col items-center px-4 py-6">
        {currentPage === 'scanner' ? (
          <Scanner onDetected={handleCodeDetected} />
        ) : (
          <ProductInfo product={productData} onScanAgain={handleScanAgain} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;