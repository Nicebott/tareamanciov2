import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../hooks/useNotifications';
import { archiveNotification } from '../services/notificationService';
import toast from 'react-hot-toast';

interface NotificationCenterProps {
  darkMode?: boolean;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ darkMode = false }) => {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const handleArchive = async (id: string) => {
    const success = await archiveNotification(id);
    if (success) {
      toast.success('Notificacion archivada');
    }
  };

  const handleViewNotifications = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      markAsRead();
    }
  };

  return (
    <>
      <button
        onClick={handleViewNotifications}
        className={`fixed top-20 right-4 md:top-4 md:right-4 p-3 rounded-full shadow-lg z-50 transition-colors ${
          darkMode
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
        title="Notificaciones"
      >
        <Bell className="w-5 h-5 md:w-6 md:h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`fixed top-20 md:top-16 right-4 w-80 md:w-96 max-h-96 rounded-lg shadow-2xl z-50 overflow-hidden ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            <div className={`flex items-center justify-between p-4 border-b ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Notificaciones
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded ${
                  darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
                } transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-80">
              {notifications.length > 0 ? (
                <div className="divide-y" style={{
                  borderColor: darkMode ? 'rgb(55 65 81)' : 'rgb(229 231 235)'
                }}>
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 ${
                        darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                      } transition-colors`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {notif.title}
                          </h4>
                          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {notif.message}
                          </p>
                          <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {new Date(notif.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleArchive(notif.id)}
                          className={`p-1 rounded flex-shrink-0 ${
                            darkMode
                              ? 'text-gray-400 hover:bg-gray-600'
                              : 'text-gray-400 hover:bg-gray-200'
                          } transition-colors`}
                          title="Archivar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No hay notificaciones nuevas
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default NotificationCenter;
