import crypto from 'crypto';
import { pool } from '../db/pool';

export async function generateRefreshToken(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  
  await pool.query(
    'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
    [userId, token, expiresAt]
  );
  
  return token;
}

export async function validateRefreshToken(token: string): Promise<string | null> {
  const result = await pool.query(
    'SELECT user_id FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()',
    [token]
  );
  return result.rows[0]?.user_id ?? null;
}
