'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (countryCode: string) => void;
  removeFromFavorites: (countryCode: string) => void;
  isFavorite: (countryCode: string) => boolean;
  toggleFavorite: (countryCode: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Cargar favoritos del localStorage al inicializar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('countries-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('countries-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (countryCode: string) => {
    setFavorites(prev => {
      if (!prev.includes(countryCode)) {
        return [...prev, countryCode];
      }
      return prev;
    });
  };

  const removeFromFavorites = (countryCode: string) => {
    setFavorites(prev => prev.filter(code => code !== countryCode));
  };

  const isFavorite = (countryCode: string) => {
    return favorites.includes(countryCode);
  };

  const toggleFavorite = (countryCode: string) => {
    if (isFavorite(countryCode)) {
      removeFromFavorites(countryCode);
    } else {
      addToFavorites(countryCode);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
