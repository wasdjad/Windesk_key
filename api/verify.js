import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { key } = req.body || {};
    if (!key) return res.json({ valid: false });

    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT * FROM keys WHERE key_value = ${key.trim()}`;
    res.status(200).json({ valid: rows.length > 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
