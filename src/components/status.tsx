import { useQuery } from '@tanstack/react-query';

export const Status = () => {
  const url = new URL(window.location.href);
  const status = url.searchParams.get('status');

  useQuery({
    queryKey: ['status-update'],
    queryFn: async () => {
      if (status === null) return;

      console.log('updating status');

      return await fetch(decodeURI(status), {
        mode: 'no-cors',
      });
    },
    enabled: Boolean(status),
    refetchInterval: 40 * 1000, // 40 seconds to stay within 60 second window
    retry: true,
  });

  return null;
};
