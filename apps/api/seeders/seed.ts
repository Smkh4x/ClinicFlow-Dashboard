import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);

  // Users
  const admin = await prisma.user.create({
    data: { email: 'admin@clinicflow.com', passwordHash, role: 'admin' },
  });
  const staff1 = await prisma.user.create({
    data: { email: 'staff1@clinicflow.com', passwordHash, role: 'staff' },
  });
  const staff2 = await prisma.user.create({
    data: { email: 'staff2@clinicflow.com', passwordHash, role: 'staff' },
  });

  // Patients
  const patients = [
    { fullName: 'John Doe', cin: 'AB123456', phone: '123456789', birthDate: new Date('1980-05-15'), address: '123 Main St' },
    { fullName: 'Jane Smith', cin: 'CD789012', phone: '987654321', birthDate: new Date('1992-11-20'), address: '456 Oak Ave' },
    { fullName: 'Ahmed Ali', cin: 'EF345678', phone: '555123456', birthDate: new Date('1975-03-10'), address: '789 Pine Rd' },
    { fullName: 'Sarah Connor', cin: 'GH901234', phone: '555987654', birthDate: new Date('1988-07-22'), address: '321 Elm St' },
    { fullName: 'Mohammed Ben', cin: 'IJ567890', phone: '444555666', birthDate: new Date('2000-01-05'), address: '654 Cedar Ln' },
  ];

  const createdPatients = [];
  for (const p of patients) {
    createdPatients.push(await prisma.patient.create({ data: p }));
  }

  // Appointments
  const getFutureDate = (days: number, hours: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(hours, 0, 0, 0);
    return d;
  };

  const appointments = [
    { patientId: createdPatients[0].id, userId: staff1.id, status: 'confirmed', appointmentDate: getFutureDate(1, 10), reason: 'General Checkup' },
    { patientId: createdPatients[1].id, userId: staff1.id, status: 'pending', appointmentDate: getFutureDate(1, 14), reason: 'Dental Cleaning' },
    { patientId: createdPatients[2].id, userId: staff2.id, status: 'cancelled', appointmentDate: getFutureDate(2, 9), reason: 'Follow-up' },
    { patientId: createdPatients[3].id, userId: admin.id, status: 'confirmed', appointmentDate: getFutureDate(2, 11), reason: 'Vaccination' },
    { patientId: createdPatients[4].id, userId: staff2.id, status: 'pending', appointmentDate: getFutureDate(3, 15), reason: 'Consultation' },
    { patientId: createdPatients[0].id, userId: staff1.id, status: 'pending', appointmentDate: getFutureDate(4, 10), reason: 'Blood Test Results' },
    { patientId: createdPatients[1].id, userId: staff2.id, status: 'confirmed', appointmentDate: getFutureDate(5, 9), reason: 'Eye Exam' },
    { patientId: createdPatients[2].id, userId: admin.id, status: 'pending', appointmentDate: getFutureDate(5, 14), reason: 'Physical Therapy' },
    { patientId: createdPatients[3].id, userId: staff1.id, status: 'cancelled', appointmentDate: getFutureDate(6, 11), reason: 'Dermatology Consult' },
    { patientId: createdPatients[4].id, userId: staff2.id, status: 'confirmed', appointmentDate: getFutureDate(7, 16), reason: 'Cardiology Check' },
  ];

  for (const a of appointments) {
    await prisma.appointment.create({ data: a });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
