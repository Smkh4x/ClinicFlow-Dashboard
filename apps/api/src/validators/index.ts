import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const patientCreateSchema = z.object({
  fullName: z.string().min(1),
  cin: z.string().min(1),
  phone: z.string().min(1),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
  address: z.string().optional()
});

export const patientUpdateSchema = patientCreateSchema;

export const appointmentCreateSchema = z.object({
  patientId: z.string().uuid(),
  appointmentDate: z.string().datetime(),
  status: z.enum(['pending', 'confirmed', 'cancelled']),
  reason: z.string().min(1),
  notes: z.string().optional()
});

export const appointmentStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled'])
});
