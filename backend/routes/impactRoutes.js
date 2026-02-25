import express from 'express';
import {
    getCredits,
    voteForDevelopment,
    getHeatmapData,
    getWardStats,
    getPolls,
    voteOnPoll,
    createPoll,
    spendCreditsOnService
} from '../controllers/impactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/credits', protect, getCredits);
router.post('/vote', protect, voteForDevelopment);
router.get('/heatmap', getHeatmapData);
router.get('/ward-stats/:wardId', getWardStats);

// Polls
router.get('/polls', getPolls);
router.post('/polls', protect, admin, createPoll);
router.post('/polls/:id/vote', protect, voteOnPoll);

// Spending
router.post('/spend', protect, spendCreditsOnService);

export default router;
