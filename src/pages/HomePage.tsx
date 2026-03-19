import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CourseTable from '../components/CourseTable';
import Pagination from '../components/Pagination';
import SkeletonCard from '../components/SkeletonCard';
import SEO from '../components/SEO';
import { Course, Section } from '../types';
import { fetchCourseData } from '../api/courseData';
import { normalizeText } from '../utils/stringUtils';
import { GraduationCap } from 'lucide-react';

const ALL_CAMPUSES = [
  'Santo Domingo',
  'Santiago',
  'San Fco de Macorís',
  'Puerto Plata',
  'San Juan',
  'Barahona',
  'Mao',
  'Hato Mayor',
  'Higüey',
  'Bonao',
  'La Vega',
  'Baní',
  'Azua de Compostela',
  'Neyba',
  'Cotuí',
  'Nagua',
  'Dajabón',
  'Finca Exp Engombe',
  'Moca',
  'Jarabacoa',
  'San Cristóbal',
  'San Pedro de Macorís',
  'Montecristi',
  'Samaná',
  'Elías Piña',
  'Hermanas Mirabal',
  'Yamasá'
];

const SEO_CONFIG: Record<string, { title: string; description: string; keywords: string }> = {
  '/virtual': {
    title: 'UASD Virtual - Programación Docente Online 2026-10 | MiSemestre',
    description: 'Consulta las asignaturas virtuales de la UASD semestre 2026-10. Encuentra cursos online, horarios y profesores de la modalidad virtual.',
    keywords: 'uasd virtual, Programación docente uasd online, asignaturas virtuales uasd, cursos online uasd, educacion a distancia uasd',
  },
  '/semipresencial': {
    title: 'UASD Semipresencial - Programación Docente 2026-10 | MiSemestre',
    description: 'Consulta las asignaturas semipresenciales de la UASD semestre 2026-10. Encuentra cursos híbridos, horarios y profesores.',
    keywords: 'uasd semipresencial, Programación docente uasd hibrida, asignaturas semipresenciales uasd',
  },
  '/': {
    title: 'MiSemestre - Programación Docente UASD 2026-10 | Horarios y Asignaturas',
    description: 'Consulta la Programación docente UASD 2026-10. Busca asignaturas, horarios, profesores y NRC por campus.',
    keywords: 'Programación docente uasd, horarios uasd 2026-10, asignaturas uasd, nrc uasd, profesores uasd',
  },
};

// Modalidad determinada por ruta — no por URL param
// Esto elimina el bug de doble clic completamente
const ROUTE_MODALITY: Record<string, string> = {
  '/virtual': 'virtual',
  '/semipresencial': 'semipresencial',
};

interface HomePageProps {
  darkMode: boolean;
  currentUser: { id: string; displayName: string; email: string } | null;
  onOpenAuth: () => void;
}

const HomePage: React.FC<HomePageProps> = memo(({ darkMode, currentUser, onOpenAuth }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [allSections, setAllSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('q') || '';
  const selectedCampus = searchParams.get('campus') || '';
  const itemsPerPage = 21;

  // Modalidad se lee de la ruta, no del URL param — elimina el bug de doble clic
  const selectedModality = ROUTE_MODALITY[location.pathname] || '';

  const seoConfig = SEO_CONFIG[location.pathname] || SEO_CONFIG['/'];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const { courses, sections } = await fetchCourseData();
        setAllCourses(courses);
        setAllSections(sections);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSearch = useCallback((query: string, campus: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (campus) params.set('campus', campus);
    params.set('page', '1');
    setSearchParams(params);
  }, [setSearchParams]);

  const courseMap = useMemo(() => {
    const map = new Map<string, Course>();
    allCourses.forEach(course => map.set(course.id, course));
    return map;
  }, [allCourses]);

  const filteredSections = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery);

    return allSections.filter(section => {
      const course = courseMap.get(section.courseId);

      // Si no hay búsqueda, solo aplicar filtros de campus y modalidad
      if (!normalizedQuery) {
        const matchesCampus = !selectedCampus || section.campus === selectedCampus;
        const modalidad = (section.modalidad || '').toLowerCase();
        const matchesModality = !selectedModality ||
          (selectedModality === 'virtual' && (
            modalidad.includes('online') ||
            modalidad.includes('virtual') ||
            modalidad.includes('internet')
          )) ||
          (selectedModality === 'semipresencial' && (
            modalidad.includes('semi') ||
            modalidad.includes('semipresencial') ||
            modalidad.includes('semi presencial')
          ));
        return matchesCampus && matchesModality;
      }

      // Normalizar todos los campos de búsqueda
      const professorNormalized = normalizeText(section.professor);
      const nrcNormalized = normalizeText(section.nrc);
      const courseNameNormalized = course ? normalizeText(course.name) : '';
      const courseCodeNormalized = course ? normalizeText(course.code) : '';

      // Dividir la consulta en palabras para búsqueda flexible
      const queryWords = normalizedQuery.split(' ').filter(word => word.length > 0);

      // Verificar si todas las palabras de la consulta están en alguno de los campos
      const matchesSearch = queryWords.every(queryWord => {
        return [
          professorNormalized,
          nrcNormalized,
          courseNameNormalized,
          courseCodeNormalized
        ].some(text => text && text.includes(queryWord));
      });

      const matchesCampus = !selectedCampus || section.campus === selectedCampus;

      const modalidad = (section.modalidad || '').toLowerCase();

      const matchesModality = !selectedModality ||
        (selectedModality === 'virtual' && (
          modalidad.includes('online') ||
          modalidad.includes('virtual') ||
          modalidad.includes('internet')
        )) ||
        (selectedModality === 'semipresencial' && (
          modalidad.includes('semi') ||
          modalidad.includes('semipresencial') ||
          modalidad.includes('semi presencial')
        ));

      return matchesSearch && matchesCampus && matchesModality;
    });
  }, [allSections, courseMap, searchQuery, selectedCampus, selectedModality]);

  const totalPages = Math.max(1, Math.ceil(filteredSections.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      const params = new URLSearchParams(searchParams);
      params.set('page', totalPages.toString());
      setSearchParams(params);
    }
  }, [totalPages, currentPage, searchParams, setSearchParams]);

  const currentSections = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSections.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSections, currentPage, itemsPerPage]);

  const currentCourses = useMemo(() => {
    const uniqueCourseIds = new Set(currentSections.map(section => section.courseId));
    return allCourses.filter(course => uniqueCourseIds.has(course.id));
  }, [currentSections, allCourses]);

  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, setSearchParams]);

  return (
    <>
      <SEO
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
      />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl text-center mb-8">
          <div className="inline-block">
            <GraduationCap
              size={64}
              className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} mx-auto mb-4`}
            />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Programación Docente UASD
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Encuentra y explora las asignaturas disponibles para el semestre 2026-10
          </p>
        </div>

        <SearchBar
          onSearch={handleSearch}
          campuses={ALL_CAMPUSES}
          selectedCampus={selectedCampus}
          darkMode={darkMode}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
            {[...Array(21)].map((_, index) => (
              <SkeletonCard key={index} darkMode={darkMode} />
            ))}
          </div>
        ) : currentSections.length > 0 ? (
          <>
            <CourseTable
              courses={currentCourses}
              sections={currentSections}
              onRateSection={() => {
                if (!currentUser) {
                  onOpenAuth();
                }
              }}
              darkMode={darkMode}
              currentUser={currentUser}
            />
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredSections.length}
              paginate={handlePageChange}
              currentPage={currentPage}
              darkMode={darkMode}
            />
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-4`}>
              Mostrando {currentSections.length} de {filteredSections.length} resultados
              {selectedCampus && ` en ${selectedCampus}`}
              {selectedModality && ` (${selectedModality})`}
            </p>
          </>
        ) : (
          <div className={`mt-12 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl font-medium mb-2">
              {selectedCampus
                ? `No se encontraron asignaturas para el campus de ${selectedCampus}.`
                : "No se encontraron asignaturas que coincidan con la busqueda."}
            </p>
            <p className="text-sm">
              Intenta ajustar los filtros o realizar una nueva busqueda
            </p>
          </div>
        )}
      </div>
    </>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
