import React from 'react';

interface SkeletonCardProps {
  darkMode: boolean;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ darkMode }) => {
  return (
    <div className={`rounded-lg p-6 animate-pulse ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 space-y-3">
          <div className={`h-6 rounded w-3/4 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`} />
          <div className={`h-4 rounded w-1/2 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`} />
          <div className={`h-4 rounded w-2/3 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`} />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className={`h-4 rounded w-1/3 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`} />
          <div className={`h-6 rounded-full w-12 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
