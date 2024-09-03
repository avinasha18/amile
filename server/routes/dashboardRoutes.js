import express from 'express';
import { getApplicationStatistics } from '../controllers/applicationController.js';
const router = express.Router();

router.get('/statistics/:userId',getApplicationStatistics)

export default router;
