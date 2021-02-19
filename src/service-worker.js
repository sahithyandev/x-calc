const DEPLOY_ID = 1
const CACHE_NAME = `xcalc-cache-v${DEPLOY_ID}`

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log(`Cache opened: ${cache}`)
		}),
	)
})

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((name) => {
					return caches.delete(name)
				}),
			)
		}),
	)
})

self.addEventListener("fetch", (event) => {
	if (event.request.method != "GET") return
	// if (new URL(event.request.url).pathname === "/manifest.webmanifest") return

	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) return response

			return fetch(event.request).then((response) => {
				if (!response || response.status !== 200 || response.type !== "basic") {
					return response
				}

				const responseToCache = response.clone()
				caches.open(CACHE_NAME).then((cache) => {
					cache.put(event.request, responseToCache)
				})
				return response
			})
		}),
	)
})
