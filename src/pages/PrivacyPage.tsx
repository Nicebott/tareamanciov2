import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPageProps {
  darkMode: boolean;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ darkMode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const text = darkMode ? 'text-gray-300' : 'text-gray-700';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const heading = darkMode ? 'text-white' : 'text-gray-900';
  const subheading = darkMode ? 'text-blue-300' : 'text-blue-600';

  const Bullet = ({ item }: { item: string }) => (
    <li className="flex items-start gap-2">
      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`} />
      {item}
    </li>
  );

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
            Política de Privacidad
          </h1>
          <p className={`text-sm mb-10 ${muted}`}>
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <p className={`mb-10 ${text}`}>
            Tu privacidad nos importa. Aquí te explicamos de forma clara qué información guardamos y para qué la usamos.
          </p>

          {/* Qué guardamos */}
          <section className="mb-8">
            <h2 className={`text-lg font-semibold mb-4 ${heading}`}>Qué información guardamos</h2>
            <div className="space-y-5">
              <div>
                <h3 className={`text-sm font-semibold uppercase tracking-wide mb-2 ${subheading}`}>Al registrarte</h3>
                <ul className={`space-y-1.5 ${text}`}>
                  {['Correo electrónico', 'Nombre de usuario', 'Contraseña (encriptada)'].map(item => (
                    <Bullet key={item} item={item} />
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={`text-sm font-semibold uppercase tracking-wide mb-2 ${subheading}`}>Al usar la plataforma</h3>
                <ul className={`space-y-1.5 ${text}`}>
                  {[
                    'Reseñas, comentarios y mensajes que publicas',
                    'Búsquedas e historial de navegación dentro del sitio',
                    'Dispositivo, navegador y dirección IP aproximada',
                  ].map(item => (
                    <Bullet key={item} item={item} />
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Para qué la usamos */}
          <section className="mb-8">
            <h2 className={`text-lg font-semibold mb-3 ${heading}`}>Para qué usamos esa información</h2>
            <ul className={`space-y-1.5 ${text}`}>
              {[
                'Que puedas iniciar sesión y usar tu cuenta.',
                'Mostrarte el contenido de la plataforma correctamente.',
                'Moderar el contenido y evitar abusos.',
                'Avisarte si hay cambios importantes en la plataforma.',
                'Mejorar la experiencia con el tiempo.',
              ].map(item => (
                <Bullet key={item} item={item} />
              ))}
            </ul>
          </section>

          {/* Qué es público */}
          <section className="mb-8">
            <h2 className={`text-lg font-semibold mb-3 ${heading}`}>Qué ven otros usuarios</h2>
            <p className={`mb-3 ${text}`}>
              Tu nombre de usuario y el contenido que publicas son visibles para todos:
            </p>
            <ul className={`space-y-1.5 ${text}`}>
              {[
                'Reseñas y calificaciones de profesores',
                'Publicaciones en el foro',
                'Mensajes en el chat público',
              ].map(item => (
                <Bullet key={item} item={item} />
              ))}
            </ul>
            <p className={`mt-3 text-sm ${muted}`}>
              Tu correo y contraseña nunca son visibles para otros usuarios.
            </p>
          </section>

          {/* Con quién se comparte */}
          <section className="mb-8">
            <h2 className={`text-lg font-semibold mb-3 ${heading}`}>Con quién compartimos tus datos</h2>
            <p className={`mb-3 ${text}`}>
              No vendemos ni compartimos tu información con terceros para publicidad. Solo la compartimos con:
            </p>
            <ul className={`space-y-1.5 ${text}`}>
              {[
                'Supabase — para autenticación, base de datos y almacenamiento (nuestro proveedor principal).',
                'Servicios de hosting e infraestructura necesarios para que la plataforma funcione.',
              ].map(item => (
                <Bullet key={item} item={item} />
              ))}
            </ul>
          </section>

          {/* Seguridad */}
          <section className="mb-8">
            <h2 className={`text-lg font-semibold mb-3 ${heading}`}>Seguridad</h2>
            <p className={text}>
              Usamos HTTPS, contraseñas encriptadas y los mecanismos de seguridad de Supabase. Ningún sistema es 100% infalible, pero hacemos todo lo posible para proteger tu información.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className={`text-lg font-semibold mb-3 ${heading}`}>Cookies</h2>
            <p className={`mb-3 ${text}`}>
              Usamos cookies para que la plataforma funcione bien. No hay cookies de publicidad ni rastreo externo.
            </p>
            <ul className={`space-y-1.5 ${text}`}>
              {[
                'Sesión — para que no tengas que iniciar sesión cada vez.',
                'Preferencias — para recordar cosas como el modo oscuro.',
                'Autenticación — para verificar que eres tú al navegar.',
              ].map(item => (
                <Bullet key={item} item={item} />
              ))}
            </ul>
            <p className={`mt-3 text-sm ${muted}`}>
              Puedes desactivar las cookies desde tu navegador, pero algunas funciones del sitio pueden dejar de funcionar.
            </p>
          </section>

          {/* Tus derechos */}
          <section className="mb-8">
            <h2 className={`text-lg font-semibold mb-3 ${heading}`}>Lo que puedes hacer</h2>
            <ul className={`space-y-1.5 ${text}`}>
              {[
                'Actualizar tu perfil cuando quieras.',
                'Eliminar el contenido que publicaste.',
                'Solicitar que eliminemos tu cuenta y tus datos.',
                'Dejar de usar la plataforma en cualquier momento.',
              ].map(item => (
                <Bullet key={item} item={item} />
              ))}
            </ul>
          </section>

          {/* Contacto */}
          <section className="mb-8">
            <h2 className={`text-lg font-semibold mb-3 ${heading}`}>Contacto</h2>
            <p className={text}>
              Si tienes alguna duda sobre tu privacidad o quieres solicitar algo, escríbenos por el chat de soporte dentro de la plataforma. Respondemos en un plazo razonable.
            </p>
          </section>

          <div className={`mt-10 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${muted}`}>
              Al usar MiSemestre aceptas esta política. Si hacemos cambios importantes, te avisaremos en la plataforma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
