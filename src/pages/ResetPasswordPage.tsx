import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../supabase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

interface ResetPasswordPageProps {
  darkMode: boolean;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ darkMode }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase handles the token exchange from the URL hash automatically
    // We listen for the PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
      }
    });

    // Also check if there's already a session (in case the event fired before this component mounted)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true);
      }
    });

    // Set a timeout for error state
    const timeout = setTimeout(() => {
      setSessionReady((prev) => {
        if (!prev) setSessionError(true);
        return prev;
      });
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const passwordStrength = (() => {
    if (password.length === 0) return { label: '', color: '', width: '0%' };
    if (password.length < 6) return { label: 'Muy débil', color: 'bg-red-500', width: '20%' };
    if (password.length < 8) return { label: 'Débil', color: 'bg-orange-500', width: '40%' };
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const score = [hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    if (score >= 3) return { label: 'Fuerte', color: 'bg-green-500', width: '100%' };
    if (score >= 2) return { label: 'Buena', color: 'bg-blue-500', width: '75%' };
    return { label: 'Regular', color: 'bg-yellow-500', width: '50%' };
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
      toast.success('Contraseña actualizada exitosamente!');
      setTimeout(() => navigate('/'), 3000);
    } catch (error: any) {
      toast.error('Error al actualizar la contraseña: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (sessionError) {
    return (
      <>
        <SEO
          title="Enlace inválido - MiSemestre"
          description="El enlace para restablecer la contraseña ha expirado o es inválido."
        />
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full max-w-md p-8 rounded-2xl shadow-2xl text-center ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
              darkMode
                ? 'bg-gradient-to-br from-red-600 to-red-700'
                : 'bg-gradient-to-br from-red-500 to-red-600'
            }`}>
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Enlace inválido o expirado
            </h2>
            <p className={`text-sm mb-6 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Este enlace para restablecer la contraseña ha expirado o ya fue utilizado. Por favor solicita uno nuevo.
            </p>
            <button
              onClick={() => navigate('/')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
              }`}
            >
              Volver al inicio
            </button>
          </motion.div>
        </div>
      </>
    );
  }

  if (!sessionReady) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Verificando enlace...
          </p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <>
        <SEO
          title="Contraseña actualizada - MiSemestre"
          description="Tu contraseña ha sido actualizada exitosamente."
        />
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-md p-8 rounded-2xl shadow-2xl text-center ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", damping: 15 }}
              className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                darkMode
                  ? 'bg-gradient-to-br from-green-600 to-green-700'
                  : 'bg-gradient-to-br from-green-500 to-green-600'
              }`}
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className={`text-xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ¡Contraseña actualizada!
            </h2>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Serás redirigido al inicio en unos segundos...
            </p>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Restablecer contraseña - MiSemestre"
        description="Restablece tu contraseña de MiSemestre."
      />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg ${
                darkMode
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700'
                  : 'bg-gradient-to-br from-blue-500 to-blue-600'
              }`}
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className={`text-2xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Nueva contraseña
            </h2>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Ingresa tu nueva contraseña a continuación.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Nueva contraseña
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl font-medium ${
                    darkMode
                      ? 'bg-gray-700/50 text-white border-gray-600 placeholder-gray-500'
                      : 'bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400'
                  } border-2 focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-200`}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors ${
                    darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password strength indicator */}
              {password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2"
                >
                  <div className={`w-full h-1.5 rounded-full ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <motion.div
                      className={`h-full rounded-full ${passwordStrength.color}`}
                      initial={{ width: '0%' }}
                      animate={{ width: passwordStrength.width }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className={`text-xs mt-1 ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Seguridad: {passwordStrength.label}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirmar contraseña
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  <Lock size={20} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl font-medium ${
                    darkMode
                      ? 'bg-gray-700/50 text-white border-gray-600 placeholder-gray-500'
                      : 'bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400'
                  } border-2 focus:outline-none focus:ring-0 transition-all duration-200 ${
                    confirmPassword.length > 0 && confirmPassword !== password
                      ? 'border-red-500 focus:border-red-500'
                      : confirmPassword.length > 0 && confirmPassword === password
                        ? 'border-green-500 focus:border-green-500'
                        : 'focus:border-blue-500'
                  }`}
                  placeholder="Repite la contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors ${
                    darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {confirmPassword.length > 0 && confirmPassword !== password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-500 mt-1"
                >
                  Las contraseñas no coinciden
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading || password !== confirmPassword || password.length < 6}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-semibold shadow-lg transition-all duration-200 ${
                loading || password !== confirmPassword || password.length < 6
                  ? 'bg-gray-400 cursor-not-allowed'
                  : darkMode
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/50'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/50'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Actualizando...</span>
                </>
              ) : (
                <>
                  <Lock size={20} />
                  <span>Actualizar contraseña</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
