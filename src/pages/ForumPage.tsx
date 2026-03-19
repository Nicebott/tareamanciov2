import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Forum from '../components/Forum/Forum';

interface ForumPageProps {
  darkMode: boolean;
  onOpenAuth: () => void;
}

const ForumPage: React.FC<ForumPageProps> = ({ darkMode, onOpenAuth }) => {
  return (
    <>
      <SEO
        title="Foro Estudiantil UASD - Comunidad y Discusiones | MiSemestre"
        description="Foro de estudiantes de la UASD. Comparte experiencias, haz preguntas, participa en discusiones sobre asignaturas, profesores y la vida universitaria en la Universidad Autonoma de Santo Domingo."
        keywords="foro uasd, comunidad estudiantes uasd, discusiones academicas, experiencias universitarias, ayuda estudiantes uasd, comunidad universitaria"
      />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <Forum darkMode={darkMode} setIsAuthModalOpen={onOpenAuth} />
      </motion.div>
    </>
  );
};

export default ForumPage;
