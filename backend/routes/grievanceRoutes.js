import express from 'express';
import {
    submitGrievance,
    getGrievances,
    getGrievanceById,
    updateGrievanceStatus,
    verifyFix,
    getNearbyValidators,
    getDepartmentStats,
    reviewResolution,
    assignTask,
    submitResolution
} from '../controllers/grievanceController.js';

const router = express.Router();

router.route('/')
    .post(submitGrievance)
    .get(getGrievances);

router.route('/stats/departments')
    .get(getDepartmentStats);

router.route('/:id')
    .get(getGrievanceById);

router.route('/:id/status')
    .put(updateGrievanceStatus);

router.route('/:id/verify')
    .put(verifyFix);

router.route('/:id/nearby-validators')
    .get(getNearbyValidators);

router.route('/:id/review')
    .put(reviewResolution);

router.route('/:id/assign')
    .put(assignTask);

router.route('/:id/resolve')
    .put(submitResolution);

export default router;

