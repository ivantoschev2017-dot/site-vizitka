import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import AdmZip from "adm-zip";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const zipPath = path.join(__dirname, "site.zip");
const publicDir = path.join(__dirname, "public");

if (!fs.existsSync(zipPath)) {
  throw new Error("site.zip not found in repository root");
}

fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });

new AdmZip(zipPath).extractAllTo(publicDir, true);

const indexPath = path.join(publicDir, "index.html");
if (!fs.existsSync(indexPath)) {
  throw new Error("site.zip extracted, but public/index.html is missing");
}

console.log("Prepared current Kontur site in", publicDir);
