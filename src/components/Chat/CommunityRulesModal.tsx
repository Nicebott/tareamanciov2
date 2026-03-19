import React from 'react';
import { X, Shield, MessageCircle, ThumbsDown, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommunityRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const CommunityRulesModal: React.FC<CommunityRulesModalProps> = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg ${
            darkMode
              ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          } transition-colors`}
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Shield className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Normas de Comunidad
          </h2>
        </div>

        <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p className="text-base">
            Para mantener un ambiente respetuoso y productivo, todos los usuarios deben seguir estas normas:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MessageCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
              <div>
                <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  1. Respeto mutuo
                </h3>
                <p className="text-sm">
                  Trata a todos los miembros con respeto. No se toleran insultos, acoso, discriminacion o cualquier forma de maltrato.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
              <div>
                <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  2. Contenido apropiado
                </h3>
                <p className="text-sm">
                  No compartas contenido ofensivo, violento, sexual o ilegal. Manten las conversaciones relacionadas con temas academicos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
              <div>
                <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  3. No spam
                </h3>
                <p className="text-sm">
                  Evita enviar mensajes repetitivos, publicidad no autorizada o contenido irrelevante.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
              <div>
                <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  4. Privacidad
                </h3>
                <p className="text-sm">
                  No compartas informacion personal tuya o de otros sin consentimiento.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
              <div>
                <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  5. Honestidad academica
                </h3>
                <p className="text-sm">
                  No promuevas ni participes en trampa o plagio. Comparte experiencias y consejos honestos.
                </p>
              </div>
            </div>
          </div>

          <div className={`mt-6 p-4 rounded-lg ${
            darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                darkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`} />
              <div>
                <h3 className={`font-semibold mb-1 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                  Consecuencias
                </h3>
                <p className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  El incumplimiento de estas normas puede resultar en la eliminacion de mensajes por parte de los administradores.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className={`w-full mt-6 px-4 py-3 rounded-lg font-medium transition-colors ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Entendido
        </button>
      </motion.div>
    </div>
  );
};

export default CommunityRulesModal;
