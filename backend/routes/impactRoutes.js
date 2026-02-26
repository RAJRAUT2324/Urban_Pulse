import express from 'express';
import {
    getCredits,
    voteForDevelopment,
    getHeatmapData,
    getWardStats,
    getPolls,
    voteOnPoll,
    createPoll,
    spendCreditsOnService,
    getDecisionOfTheWeek,
    getTransparencyMetrics,
    getPublicFeed
} from '../controllers/impactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/credits', protect, getCredits);
router.post('/vote', protect, voteForDevelopment);
router.get('/heatmap', getHeatmapData);
router.get('/ward-stats/:wardId', getWardStats);
router.get('/decision-of-the-week', getDecisionOfTheWeek);
router.get('/transparency-metrics', getTransparencyMetrics);
router.get('/public-feed', getPublicFeed);

// Polls
router.get('/polls', getPolls);
router.post('/polls', protect, admin, createPoll);
router.post('/polls/:id/vote', protect, voteOnPoll);

// Spending
router.post('/spend', protect, spendCreditsOnService);

export default router;
