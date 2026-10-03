import { db } from '../db/index';

export class PatientRepository {
  async findAll(search: string = '', page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM patients';
    const params: any[] = [];
    
    if (search) {
      query += ` WHERE full_name ILIKE $1 OR cin ILIKE $1`;
      params.push(`%${search}%`);
    }

    // Count total
    const countQuery = `SELECT COUNT(*) FROM (${query}) AS temp`;
    const countRes = await db.query(countQuery, params);
    const total = parseInt(countRes.rows[0].count, 10);

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const res = await db.query(query, params);
    return {
      data: res.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findById(id: string) {
    const res = await db.query('SELECT * FROM patients WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  async findByCin(cin: string) {
    const res = await db.query('SELECT * FROM patients WHERE cin = $1', [cin]);
    return res.rows[0] || null;
  }

  async create(data: { fullName: string; cin: string; phone: string; birthDate: string; address?: string }) {
    const res = await db.query(`
      INSERT INTO patients (full_name, cin, phone, birth_date, address) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `, [data.fullName, data.cin, data.phone, data.birthDate, data.address || null]);
    return res.rows[0];
  }

  async update(id: string, data: { fullName: string; cin: string; phone: string; birthDate: string; address?: string }) {
    const res = await db.query(`
      UPDATE patients 
      SET full_name = $1, cin = $2, phone = $3, birth_date = $4, address = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 
      RETURNING *
    `, [data.fullName, data.cin, data.phone, data.birthDate, data.address || null, id]);
    return res.rows[0];
  }

  async delete(id: string) {
    const res = await db.query('DELETE FROM patients WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  }
}
