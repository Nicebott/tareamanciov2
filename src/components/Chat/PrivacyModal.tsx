import React from 'react';
import { X, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, darkMode }) => {
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
          <Lock className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Politica de Privacidad
          </h2>
        </div>

        <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p className="text-sm">Ultima actualizacion: Febrero 2026</p>

          <div className="space-y-4">
            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1. Informacion que Recopilamos
              </h3>
              <p className="text-sm mb-2">
                Recopilamos informacion que nos proporcionas directamente:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Direccion de correo electronico</li>
                <li>Nombre de usuario</li>
                <li>Resenas y comentarios que publicas</li>
                <li>Mensajes en el chat y foros</li>
              </ul>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                2. Como Usamos tu Informacion
              </h3>
              <p className="text-sm mb-2">
                Utilizamos la informacion recopilada para:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Proporcionar y mantener nuestros servicios</li>
                <li>Mejorar la experiencia del usuario</li>
                <li>Comunicarnos contigo sobre actualizaciones</li>
                <li>Moderar contenido y prevenir abuso</li>
              </ul>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3. Compartir Informacion
              </h3>
              <p className="text-sm">
                No vendemos ni compartimos tu informacion personal con terceros para fines de marketing. Tu nombre de usuario y el contenido que publicas (resenas, comentarios) son visibles para otros usuarios de la plataforma.
              </p>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                4. Seguridad de Datos
              </h3>
              <p className="text-sm">
                Implementamos medidas de seguridad tecnicas y organizativas para proteger tu informacion personal. Sin embargo, ningun metodo de transmision por Internet es 100% seguro.
              </p>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                5. Cookies y Tecnologias Similares
              </h3>
              <p className="text-sm">
                Utilizamos cookies y tecnologias similares para mantener tu sesion activa y mejorar tu experiencia en la plataforma.
              </p>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6. Tus Derechos
              </h3>
              <p className="text-sm mb-2">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Acceder a tu informacion personal</li>
                <li>Corregir datos inexactos</li>
                <li>Solicitar la eliminacion de tu cuenta</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                7. Cambios a esta Politica
              </h3>
              <p className="text-sm">
                Podemos actualizar esta politica de privacidad ocasionalmente. Te notificaremos sobre cambios importantes publicando la nueva politica en esta pagina.
              </p>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                8. Contacto
              </h3>
              <p className="text-sm">
                Si tienes preguntas sobre esta politica de privacidad, puedes contactarnos a traves de los canales oficiales de la plataforma.
              </p>
            </section>
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
          Cerrar
        </button>
      </motion.div>
    </div>
  );
};

export default PrivacyModal;
