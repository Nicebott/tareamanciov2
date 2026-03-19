import React from 'react';
import { LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface ProfileDropdownProps {
  darkMode: boolean;
  onClose: () => void;
  displayName?: string;
  userEmail?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ darkMode, onClose, displayName, userEmail = '' }) => {
  const handleProfileClick = () => {
    onClose();
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Sesion cerrada exitosamente');
      onClose();
    } catch {
      toast.error('Error al cerrar sesion');
    }
  };

  const initials = (displayName || 'Usuario')
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.15 }}
      className={`
        fixed top-16 right-2 w-56
        sm:absolute sm:top-auto sm:right-0 sm:mt-3 sm:w-64
        rounded-xl shadow-xl py-1.5 z-[999] border
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
      `}
    >
      {/* Header con avatar, nombre y email */}
      <div className={`px-3 py-2.5 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-xs truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {displayName || 'Usuario'}
            </p>
            <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {userEmail || '\u00A0'}
            </p>
          </div>
        </div>
      </div>

      {/* Mi Perfil */}
      <div className="py-0.5">
        <Link
          to="/perfil"
          onClick={handleProfileClick}
          className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs transition-colors ${
            darkMode ? 'text-gray-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Settings size={15} />
          <span>Mi Perfil</span>
        </Link>
      </div>

      {/* Cerrar Sesion */}
      <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
        <button
          onClick={handleSignOut}
          className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs transition-colors ${
            darkMode ? 'text-red-400 hover:bg-gray-700/50' : 'text-red-600 hover:bg-red-50'
          }`}
        >
          <LogOut size={15} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileDropdown;