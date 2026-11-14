import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  if (req.method !== 'POST') return res.status(405).end();
  
  const sql = neon(process.env.DATABASE_URL);
  const key = 'CDK-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  await sql`INSERT INTO keys (key_value) VALUES (${key})`;
  res.json({ key });
}
