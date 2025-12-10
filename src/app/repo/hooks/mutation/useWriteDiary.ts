import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';

type WriteDiaryResponse = {
  success: boolean;
  filePath: string;
  commit: {
    sha: string;
    html_url: string;
  };
};

export const useWriteDiary = () => {
  return useMutation<
    WriteDiaryResponse,
    Error,
    { title: string; content: string }
  >({
    mutationFn: ({ title, content }) =>
      api.writeDiary(title, content),
    onError: (error: Error) => {
      console.error('Write diary failed:', error);
    },
  });
};
