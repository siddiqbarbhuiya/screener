import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  registerSW({
    immediate: true,
    onRegisteredSW(swUrl) {
      // Useful for debugging production SW registration when needed.
      console.info('Service worker registered:', swUrl);
    },
    onOfflineReady() {
      console.info('App is ready to work offline.');
    },
  });
}
