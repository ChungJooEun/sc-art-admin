const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  // 관리자 목록 보기
  app.use(
    "/api/admin/list",
    createProxyMiddleware({
      target: "http://118.67.154.134:9000",
      changeOrigin: true,
    })
  );

  // 관리자 상세보기
  app.use(
    "/api/admin/detail",
    createProxyMiddleware({
      target: "http://118.67.154.134:9000",
      changeOrigin: true,
    })
  );

  // 사용자 목록보기
  app.use(
    "/api/admin/user/list",
    createProxyMiddleware({
      target: "http://118.67.154.134:9000",
      changeOrigin: true,
    })
  );

  // 사용자 상세보기
  app.use(
    "/api/admin/user/detail",
    createProxyMiddleware({
      target: "http://118.67.154.134:9000",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/admin/regist",
    createProxyMiddleware({
      target: "http://118.67.154.134:9000",
      changeOrigin: true,
    })
  );

  // 메인 디자인 관련
  app.use(
    "/api/main",
    createProxyMiddleware({
      target: "http://localhost:9000",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/admin",
    createProxyMiddleware({
      target: "http://118.67.154.118:3000",
      // target: "http://localhost:3000",
      changeOrigin: true,
      router: {
        "/api/admin": "http://118.67.154.118:3000",
      },
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
