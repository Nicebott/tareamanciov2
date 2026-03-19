import React, { useState, useEffect } from 'react';
import { MessageCircle, X, LogIn } from 'lucide-react';
import { useSupabaseChat } from '../hooks/useSupabaseChat';
import { useAuthContext } from '../contexts/AuthContext';
import ChatMessages from './Chat/ChatMessages';
import ChatInput from './Chat/ChatInput';
import ChatEntrance from './Chat/ChatEntrance';
import { supabase } from '../supabase';
import { checkIsAdmin, checkIsSuperAdmin } from '../services/adminService';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatProps {
  darkMode?: boolean;
  onOpenAuth?: () => void;
}

const Chat: React.FC<ChatProps> = ({ darkMode = false, onOpenAuth }) => {
  const { user, session, loading: authLoading } = useAuthContext();
  const [displayName, setDisplayName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasEnteredChat, setHasEnteredChat] = useState(false);

  const {
    messages,
    loading,
    unreadCount,
    sendMessage,
    loadMoreMessages,
    deleteMessage,
  } = useSupabaseChat(isChatOpen, displayName, user?.id, isAdmin);

  useEffect(() => {
    const chatEntered = localStorage.getItem('chatEntered');
    if (chatEntered === 'true') {
      setHasEnteredChat(true);
    }
  }, []);

  useEffect(() => {
    if (user?.id && session) {
      const fetchProfileAndCheckAdmin = async () => {
        const [profileResult, isAdminUser, isSuperAdminUser] = await Promise.all([
          supabase
            .from('profiles')
            .select('display_name')
            .eq('id', user.id)
            .maybeSingle(),
          checkIsAdmin(user.id),
          checkIsSuperAdmin(user.id)
        ]);

        if (profileResult.data?.display_name) {
          setDisplayName(profileResult.data.display_name);
        }

        setIsAdmin(isAdminUser || isSuperAdminUser);
      };

      fetchProfileAndCheckAdmin();
    } else {
      setHasEnteredChat(false);
      localStorage.removeItem('chatEntered');
    }
  }, [user?.id, session]);

  const handleSendMessage = async (text: string) => {
    const success = await sendMessage(text);
    if (!success) {
      alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (isAdmin) {
      const success = await deleteMessage(messageId);
      if (!success) {
        alert('Error al eliminar el mensaje. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleEnterChat = () => {
    setHasEnteredChat(true);
    localStorage.setItem('chatEntered', 'true');
  };

  const handleOpenAuth = () => {
    setIsChatOpen(false);
    if (onOpenAuth) {
      onOpenAuth();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isChatOpen ? 'Cerrar chat' : 'Abrir chat'}
        className="fixed bottom-4 right-4 w-12 h-12 md:w-13 md:h-13 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg z-50 flex items-center justify-center transition-colors"
      >
        <MessageCircle className="w-5 h-5 md:w-5 md:h-5 text-white" />
        {!isChatOpen && unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-bold shadow-md"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed inset-x-4 bottom-[4.5rem] md:bottom-[4.5rem] md:right-4 md:left-auto md:w-96 shadow-2xl rounded-2xl z-[60] backdrop-blur-sm overflow-hidden ${
              darkMode ? 'bg-gray-800/95 border border-gray-700/50' : 'bg-white/95 border border-gray-200'
            }`}
          >
            <div className={`relative flex justify-between items-center p-3 md:p-4 border-b backdrop-blur-md ${
              darkMode ? 'border-gray-700/50 bg-gray-800/80' : 'border-gray-200 bg-white/80'
            }`}>
              <div className="flex items-center gap-2">
                <MessageCircle className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <h2 className={`text-base md:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Chat en tiempo real
                </h2>
              </div>
              <motion.button
                onClick={() => setIsChatOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Cerrar chat"
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <X className="w-5 h-5 md:w-5 md:h-5" />
              </motion.button>
            </div>

            <div className="p-3 md:p-4">
              {authLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="rounded-full h-8 w-8 border-b-2 border-t-2 border-blue-500"
                  />
                  <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Cargando...
                  </p>
                </motion.div>
              ) : !user || !session ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                        darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-600' : 'bg-gradient-to-br from-blue-50 to-blue-100'
                      }`}
                    >
                      <MessageCircle className={`w-8 h-8 ${
                        darkMode ? 'text-blue-400' : 'text-blue-500'
                      }`} />
                    </motion.div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Chat en Tiempo Real
                    </h3>
                    <p className={`text-xs md:text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Inicia sesion para unirte a la conversacion
                    </p>
                  </div>

                  <motion.button
                    onClick={handleOpenAuth}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all text-sm shadow-lg ${
                      darkMode
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white'
                    }`}
                  >
                    <LogIn size={18} />
                    <span>Iniciar Sesion</span>
                  </motion.button>
                </motion.div>
              ) : !hasEnteredChat ? (
                <ChatEntrance darkMode={darkMode} onEnter={handleEnterChat} onClose={() => setIsChatOpen(false)} />
              ) : (
                <>
                  <ChatMessages
                    messages={messages}
                    darkMode={darkMode}
                    currentUsername={displayName}
                    onLoadMore={loadMoreMessages}
                    loading={loading}
                    isAdmin={isAdmin}
                    onDeleteMessage={handleDeleteMessage}
                  />
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    darkMode={darkMode}
                    username={displayName}
                  />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;