import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabase';
import ReviewModal from '../components/ReviewModal';
import ReviewCard from '../components/Reviews/ReviewCard';
import ReviewStats from '../components/Reviews/ReviewStats';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SEO from '../components/SEO';

interface Review {
  id: string;
  rating: number;
  comment: string;
  timestamp: string;
  userName: string;
  clarity: number;
  fairness: number;
  punctuality: number;
  wouldTakeAgain: number;
  userId?: string;
  isAdmin?: boolean;
}

interface ProfessorPageProps {
  darkMode: boolean;
  currentUser?: { id: string; displayName: string; email: string } | null;
  onOpenAuth?: () => void;
}

const ProfessorPage: React.FC<ProfessorPageProps> = ({ darkMode, currentUser, onOpenAuth }) => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const professorName = decodeURIComponent(name || '');

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [stats, setStats] = useState({
    rating: 0,
    clarity: 0,
    fairness: 0,
    punctuality: 0,
    wouldTakeAgain: 0
  });

  const fetchReviews = async () => {
    if (!professorName) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('professor_id', professorName);

      if (error) throw error;

      const reviewsData: Review[] = (data ?? []).map((row) => ({
        id: row.id,
        rating: row.rating,
        comment: row.comment || '',
        timestamp: row.created_at,
        userName: row.user_name,
        clarity: row.clarity,
        fairness: row.fairness,
        punctuality: row.punctuality,
        wouldTakeAgain: row.would_take_again,
        userId: row.user_id,
        isAdmin: row.is_admin || false,
      }));

      setReviews(reviewsData);

      if (reviewsData.length > 0) {
        const totals = reviewsData.reduce((acc, review) => ({
          rating: acc.rating + review.rating,
          clarity: acc.clarity + (review.clarity || 0),
          fairness: acc.fairness + (review.fairness || 0),
          punctuality: acc.punctuality + (review.punctuality || 0),
          wouldTakeAgain: acc.wouldTakeAgain + (review.wouldTakeAgain || 0)
        }), {
          rating: 0,
          clarity: 0,
          fairness: 0,
          punctuality: 0,
          wouldTakeAgain: 0
        });

        const count = reviewsData.length;
        setStats({
          rating: Number((totals.rating / count).toFixed(1)),
          clarity: Number((totals.clarity / count).toFixed(1)),
          fairness: Number((totals.fairness / count).toFixed(1)),
          punctuality: Number((totals.punctuality / count).toFixed(1)),
          wouldTakeAgain: Number((totals.wouldTakeAgain / count).toFixed(1))
        });
      } else {
        setStats({
          rating: 0,
          clarity: 0,
          fairness: 0,
          punctuality: 0,
          wouldTakeAgain: 0
        });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [professorName]);

  const handleRateClick = () => {
    if (!currentUser) {
      if (onOpenAuth) onOpenAuth();
    } else {
      setShowReviewModal(true);
    }
  };

  if (!professorName) {
    return (
      <div className="flex justify-center py-12">
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Profesor no encontrado.</p>
      </div>
    );
  }

  return (
    <div className={`max-w-5xl mx-auto py-6 px-4 md:px-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <SEO
        title={`${professorName} - Calificación y Opiniones | MiSemestre`}
        description={`Consulta las calificaciones, opiniones y comentarios de estudiantes sobre el profesor ${professorName}.`}
        keywords={`profesor ${professorName}, uasd ${professorName}, opiniones ${professorName}, calificar ${professorName}`}
      />

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": professorName,
            "jobTitle": "Profesor Universitario",
            "worksFor": {
              "@type": "EducationalOrganization",
              "name": "Universidad Autónoma de Santo Domingo (UASD)"
            },
            "url": `https://misemestre.com/profesor/${encodeURIComponent(professorName)}`,
            ...(reviews.length > 0 && {
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": (stats.rating / 2).toFixed(1),
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": reviews.length
              }
            })
          })
        }}
      />

      <button
        onClick={() => navigate(-1)}
        className={`mb-6 flex items-center text-sm font-medium transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
      >
        <ArrowLeft size={16} className="mr-2" />
        Volver
      </button>

      <div className={`p-6 rounded-2xl shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h1 className={`text-3xl md:text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {professorName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <ReviewStats
              stats={stats}
              totalReviews={reviews.length}
              darkMode={darkMode}
            />

            <button
              onClick={handleRateClick}
              className={`mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
                }`}
            >
              <ThumbsUp size={18} />
              Calificar Profesor
            </button>
          </div>

          <div className="md:col-span-2">
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Comentarios de estudiantes
            </h3>
            {loading ? (
              <LoadingSkeleton darkMode={darkMode} type="review" count={3} />
            ) : reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    darkMode={darkMode}
                    onDelete={fetchReviews}
                  />
                ))}
              </div>
            ) : (
              <div className={`text-center py-12 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800/50 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
                <p>No hay opiniones o comentarios disponibles para este profesor aún.</p>
                <p className="mt-2 text-sm">¡Sé el primero en calificarlo!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showReviewModal && currentUser && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => {
            setShowReviewModal(false);
            fetchReviews();
          }}
          darkMode={darkMode}
          professorId={professorName}
          professorName={professorName}
          userId={currentUser.id}
          userName={currentUser.displayName}
        />
      )}
    </div>
  );
};

export default ProfessorPage;
