import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import HomePage from './HomePage';

interface SemipresencialPageProps {
  darkMode: boolean;
  currentUser: { id: string; displayName: string; email: string } | null;
  onOpenAuth: () => void;
}

const SemipresencialPage: React.FC<SemipresencialPageProps> = ({ darkMode, currentUser, onOpenAuth }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('modality', 'semipresencial');
    setSearchParams(params, { replace: true });
  }, []);

  return (
    <>
      <SEO
        title="UASD Semipresencial - Programación Docente 2026-10 | MiSemestre"
        description="Asignaturas semipresenciales de la UASD 2026-10. Cursos hibridos que combinan clases presenciales y virtuales. Consulta horarios y profesores de la modalidad semipresencial."
        keywords="uasd semipresencial, cursos hibridos uasd, educacion semipresencial uasd, clases mixtas uasd, horarios semipresenciales, universidad hibrida"
      />
      <HomePage darkMode={darkMode} currentUser={currentUser} onOpenAuth={onOpenAuth} />
    </>
  );
};

export default SemipresencialPage;
