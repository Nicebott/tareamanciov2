import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { supabase } from '../../supabase';
import toast from 'react-hot-toast';
import AuthInput from './AuthInput';

interface ForgotPasswordFormProps {
  darkMode: boolean;
  onBack: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ darkMode, onBack }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
      toast.success('Correo enviado! Revisa tu bandeja de entrada.');
    } catch (error: any) {
      toast.error('Error al enviar el correo: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="text-center py-4 space-y-5"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", damping: 15 }}
          className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
            darkMode
              ? 'bg-gradient-to-br from-green-600 to-green-700'
              : 'bg-gradient-to-br from-green-500 to-green-600'
          }`}
        >
          <Mail className="w-8 h-8 text-white" />
        </motion.div>

        <div>
          <h3 className={`text-lg font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Correo enviado
          </h3>
          <p className={`text-sm leading-relaxed ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Hemos enviado un enlace a <strong className={darkMode ? 'text-white' : 'text-gray-900'}>{email}</strong> para restablecer tu contraseña. Revisa tu bandeja de entrada y la carpeta de spam.
          </p>
        </div>

        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
            darkMode
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <ArrowLeft size={16} />
          Volver al inicio de sesión
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="text-center mb-2">
        <p className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>
      </div>

      <AuthInput
        icon={Mail}
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={setEmail}
        darkMode={darkMode}
        required
      />

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className={`w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-semibold shadow-lg transition-all duration-200 ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : darkMode
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/50'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/50'
        }`}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <Send size={20} />
            <span>Enviar enlace</span>
          </>
        )}
      </motion.button>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
            darkMode
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <ArrowLeft size={16} />
          Volver al inicio de sesión
        </button>
      </div>
    </motion.form>
  );
};

export default ForgotPasswordForm;
