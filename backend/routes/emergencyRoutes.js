import express from 'express';
import { submitEmergencyComplaint, getEmergencyComplaints, updateEmergencyStatus } from '../controllers/emergencyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitEmergencyComplaint);
router.get('/', protect, getEmergencyComplaints);
router.put('/:id', protect, updateEmergencyStatus);

export default router;
