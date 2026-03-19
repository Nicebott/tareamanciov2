import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, MessageSquare, AlertTriangle, Info, Wrench } from 'lucide-react';
import {
  getActiveSystemMessages,
  createSystemMessage,
  deleteSystemMessage,
  SystemMessage,
} from '../../services/systemMessageService';
import toast from 'react-hot-toast';

interface SystemMessagesPanelProps {
  darkMode: boolean;
}

const SystemMessagesPanel: React.FC<SystemMessagesPanelProps> = ({ darkMode }) => {
  const [messages, setMessages] = useState<SystemMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState<'maintenance' | 'error' | 'info'>('info');
  const [priority, setPriority] = useState(3);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    const fetchedMessages = await getActiveSystemMessages();
    setMessages(fetchedMessages);
    setLoading(false);
  };

  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const success = await createSystemMessage(newMessage, messageType, priority);

    if (success) {
      toast.success('Mensaje del sistema creado exitosamente');
      setNewMessage('');
      setMessageType('info');
      setPriority(3);
      setShowNewMessageForm(false);
      loadMessages();
    } else {
      toast.error('Error al crear el mensaje del sistema');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('¿Estas seguro de que quieres eliminar este mensaje?')) {
      const success = await deleteSystemMessage(id);
      if (success) {
        toast.success('Mensaje eliminado exitosamente');
        loadMessages();
      } else {
        toast.error('Error al eliminar el mensaje');
      }
    }
  };

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'maintenance':
        return {
          label: 'Mantenimiento',
          icon: Wrench,
          color: darkMode ? 'text-yellow-400' : 'text-yellow-600',
          bg: darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50',
        };
      case 'error':
        return {
          label: 'Error',
          icon: AlertTriangle,
          color: darkMode ? 'text-red-400' : 'text-red-600',
          bg: darkMode ? 'bg-red-900/30' : 'bg-red-50',
        };
      case 'info':
      default:
        return {
          label: 'Información',
          icon: Info,
          color: darkMode ? 'text-blue-400' : 'text-blue-600',
          bg: darkMode ? 'bg-blue-900/30' : 'bg-blue-50',
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Mensajes del Sistema
          </h3>
        </div>
        <button
          onClick={() => setShowNewMessageForm(!showNewMessageForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Plus className="w-4 h-4" />
          Nuevo Mensaje
        </button>
      </div>

      <AnimatePresence>
        {showNewMessageForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-xl p-6 ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            <form onSubmit={handleCreateMessage} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Tipo de Mensaje
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['info', 'maintenance', 'error'] as const).map((type) => {
                    const typeInfo = getTypeInfo(type);
                    const Icon = typeInfo.icon;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setMessageType(type)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                          messageType === type
                            ? typeInfo.bg + ' ring-2 ring-offset-2 ' + (darkMode ? 'ring-offset-gray-800' : 'ring-offset-white')
                            : darkMode
                              ? 'bg-gray-700 hover:bg-gray-600'
                              : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${messageType === type ? typeInfo.color : ''}`} />
                        <span className={messageType === type ? typeInfo.color : ''}>
                          {typeInfo.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Prioridad (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={priority}
                  onChange={(e) => setPriority(parseInt(e.target.value))}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Mayor prioridad = se muestra primero
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Mensaje
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Escribe el mensaje del sistema..."
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewMessageForm(false);
                    setNewMessage('');
                    setMessageType('info');
                    setPriority(3);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Crear Mensaje
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {loading ? (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2">Cargando mensajes...</p>
          </div>
        ) : messages.length > 0 ? (
          messages.map((message) => {
            const typeInfo = getTypeInfo(message.messageType);
            const Icon = typeInfo.icon;
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${typeInfo.bg} rounded-xl p-4 border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${typeInfo.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                        darkMode ? 'bg-gray-700' : 'bg-white'
                      }`}>
                        {typeInfo.label}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Prioridad: {message.priority}
                      </span>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {message.text}
                    </p>
                    <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {new Date(message.createdAt).toLocaleString('es-ES')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? 'text-red-400 hover:bg-red-900/30'
                        : 'text-red-500 hover:bg-red-50'
                    }`}
                    title="Eliminar mensaje"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay mensajes del sistema activos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemMessagesPanel;
