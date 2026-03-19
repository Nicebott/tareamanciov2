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
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Política de Privacidad
          </h1>
          <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className={`prose prose-lg max-w-none ${
            darkMode ? 'prose-invert' : ''
          } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>

            <div className="mb-8">
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                En zierow, respetamos tu privacidad y estamos comprometidos con la protección de tus datos personales. Esta Política de Privacidad explica detalladamente qué información recopilamos, cómo la utilizamos, con quién la compartimos y cuáles son tus derechos. Te recomendamos leer cuidadosamente este documento.
              </p>
            </div>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1. Información que Recopilamos
              </h2>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Información de Registro
              </h3>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Correo electrónico</li>
                <li>Nombre de usuario</li>
                <li>Contraseña (encriptada)</li>
                <li>Fecha de registro</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Información de Uso
              </h3>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Reseñas y calificaciones de profesores</li>
                <li>Publicaciones y comentarios en el foro</li>
                <li>Mensajes en el chat</li>
                <li>Historial de búsquedas y navegación</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Información Técnica
              </h3>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Dirección IP y ubicación geográfica aproximada</li>
                <li>Tipo de navegador, versión y configuración</li>
                <li>Dispositivo y sistema operativo</li>
                <li>Cookies y tecnologías similares</li>
                <li>Páginas visitadas y tiempo de navegación</li>
                <li>Patrones de uso y preferencias</li>
                <li>Información de diagnóstico y errores</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 mt-4 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Información de Terceros
              </h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Utilizamos Supabase como proveedor de servicios de autenticación y base de datos. Supabase puede recopilar información adicional según su propia política de privacidad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                2. Cómo Usamos tu Información
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Utilizamos la información recopilada para:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Proporcionar y mantener nuestros servicios</li>
                <li>Autenticar tu identidad y proteger tu cuenta</li>
                <li>Personalizar tu experiencia en la plataforma</li>
                <li>Moderar contenido y prevenir abusos</li>
                <li>Mejorar nuestros servicios y desarrollar nuevas funcionalidades</li>
                <li>Comunicarnos contigo sobre actualizaciones o cambios importantes</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3. Base Legal para el Procesamiento
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Procesamos tus datos personales bajo las siguientes bases legales:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Consentimiento: Al registrarte y usar nuestros servicios</li>
                <li>Ejecución de contrato: Para proporcionar los servicios solicitados</li>
                <li>Interés legítimo: Para mejorar y proteger nuestros servicios</li>
                <li>Obligación legal: Cuando sea requerido por ley</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                4. Compartir Información
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                No vendemos ni alquilamos tu información personal a terceros. Podemos compartir información limitada en las siguientes circunstancias:
              </p>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Proveedores de Servicios
              </h3>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Supabase para autenticación, base de datos y almacenamiento en la nube</li>
                <li>Proveedores de hosting y servicios de infraestructura</li>
                <li>Servicios de análisis y monitoreo de rendimiento</li>
                <li>Proveedores de seguridad y prevención de fraude</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Información Pública
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Tu nombre de usuario y contenido público son visibles para otros usuarios:
              </p>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Reseñas y calificaciones de profesores</li>
                <li>Publicaciones en foros y discusiones</li>
                <li>Mensajes en el chat público</li>
                <li>Respuestas a temas de la comunidad</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Requerimientos Legales
              </h3>
              <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Podemos divulgar información cuando:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Sea requerido por ley, orden judicial o proceso legal</li>
                <li>Sea necesario para proteger nuestros derechos legales</li>
                <li>Sea necesario para prevenir fraude o abuso</li>
                <li>Sea necesario para proteger la seguridad de los usuarios</li>
                <li>Con tu consentimiento explícito para otros propósitos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                5. Seguridad de los Datos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                La seguridad de tus datos personales es una prioridad. Implementamos las siguientes medidas:
              </p>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Medidas Técnicas
              </h3>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Encriptación de contraseñas mediante Supabase Authentication</li>
                <li>Conexiones seguras mediante protocolo HTTPS/TLS</li>
                <li>Encriptación de datos sensibles en tránsito y en reposo</li>
                <li>Firewalls y sistemas de detección de intrusiones</li>
                <li>Protección contra ataques DDoS y vulnerabilidades conocidas</li>
                <li>Monitoreo continuo de seguridad y registros de auditoría</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Medidas Organizativas
              </h3>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Acceso restringido a datos personales solo para personal autorizado</li>
                <li>Políticas de seguridad y procedimientos documentados</li>
                <li>Capacitación regular en seguridad de datos</li>
                <li>Copias de seguridad automáticas y regulares</li>
                <li>Plan de respuesta ante incidentes de seguridad</li>
              </ul>

              <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro. No podemos garantizar seguridad absoluta, pero hacemos todo lo razonablemente posible para proteger tus datos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6. Retención de Datos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Conservamos tus datos personales durante diferentes períodos según el tipo de información:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Información de cuenta: Mientras tu cuenta permanezca activa</li>
                <li>Contenido público: Puede permanecer visible incluso después de eliminar tu cuenta</li>
                <li>Registros de seguridad: Hasta 12 meses para fines de seguridad</li>
                <li>Datos técnicos: Normalmente entre 30 y 90 días</li>
                <li>Información legal: Según sea requerido por ley o para cumplir obligaciones legales</li>
              </ul>
              <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Puedes solicitar la eliminación de tu cuenta y datos asociados en cualquier momento. Tras la eliminación, tus datos personales serán eliminados de nuestros sistemas activos dentro de 30 días, excepto cuando debamos conservarlos por razones legales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                7. Tus Derechos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Tienes derecho a:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Acceder a tus datos personales</li>
                <li>Rectificar información incorrecta</li>
                <li>Eliminar tu cuenta y datos asociados</li>
                <li>Exportar tus datos en formato portable</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Limitar el procesamiento en ciertas circunstancias</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                8. Cookies y Tecnologías de Seguimiento
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia:
              </p>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Tipos de Cookies que Usamos
              </h3>
              <ul className={`list-disc list-inside space-y-2 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Cookies esenciales: Necesarias para el funcionamiento básico del sitio</li>
                <li>Cookies de preferencias: Recuerdan tus configuraciones como modo oscuro</li>
                <li>Cookies de sesión: Mantienen tu sesión activa mientras navegas</li>
                <li>Cookies de autenticación: Verifican tu identidad y mantienen tu sesión segura</li>
                <li>Almacenamiento local: Para guardar preferencias y mejorar el rendimiento</li>
              </ul>

              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Control de Cookies
              </h3>
              <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Puedes controlar y gestionar las cookies de varias maneras:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Configurar tu navegador para rechazar cookies</li>
                <li>Eliminar cookies existentes de tu navegador</li>
                <li>Usar el modo de navegación privada o incógnito</li>
                <li>Ten en cuenta que rechazar cookies puede afectar la funcionalidad del sitio</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                9. Privacidad de Menores
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Nuestros servicios están dirigidos a estudiantes universitarios mayores de 18 años. No recopilamos intencionalmente información de menores de edad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                10. Cambios a esta Política
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos mediante un aviso en la plataforma o por correo electrónico. Te recomendamos revisar esta política regularmente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                11. Transferencia Internacional de Datos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Tus datos pueden ser transferidos y almacenados en servidores ubicados fuera de República Dominicana:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Utilizamos Supabase, cuyos servidores pueden estar en diferentes regiones geográficas</li>
                <li>Nuestros proveedores de servicios pueden operar en Estados Unidos y otros países</li>
                <li>Estos países pueden tener leyes de protección de datos diferentes</li>
                <li>Todos nuestros proveedores cumplen con estándares internacionales de protección de datos</li>
                <li>Implementamos medidas adicionales para garantizar la seguridad en transferencias internacionales</li>
                <li>Al usar el servicio, consientes estas transferencias internacionales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                12. Enlaces a Sitios de Terceros
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Nuestra plataforma puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad o el contenido de estos sitios. Te recomendamos leer las políticas de privacidad de cualquier sitio de terceros que visites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                13. Cambios Corporativos
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                En caso de fusión, adquisición, venta de activos o quiebra, tus datos personales pueden ser transferidos como parte de la transacción. Te notificaremos mediante un aviso destacado en la plataforma antes de que tus datos sean transferidos y queden sujetos a una política de privacidad diferente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                14. Violaciones de Datos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                En caso de una violación de seguridad que afecte tus datos personales:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Te notificaremos sin demora indebida</li>
                <li>Describiremos la naturaleza de la violación y los datos afectados</li>
                <li>Informaremos sobre las medidas tomadas para mitigar el daño</li>
                <li>Proporcionaremos recomendaciones sobre pasos que puedes tomar</li>
                <li>Cooperaremos con las autoridades según sea requerido por ley</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                15. Verificación de Edad
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                No verificamos activamente la edad de los usuarios. Al crear una cuenta, declaras que tienes al menos 18 años o la edad legal para formar un contrato vinculante en tu jurisdicción. Si descubrimos que un usuario menor de edad ha proporcionado información personal, tomaremos medidas para eliminar esa información de nuestros sistemas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                16. Tus Opciones y Preferencias
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Tienes varias opciones sobre cómo usamos tus datos:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Puedes actualizar la información de tu perfil en cualquier momento</li>
                <li>Puedes eliminar contenido que hayas publicado</li>
                <li>Puedes dejar de usar la plataforma en cualquier momento</li>
                <li>Puedes cambiar las configuraciones de privacidad de tu navegador</li>
                <li>Puedes solicitar una copia de tus datos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                17. Contacto y Consultas
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Si tienes preguntas, inquietudes o deseas ejercer tus derechos de privacidad:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Puedes contactarnos a través del chat de soporte en la plataforma</li>
                <li>Responderemos a tus consultas en un plazo de 30 días</li>
                <li>Para solicitudes urgentes de privacidad, indícalo claramente en tu mensaje</li>
                <li>Mantendremos un registro de tu solicitud para fines de cumplimiento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                18. Cumplimiento y Autoridades
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Nos comprometemos a resolver quejas sobre tu privacidad y nuestra recopilación o uso de tu información personal. Si no estás satisfecho con nuestra respuesta, tienes el derecho de presentar una queja ante la autoridad de protección de datos de República Dominicana.
              </p>
            </section>

            <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Al continuar usando MiSemestre, aceptas esta Política de Privacidad actualizada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
