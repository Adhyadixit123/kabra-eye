import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const host = "kabraeyejaipur.com";
const key = process.env.INDEXNOW_KEY ?? "1f1c0f1d8f83426a9b9f5fdce0e5f9f7";
const keyLocation = `https://${host}/indexnow-key.txt`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authorityCluster = JSON.parse(
  readFileSync(path.join(__dirname, "..", "src", "data", "cataract-refractive-authority-cluster.json"), "utf8"),
);

const paths = [
  "/",
  "/lasik-trans-prk/",
  "/service/trans-prk-glasses-spectacle-removal-surgery/",
  "/blog/schwind-amaris-jaipur-trans-prk-center/",
  "/about-us/",
  "/services/",
  "/contacts/",
  "/meet-our-specialists/",
  "/complete-empanelment-list/",
  "/faq/",
  ...authorityCluster.map((article) => `/blog/${article.slug}/`),
];

const payload = {
  host,
  key,
  keyLocation,
  urlList: paths.map((path) => `https://${host}${path}`),
};

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

const body = await response.text();

console.log(`IndexNow status: ${response.status} ${response.statusText}`);
if (body) console.log(body);

if (!response.ok && response.status !== 202) {
  process.exitCode = 1;
}
