import express from "express";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { fileURLToPath } from "node:url";
import AdmZip from "adm-zip";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3000);

const zipPath = path.join(__dirname, "site.zip");
const siteDir = path.join(os.tmpdir(), "kontur-site");

if (fs.existsSync(zipPath)) {
  fs.rmSync(siteDir, { recursive: true, force: true });
  fs.mkdirSync(siteDir, { recursive: true });
  new AdmZip(zipPath).extractAllTo(siteDir, true);
  console.log("Extracted site.zip to", siteDir);
} else {
  console.warn("site.zip not found; serving repository root temporarily");
}

app.disable("x-powered-by");

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, siteZip: fs.existsSync(zipPath) });
});

app.use(express.static(fs.existsSync(zipPath) ? siteDir : __dirname, {
  index: "index.html",
  maxAge: "1h"
}));

app.listen(port, "0.0.0.0", () => {
  console.log(`Kontur site listening on port ${port}`);
});
