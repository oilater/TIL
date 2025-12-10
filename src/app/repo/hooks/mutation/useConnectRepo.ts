import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/app/(provider)/QueryProvider';
import { api } from '@/services/api';

type RepoResponse = {
  action: 'create' | 'connect';
  repo: {
    name: string;
    html_url: string;
  };
};

export const useConnectRepo = () => {
  const router = useRouter();

  return useMutation<RepoResponse, Error, string>({
    mutationFn: (repoName: string) => api.connectRepo(repoName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repos'] });
      router.refresh();
    },
    onError: (error: Error) => {
      console.error('Repo action failed:', error);
    },
  });
};
