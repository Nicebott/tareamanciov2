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
          <h1 className={`text-3xl md:text-4xl font-bold mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Términos y Condiciones
          </h1>

          <div className={`prose prose-lg max-w-none ${
            darkMode ? 'prose-invert' : ''
          } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>

            <div className="mb-8">
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Bienvenido a MiSemestre, plataforma de Programación Docente UASD. Al utilizar nuestros servicios, aceptas los siguientes términos y condiciones. Por favor, léelos cuidadosamente antes de usar la plataforma.
              </p>
            </div>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1. Aceptación de los Términos
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Al acceder y utilizar MiSemestre, aceptas estar legalmente vinculado por estos Términos y Condiciones, todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, no debes utilizar este servicio. El uso continuado de la plataforma constituye la aceptación de estos términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                2. Descripción del Servicio
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                MiSemestre es una plataforma independiente que proporciona:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Información sobre la programación docente de la Universidad Autónoma de Santo Domingo (UASD)</li>
                <li>Sistema de reseñas y calificaciones de profesores</li>
                <li>Foros de discusión para la comunidad estudiantil</li>
                <li>Chat en tiempo real para interacción entre estudiantes</li>
                <li>Herramientas de búsqueda y filtrado de asignaturas</li>
              </ul>
              <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Esta plataforma es independiente y no está oficialmente afiliada a la UASD. La información se proporciona únicamente con fines informativos y educativos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3. Registro y Cuenta de Usuario
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Para acceder a ciertas funciones de la plataforma, debes crear una cuenta:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Debes proporcionar información precisa, completa y actualizada al registrarte</li>
                <li>Debes ser mayor de 18 años para crear una cuenta</li>
                <li>Eres responsable de mantener la confidencialidad de tu contraseña</li>
                <li>Eres responsable de todas las actividades que ocurran bajo tu cuenta</li>
                <li>Debes notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta</li>
                <li>No puedes compartir tu cuenta con terceros ni transferir tu cuenta</li>
                <li>Nos reservamos el derecho de suspender o eliminar cuentas que violen estos términos</li>
                <li>Solo puedes crear una cuenta por persona</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                4. Contenido de Usuario
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Al publicar reseñas, comentarios, mensajes en el chat o participar en el foro, garantizas que:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>El contenido es original y no infringe derechos de propiedad intelectual de terceros</li>
                <li>No contiene material ofensivo, difamatorio, obsceno, violento o ilegal</li>
                <li>Respeta las normas de convivencia, respeto mutuo y las Normas de Comunidad</li>
                <li>Es veraz y basado en tu experiencia personal real</li>
                <li>No contiene información falsa, engañosa o fraudulenta</li>
                <li>No viola la privacidad de otras personas</li>
                <li>No promueve actividades ilegales o dañinas</li>
              </ul>
              <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Al publicar contenido en la plataforma, nos otorgas una licencia no exclusiva, mundial, libre de regalías y transferible para usar, reproducir, distribuir y mostrar dicho contenido en relación con la operación y promoción del servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                5. Propiedad Intelectual
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Todo el contenido de la plataforma está protegido por derechos de autor:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>El diseño, código fuente, logotipos, interfaces y estructura de la plataforma son propiedad exclusiva de zierow</li>
                <li>Los nombres, marcas y logos de MiSemestre están protegidos por derechos de autor y marcas registradas</li>
                <li>No puedes copiar, modificar, distribuir, vender o arrendar ninguna parte del servicio</li>
                <li>No puedes realizar ingeniería inversa o intentar extraer el código fuente</li>
                <li>El contenido generado por usuarios permanece siendo propiedad de sus respectivos autores</li>
                <li>La información de la programación docente es de dominio público de la UASD</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                6. Conductas Prohibidas
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Está estrictamente prohibido realizar las siguientes acciones:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Publicar contenido falso, engañoso, difamatorio o fraudulento</li>
                <li>Acosar, intimidar, amenazar o discriminar a otros usuarios</li>
                <li>Intentar acceder sin autorización a cuentas de otros usuarios o sistemas</li>
                <li>Utilizar la plataforma para actividades ilegales o no autorizadas</li>
                <li>Realizar scraping, web crawling o recopilación automatizada de datos</li>
                <li>Distribuir virus, malware o cualquier código dañino</li>
                <li>Manipular o interferir con el funcionamiento de la plataforma</li>
                <li>Crear múltiples cuentas para evadir restricciones o manipular calificaciones</li>
                <li>Vender, intercambiar o transferir tu cuenta a terceros</li>
                <li>Usar la plataforma para spam, publicidad no autorizada o marketing masivo</li>
                <li>Suplantar la identidad de otra persona u organización</li>
                <li>Violar las Normas de Comunidad establecidas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                7. Moderación y Eliminación de Contenido
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Nos reservamos el derecho, pero no la obligación, de:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Revisar, monitorear y moderar todo el contenido publicado en la plataforma</li>
                <li>Eliminar o editar cualquier contenido que viole estos términos sin previo aviso</li>
                <li>Suspender temporal o permanentemente cuentas que incumplan estas normas</li>
                <li>Tomar acciones legales contra usuarios que violen gravemente estos términos</li>
                <li>Cooperar con autoridades en investigaciones legales</li>
                <li>Eliminar contenido que consideremos inapropiado, aunque no viole explícitamente estos términos</li>
              </ul>
              <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                La moderación se realiza para mantener un ambiente seguro y respetuoso para todos los usuarios.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                8. Disponibilidad del Servicio
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Nos esforzamos por mantener la plataforma disponible, pero no garantizamos un servicio ininterrumpido:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>El servicio se proporciona en una base tal cual está</li>
                <li>Podemos realizar mantenimiento programado o de emergencia sin previo aviso</li>
                <li>Podemos modificar, suspender o discontinuar características en cualquier momento</li>
                <li>No somos responsables por interrupciones del servicio causadas por factores fuera de nuestro control</li>
                <li>Nos reservamos el derecho de terminar el servicio con un aviso razonable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                9. Descargo de Responsabilidad
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                El uso de esta plataforma es bajo tu propio riesgo:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>La información proporcionada es únicamente con fines informativos y educativos</li>
                <li>No garantizamos la exactitud, completitud o actualidad de la información de programación docente</li>
                <li>Las reseñas y calificaciones representan opiniones personales de usuarios individuales</li>
                <li>No nos hacemos responsables de decisiones académicas tomadas basándose en esta información</li>
                <li>La programación docente oficial debe ser consultada directamente con la UASD</li>
                <li>No somos responsables del contenido generado por usuarios</li>
                <li>No garantizamos resultados específicos del uso de la plataforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                10. Limitación de Responsabilidad
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                En la máxima medida permitida por la ley:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>No seremos responsables por daños indirectos, incidentales, especiales o consecuentes</li>
                <li>No seremos responsables por pérdida de datos, beneficios o uso del servicio</li>
                <li>Nuestra responsabilidad total no excederá el monto pagado por ti, si aplica</li>
                <li>No somos responsables por acciones de terceros o contenido de enlaces externos</li>
                <li>No garantizamos que el servicio esté libre de errores o virus</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                11. Indemnización
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                Aceptas indemnizar y mantener indemne a zierow, sus afiliados, directores, empleados y agentes de cualquier reclamo, daño, pérdida, responsabilidad, costo y gasto (incluyendo honorarios legales) que surja de tu uso del servicio, violación de estos términos, o violación de cualquier derecho de terceros.
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                12. Modificaciones de los Términos
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Nos reservamos el derecho de modificar estos términos en cualquier momento:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Los cambios significativos serán notificados mediante aviso en la plataforma</li>
                <li>También podemos notificarte por correo electrónico sobre cambios importantes</li>
                <li>El uso continuo del servicio después de las modificaciones constituye la aceptación de los nuevos términos</li>
                <li>Si no estás de acuerdo con los cambios, debes dejar de usar la plataforma</li>
                <li>La fecha de última actualización aparece al final de este documento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                13. Terminación de Cuenta
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Puedes cancelar tu cuenta en cualquier momento. Nos reservamos el derecho de:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Suspender o terminar tu acceso por violación de estos términos</li>
                <li>Eliminar tu cuenta y todo el contenido asociado</li>
                <li>Negar el servicio a cualquier persona en cualquier momento</li>
                <li>Tras la terminación, tu derecho a usar el servicio cesa inmediatamente</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                14. Ley Aplicable y Jurisdicción
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Estos términos se rigen e interpretan de acuerdo con las leyes de la República Dominicana:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Cualquier disputa será resuelta en los tribunales competentes de Santo Domingo</li>
                <li>Aceptas someterte a la jurisdicción exclusiva de dichos tribunales</li>
                <li>Renuncias a cualquier objeción sobre la ubicación o conveniencia del foro</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                15. Disposiciones Generales
              </h2>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Si alguna disposición es inválida, el resto permanece en pleno vigor</li>
                <li>El no ejercicio de un derecho no constituye una renuncia al mismo</li>
                <li>Estos términos constituyen el acuerdo completo entre las partes</li>
                <li>No puedes transferir tus derechos bajo estos términos sin nuestro consentimiento</li>
                <li>Podemos ceder nuestros derechos a cualquier afiliado o sucesor</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                16. Contacto
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                Si tienes preguntas, comentarios o inquietudes sobre estos términos:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <li>Puedes contactarnos a través del chat de soporte en la plataforma</li>
                <li>Responderemos a tus consultas en un plazo razonable</li>
                <li>Para asuntos legales, utiliza los canales oficiales de comunicación</li>
              </ul>
            </section>

            <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
