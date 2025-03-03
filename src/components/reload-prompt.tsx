import { toast } from 'sonner';
import { useRegisterSW } from 'virtual:pwa-register/react';

function ReloadPrompt() {
  const period = 60 * 1000; // check for updates every minute

  const {
    offlineReady: [, setOfflineReady],
    needRefresh: [, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
      if (period <= 0) return;
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, r.active.scriptURL, r);
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === 'activated')
            registerPeriodicSync(period, sw.scriptURL, r);
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

  return null;
}

export default ReloadPrompt;

const checkForUpdates = async (swUrl: string, r: ServiceWorkerRegistration) => {
  if ('onLine' in navigator && !navigator.onLine) return;

  console.log('checking for updates');

  const resp = await fetch(swUrl, {
    cache: 'no-store',
    headers: {
      cache: 'no-store',
      'cache-control': 'no-cache',
    },
  });

  if (resp?.status === 200) await r.update();
};

const registerPeriodicSync = (
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration
) => {
  if (period <= 0) return;

  console.log('registering periodic sync');

  // immediately check for updates
  checkForUpdates(swUrl, r).finally(() =>
    setInterval(async () => {
      await checkForUpdates(swUrl, r);
    }, period)
  );
};
