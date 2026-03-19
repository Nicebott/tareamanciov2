import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, MessageCircle, AlertTriangle } from 'lucide-react';

interface CommunityRulesPageProps {
  darkMode: boolean;
}

const CommunityRulesPage: React.FC<CommunityRulesPageProps> = ({ darkMode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 mb-8 ${
            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          } transition-colors`}
        >
          <ArrowLeft size={18} />
          Volver
        </Link>

        <div className={`rounded-lg shadow-lg p-8 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <Shield className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <h1 className={`text-3xl md:text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Normas de Comunidad
            </h1>
          </div>

          <div className={`prose prose-lg max-w-none ${
            darkMode ? 'prose-invert' : ''
          } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>

            <div className="mb-8">
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Para mantener un ambiente respetuoso y productivo, todos los usuarios deben seguir estas normas al usar el chat y los foros de la plataforma.
              </p>
            </div>

            <section className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <MessageCircle className={`w-6 h-6 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  1. Respeto Mutuo
                </h2>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Trata a todos los miembros de la comunidad con respeto y cortesia. No se toleran insultos, acoso, discriminacion o cualquier forma de maltrato hacia otros usuarios.
              </p>
              <ul className={`list-disc list-inside mt-2 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Se respetuoso con opiniones diferentes</li>
                <li>No uses lenguaje ofensivo o degradante</li>
                <li>Evita ataques personales o comentarios despectivos</li>
                <li>Acepta criticas constructivas de manera profesional</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <MessageCircle className={`w-6 h-6 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  2. Contenido Apropiado
                </h2>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Mantén las conversaciones apropiadas para un entorno academico y profesional.
              </p>
              <ul className={`list-disc list-inside mt-2 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>No compartas contenido ofensivo, violento o sexual</li>
                <li>Evita temas politicos controversiales o que generen conflicto</li>
                <li>No publiques material ilegal o que viole derechos de terceros</li>
                <li>Mantén las conversaciones relevantes a temas academicos</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <MessageCircle className={`w-6 h-6 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  3. No Spam
                </h2>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Evita el envio de mensajes repetitivos o contenido no solicitado.
              </p>
              <ul className={`list-disc list-inside mt-2 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>No envies el mismo mensaje multiples veces</li>
                <li>No publiques publicidad o promociones no autorizadas</li>
                <li>Evita enlaces a sitios externos no relacionados</li>
                <li>No utilices el chat para enviar mensajes masivos</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <MessageCircle className={`w-6 h-6 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  4. Privacidad y Seguridad
                </h2>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Protege tu informacion personal y respeta la privacidad de los demas.
              </p>
              <ul className={`list-disc list-inside mt-2 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>No compartas informacion personal como telefonos o direcciones</li>
                <li>No publiques informacion privada de otros sin su consentimiento</li>
                <li>Mantén tus credenciales de acceso seguras</li>
                <li>Reporta cualquier comportamiento sospechoso a los administradores</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <MessageCircle className={`w-6 h-6 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  5. Honestidad Academica
                </h2>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Mantén la integridad academica en todas tus interacciones.
              </p>
              <ul className={`list-disc list-inside mt-2 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>No promuevas ni participes en trampa o plagio</li>
                <li>Comparte experiencias y consejos honestos sobre profesores</li>
                <li>No publiques soluciones completas de tareas o examenes</li>
                <li>Se honesto en tus resenas y calificaciones</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <MessageCircle className={`w-6 h-6 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  6. Uso Responsable del Chat
                </h2>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                El chat en tiempo real es para conversaciones constructivas entre estudiantes.
              </p>
              <ul className={`list-disc list-inside mt-2 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Mantén las conversaciones relevantes y constructivas</li>
                <li>Respeta los turnos de conversacion</li>
                <li>No monopolices el chat con mensajes excesivos</li>
                <li>Ayuda a mantener un ambiente positivo</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <MessageCircle className={`w-6 h-6 mt-1 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  7. Resenas de Profesores
                </h2>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Las resenas deben ser honestas, constructivas y basadas en experiencias reales.
              </p>
              <ul className={`list-disc list-inside mt-2 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Basa tus resenas en experiencias personales verificables</li>
                <li>Se constructivo y especifico en tus comentarios</li>
                <li>Evita ataques personales contra profesores</li>
                <li>No publiques informacion falsa o difamatoria</li>
              </ul>
            </section>

            <div className={`mt-8 p-6 rounded-lg ${
              darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-6 h-6 mt-0.5 flex-shrink-0 ${
                  darkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`} />
                <div>
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    Consecuencias del Incumplimiento
                  </h3>
                  <p className={`mb-3 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    El incumplimiento de estas normas puede resultar en las siguientes acciones:
                  </p>
                  <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    <li>Eliminacion de mensajes o contenido inapropiado</li>
                    <li>Advertencias por parte de los administradores</li>
                    <li>Suspension temporal de la cuenta</li>
                    <li>En casos graves, suspension permanente de la cuenta</li>
                  </ul>
                </div>
              </div>
            </div>

            <section className="mt-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Reportar Violaciones
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Si observas comportamiento que viole estas normas, puedes contactar a los administradores a traves del chat de soporte. Todos los reportes se manejan de manera confidencial.
              </p>
            </section>

            <section className="mt-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Actualizaciones de las Normas
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Estas normas pueden ser actualizadas periodicamente. Es tu responsabilidad revisarlas regularmente para mantenerte informado de cualquier cambio.
              </p>
            </section>

            <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Ultima actualizacion: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Al usar esta plataforma, aceptas cumplir con estas normas de comunidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityRulesPage;
