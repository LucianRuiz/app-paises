'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/context/FavoritesContext';
import { useCountries } from '@/hooks/useCountries';
import { CountryCard } from '@/components/CountryCard';
import { CountryModal } from '@/components/CountryModal';
import { Country } from '@/types/country';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, HeartOff } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { countries, loading, error } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Filtrar países favoritos
  const favoriteCountries = countries.filter(country => 
    favorites.includes(country.cca3)
  );

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  const handleRemoveAllFavorites = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
      favorites.forEach(countryCode => {
        removeFromFavorites(countryCode);
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary-foreground">Cargando países favoritos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Error al cargar los países</p>
          <p className="text-secondary-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                  <Heart className="h-8 w-8 text-destructive" />
                  Países Favoritos
                </h1>
                <p className="text-secondary-foreground mt-1">
                  {favoriteCountries.length} país{favoriteCountries.length !== 1 ? 'es' : ''} en tu lista de favoritos
                </p>
              </div>
            </div>
            
            {favoriteCountries.length > 0 && (
              <Button
                variant="outline"
                onClick={handleRemoveAllFavorites}
                className="flex items-center gap-2 text-destructive hover:text-destructive/80"
              >
                <HeartOff className="h-4 w-4" />
                Limpiar Favoritos
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favoriteCountries.length > 0 ? (
          <>
            {/* Grid de países favoritos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteCountries.map((country) => (
                <CountryCard
                  key={country.cca3}
                  country={country}
                  onCountryClick={handleCountryClick}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold text-secondary-foreground mb-2">
              No tienes países favoritos
            </h2>
            <p className="text-muted-foreground mb-6">
              Explora los países y marca tus favoritos haciendo clic en el corazón
            </p>
            <Button
              onClick={() => router.push('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Explorar Países
            </Button>
          </div>
        )}
      </main>

      {/* Modal de detalles */}
      <CountryModal
        country={selectedCountry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
