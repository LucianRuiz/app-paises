'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, MapPin, Building, Globe } from 'lucide-react';
import { Country } from '@/types/country';
import { useFavorites } from '@/context/FavoritesContext';

interface CountryModalProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CountryModal({ country, isOpen, onClose }: CountryModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!country) return null;

  const formatPopulation = (population: number) => {
    return population.toLocaleString('es-ES');
  };

  const handleFavoriteClick = () => {
    toggleFavorite(country.cca3);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-card-foreground">
              {country.name.official}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteClick}
              className="flex items-center gap-2"
            >
              <Heart 
                className={`h-5 w-5 ${
                  isFavorite(country.cca3) 
                    ? 'fill-destructive text-destructive' 
                    : 'text-muted-foreground hover:text-destructive'
                }`} 
              />
              {isFavorite(country.cca3) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bandera */}
          <div className="text-center">
            <img
              src={country.flags.png}
              alt={country.flags.alt || `Bandera de ${country.name.common}`}
              className="mx-auto h-32 w-auto object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Información principal */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Nombre común</p>
                <p className="font-semibold">{country.name.common}</p>
              </div>
            </div>

            {country.capital && country.capital.length > 0 && (
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Capital</p>
                  <p className="font-semibold">{country.capital.join(', ')}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-secondary-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Población</p>
                <p className="font-semibold">{formatPopulation(country.population)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Región</p>
                <p className="font-semibold">{country.region}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
