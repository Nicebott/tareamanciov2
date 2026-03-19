import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatEntranceProps {
  darkMode: boolean;
  onEnter: () => void;
  onClose?: () => void;
}

const ChatEntrance: React.FC<ChatEntranceProps> = ({ darkMode, onEnter, onClose }) => {
  return (
    <div className="space-y-6 py-2">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-4 relative ${
            darkMode
              ? 'bg-gradient-to-br from-blue-600 to-blue-700'
              : 'bg-gradient-to-br from-blue-500 to-blue-600'
          }`}
        >
          <MessageCircle className="w-10 h-10 text-white relative z-10" />
          <motion.div
            className="absolute inset-0 rounded-2xl bg-white opacity-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Chat en Tiempo Real
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-xs md:text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Unete a la conversacion con otros estudiantes
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-3"
      >
        <div className={`p-3 rounded-xl text-center ${
          darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <Users className={`w-5 h-5 mx-auto mb-1 ${
            darkMode ? 'text-blue-400' : 'text-blue-500'
          }`} />
          <p className={`text-xs font-medium ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Comparte ideas
          </p>
        </div>
        <div className={`p-3 rounded-xl text-center ${
          darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <Globe className={`w-5 h-5 mx-auto mb-1 ${
            darkMode ? 'text-blue-400' : 'text-blue-500'
          }`} />
          <p className={`text-xs font-medium ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Conoce gente
          </p>
        </div>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, delay: 0.4 }}
        onClick={onEnter}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold transition-all text-sm shadow-lg relative overflow-hidden ${
          darkMode
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white'
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white'
        }`}
      >
        <span>Ingresar al chat</span>
        <ArrowRight className="w-5 h-5" />
        <motion.div
          className="absolute inset-0 bg-white opacity-0 hover:opacity-10"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-center"
      >
        <p className={`text-xs ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Al unirte, aceptas nuestras{' '}
          <Link
            to="/community-rules"
            onClick={onClose}
            className="text-blue-500 hover:text-blue-600 underline font-medium"
          >
            normas de comunidad
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ChatEntrance;