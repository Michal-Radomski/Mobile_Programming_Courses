// Workbox not done
module.exports = {
  globDirectory: "public/",
  globPatterns: ["**/*.{html,ico,json,css,js}", "src/images/*.{jpg,png}"],
  swDest: "public/service-worker.js",
  globIgnores: ["../workbox-cli-config.js", "help/**"],
};
