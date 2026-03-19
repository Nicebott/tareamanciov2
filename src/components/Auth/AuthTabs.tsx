import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';

interface AuthTabsProps {
  activeTab: 'login' | 'register';
  onTabChange: (tab: 'login' | 'register') => void;
  darkMode: boolean;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, onTabChange, darkMode }) => {
  const loginRef = useRef<HTMLButtonElement>(null);
  const registerRef = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      if (activeTab === 'login' && loginRef.current) {
        const { offsetLeft, offsetWidth } = loginRef.current;
        setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
      } else if (activeTab === 'register' && registerRef.current) {
        const { offsetLeft, offsetWidth } = registerRef.current;
        setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  return (
    <div className={`relative flex gap-1 p-1 mb-6 rounded-xl ${
      darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
    }`}>
      <motion.div
        className={`absolute rounded-lg ${
          darkMode
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/30'
            : 'bg-white shadow-md'
        }`}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 300,
          mass: 0.5
        }}
        style={{ height: 'calc(100% - 8px)', top: 4 }}
      />

      <button
        ref={loginRef}
        onClick={() => onTabChange('login')}
        className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 z-10 ${
          activeTab === 'login'
            ? darkMode
              ? 'text-white'
              : 'text-gray-900'
            : darkMode
              ? 'text-gray-400 hover:text-gray-300'
              : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <LogIn size={18} />
        <span>Iniciar Sesion</span>
      </button>

      <button
        ref={registerRef}
        onClick={() => onTabChange('register')}
        className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 z-10 ${
          activeTab === 'register'
            ? darkMode
              ? 'text-white'
              : 'text-gray-900'
            : darkMode
              ? 'text-gray-400 hover:text-gray-300'
              : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <UserPlus size={18} />
        <span>Registrarse</span>
      </button>
    </div>
  );
};

export default AuthTabs;