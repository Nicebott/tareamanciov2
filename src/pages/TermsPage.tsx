import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  darkMode: boolean;
}

const TermsPage: React.FC<TermsPageProps> = ({ darkMode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const text = darkMode ? 'text-gray-300' : 'text-gray-700';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const heading = darkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 mb-8 ${
            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          } transition-colors`}
        >
          <ArrowLeft size={18} />
          Volver
        </Link>

        <div className={`rounded-lg shadow-lg p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-3xl font-bold mb-2 ${heading}`}>
            Términos y Condiciones
          </h1>
          <p className={`text-sm mb-10 ${muted}`}>
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <p className={`mb-10 ${text}`}>
            MiSemestre es una plataforma independiente de la comunidad estudiantil de la UASD. No está afiliada oficialmente a la universidad. Al usarla, aceptas estas condiciones.
          </p>

          {/* Sección */}
          {[
            {
              title: '¿Qué es MiSemestre?',
              content: 'Una herramienta para consultar la programación docente, leer y escribir reseñas de profesores, y conectar con otros estudiantes. La información académica oficial siempre debe verificarse directamente con la UASD.',
            },
            {
              title: 'Tu cuenta',
              items: [
                'Usa información real al registrarte.',
                'Eres responsable de lo que hagas con tu cuenta.',
                'No compartas tu cuenta con nadie.',
                'Una sola cuenta por persona.',
              ],
            },
            {
              title: 'Lo que publicas',
              items: [
                'Sé honesto: solo reseñas basadas en tu experiencia real.',
                'Sé respetuoso: sin insultos, acoso ni discriminación.',
                'Sin contenido falso, spam ni publicidad.',
                'Podemos eliminar contenido que no cumpla estas normas.',
              ],
            },
            {
              title: 'Lo que no está permitido',
              items: [
                'Crear cuentas falsas o múltiples para manipular calificaciones.',
                'Intentar hackear, extraer datos o interrumpir la plataforma.',
                'Suplantar identidad de otras personas.',
                'Usar la plataforma para actividades que perjudiquen a otros.',
              ],
            },
            {
              title: 'Sobre el servicio',
              content: 'Nos esforzamos por mantener todo funcionando bien, pero el servicio se ofrece tal como está. Puede haber mantenimientos o cambios en cualquier momento. No somos responsables de decisiones académicas basadas en la información de la plataforma.',
            },
            {
              title: 'Cambios en estos términos',
              content: 'Si hacemos cambios importantes, te avisaremos en la plataforma. Seguir usando MiSemestre después de un aviso significa que aceptas los nuevos términos.',
            },
            {
              title: 'Contacto',
              content: 'Si tienes dudas o algún problema, escríbenos a través del chat de soporte dentro de la plataforma.',
            },
          ].map(({ title, content, items }) => (
            <section key={title} className="mb-8">
              <h2 className={`text-lg font-semibold mb-3 ${heading}`}>{title}</h2>
              {content && <p className={text}>{content}</p>}
              {items && (
                <ul className={`space-y-1.5 ${text}`}>
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
