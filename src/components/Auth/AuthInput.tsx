import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthInputProps {
  icon: LucideIcon;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  darkMode: boolean;
  required?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  darkMode,
  required
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
        isFocused
          ? darkMode ? 'text-blue-400' : 'text-blue-500'
          : darkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <Icon size={20} />
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full pl-12 pr-4 py-3.5 rounded-xl font-medium ${
          darkMode
            ? 'bg-gray-700/50 text-white border-gray-600 placeholder-gray-500'
            : 'bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400'
        } border-2 focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-200 ${
          isFocused ? 'shadow-lg' : 'shadow-sm'
        }`}
        placeholder={placeholder}
        required={required}
      />
    </motion.div>
  );
};

export default AuthInput;