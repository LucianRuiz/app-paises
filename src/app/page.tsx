'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCountries } from '@/hooks/useCountries';
import { SearchParamsWrapper } from '@/components/SearchParamsWrapper';
import { CountryFiltersComponent } from '@/components/CountryFilters';
import { CountryCard } from '@/components/CountryCard';
import { CountryModal } from '@/components/CountryModal';
import { Country, CountryFilters } from '@/types/country';
import { Button } from '@/components/ui/button';
import { Heart, Loader2, AlertCircle } from 'lucide-react';

interface HomeContentProps {
  urlFilters: {
    search: string;
    region: string;
    minPopulation: number;
    maxPopulation: number;
  };
}

function HomeContent({ urlFilters }: HomeContentProps) {
  const { countries, loading, error } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<CountryFilters>({
    search: '',
    region: '',
    minPopulation: 0,
    maxPopulation: 0,
  });

  const router = useRouter();

  // Cargar filtros desde URL al inicializar
  useEffect(() => {
    setFilters(urlFilters);
  }, [urlFilters]);

  // Actualizar URL cuando cambien los filtros
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.region) params.set('region', filters.region);
    if (filters.minPopulation > 0) params.set('minPopulation', filters.minPopulation.toString());
    if (filters.maxPopulation > 0) params.set('maxPopulation', filters.maxPopulation.toString());

    const newUrl = params.toString() ? `?${params.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [filters, router]);

  // Obtener regiones únicas para el filtro
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(countries.map(country => country.region))];
    return uniqueRegions.sort();
  }, [countries]);

  // Filtrar países
  const filteredCountries = useMemo(() => {
    return countries.filter(country => {
      // Filtro de búsqueda
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const nameMatch = country.name.common.toLowerCase().includes(searchLower) ||
                         country.name.official.toLowerCase().includes(searchLower);
        if (!nameMatch) return false;
      }

      // Filtro de región
      if (filters.region && country.region !== filters.region) {
        return false;
      }

      // Filtro de población mínima
      if (filters.minPopulation > 0 && country.population < filters.minPopulation) {
        return false;
      }

      // Filtro de población máxima
      if (filters.maxPopulation > 0 && country.population > filters.maxPopulation) {
        return false;
      }

      return true;
    });
  }, [countries, filters]);

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-secondary-foreground">Cargando países...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-destructive" />
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
            <div>
              <h1 className="text-3xl font-bold text-foreground">Países del Mundo</h1>
              <p className="text-secondary-foreground mt-1">
                Explora información de {countries.length} países
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/favorites')}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Ver Favoritos
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <CountryFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          regions={regions}
        />

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-secondary-foreground">
            Mostrando {filteredCountries.length} de {countries.length} países
          </p>
        </div>

        {/* Grid de países */}
        {filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                onCountryClick={handleCountryClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No se encontraron países con los filtros aplicados</p>
            <Button
              variant="outline"
              onClick={() => setFilters({ search: '', region: '', minPopulation: 0, maxPopulation: 0 })}
              className="mt-4"
            >
              Limpiar filtros
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

export default function Home() {
  return (
    <SearchParamsWrapper>
      {(urlFilters) => <HomeContent urlFilters={urlFilters} />}
    </SearchParamsWrapper>
  );
}