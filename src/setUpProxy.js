const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api/admin/regist",
    createProxyMiddleware({
      target: "http://118.67.154.134:9000",
      changeOrigin: true,
    })
  );

  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3000",
      changeOrigin: true,
    })
  );

  app.use(
    "/login",
    createProxyMiddleware({
      target: "http://118.67.154.134:9000",
      changeOrigin: true,
    })
  );
};
