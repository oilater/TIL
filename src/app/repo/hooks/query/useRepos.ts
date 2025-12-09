'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export const useRepos = () => {
  return useQuery({
    queryKey: ['repos'],
    queryFn: api.getRepos,
  });
};
