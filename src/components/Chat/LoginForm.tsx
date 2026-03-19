import React, { useState } from 'react';
import { MessageSquare, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabase';
import toast from 'react-hot-toast';

interface LoginFormProps {
  darkMode: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: email.split('@')[0]
            }
          }
        });

        if (error) throw error;
        toast.success('Cuenta creada. Por favor inicia sesión.');
        setIsSignUp(false);
        setPassword('');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        toast.success('Sesión iniciada correctamente');
        setEmail('');
        setPassword('');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error en la autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            darkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}
        >
          <MessageSquare className={`w-8 h-8 ${
            darkMode ? 'text-blue-400' : 'text-blue-500'
          }`} />
        </motion.div>
        <h3 className={`text-xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Bienvenido al Chat
        </h3>
        <p className={`text-xs md:text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Únete a la conversación con otros estudiantes
        </p>
      </div>

      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        onSubmit={handleAuth}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label className={`block text-xs md:text-sm font-medium ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Email
          </label>
          <div className="relative">
            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 md:py-2.5 rounded-lg border text-sm ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={`block text-xs md:text-sm font-medium ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Contraseña
          </label>
          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 md:py-2.5 rounded-lg border text-sm ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-lg font-medium transition-colors text-sm ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-600'
              : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400'
          }`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              <span>{isSignUp ? 'Crear cuenta' : 'Ingresar'}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </motion.form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setPassword('');
          }}
          className={`text-xs md:text-sm font-medium transition-colors ${
            darkMode
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          {isSignUp ? 'Ya tengo cuenta' : 'Crear nueva cuenta'}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;