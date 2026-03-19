import React, { memo } from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = memo(({ children, className }) => {
  return (
    <div className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      'dark:border-gray-700 dark:bg-gray-800',
      className
    )}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export const CardHeader: React.FC<CardProps> = memo(({ children, className }) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

export const CardTitle: React.FC<CardProps> = memo(({ children, className }) => {
  return (
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>
      {children}
    </h3>
  );
});

CardTitle.displayName = 'CardTitle';

export const CardDescription: React.FC<CardProps> = memo(({ children, className }) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

export const CardContent: React.FC<CardProps> = memo(({ children, className }) => {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

export const CardFooter: React.FC<CardProps> = memo(({ children, className }) => {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)}>
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';