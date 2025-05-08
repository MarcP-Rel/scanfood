import React, { useRef, useEffect, useState } from 'react';
import Quagga from '@ericblade/quagga2';

interface ScannerProps {
  onDetected: (code: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onDetected }) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScanner = () => {
    if (scannerRef.current && !isScanning) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: scannerRef.current,
            constraints: {
              facingMode: 'environment',
            },
          },
          locator: {
            patchSize: 'medium',
            halfSample: true,
          },
          numOfWorkers: navigator.hardwareConcurrency || 4,
          decoder: {
            readers: ['ean_reader'],
          },
          locate: true,
        },
        (err) => {
          if (err) {
            console.error('Error starting Quagga:', err);
            return;
          }
          Quagga.start();
          setIsScanning(true);
        }
      );

      Quagga.onDetected((result) => {
        const code = result.codeResult.code;
        if (code) {
          console.log('Código detectado:', code);
          Quagga.stop();
          setIsScanning(false);
          onDetected(code);
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      if (isScanning) {
        Quagga.stop();
      }
    };
  }, [isScanning]);

  return (
    <section className="w-full max-w-md flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Escanear producto</h2>
      <div 
        ref={scannerRef} 
        className="w-full h-[300px] bg-[#1a1a1a] rounded-xl mb-4 overflow-hidden"
      ></div>
      <button 
        onClick={startScanner} 
        className="w-full bg-[#4CAF50] text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-[#3e8e41] transition-colors"
      >
        Escanear código de barras
      </button>
    </section>
  );
};

export default Scanner;