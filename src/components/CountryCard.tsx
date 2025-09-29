'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Users, MapPin } from 'lucide-react';
import { Country } from '@/types/country';
import { useFavorites } from '@/context/FavoritesContext';

interface CountryCardProps {
  country: Country;
  onCountryClick: (country: Country) => void;
}

export function CountryCard({ country, onCountryClick }: CountryCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const formatPopulation = (population: number) => {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(1)}K`;
    }
    return population.toString();
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(country.cca3);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={() => onCountryClick(country)}
    >
      <CardContent className="p-0">
        {/* Imagen de la bandera */}
        <div className="relative">
          <img
            src={country.flags.png}
            alt={country.flags.alt || `Bandera de ${country.name.common}`}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 p-2 h-8 w-8"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={`h-4 w-4 ${
                isFavorite(country.cca3) 
                  ? 'fill-destructive text-destructive' 
                  : 'text-muted-foreground hover:text-destructive'
              }`} 
            />
          </Button>
        </div>

        {/* Información del país */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-card-foreground line-clamp-1">
            {country.name.common}
          </h3>
          
          <div className="space-y-2">
            {/* Región */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-secondary-foreground">{country.region}</span>
            </div>

            {/* Población */}
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-secondary-foreground">
                {formatPopulation(country.population)} habitantes
              </span>
            </div>

            {/* Capital */}
            {country.capital && country.capital.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-secondary-foreground">
                  <strong>Capital:</strong> {country.capital[0]}
                </span>
              </div>
            )}
          </div>

          {/* Badge de favorito */}
          {isFavorite(country.cca3) && (
            <Badge variant="secondary" className="mt-3">
              Favorito
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
