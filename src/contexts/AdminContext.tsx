import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { checkIsAdmin, checkIsSuperAdmin } from '../services/adminService';

interface AdminContextType {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAdminStatus = async () => {
      if (user) {
        setLoading(true);
        const [adminStatus, superAdminStatus] = await Promise.all([
          checkIsAdmin(user.id),
          checkIsSuperAdmin(user.id)
        ]);

        if (mounted) {
          setIsAdmin(adminStatus);
          setIsSuperAdmin(superAdminStatus);
          setLoading(false);
        }
      } else {
        if (mounted) {
          setIsAdmin(false);
          setIsSuperAdmin(false);
          setLoading(false);
        }
      }
    };

    checkAdminStatus();

    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <AdminContext.Provider value={{ isAdmin, isSuperAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};
