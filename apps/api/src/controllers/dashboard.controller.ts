import { Request, Response, NextFunction } from 'express';
import { AppointmentService } from '../services/appointment.service';

const appointmentService = new AppointmentService();

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await appointmentService.getDashboardStats();
    res.json({ status: 'success', data: stats });
  } catch (error) {
    next(error);
  }
};
