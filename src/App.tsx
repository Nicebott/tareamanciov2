import React, { useState, useEffect, useMemo, lazy, Suspense, useCallback } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Chat from './components/Chat';
import AuthModal from './components/AuthModal';
import TermsModal from './components/Chat/TermsModal';
import PrivacyModal from './components/Chat/PrivacyModal';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuthContext } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { checkIsAdmin, checkIsSuperAdmin } from './services/adminService';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const CampusPage = lazy(() => import('./pages/CampusPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ForumPage = lazy(() => import('./pages/ForumPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CommunityRulesPage = lazy(() => import('./pages/CommunityRulesPage'));
const ProfessorPage = lazy(() => import('./pages/ProfessorPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));

function App() {
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const currentUser = useMemo(() => {
    if (!user) return null;
    return {
      id: user.id,
      displayName: user.user_metadata?.display_name || user.email || 'Usuario',
      email: user.email || '',
    };
  }, [user]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const checkAdminStatus = useCallback(async () => {
    if (user) {
      const [isAdmin, isSuperAdmin] = await Promise.all([
        checkIsAdmin(user.id),
        checkIsSuperAdmin(user.id)
      ]);
      setIsUserAdmin(isAdmin || isSuperAdmin);
    } else {
      setIsUserAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  const handleOpenAuth = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Toaster position="top-center" />

        <Navigation
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          user={currentUser}
          showProfileDropdown={showProfileDropdown}
          setShowProfileDropdown={setShowProfileDropdown}
          setIsAuthModalOpen={setIsAuthModalOpen}
          isUserAdmin={isUserAdmin}
        />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow min-h-[calc(100vh-144px)]">
          <Suspense fallback={
            <div className="min-h-[600px] flex items-center justify-center">
              <LoadingSpinner darkMode={darkMode} message="Cargando..." />
            </div>
          }>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    darkMode={darkMode}
                    currentUser={currentUser}
                    onOpenAuth={handleOpenAuth}
                  />
                }
              />
              {/* Virtual y Semipresencial usan HomePage directamente.
                  La modalidad se detecta automáticamente por la ruta. */}
              <Route
                path="/virtual"
                element={
                  <HomePage
                    darkMode={darkMode}
                    currentUser={currentUser}
                    onOpenAuth={handleOpenAuth}
                  />
                }
              />
              <Route
                path="/semipresencial"
                element={
                  <HomePage
                    darkMode={darkMode}
                    currentUser={currentUser}
                    onOpenAuth={handleOpenAuth}
                  />
                }
              />
              <Route
                path="/campus/:campus"
                element={
                  <CampusPage
                    darkMode={darkMode}
                    currentUser={currentUser}
                    onOpenAuth={handleOpenAuth}
                  />
                }
              />
              <Route
                path="/profesor/:name"
                element={
                  <ProfessorPage
                    darkMode={darkMode}
                    currentUser={currentUser}
                    onOpenAuth={handleOpenAuth}
                  />
                }
              />
              <Route
                path="/faq"
                element={<FAQPage darkMode={darkMode} />}
              />
              <Route
                path="/foro"
                element={
                  <ForumPage
                    darkMode={darkMode}
                    onOpenAuth={handleOpenAuth}
                  />
                }
              />
              <Route
                path="/admin"
                element={<AdminPage darkMode={darkMode} />}
              />
              <Route
                path="/terms"
                element={<TermsPage darkMode={darkMode} />}
              />
              <Route
                path="/privacy"
                element={<PrivacyPage darkMode={darkMode} />}
              />
              <Route
                path="/perfil"
                element={<ProfilePage darkMode={darkMode} />}
              />
              <Route
                path="/community-rules"
                element={<CommunityRulesPage darkMode={darkMode} />}
              />
              <Route
                path="/reset-password"
                element={<ResetPasswordPage darkMode={darkMode} />}
              />
            </Routes>
          </Suspense>
        </main>

        <footer className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md mt-auto min-h-[72px]`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  © 2026 zierow. Todos los derechos reservados.
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Desarrollado con ❤️ para la comunidad estudiantil
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                <FooterLink to="/terms" darkMode={darkMode}>
                  Terminos y Condiciones
                </FooterLink>
                <FooterLink to="/privacy" darkMode={darkMode}>
                  Politica de Privacidad
                </FooterLink>
                <FooterLink to="/community-rules" darkMode={darkMode}>
                  Normas de Comunidad
                </FooterLink>
              </div>
            </div>
          </div>
        </footer>

        <Chat darkMode={darkMode} onOpenAuth={handleOpenAuth} />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          darkMode={darkMode}
        />

        <TermsModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          darkMode={darkMode}
        />

        <PrivacyModal
          isOpen={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
          darkMode={darkMode}
        />
      </div>
  );
}

interface FooterLinkProps {
  to: string;
  darkMode: boolean;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, darkMode, children }) => (
  <Link
    to={to}
    className={`text-sm ${
      darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
    } transition-colors`}
  >
    {children}
  </Link>
);

export default App;