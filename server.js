import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");

app.disable("x-powered-by");

app.get("/health", (_req, res) => {
  const ready = fs.existsSync(path.join(publicDir, "index.html"));
  res.status(ready ? 200 : 503).json({ ok: ready });
});

app.use(express.static(publicDir, {
  index: "index.html",
  maxAge: "1h"
}));

app.listen(port, "0.0.0.0", () => {
  console.log(`Kontur site listening on port ${port}`);
  console.log(`Serving static files from ${publicDir}`);
});
