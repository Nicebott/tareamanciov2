import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  darkMode: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ darkMode, message = 'Cargando...' }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12 min-h-[400px]">
      <Loader2
        className={`w-12 h-12 animate-spin ${
          darkMode ? 'text-blue-400' : 'text-blue-600'
        }`}
      />
      <p className={`mt-4 text-lg font-medium ${
        darkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;