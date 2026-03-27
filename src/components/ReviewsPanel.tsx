import React, { useState, useEffect } from 'react';
import { Star, Trash2, Search, ChevronLeft, ChevronRight, MessageSquare, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase';
import { useAdminContext } from '../contexts/AdminContext';
import toast from 'react-hot-toast';

interface ReviewsPanelProps {
  darkMode: boolean;
}

interface Review {
  id: string;
  professor_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  clarity: number;
  fairness: number;
  punctuality: number;
  would_take_again: number;
  comment: string | null;
  created_at: string;
  is_admin: boolean;
}

const ITEMS_PER_PAGE = 10;

const ratingColor = (val: number) => {
  if (val >= 8) return 'text-green-400';
  if (val >= 5) return 'text-yellow-400';
  return 'text-red-400';
};

const ratingBg = (val: number) => {
  if (val >= 8) return 'bg-green-900/30 text-green-400';
  if (val >= 5) return 'bg-yellow-900/30 text-yellow-400';
  return 'bg-red-900/30 text-red-400';
};

const ratingBgLight = (val: number) => {
  if (val >= 8) return 'bg-green-100 text-green-700';
  if (val >= 5) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
};

const MetricBadge = ({ label, value, darkMode }: { label: string; value: number; darkMode: boolean }) => (
  <div className="flex flex-col items-center gap-0.5">
    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${darkMode ? ratingBg(value) : ratingBgLight(value)}`}>
      {value?.toFixed(1)}
    </span>
    <span className={`text-[10px] uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
      {label}
    </span>
  </div>
);

const ReviewsPanel: React.FC<ReviewsPanelProps> = ({ darkMode }) => {
  const { isAdmin, isSuperAdmin, loading: authLoading } = useAdminContext();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'high' | 'low'>('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const isUserAdmin = isAdmin || isSuperAdmin;

  const fetchReviews = async () => {
    if (!isUserAdmin) return;

    setLoading(true);
    let query = supabase
      .from('reviews')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (filter === 'high') query = query.gte('rating', 8);
    if (filter === 'low') query = query.lt('rating', 5);
    if (search.trim()) query = query.ilike('professor_id', `%${search.trim()}%`);

    query = query.range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

    const { data, count, error } = await query;
    if (!error && data) {
      setReviews(data as Review[]);
      setTotal(count ?? 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isUserAdmin) {
      fetchReviews();
    }
  }, [filter, page, search, isUserAdmin]);

  const handleDelete = async (id: string) => {
    if (!isUserAdmin) {
      toast.error('No tienes permisos para eliminar reseñas');
      return;
    }

    setDeleting(id);
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (!error) {
      toast.success('Reseña eliminada exitosamente');
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setTotal((t) => t - 1);
    } else {
      toast.error('Error al eliminar la reseña');
    }
    setDeleting(null);
    setConfirmDelete(null);
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (authLoading) {
    return (
      <div className={`flex items-center justify-center h-64 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Verificando permisos...</span>
      </div>
    );
  }

  if (!isUserAdmin) {
    return (
      <div className={`text-center py-12 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-medium mb-2">Acceso Denegado</h3>
        <p>No tienes permisos de administrador para acceder a esta sección.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <div className="flex items-center gap-2 md:gap-3 mb-3">
          <MessageSquare className={`w-6 h-6 md:w-8 md:h-8 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Reseñas de Profesores
          </h2>
        </div>
        <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {total} reseña{total !== 1 ? 's' : ''} en total
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6"
      >
        {/* Search */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border flex-1 min-w-48 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <Search className={`w-4 h-4 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Buscar por profesor..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className={`bg-transparent outline-none text-sm w-full ${
              darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>

        {/* Filter buttons */}
        {(['all', 'high', 'low'] as const).map((f) => (
          <button
            key={f}
            onClick={() => { setFilter(f); setPage(1); }}
            className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : darkMode
                  ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f === 'all' ? 'Todas' : f === 'high' ? '⭐ Rating ≥ 8' : '⚠️ Rating < 5'}
          </button>
        ))}
      </motion.div>

      {/* Reviews list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-xl border shadow-lg overflow-hidden ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        {loading ? (
          <div className={`flex items-center justify-center h-48 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-sm">Cargando reseñas...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Star className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No hay reseñas que mostrar</p>
          </div>
        ) : (
          reviews.map((r, i) => (
            <div
              key={r.id}
              className={`p-4 md:p-5 ${
                i < reviews.length - 1
                  ? darkMode ? 'border-b border-gray-700' : 'border-b border-gray-100'
                  : ''
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                    darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {r.professor_id}
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {r.user_name}
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                    {new Date(r.created_at).toLocaleDateString('es-DO', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                  {r.is_admin && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full">
                      ADMIN
                    </span>
                  )}
                </div>

                {/* Delete */}
                {confirmDelete === r.id ? (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deleting === r.id}
                      className="px-3 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      {deleting === r.id ? 'Eliminando...' : 'Confirmar'}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(r.id)}
                    className={`p-1.5 rounded-lg flex-shrink-0 transition-colors ${
                      darkMode
                        ? 'text-red-400 hover:bg-red-900/30'
                        : 'text-red-500 hover:bg-red-50'
                    }`}
                    title="Eliminar reseña"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Metrics */}
              <div className="flex gap-4 md:gap-6 flex-wrap mb-3">
                <MetricBadge label="Rating" value={r.rating} darkMode={darkMode} />
                <MetricBadge label="Claridad" value={r.clarity} darkMode={darkMode} />
                <MetricBadge label="Justicia" value={r.fairness} darkMode={darkMode} />
                <MetricBadge label="Puntualidad" value={r.punctuality} darkMode={darkMode} />
                <MetricBadge label="Volvería" value={r.would_take_again} darkMode={darkMode} />
              </div>

              {/* Comment */}
              {r.comment && (
                <p className={`text-xs md:text-sm leading-relaxed px-3 py-2.5 rounded-lg border-l-2 ${
                  darkMode
                    ? 'bg-gray-700/50 text-gray-300 border-blue-600'
                    : 'bg-gray-50 text-gray-600 border-blue-300'
                }`}>
                  "{r.comment}"
                </p>
              )}
            </div>
          ))
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center justify-center gap-3 mt-4 md:mt-6"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`p-2 rounded-lg transition-colors ${
              page === 1
                ? darkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Página <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{page}</span> de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={`p-2 rounded-lg transition-colors ${
              page === totalPages
                ? darkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ReviewsPanel;