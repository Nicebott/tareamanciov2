import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { useAuthContext } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ProfilePageProps {
  darkMode: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ darkMode }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        let role = 'estudiante';

        const { data: superadminData } = await supabase
          .from('superadmins')
          .select('user_id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (superadminData) {
          role = 'superadmin';
        } else {
          const { data: adminData } = await supabase
            .from('admins')
            .select('user_id')
            .eq('user_id', user.id)
            .maybeSingle();

          if (adminData) {
            role = 'admin';
          }
        }

        if (profileData) {
          setProfile({
            id: profileData.id,
            display_name: profileData.display_name || user.user_metadata?.display_name || 'Usuario',
            email: user.email,
            role: role,
            created_at: profileData.created_at || user.created_at,
          });
        } else {
          setProfile({
            id: user.id,
            display_name: user.user_metadata?.display_name || 'Usuario',
            email: user.email,
            role: role,
            created_at: user.created_at,
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  if (loading) {
    return <LoadingSpinner darkMode={darkMode} message="Cargando perfil..." />;
  }

  if (!profile) {
    return (
      <div className={`text-center py-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        No se encontró el perfil
      </div>
    );
  }

  const displayName = profile.display_name || 'Usuario';
  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((word: string) => word[0])
    .join('')
    .toUpperCase();

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd \'de\' MMMM \'de\' yyyy', { locale: es });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Mi Perfil
      </h1>
      <p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Visualiza tu información personal y configuración de cuenta
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`md:col-span-1 rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-col items-center">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4 bg-gradient-to-br from-blue-500 to-blue-600`}>
              {initials}
            </div>
            <h2 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {displayName}
            </h2>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {profile.email}
            </p>
            {profile.role === 'superadmin' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white mb-4">
                Súperadministrador
              </span>
            )}
            {profile.role === 'admin' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-400 to-orange-400 text-white mb-4">
                Administrador
              </span>
            )}
            {profile.role === 'estudiante' && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}>
                Estudiante
              </span>
            )}
          </div>
        </div>

        <div className={`md:col-span-2 rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Información Personal
          </h3>

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Nombre Completo
              </label>
              <div className={`w-full px-4 py-3 rounded-lg ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
              } cursor-not-allowed opacity-75`}>
                {displayName}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Correo Electrónico
              </label>
              <div className={`w-full px-4 py-3 rounded-lg ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
              } cursor-not-allowed opacity-75`}>
                {profile.email} <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>(no editable)</span>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Fecha de Registro
              </label>
              <div className={`w-full px-4 py-3 rounded-lg ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
              } cursor-not-allowed opacity-75`}>
                {formatDate(profile.created_at || new Date().toISOString())}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Último Acceso
              </label>
              <div className={`w-full px-4 py-3 rounded-lg ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
              } cursor-not-allowed opacity-75`}>
                {formatDate(new Date().toISOString())}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
