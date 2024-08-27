import express from 'express';
import { getMyReferrals, getTopReferrers} from '../controllers/referalController.js';

const router = express.Router();

router.get('/myreferals', getMyReferrals);
router.get('/topreferrers', getTopReferrers);



export default router;


