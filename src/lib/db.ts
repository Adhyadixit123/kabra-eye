import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function query(text: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function searchFaqs(searchTerm: string) {
  const term = `%${searchTerm.toLowerCase()}%`;
  return query(
    `SELECT id, question, answer, category, is_viral FROM faqs 
     WHERE LOWER(question) LIKE $1 OR LOWER(answer) LIKE $1 
     ORDER BY is_viral DESC, id ASC`,
    [term]
  );
}

export async function getAllFaqs() {
  return query(
    `SELECT id, question, answer, category, is_viral FROM faqs ORDER BY is_viral DESC, id ASC`
  );
}

export async function suggestFaqs(partial: string) {
  const term = `%${partial.toLowerCase()}%`;
  return query(
    `SELECT DISTINCT question FROM faqs 
     WHERE LOWER(question) LIKE $1 
     ORDER BY question LIMIT 5`,
    [term]
  );
}

export async function getBlogPosts() {
  return query(
    `SELECT id, slug, title, description, image, keywords, cta FROM blog_posts ORDER BY id ASC`
  );
}

export async function getBlogPostBySlug(slug: string) {
  const rows = await query(
    `SELECT id, slug, title, description, image, keywords, cta, content FROM blog_posts WHERE slug = $1`,
    [slug]
  );
  return rows[0] ?? null;
}

export async function getBlogFaqs(blogPostId: number) {
  return query(
    `SELECT question, answer FROM blog_faqs WHERE blog_post_id = $1 ORDER BY id ASC`,
    [blogPostId]
  );
}

export async function searchBlogPosts(searchTerm: string) {
  const term = `%${searchTerm.toLowerCase()}%`;
  return query(
    `SELECT id, slug, title, description, image, keywords FROM blog_posts 
     WHERE LOWER(title) LIKE $1 OR LOWER(description) LIKE $1 
     ORDER BY id ASC`,
    [term]
  );
}
