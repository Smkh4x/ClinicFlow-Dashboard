import { db } from '../db/index';

export class AppointmentRepository {
  async findAll(date?: string, status?: string) {
    let query = `
      SELECT a.*, 
             p.full_name as patient_name, p.cin as patient_cin,
             u.email as creator_email
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      LEFT JOIN users u ON a.user_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    
    if (date) {
      params.push(date);
      query += ` AND DATE(a.appointment_date) = $${params.length}`;
    }
    
    if (status) {
      params.push(status);
      query += ` AND a.status = $${params.length}`;
    }

    query += ` ORDER BY a.appointment_date ASC`;

    const res = await db.query(query, params);
    return res.rows;
  }

  async findById(id: string) {
    const res = await db.query('SELECT * FROM appointments WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  async findPatientAppointments(patientId: string) {
    const res = await db.query('SELECT * FROM appointments WHERE patient_id = $1 ORDER BY appointment_date DESC', [patientId]);
    return res.rows;
  }

  async findConfirmedInWindow(patientId: string, targetDate: Date, windowMinutes: number = 30) {
    const res = await db.query(`
      SELECT id FROM appointments 
      WHERE patient_id = $1 
      AND status = 'confirmed' 
      AND ABS(EXTRACT(EPOCH FROM (appointment_date - $2))/60) < $3
    `, [patientId, targetDate, windowMinutes]);
    
    return res.rows;
  }

  async findConfirmedInWindowExcludeSelf(patientId: string, appointmentId: string, targetDate: Date, windowMinutes: number = 30) {
    const res = await db.query(`
      SELECT id FROM appointments 
      WHERE patient_id = $1 
      AND id != $2
      AND status = 'confirmed' 
      AND ABS(EXTRACT(EPOCH FROM (appointment_date - $3))/60) < $4
    `, [patientId, appointmentId, targetDate, windowMinutes]);
    
    return res.rows;
  }

  async create(data: { patientId: string; userId: string; appointmentDate: string; status: string; reason: string; notes?: string }) {
    const res = await db.query(`
      INSERT INTO appointments (patient_id, user_id, appointment_date, status, reason, notes) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *
    `, [data.patientId, data.userId, data.appointmentDate, data.status, data.reason, data.notes || null]);
    return res.rows[0];
  }

  async updateStatus(id: string, status: string) {
    const res = await db.query(`
      UPDATE appointments 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 
      RETURNING *
    `, [status, id]);
    return res.rows[0];
  }

  async getDashboardStats() {
    const totalPatientsRes = await db.query('SELECT COUNT(*) FROM patients');
    
    const todayRes = await db.query('SELECT COUNT(*) FROM appointments WHERE DATE(appointment_date) = CURRENT_DATE');
    
    const pendingRes = await db.query("SELECT COUNT(*) FROM appointments WHERE status = 'pending'");
    
    const confirmedRes = await db.query("SELECT COUNT(*) FROM appointments WHERE status = 'confirmed'");

    return {
      totalPatients: parseInt(totalPatientsRes.rows[0].count, 10),
      todayAppointments: parseInt(todayRes.rows[0].count, 10),
      pendingCount: parseInt(pendingRes.rows[0].count, 10),
      confirmedCount: parseInt(confirmedRes.rows[0].count, 10)
    };
  }
}
