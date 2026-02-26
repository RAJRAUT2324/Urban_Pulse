import express from 'express';
import { submitSupportRequest, getUserGrievances } from '../controllers/supportController.js';

const router = express.Router();

router.post('/', submitSupportRequest);
router.get('/user-grievances/:userId', getUserGrievances);

export default router;
