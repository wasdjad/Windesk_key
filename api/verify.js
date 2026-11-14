import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // 允许你的本地 file:// App 跨域请求
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { key } = req.body || {};
  if (!key) return res.json({ valid: false });

  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`SELECT * FROM keys WHERE key_value = ${key.trim()}`;
  res.json({ valid: rows.length > 0 });
}
