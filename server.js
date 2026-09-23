import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = Number(process.env.PORT || 3000);
const upstream =
  process.env.UPSTREAM_ORIGIN ||
  "https://kontur-astrakhan-pro.ivantoschev2017.chatgpt.site";

app.disable("x-powered-by");

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, upstream });
});

app.use(
  createProxyMiddleware({
    target: upstream,
    changeOrigin: true,
    secure: true,
    ws: true,
    xfwd: true,
    followRedirects: false,
    on: {
      proxyReq(proxyReq) {
        proxyReq.setHeader("origin", upstream);
        proxyReq.setHeader("referer", upstream + "/");
      },
      proxyRes(proxyRes, req) {
        const location = proxyRes.headers.location;
        if (location && location.startsWith(upstream)) {
          const proto = req.headers["x-forwarded-proto"] || "https";
          const host = req.headers.host;
          proxyRes.headers.location = location.replace(
            upstream,
            proto + "://" + host
          );
        }
      },
      error(err, _req, res) {
        console.error("Proxy error:", err);
        if (!res.headersSent) {
          res.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
        }
        res.end("Временная ошибка соединения с сайтом.");
      }
    }
  })
);

app.listen(port, "0.0.0.0", () => {
  console.log(`Kontur proxy listening on port ${port}, upstream: ${upstream}`);
});
