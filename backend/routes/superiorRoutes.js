import express from 'express';
const router = express.Router();
import {
    triggerAIDispatch,
    getLeaderboard,
    getRecentDecisions
} from '../controllers/superiorController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/dispatch', protect, triggerAIDispatch);
router.get('/leaderboard', getLeaderboard);
router.get('/decisions', getRecentDecisions);

export default router;
