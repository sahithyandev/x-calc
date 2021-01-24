const CACHE_NAME = "x-calc-v1"

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("Cache opened")
		}),
	)
})

self.addEventListener("fetch", (event) => {
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
