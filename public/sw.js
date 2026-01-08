self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "REVALIDATE_HISTORY") {
    caches.open("next-data").then((cache) => {
      cache.delete("/api/glucose");
      cache.delete("/history");
    });
  }
});

self.addEventListener("focus", () => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "APP_FOCUSED",
        action: "REVALIDATE_HISTORY",
      });
    });
  });
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.url.includes("/api/glucose") ||
    event.request.url.includes("/history")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();

          caches.open("glucose-cache").then((cache) => {
            cache.put(event.request, responseClone);
          });

          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});
