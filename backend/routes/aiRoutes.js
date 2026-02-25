import express from 'express';
import { silentDetect, rootCauseExplain, calculatePriority, getAssetHealth } from '../controllers/aiController.js';

const router = express.Router();

router.post('/silent-detect', silentDetect);
router.post('/root-cause', rootCauseExplain);
router.post('/priority', calculatePriority);
router.get('/assets/:assetId/health', getAssetHealth);

export default router;
