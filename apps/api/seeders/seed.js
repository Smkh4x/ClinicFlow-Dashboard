const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/clinicflow'
});

async function runSeed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Clear existing data (be careful, only for dev)
    await client.query('DELETE FROM appointments');
    await client.query('DELETE FROM patients');
    await client.query('DELETE FROM users');

    const passwordHash = await bcrypt.hash('password123', 10);
    
    // Insert Users: 1 admin, 2 staff
    const adminRes = await client.query(`
      INSERT INTO users (email, password_hash, role) 
      VALUES ('admin@clinicflow.com', $1, 'admin') RETURNING id
    `, [passwordHash]);
    const adminId = adminRes.rows[0].id;

    const staff1Res = await client.query(`
      INSERT INTO users (email, password_hash, role) 
      VALUES ('staff1@clinicflow.com', $1, 'staff') RETURNING id
    `, [passwordHash]);
    const staff1Id = staff1Res.rows[0].id;

    const staff2Res = await client.query(`
      INSERT INTO users (email, password_hash, role) 
      VALUES ('staff2@clinicflow.com', $1, 'staff') RETURNING id
    `, [passwordHash]);
    const staff2Id = staff2Res.rows[0].id;

    // Insert 5 Patients
    const patients = [
      { full_name: 'John Doe', cin: 'AB123456', phone: '123456789', birth_date: '1980-05-15', address: '123 Main St' },
      { full_name: 'Jane Smith', cin: 'CD789012', phone: '987654321', birth_date: '1992-11-20', address: '456 Oak Ave' },
      { full_name: 'Ahmed Ali', cin: 'EF345678', phone: '555123456', birth_date: '1975-03-10', address: '789 Pine Rd' },
      { full_name: 'Sarah Connor', cin: 'GH901234', phone: '555987654', birth_date: '1988-07-22', address: '321 Elm St' },
      { full_name: 'Mohammed Ben', cin: 'IJ567890', phone: '444555666', birth_date: '2000-01-05', address: '654 Cedar Ln' },
    ];

    const patientIds = [];
    for (const p of patients) {
      const res = await client.query(`
        INSERT INTO patients (full_name, cin, phone, birth_date, address)
        VALUES ($1, $2, $3, $4, $5) RETURNING id
      `, [p.full_name, p.cin, p.phone, p.birth_date, p.address]);
      patientIds.push(res.rows[0].id);
    }

    // Insert 10 Appointments
    const now = new Date();
    
    // Helper to add days and hours
    const getFutureDate = (days, hours) => {
      const d = new Date(now);
      d.setDate(d.getDate() + days);
      d.setHours(hours, 0, 0, 0);
      return d;
    };

    const appointments = [
      { patient_id: patientIds[0], user_id: staff1Id, status: 'confirmed', appointment_date: getFutureDate(1, 10), reason: 'General Checkup' },
      { patient_id: patientIds[1], user_id: staff1Id, status: 'pending', appointment_date: getFutureDate(1, 14), reason: 'Dental Cleaning' },
      { patient_id: patientIds[2], user_id: staff2Id, status: 'cancelled', appointment_date: getFutureDate(2, 9), reason: 'Follow-up' },
      { patient_id: patientIds[3], user_id: adminId, status: 'confirmed', appointment_date: getFutureDate(2, 11), reason: 'Vaccination' },
      { patient_id: patientIds[4], user_id: staff2Id, status: 'pending', appointment_date: getFutureDate(3, 15), reason: 'Consultation' },
      { patient_id: patientIds[0], user_id: staff1Id, status: 'pending', appointment_date: getFutureDate(4, 10), reason: 'Blood Test Results' },
      { patient_id: patientIds[1], user_id: staff2Id, status: 'confirmed', appointment_date: getFutureDate(5, 9), reason: 'Eye Exam' },
      { patient_id: patientIds[2], user_id: adminId, status: 'pending', appointment_date: getFutureDate(5, 14), reason: 'Physical Therapy' },
      { patient_id: patientIds[3], user_id: staff1Id, status: 'cancelled', appointment_date: getFutureDate(6, 11), reason: 'Dermatology Consult' },
      { patient_id: patientIds[4], user_id: staff2Id, status: 'confirmed', appointment_date: getFutureDate(7, 16), reason: 'Cardiology Check' },
    ];

    for (const a of appointments) {
      await client.query(`
        INSERT INTO appointments (patient_id, user_id, appointment_date, status, reason)
        VALUES ($1, $2, $3, $4, $5)
      `, [a.patient_id, a.user_id, a.appointment_date, a.status, a.reason]);
    }

    await client.query('COMMIT');
    console.log('Database seeded successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    client.release();
    pool.end();
  }
}

runSeed();
