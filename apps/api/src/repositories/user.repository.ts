import { db } from '../db/index';

export class UserRepository {
  async findByEmail(email: string) {
    const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0] || null;
  }

  async findById(id: string) {
    const res = await db.query('SELECT id, email, role, created_at, updated_at FROM users WHERE id = $1', [id]);
    return res.rows[0] || null;
  }
}
