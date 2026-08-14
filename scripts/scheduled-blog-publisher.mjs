#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const queuePath = path.join(rootDir, "data", "scheduled-blog-queue.json");
const statePath = path.join(rootDir, "data", ".scheduled-blog-state.json");
const logDir = path.join(rootDir, "logs");

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const listOnly = args.has("--list");
const bloggerBackfill = args.has("--blogger-backfill");
const installCron = args.has("--install-cron");
const slugArg = process.argv.find((arg) => arg.startsWith("--slug="))?.slice("--slug=".length);

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    let value = rawValue.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function todayInIndia() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
}

function readJson(filePath, fallback) {
  if (!existsSync(filePath)) return fallback;
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeUrl(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://kabraeyejaipur.com${url}`;
}

function articleToBloggerHtml(post) {
  const hero = post.image
    ? `<p><img src="${escapeHtml(normalizeUrl(post.image))}" alt="${escapeHtml(post.title)}" style="max-width:100%;height:auto;" /></p>`
    : "";
  const sections = post.sections
    .map(
      (section) => `<h2>${escapeHtml(section.heading)}</h2>
${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}`,
    )
    .join("\n");
  const faqs = post.faqs?.length
    ? `<h2>Frequently Asked Questions</h2>
${post.faqs
  .map((faq) => `<h3>${escapeHtml(faq.question)}</h3>\n<p>${escapeHtml(faq.answer)}</p>`)
  .join("\n")}`
    : "";
  const links = post.internalLinks?.length
    ? `<h2>Helpful Kabra Eye Hospital Links</h2>
<ul>
${post.internalLinks
  .map((link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`)
  .join("\n")}
</ul>`
    : "";
  return `${hero}
<p><strong>${escapeHtml(post.description)}</strong></p>
${sections}
${faqs}
${links}
<p><strong>${escapeHtml(post.cta)}</strong></p>`;
}

function validatePost(post) {
  const required = ["slug", "title", "description", "image", "keywords", "sections", "cta"];
  for (const field of required) {
    if (!post[field] || (Array.isArray(post[field]) && post[field].length === 0)) {
      throw new Error(`Scheduled post "${post.slug ?? "unknown"}" is missing ${field}`);
    }
  }
}

async function getGoogleAccessToken() {
  if (process.env.BLOGGER_ACCESS_TOKEN) return process.env.BLOGGER_ACCESS_TOKEN;
  const required = ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Blogger OAuth is not configured. Missing: ${missing.join(", ")}`);
  }
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const json = await response.json();
  if (!response.ok || !json.access_token) {
    throw new Error(`Google OAuth token request failed: ${JSON.stringify(json)}`);
  }
  return json.access_token;
}

async function publishToBlogger(post) {
  if (!process.env.BLOGGER_BLOG_ID) {
    throw new Error("BLOGGER_BLOG_ID is not configured");
  }
  const accessToken = await getGoogleAccessToken();
  const response = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOGGER_BLOG_ID}/posts/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kind: "blogger#post",
        title: post.title,
        content: articleToBloggerHtml(post),
        labels: ["Kabra Eye Hospital", "Jaipur Eye Care", ...(post.labels ?? [])],
      }),
    },
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(`Blogger publish failed: ${JSON.stringify(json)}`);
  }
  return json.url;
}

async function publishToWebsite(post) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const existing = await client.query("select id from blog_posts where slug = $1", [post.slug]);
    const content = post.sections.map((section) => ({
      heading: section.heading,
      paragraphs: section.paragraphs,
    }));
    const result = existing.rows[0]
      ? await client.query(
          `update blog_posts
             set title = $2, description = $3, image = $4, keywords = $5, cta = $6, content = $7
           where slug = $1
           returning id`,
          [post.slug, post.title, post.description, post.image, post.keywords, post.cta, JSON.stringify(content)],
        )
      : await client.query(
          `insert into blog_posts (slug, title, description, image, keywords, cta, content)
           values ($1, $2, $3, $4, $5, $6, $7)
           returning id`,
          [post.slug, post.title, post.description, post.image, post.keywords, post.cta, JSON.stringify(content)],
        );
    const postId = result.rows[0].id;
    await client.query("delete from blog_faqs where blog_post_id = $1", [postId]);
    for (const faq of post.faqs ?? []) {
      await client.query(
        "insert into blog_faqs (blog_post_id, question, answer) values ($1, $2, $3)",
        [postId, faq.question, faq.answer],
      );
    }
    await client.query("COMMIT");
    return `https://kabraeyejaipur.com/blog/${post.slug}/`;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

function pickPost(queue, state) {
  if (slugArg) {
    const post = queue.find((item) => item.slug === slugArg);
    if (!post) throw new Error(`No scheduled post found for slug: ${slugArg}`);
    return post;
  }
  const today = todayInIndia();
  return queue.find((post) => {
    const postState = state.posts?.[post.slug] ?? {};
    if (bloggerBackfill) {
      return postState.websitePublishedAt && !postState.bloggerPublishedAt;
    }
    return post.publishOn <= today && !postState.websitePublishedAt;
  });
}

function installDailyCron() {
  mkdirSync(logDir, { recursive: true });
  const marker = "# kabra-eye-daily-blog-publisher";
  const command = `15 10 * * * cd ${rootDir} && ${process.execPath} scripts/scheduled-blog-publisher.mjs >> ${path.join(logDir, "scheduled-blog-publisher.log")} 2>&1 ${marker}`;
  let current = "";
  try {
    current = execFileSync("crontab", ["-l"], { encoding: "utf8" });
  } catch {
    current = "";
  }
  const next = [
    ...current
      .split(/\r?\n/)
      .filter((line) => line.trim() && !line.includes(marker)),
    command,
  ].join("\n");
  execFileSync("crontab", ["-"], { input: `${next}\n` });
  console.log(`Installed daily cron:\n${command}`);
}

async function main() {
  loadEnvFile(path.join(rootDir, ".env.local"));
  if (installCron) {
    installDailyCron();
    return;
  }
  const queue = readJson(queuePath, []);
  const state = readJson(statePath, { posts: {} });
  for (const post of queue) validatePost(post);
  if (listOnly) {
    console.table(
      queue.map((post) => ({
        publishOn: post.publishOn,
        slug: post.slug,
        website: state.posts?.[post.slug]?.websitePublishedAt ? "yes" : "no",
        blogger: state.posts?.[post.slug]?.bloggerPublishedAt ? "yes" : "no",
      })),
    );
    return;
  }
  const post = pickPost(queue, state);
  if (!post) {
    console.log(bloggerBackfill ? "No Blogger backfill posts pending." : "No due website posts pending today.");
    return;
  }
  console.log(`${dryRun ? "Dry run" : "Publishing"}: ${post.title}`);
  if (dryRun) {
    console.log(JSON.stringify({ slug: post.slug, publishOn: post.publishOn, keywords: post.keywords }, null, 2));
    return;
  }
  state.posts[post.slug] ??= {};
  if (!bloggerBackfill) {
    const websiteUrl = await publishToWebsite(post);
    state.posts[post.slug].websitePublishedAt = new Date().toISOString();
    state.posts[post.slug].websiteUrl = websiteUrl;
    console.log(`Website published: ${websiteUrl}`);
  }
  try {
    const bloggerUrl = await publishToBlogger(post);
    state.posts[post.slug].bloggerPublishedAt = new Date().toISOString();
    state.posts[post.slug].bloggerUrl = bloggerUrl;
    delete state.posts[post.slug].bloggerLastError;
    console.log(`Blogger published: ${bloggerUrl}`);
  } catch (error) {
    state.posts[post.slug].bloggerLastError = error.message;
    console.warn(`Blogger skipped: ${error.message}`);
  }
  writeJson(statePath, state);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
