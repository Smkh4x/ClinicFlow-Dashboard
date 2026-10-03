import { Request, Response, NextFunction } from 'express';
import { PatientRepository } from '../repositories/patient.repository';
import { patientCreateSchema, patientUpdateSchema } from '../validators';
import { AppointmentRepository } from '../repositories/appointment.repository';

const patientRepo = new PatientRepository();
const appointmentRepo = new AppointmentRepository();

export const getAllPatients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string || '';
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '10', 10);
    
    const result = await patientRepo.findAll(search, page, limit);
    res.json({ status: 'success', ...result });
  } catch (error) {
    next(error);
  }
};

export const getPatientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patient = await patientRepo.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ status: 'error', message: 'Patient not found' });
    }
    const appointments = await appointmentRepo.findPatientAppointments(patient.id);
    res.json({ status: 'success', data: { ...patient, appointments } });
  } catch (error) {
    next(error);
  }
};

export const createPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = patientCreateSchema.parse(req.body);
    const existing = await patientRepo.findByCin(data.cin);
    if (existing) {
      return res.status(400).json({ status: 'error', message: 'Patient with this CIN already exists' });
    }
    const patient = await patientRepo.create(data);
    res.status(201).json({ status: 'success', data: patient });
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = patientUpdateSchema.parse(req.body);
    const patient = await patientRepo.update(req.params.id, data);
    if (!patient) {
      return res.status(404).json({ status: 'error', message: 'Patient not found' });
    }
    res.json({ status: 'success', data: patient });
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointments = await appointmentRepo.findPatientAppointments(req.params.id);
    if (appointments.length > 0) {
      return res.status(400).json({ status: 'error', message: 'Cannot delete patient with existing appointments' });
    }
    const patient = await patientRepo.delete(req.params.id);
    if (!patient) {
      return res.status(404).json({ status: 'error', message: 'Patient not found' });
    }
    res.json({ status: 'success', data: patient });
  } catch (error) {
    next(error);
  }
};
