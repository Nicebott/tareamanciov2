import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, Wrench, X } from 'lucide-react';
import { SystemMessage } from '../../services/systemMessageService';

interface SystemMessageBannerProps {
  message: SystemMessage;
  darkMode: boolean;
  onDismiss?: (id: string) => void;
}

const SystemMessageBanner: React.FC<SystemMessageBannerProps> = ({
  message,
  darkMode,
  onDismiss,
}) => {
  const getMessageStyles = () => {
    switch (message.messageType) {
      case 'maintenance':
        return {
          bg: darkMode
            ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-700'
            : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300',
          text: darkMode ? 'text-yellow-300' : 'text-yellow-800',
          icon: darkMode ? 'text-yellow-400' : 'text-yellow-600',
          iconComponent: Wrench,
        };
      case 'error':
        return {
          bg: darkMode
            ? 'bg-gradient-to-r from-red-900/30 to-red-800/30 border-red-700'
            : 'bg-gradient-to-r from-red-50 to-red-100 border-red-300',
          text: darkMode ? 'text-red-300' : 'text-red-800',
          icon: darkMode ? 'text-red-400' : 'text-red-600',
          iconComponent: AlertTriangle,
        };
      case 'info':
      default:
        return {
          bg: darkMode
            ? 'bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-700'
            : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300',
          text: darkMode ? 'text-blue-300' : 'text-blue-800',
          icon: darkMode ? 'text-blue-400' : 'text-blue-600',
          iconComponent: Info,
        };
    }
  };

  const styles = getMessageStyles();
  const Icon = styles.iconComponent;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={`${styles.bg} border rounded-xl p-3 mb-3 shadow-lg backdrop-blur-sm`}
    >
      <div className="flex items-start gap-3">
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', damping: 15 }}
          className={styles.icon}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${styles.text} leading-relaxed`}>
            {message.text}
          </p>
        </div>
        {onDismiss && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDismiss(message.id)}
            className={`flex-shrink-0 p-1 rounded-lg transition-colors ${
              darkMode
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
            }`}
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default SystemMessageBanner;
