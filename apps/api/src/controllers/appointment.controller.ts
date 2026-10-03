import { Request, Response, NextFunction } from 'express';
import { AppointmentService } from '../services/appointment.service';
import { appointmentCreateSchema, appointmentStatusSchema } from '../validators';

const appointmentService = new AppointmentService();

export const getAllAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const date = req.query.date as string | undefined;
    const status = req.query.status as string | undefined;
    const appointments = await appointmentService.findAll(date, status);
    res.json({ status: 'success', data: appointments });
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = appointmentCreateSchema.parse(req.body);
    const userId = (req as any).user.id;
    const appointment = await appointmentService.create({ ...data, userId });
    res.status(201).json({ status: 'success', data: appointment });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = appointmentStatusSchema.parse(req.body);
    const appointment = await appointmentService.updateStatus(req.params.id, status);
    res.json({ status: 'success', data: appointment });
  } catch (error) {
    next(error);
  }
};
