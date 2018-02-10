const static_cache_name = 'task-list-static-v1'

self.addEventListener('install', event => event.waitUntil(
	caches.open(static_cache_name)
		.then(cache => cache.addAll(serviceWorkerOption.assets))
))

self.addEventListener('activate', event => event.waitUntil(
	caches.keys().then(cache_names => Promise.all(
		cache_names
			.filter(x => x.startsWith('task-list-') && x !== static_cache_name)
			.map(x => caches.delete(x))
	))
))

self.addEventListener('fetch', event => {
	const request_url = new URL(event.request.url)

	if (request_url.origin === location.origin) {
		if (request_url.pathname === '/') {
			event.respondWith(caches.match('/index.html'))
			return
		}
	}

	event.respondWith(
		caches.match(event.request)
			.then(response => response || fetch(event.request))
	)
})

self.addEventListener('message', event => {
	if (event.data.action === 'skip-waiting') self.skipWaiting()
})
