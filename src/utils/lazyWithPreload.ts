import { lazy, ComponentType } from 'react';

interface PreloadableComponent<T extends ComponentType<any>> extends React.LazyExoticComponent<T> {
  preload: () => Promise<{ default: T }>;
}

export function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): PreloadableComponent<T> {
  const Component = lazy(factory) as PreloadableComponent<T>;
  Component.preload = factory;
  return Component;
}
