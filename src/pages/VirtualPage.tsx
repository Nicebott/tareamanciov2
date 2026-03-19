import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import HomePage from './HomePage';

interface VirtualPageProps {
  darkMode: boolean;
  currentUser: { id: string; displayName: string; email: string } | null;
  onOpenAuth: () => void;
}

const VirtualPage: React.FC<VirtualPageProps> = ({ darkMode, currentUser, onOpenAuth }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('modality', 'virtual');
    setSearchParams(params, { replace: true });
  }, []);

  return (
    <>
      <SEO
        title="UASD Virtual - Programación Docente Online 2026-10 | MiSemestre"
        description="Consulta las asignaturas virtuales de la UASD semestre 2026-10. Encuentra cursos online, horarios y profesores de la modalidad virtual de la Universidad Autonoma de Santo Domingo."
        keywords="uasd virtual, Programación docente uasd online, asignaturas virtuales uasd, cursos online uasd, educacion a distancia uasd, universidad virtual dominicana"
      />
      <HomePage darkMode={darkMode} currentUser={currentUser} onOpenAuth={onOpenAuth} />
    </>
  );
};

export default VirtualPage;
