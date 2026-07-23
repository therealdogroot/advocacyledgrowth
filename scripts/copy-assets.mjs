import fs from "fs";
import path from "path";

const root = process.cwd();
const assetsDir = path.join(root, "public", "assets");
const imagesDir = path.join(root, "public", "images");
fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(imagesDir, { recursive: true });

const pdfSrc = path.join(root, "Assets", "advocacy-os-second-edition.pdf");
const pdfDest = path.join(assetsDir, "advocacy-os-second-edition.pdf");
fs.copyFileSync(pdfSrc, pdfDest);

const headshotSrc = path.join(root, "public", "images", "author-headshot.webp");
if (!fs.existsSync(headshotSrc)) {
  console.warn("Missing public/images/author-headshot.webp");
}

console.log("Copied PDF to public/assets/");
