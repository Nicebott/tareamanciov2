import React, { useEffect, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Menu,
  X,
  Moon,
  Sun,
  LogIn,
  CircleUser as UserCircle,
  HelpCircle,
  MessageSquare,
  Shield,
} from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: { id: string; displayName: string; email: string } | null;
  showProfileDropdown: boolean;
  setShowProfileDropdown: (show: boolean) => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  isUserAdmin: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  darkMode,
  toggleDarkMode,
  user,
  showProfileDropdown,
  setShowProfileDropdown,
  setIsAuthModalOpen,
  isUserAdmin,
}) => {
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' && !location.search.includes('modality');
    }
    return location.pathname.startsWith(path);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown, setShowProfileDropdown]);

  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-50 h-[72px]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center relative h-full">

        {/* Logo */}
        <Link
          to="/"
          onClick={handleLinkClick}
          className="flex items-center group transition-colors duration-200"
        >
          <GraduationCap
            size={40}
            className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3 group-hover:scale-110 transition-transform duration-200`}
          />
          <h1
            className={`text-lg sm:text-xl md:text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            } group-hover:text-blue-500 transition-colors duration-200`}
          >
            MiSemestre
          </h1>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-2 md:gap-4">
          {!user ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } transition-colors duration-200`}
            >
              <LogIn size={18} />
              <span className="hidden sm:inline">Iniciar Sesion</span>
            </button>
          ) : (
            <div className="static sm:relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                aria-label="Menú de perfil"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${
                  darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } transition-colors duration-200`}
              >
                <UserCircle size={18} />
                <span className="hidden sm:inline">{user.displayName || 'Usuario'}</span>
              </button>

              {showProfileDropdown && (
                <ProfileDropdown
                  darkMode={darkMode}
                  onClose={() => setShowProfileDropdown(false)}
                  displayName={user.displayName}
                  userEmail={user.email}
                />
              )}
            </div>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-1.5 rounded-full ${
              darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-600'
            } hover:opacity-80 transition-all duration-200`}
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? (
              <X size={20} className={darkMode ? 'text-white' : ''} />
            ) : (
              <Menu size={20} className={darkMode ? 'text-white' : ''} />
            )}
          </button>
        </div>

        {/* Nav links */}
        <nav
          className={`${
            isMenuOpen ? 'fixed top-16 left-0 right-0 bottom-0 overflow-y-auto' : 'hidden'
          } md:block md:static md:w-auto md:shadow-none md:mt-0 md:overflow-visible ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } md:bg-transparent z-40`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-2 p-4 md:p-0 min-h-full md:min-h-0">
            <NavLink to="/" isActive={isActive('/')} darkMode={darkMode} onClick={handleLinkClick}>
              Inicio
            </NavLink>
            <NavLink to="/virtual" isActive={isActive('/virtual')} darkMode={darkMode} onClick={handleLinkClick}>
              Virtual
            </NavLink>
            <NavLink to="/semipresencial" isActive={isActive('/semipresencial')} darkMode={darkMode} onClick={handleLinkClick}>
              SemiPresencial
            </NavLink>
            <NavLink to="/foro" isActive={isActive('/foro')} darkMode={darkMode} onClick={handleLinkClick}>
              <MessageSquare size={16} className="mr-1.5" />
              Foro
            </NavLink>
            <NavLink to="/faq" isActive={isActive('/faq')} darkMode={darkMode} onClick={handleLinkClick}>
              <HelpCircle size={16} className="mr-1.5" />
              FAQ
            </NavLink>
            {isUserAdmin && (
              <NavLink to="/admin" isActive={isActive('/admin')} darkMode={darkMode} onClick={handleLinkClick}>
                <Shield size={16} className="mr-1.5" />
                Admin
              </NavLink>
            )}
          </div>
        </nav>

      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  darkMode: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, darkMode, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center px-4 py-3 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full md:w-auto justify-start md:justify-center ${
      isActive
        ? darkMode
          ? 'bg-gray-700 text-white'
          : 'bg-gray-100 text-blue-700'
        : darkMode
        ? 'text-gray-300 hover:text-white'
        : 'text-gray-600 hover:text-blue-500'
    }`}
  >
    {children}
  </Link>
);

export default memo(Navigation);