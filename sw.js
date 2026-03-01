self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open("esc").then(cache=>{
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/app.js",
        "/data.json"
      ]);
    })
  );
});