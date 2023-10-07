const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware(
      ["/entp"],
      {
        target: `http://${process.env.REACT_APP_BASE_URL}`,
        ws: false,
        router: {

        }
      }
    )
  );
};