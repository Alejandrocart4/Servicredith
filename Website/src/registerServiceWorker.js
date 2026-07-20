export function registerServiceWorker()
{
  if (import.meta.env.DEV) return
  if (!('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.info('No se pudo registrar el service worker de ServiCredith.', error)
    })
  })
}
