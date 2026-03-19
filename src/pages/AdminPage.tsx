import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Star } from 'lucide-react';
import AdminPanel from '../components/AdminPanel';
import ReviewsPanel from '../components/ReviewsPanel';

interface AdminPageProps {
  darkMode: boolean;
}

const AdminPage: React.FC<AdminPageProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<'admins' | 'reviews'>('admins');

  const tabs = [
    { id: 'admins', label: 'Administración', icon: Shield },
    { id: 'reviews', label: 'Reseñas', icon: Star },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Tabs */}
      <div className={`flex gap-2 mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as 'admins' | 'reviews')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === id
                ? darkMode
                  ? 'border-blue-400 text-blue-400'
                  : 'border-blue-600 text-blue-600'
                : darkMode
                  ? 'border-transparent text-gray-400 hover:text-gray-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'admins' && <AdminPanel darkMode={darkMode} />}
      {activeTab === 'reviews' && <ReviewsPanel darkMode={darkMode} />}
    </motion.div>
  );
};

export default AdminPage;