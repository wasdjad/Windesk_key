import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const sql = neon(process.env.DATABASE_URL);
    const key = 'CDK-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    await sql`INSERT INTO keys (key_value) VALUES (${key})`;
    res.status(200).json({ key });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
