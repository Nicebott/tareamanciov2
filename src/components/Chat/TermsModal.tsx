import React from 'react';
import { X, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, darkMode }) => {
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
          <FileText className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Terminos y Condiciones
          </h2>
        </div>

        <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p className="text-sm">Ultima actualizacion: Febrero 2026</p>

          <div className="space-y-4">
            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1. Aceptacion de Terminos
              </h3>
              <p className="text-sm">
                Al acceder y utilizar esta plataforma, aceptas estar sujeto a estos terminos y condiciones. Si no estas de acuerdo con alguna parte de estos terminos, no debes usar la plataforma.
              </p>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                2. Uso de la Plataforma
              </h3>
              <p className="text-sm">
                Esta plataforma es proporcionada como un servicio informativo para estudiantes de la UASD. La informacion sobre cursos, profesores y horarios es de caracter referencial y puede estar sujeta a cambios.
              </p>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3. Cuenta de Usuario
              </h3>
              <p className="text-sm">
                Eres responsable de mantener la confidencialidad de tu cuenta y contrasena. Debes notificar inmediatamente sobre cualquier uso no autorizado de tu cuenta.
              </p>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                4. Contenido de Usuario
              </h3>
              <p className="text-sm">
                Eres responsable del contenido que publicas en la plataforma. Nos reservamos el derecho de eliminar contenido que viole nuestras normas de comunidad.
              </p>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                5. Propiedad Intelectual
              </h3>
              <p className="text-sm">
                Todo el contenido de la plataforma, incluyendo texto, graficos, logos y software, es propiedad de zierow o sus licenciantes y esta protegido por las leyes de propiedad intelectual.
              </p>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6. Limitacion de Responsabilidad
              </h3>
              <p className="text-sm">
                La plataforma se proporciona tal cual sin garantias de ningun tipo. No somos responsables de errores, omisiones o inexactitudes en la informacion proporcionada.
              </p>
            </section>

            <section>
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                7. Modificaciones
              </h3>
              <p className="text-sm">
                Nos reservamos el derecho de modificar estos terminos en cualquier momento. Los cambios seran efectivos inmediatamente despues de su publicacion en la plataforma.
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

export default TermsModal;
