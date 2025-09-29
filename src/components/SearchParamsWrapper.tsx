'use client';

import { Suspense } from 'react';
import { useSearchParams } from '@/hooks/useSearchParams';

interface SearchParamsWrapperProps {
  children: (filters: ReturnType<typeof useSearchParams>) => React.ReactNode;
}

function SearchParamsContent({ children }: SearchParamsWrapperProps) {
  const filters = useSearchParams();
  return <>{children(filters)}</>;
}

export function SearchParamsWrapper({ children }: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SearchParamsContent>{children}</SearchParamsContent>
    </Suspense>
  );
}
