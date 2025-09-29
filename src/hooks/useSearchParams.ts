'use client';

import { useSearchParams as useNextSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useSearchParams() {
  const searchParams = useNextSearchParams();
  
  return useMemo(() => {
    return {
      search: searchParams.get('search') || '',
      region: searchParams.get('region') || '',
      minPopulation: parseInt(searchParams.get('minPopulation') || '0'),
      maxPopulation: parseInt(searchParams.get('maxPopulation') || '0'),
    };
  }, [searchParams]);
}
