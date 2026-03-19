import React from 'react';

interface LoadingSkeletonProps {
  darkMode: boolean;
  type?: 'message' | 'review' | 'topic';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ darkMode, type = 'message', count = 3 }) => {
  const renderMessageSkeleton = () => (
    <div className={`p-4 rounded-lg animate-pulse ${
      darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${
          darkMode ? 'bg-gray-600' : 'bg-gray-200'
        }`} />
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className={`h-4 w-24 rounded ${
              darkMode ? 'bg-gray-600' : 'bg-gray-200'
            }`} />
            <div className={`h-4 w-16 rounded ${
              darkMode ? 'bg-gray-600' : 'bg-gray-200'
            }`} />
          </div>
          <div className={`h-3 w-full rounded ${
            darkMode ? 'bg-gray-600' : 'bg-gray-200'
          }`} />
          <div className={`h-3 w-3/4 rounded ${
            darkMode ? 'bg-gray-600' : 'bg-gray-200'
          }`} />
        </div>
      </div>
    </div>
  );

  const renderReviewSkeleton = () => (
    <div className={`p-6 rounded-xl animate-pulse ${
      darkMode ? 'bg-gray-800/50' : 'bg-white'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`} />
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className={`h-5 w-32 rounded ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
            <div className={`h-5 w-20 rounded ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
          </div>
          <div className="space-y-2">
            <div className={`h-3 w-full rounded ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
            <div className={`h-3 w-5/6 rounded ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
            <div className={`h-3 w-4/6 rounded ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className={`h-3 w-16 rounded ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`} />
                <div className={`h-4 w-12 rounded ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTopicSkeleton = () => (
    <div className={`p-6 rounded-xl animate-pulse ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="space-y-4">
        <div className={`h-6 w-3/4 rounded ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`} />
        <div className="space-y-2">
          <div className={`h-4 w-full rounded ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`} />
          <div className={`h-4 w-5/6 rounded ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`} />
        </div>
        <div className="flex items-center gap-4">
          <div className={`h-3 w-24 rounded ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`} />
          <div className={`h-3 w-20 rounded ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`} />
        </div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'message':
        return renderMessageSkeleton();
      case 'review':
        return renderReviewSkeleton();
      case 'topic':
        return renderTopicSkeleton();
      default:
        return renderMessageSkeleton();
    }
  };

  return (
    <div className="space-y-6">
      {[...Array(count)].map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
