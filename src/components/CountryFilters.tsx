'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Filter, X } from 'lucide-react';
import { CountryFilters } from '@/types/country';

interface CountryFiltersProps {
  filters: CountryFilters;
  onFiltersChange: (filters: CountryFilters) => void;
  regions: string[];
}

export function CountryFiltersComponent({ 
  filters, 
  onFiltersChange, 
  regions 
}: CountryFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Función para actualizar filtros individuales
  const updateFilter = (key: keyof CountryFilters, value: string | number) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  // Función para limpiar todos los filtros
  const clearFilters = () => {
    onFiltersChange({
      search: '',
      region: '',
      minPopulation: 0,
      maxPopulation: 0,
    });
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = 
    filters.search || 
    filters.region || 
    filters.minPopulation > 0 || 
    filters.maxPopulation > 0;

  return (
    <Card className="p-6 mb-6">
      <div className="space-y-4">
        {/* Búsqueda principal */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar países por nombre..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Botón para mostrar filtros avanzados */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros Avanzados
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-2 text-destructive hover:text-destructive/80"
            >
              <X className="h-4 w-4" />
              Limpiar Filtros
            </Button>
          )}
        </div>

        {/* Filtros avanzados */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            {/* Filtro por región */}
            <div>
              <label className="block text-sm font-medium mb-2">Región</label>
              <select
                value={filters.region}
                onChange={(e) => updateFilter('region', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas las regiones</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Rango de población mínima */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Población Mínima
              </label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minPopulation || ''}
                onChange={(e) => updateFilter('minPopulation', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>

            {/* Rango de población máxima */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Población Máxima
              </label>
              <Input
                type="number"
                placeholder="Sin límite"
                value={filters.maxPopulation || ''}
                onChange={(e) => updateFilter('maxPopulation', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
