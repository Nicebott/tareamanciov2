import React, { useState, useEffect } from 'react';
import { X, ThumbsUp } from 'lucide-react';
import { supabase } from '../supabase';
import ReviewModal from './ReviewModal';
import ReviewCard from './Reviews/ReviewCard';
import ReviewStats from './Reviews/ReviewStats';
import LoadingSkeleton from './LoadingSkeleton';

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

interface ProfessorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  professorId: string;
  professorName: string;
  currentUser?: { id: string; displayName: string; email: string } | null;
}

const ProfessorDetailsModal: React.FC<ProfessorDetailsModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  professorId,
  professorName,
  currentUser,
}) => {
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
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('professor_id', professorId);

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
    if (isOpen) {
      fetchReviews();
    }
  }, [isOpen, professorId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`relative w-full max-w-4xl p-6 rounded-xl shadow-xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      } max-h-[90vh] overflow-y-auto`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg ${
            darkMode 
              ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          } transition-colors`}
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {professorName}
          </h2>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <ReviewStats
                stats={stats}
                totalReviews={reviews.length}
                darkMode={darkMode}
              />
              
              {currentUser && (
                <button
                  onClick={() => setShowReviewModal(true)}
                  className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  } transition-colors duration-200`}
                >
                  <ThumbsUp size={18} />
                  Calificar Profesor
                </button>
              )}
            </div>

            <div className="md:col-span-2">
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
                <div className={`text-center py-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  No hay resenas disponibles para este profesor.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showReviewModal && currentUser && (
        <ReviewModal
          key={`review-${professorId}`}
          isOpen={showReviewModal}
          onClose={() => {
            setShowReviewModal(false);
            fetchReviews();
          }}
          darkMode={darkMode}
          professorId={professorId}
          professorName={professorName}
          userId={currentUser.id}
          userName={currentUser.displayName}
        />
      )}
    </div>
  );
};

export default ProfessorDetailsModal;
