import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3000);

app.disable("x-powered-by");

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use(express.static(__dirname, {
  index: "index.html",
  maxAge: "1h"
}));

app.listen(port, "0.0.0.0", () => {
  console.log(`Kontur static site listening on port ${port}`);
});
