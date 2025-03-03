import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRegisterSW } from 'virtual:pwa-register/react';

function ReloadPrompt() {
  const [swURL, setSwURL] = useState<string | null>(null);
  const [r, setR] = useState<ServiceWorkerRegistration | null>(null);

  const {
    offlineReady: [, setOfflineReady],
    needRefresh: [, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
      if (r?.active?.state === 'activated') {
        setSwURL(r.active.scriptURL);
        setR(r);
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === 'activated') setSwURL(sw.scriptURL);
          setR(r);
        });
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
    onOfflineReady() {
      console.log('SW is ready to work offline');
      toast.info('App ready to work offline');
    },
    onNeedRefresh() {
      console.log('New content available, click on reload button to update.');
      toast('New content available!', {
        action: {
          label: 'Update',
          onClick: () => {
            updateServiceWorker(true);
            setOfflineReady(false);
            setNeedRefresh(false);
          },
        },
        dismissible: false,
        duration: Infinity,
      });
    },
  });

  useQuery({
    queryKey: ['periodic-sync'],
    queryFn: async () => {
      if (swURL === null || r === null) return;

      console.log('checking for updates');

      const resp = await fetch(swURL, {
        cache: 'no-store',
        headers: {
          cache: 'no-store',
          'cache-control': 'no-cache',
        },
      });

      if (resp?.status === 200) await r.update();

      return resp;
    },
    enabled: swURL !== null && r !== null,
    refetchInterval: 60 * 1000,
    retry: true,
  });

  return null;
}

export default ReloadPrompt;
