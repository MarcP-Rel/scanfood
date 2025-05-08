import React from 'react';
import { Scan } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#4CAF50] text-white px-6 py-4 rounded-3xl mx-2 my-3">
      <div className="flex items-center justify-center gap-2">
        <Scan size={32} />
        <h1 className="text-4xl font-bold text-center">ScanFood</h1>
      </div>
      <p className="text-center font-semibold mt-1">
        Escanea alimentos y obtén información nutricional al instante
      </p>
    </header>
  );
};

export default Header;