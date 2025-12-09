import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';

type RepoResponse = {
  action: 'create' | 'connect';
  repo: {
    name: string;
    html_url: string;
  };
};

export const useConnectRepo = () => {
  return useMutation<RepoResponse, Error, string>({
    mutationFn: (repoName: string) => api.connectRepo(repoName),
    onSuccess: (data) => {
      console.log('Repo action:', data.action, data.repo);
    },
    onError: (error: Error) => {
      console.error('Repo action failed:', error);
    },
  });
};
