import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { supabase } from '../../supabase';
import toast from 'react-hot-toast';
import AuthInput from './AuthInput';

interface RegisterFormProps {
  darkMode: boolean;
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ darkMode, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
        },
      });
      if (error) throw error;
      toast.success('Cuenta creada exitosamente!');
      onClose();
    } catch (error: any) {
      toast.error('Error al crear la cuenta: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <AuthInput
        icon={User}
        type="text"
        placeholder="Nombre completo"
        value={name}
        onChange={setName}
        darkMode={darkMode}
        required
      />

      <AuthInput
        icon={Mail}
        type="email"
        placeholder="Correo electronico"
        value={email}
        onChange={setEmail}
        darkMode={darkMode}
        required
      />

      <AuthInput
        icon={Lock}
        type="password"
        placeholder="Contrasena"
        value={password}
        onChange={setPassword}
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
            <span>Creando cuenta...</span>
          </>
        ) : (
          <>
            <UserPlus size={20} />
            <span>Crear Cuenta</span>
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default RegisterForm;
