import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // 生成 Windows 10 风格的 5x5 格式，例如：A1B2C-3D4E5-F6G7H-8I9J0-K1L2M
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      if (i < 4) key += '-'; // 每组后面加横杠，最后一组不加
    }
    
    await sql`INSERT INTO keys (key_value) VALUES (${key})`;
    res.status(200).json({ key });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
