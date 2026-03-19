import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  darkMode?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 10,
  size = 'md',
  interactive = false,
  onChange,
  darkMode = false,
}) => {
  const starSizes = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  const starSize = starSizes[size];

  const totalStars = maxRating / 2;
  const starsToFill = rating / 2;
  const fullStars = Math.floor(starsToFill);
  const partialStar = starsToFill - fullStars;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = (index + 1) * 2;
        let fillPercentage = 0;

        if (index < fullStars) {
          fillPercentage = 100;
        } else if (index === fullStars && partialStar > 0) {
          fillPercentage = partialStar * 100;
        }

        return (
          <motion.div
            key={index}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            className={interactive ? 'cursor-pointer relative' : 'relative'}
            onClick={() => interactive && onChange?.(starValue)}
          >
            <Star
              size={starSize}
              className={`${
                darkMode ? 'text-gray-600' : 'text-gray-300'
              } transition-colors duration-200`}
            />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star
                size={starSize}
                className="text-yellow-400 fill-current"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RatingStars;