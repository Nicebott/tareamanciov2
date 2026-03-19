import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Trash2, Shield } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    timestamp: number;
    username: string;
    isAdmin: boolean;
  };
  darkMode: boolean;
  isCurrentUser: boolean;
  isAdmin: boolean;
  currentUserIsAdmin?: boolean;
  onDelete: (messageId: string) => void;
  userInitials?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  darkMode,
  isCurrentUser,
  isAdmin,
  onDelete,
  currentUserIsAdmin,
  userInitials = 'US'
}) => {
  const timeAgo = formatDistanceToNow(new Date(message.timestamp), {
    addSuffix: true,
    locale: es
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: isCurrentUser ? 20 : -20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`mb-3 md:mb-4 ${isCurrentUser ? 'ml-auto' : 'mr-auto'} relative group flex gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isCurrentUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", damping: 15 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg`}
        >
          {userInitials}
        </motion.div>
      )}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-3 md:px-4 py-2.5 shadow-md backdrop-blur-sm ${
          isCurrentUser
            ? darkMode
              ? 'bg-gradient-to-br from-blue-600 to-blue-700'
              : 'bg-gradient-to-br from-blue-500 to-blue-600'
            : darkMode
              ? 'bg-gray-700/80'
              : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className={`font-semibold text-xs md:text-sm ${
              isCurrentUser
                ? 'text-white'
                : darkMode
                  ? 'text-gray-200'
                  : 'text-gray-800'
            }`}>
              {message.username}
            </span>
            {message.isAdmin ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold ${
                  darkMode
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-md'
                }`}
              >
                <Shield className="w-2.5 h-2.5 md:w-3 md:h-3" />
                ADMIN
              </motion.span>
            ) : (
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${
                isCurrentUser
                  ? 'bg-white/20 text-white'
                  : darkMode
                    ? 'bg-blue-900/40 text-blue-300'
                    : 'bg-blue-100 text-blue-700'
              }`}>
                Estudiante
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {currentUserIsAdmin && (
              <motion.button
                onClick={() => onDelete(message.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 rounded-lg ${
                  darkMode
                    ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20'
                    : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                }`}
                title="Eliminar mensaje"
              >
                <Trash2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
              </motion.button>
            )}
          </div>
        </div>
        <p className={`text-xs md:text-sm break-words leading-relaxed ${
          isCurrentUser ? 'text-white' : darkMode ? 'text-gray-100' : 'text-gray-700'
        }`}>
          {message.text}
        </p>
        <span className={`text-[10px] md:text-xs mt-1 inline-block ${
          isCurrentUser
            ? 'text-blue-100'
            : darkMode
              ? 'text-gray-500'
              : 'text-gray-400'
        }`}>
          {timeAgo}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default ChatMessage;