import React, { useState, useEffect, useMemo, memo, useCallback, Suspense } from 'react';
import { Course, Section } from '../types';
import { Search, Star, BookOpen, MapPin, Clock, Users, Globe } from 'lucide-react';
import { supabase } from '../supabase';
import { Card, CardContent } from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';

// Lazy load modals to reduce initial bundle size
const ProfessorDetailsModal = React.lazy(() => import('./ProfessorDetailsModal'));
const ReviewModal = React.lazy(() => import('./ReviewModal'));

interface ProfessorRating {
  rating: number;
  clarity: number;
  fairness: number;
  punctuality: number;
  wouldTakeAgain: number;
}

interface CourseTableProps {
  courses: Course[];
  sections: Section[];
  onRateSection: (sectionId: string) => void;
  darkMode: boolean;
  currentUser: { id: string; displayName: string; email: string } | null;
}

const CourseCard = memo<{
  section: Section;
  course: Course;
  rating: ProfessorRating | undefined;
  darkMode: boolean;
  onDetailsClick: (professor: { id: string; name: string }) => void;
  onRateClick: (sectionId: string, professorId: string) => void;
  getModalityBadge: (modalidad: string) => JSX.Element;
}>(({ section, course, rating, darkMode, onDetailsClick, onRateClick, getModalityBadge }) => (
  <Card className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-shadow duration-200`}>
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {course.name}
            </h3>
            {getModalityBadge(section.modalidad)}
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <BookOpen size={16} className="mr-2 text-blue-500" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {course.code} - NRC: {section.nrc}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin size={16} className="mr-2 text-green-500" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {section.campus}
              </span>
              <Clock size={16} className="ml-4 mr-2 text-purple-500" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {section.schedule}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star size={16} className="mr-2 text-yellow-500" />
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {section.professor}
              </span>
            </div>
            {rating && (
              <Badge
                variant={rating.rating >= 8 ? 'success' : rating.rating >= 6 ? 'warning' : 'error'}
                size="sm"
              >
                {rating.rating.toFixed(1)}
              </Badge>
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDetailsClick({
                id: section.professor,
                name: section.professor
              })}
              className="flex-1"
            >
              <Search size={14} className="mr-1" />
              Detalles
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => onRateClick(section.id, section.professor)}
              className="flex-1"
            >
              <Star size={14} className="mr-1" />
              Calificar
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
));

CourseCard.displayName = 'CourseCard';

const CourseTable: React.FC<CourseTableProps> = ({ courses, sections, onRateSection, darkMode, currentUser }) => {
  const [selectedProfessor, setSelectedProfessor] = useState<{ id: string; name: string } | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [professorRatings, setProfessorRatings] = useState<Record<string, ProfessorRating>>({});

  useEffect(() => {
    let isMounted = true;

    const fetchProfessorRatings = async () => {
      const uniqueProfessors = [...new Set(sections.map(section => section.professor))];

      if (uniqueProfessors.length === 0) {
        return;
      }

      // Split into batches of 100 to avoid query size limits
      const batchSize = 100;
      const batches = [];
      for (let i = 0; i < uniqueProfessors.length; i += batchSize) {
        batches.push(uniqueProfessors.slice(i, i + batchSize));
      }

      const ratings: Record<string, ProfessorRating> = {};

      try {
        // Fetch all batches in parallel
        const batchPromises = batches.map(batch =>
          supabase
            .from('reviews')
            .select('professor_id, rating, clarity, fairness, punctuality, would_take_again')
            .in('professor_id', batch)
        );

        const results = await Promise.all(batchPromises);

        if (!isMounted) return;

        // Process all results
        const allReviews = results.flatMap(result => result.data || []);

        // Group reviews by professor
        const reviewsByProfessor: Record<string, typeof allReviews> = {};

        allReviews.forEach(review => {
          if (!reviewsByProfessor[review.professor_id]) {
            reviewsByProfessor[review.professor_id] = [];
          }
          reviewsByProfessor[review.professor_id].push(review);
        });

        // Calculate averages for each professor
        Object.entries(reviewsByProfessor).forEach(([professor, reviews]) => {
          if (reviews.length > 0) {
            const totals = reviews.reduce((acc, review) => ({
              rating: acc.rating + review.rating,
              clarity: acc.clarity + (review.clarity || 0),
              fairness: acc.fairness + (review.fairness || 0),
              punctuality: acc.punctuality + (review.punctuality || 0),
              wouldTakeAgain: acc.wouldTakeAgain + (review.would_take_again || 0)
            }), {
              rating: 0,
              clarity: 0,
              fairness: 0,
              punctuality: 0,
              wouldTakeAgain: 0
            });

            const count = reviews.length;
            ratings[professor] = {
              rating: Number((totals.rating / count).toFixed(1)),
              clarity: Number((totals.clarity / count).toFixed(1)),
              fairness: Number((totals.fairness / count).toFixed(1)),
              punctuality: Number((totals.punctuality / count).toFixed(1)),
              wouldTakeAgain: Number((totals.wouldTakeAgain / count).toFixed(1))
            };
          }
        });

        if (isMounted) {
          setProfessorRatings(ratings);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching ratings:', error);
        }
      }
    };

    fetchProfessorRatings();

    return () => {
      isMounted = false;
    };
  }, [sections]);

  const handleRateClick = useCallback((sectionId: string, professorId: string) => {
    if (!currentUser) {
      onRateSection(sectionId);
      return;
    }
    setSelectedProfessor({ id: professorId, name: professorId });
    setShowReviewModal(true);
  }, [currentUser, onRateSection]);

  const handleDetailsClick = useCallback((professor: { id: string; name: string }) => {
    setSelectedProfessor(professor);
  }, []);

  const getModalityBadge = useCallback((modalidad: string) => {
    const modalidadLower = modalidad.toLowerCase();
    if (modalidadLower.includes('online') || modalidadLower.includes('virtual')) {
      return (
        <Badge variant="info" size="sm">
          <Globe className="w-3 h-3 mr-1" />
          Virtual
        </Badge>
      );
    }
    if (modalidadLower.includes('semi')) {
      return (
        <Badge variant="warning" size="sm">
          <Users className="w-3 h-3 mr-1" />
          Semipresencial
        </Badge>
      );
    }
    return (
      <Badge variant="success" size="sm">
        <Users className="w-3 h-3 mr-1" />
        Presencial
      </Badge>
    );
  }, []);

  const courseMap = useMemo(() => {
    const map = new Map<string, Course>();
    courses.forEach(course => map.set(course.id, course));
    return map;
  }, [courses]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8 auto-rows-max">
      {sections.map((section, index) => {
        const course = courseMap.get(section.courseId);
        if (!course) return null;

        const rating = professorRatings[section.professor];

        return (
          <div key={`${section.id}-${section.nrc}-${section.professor}`}>
            <CourseCard
              section={section}
              course={course}
              rating={rating}
              darkMode={darkMode}
              onDetailsClick={handleDetailsClick}
              onRateClick={handleRateClick}
              getModalityBadge={getModalityBadge}
            />
          </div>
        );
      })}

      <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 z-50" />}>
        {selectedProfessor && !showReviewModal && (
          <ProfessorDetailsModal
            key={`details-${selectedProfessor.id}`}
            isOpen={!!selectedProfessor}
            onClose={() => setSelectedProfessor(null)}
            darkMode={darkMode}
            professorId={selectedProfessor.id}
            professorName={selectedProfessor.name}
            currentUser={currentUser}
          />
        )}

        {showReviewModal && selectedProfessor && currentUser && (
          <ReviewModal
            key={`review-${selectedProfessor.id}`}
            isOpen={showReviewModal}
            onClose={() => {
              setShowReviewModal(false);
              setSelectedProfessor(null);
            }}
            darkMode={darkMode}
            professorId={selectedProfessor.id}
            professorName={selectedProfessor.name}
            userId={currentUser.id}
            userName={currentUser.displayName}
          />
        )}
      </Suspense>
    </div>
  );
};

export default CourseTable;
