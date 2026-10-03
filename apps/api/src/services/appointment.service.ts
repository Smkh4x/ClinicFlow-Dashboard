import { AppointmentRepository } from '../repositories/appointment.repository';

export class AppointmentService {
  private repo = new AppointmentRepository();

  async findAll(date?: string, status?: string) {
    return this.repo.findAll(date, status);
  }

  async create(data: { patientId: string; userId: string; appointmentDate: string; status: string; reason: string; notes?: string }) {
    if (data.status === 'confirmed') {
      await this.check30MinuteRule(data.patientId, new Date(data.appointmentDate));
    }
    return this.repo.create(data);
  }

  async updateStatus(id: string, status: string) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new Error('Appointment not found');
    }

    if (status === 'confirmed' && existing.status !== 'confirmed') {
      await this.check30MinuteRuleForUpdate(existing.patient_id, id, new Date(existing.appointment_date));
    }

    return this.repo.updateStatus(id, status);
  }

  async getDashboardStats() {
    return this.repo.getDashboardStats();
  }

  private async check30MinuteRule(patientId: string, date: Date) {
    const conflicts = await this.repo.findConfirmedInWindow(patientId, date, 30);
    if (conflicts.length > 0) {
      throw new Error('Patient already has a confirmed appointment within 30 minutes of this time.');
    }
  }

  private async check30MinuteRuleForUpdate(patientId: string, appointmentId: string, date: Date) {
    const conflicts = await this.repo.findConfirmedInWindowExcludeSelf(patientId, appointmentId, date, 30);
    if (conflicts.length > 0) {
      throw new Error('Patient already has a confirmed appointment within 30 minutes of this time.');
    }
  }
}
