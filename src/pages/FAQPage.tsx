import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';

interface FAQPageProps {
  darkMode: boolean;
}

const FAQPage: React.FC<FAQPageProps> = ({ darkMode }) => {
  return (
    <>
      <SEO
        title="Preguntas Frecuentes UASD - FAQ | MiSemestre"
        description="Preguntas frecuentes sobre inscripciones UASD, prueba POMA, costos, calendario academico, horarios y mas. Respuestas a todas tus dudas sobre la Universidad Autonoma de Santo Domingo."
        keywords="faq uasd, preguntas frecuentes uasd, inscripciones uasd, prueba poma, costos uasd, calendario academico uasd, informacion universidad"
      />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <FAQ darkMode={darkMode} />
      </motion.div>
    </>
  );
};

export default FAQPage;
