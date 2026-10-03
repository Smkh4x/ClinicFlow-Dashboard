import { Router } from 'express';
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from '../controllers/patient.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);
router.put('/:id', updatePatient);
router.delete('/:id', roleMiddleware(['admin']), deletePatient);

export default router;
