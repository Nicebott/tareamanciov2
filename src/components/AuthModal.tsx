import React, { useState } from 'react';
import { X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthTabs from './Auth/AuthTabs';
import LoginForm from './Auth/LoginForm';
import RegisterForm from './Auth/RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, darkMode }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
        className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${
          darkMode
            ? 'from-blue-600/20 via-blue-500/10 to-transparent'
            : 'from-blue-500/10 via-blue-400/5 to-transparent'
        }`} />

        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full z-10 ${
            darkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-700/50 backdrop-blur-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm'
          } transition-all duration-200`}
        >
          <X size={20} />
        </button>

        <div className="relative px-8 pt-8 pb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", damping: 15 }}
            className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg ${
              darkMode
                ? 'bg-gradient-to-br from-blue-600 to-blue-700'
                : 'bg-gradient-to-br from-blue-500 to-blue-600'
            }`}
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-2xl font-bold text-center mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Bienvenido a MiSemestre
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-center text-sm mb-6 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Accede a tu cuenta para continuar
          </motion.p>

          <AuthTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            darkMode={darkMode}
          />

          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <LoginForm key="login" darkMode={darkMode} onClose={onClose} />
            ) : (
              <RegisterForm key="register" darkMode={darkMode} onClose={onClose} />
            )}
          </AnimatePresence>
        </div>

        <div className={`px-8 py-4 border-t ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <p className={`text-xs text-center ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Al continuar, aceptas nuestros Terminos y Condiciones
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;