import express from 'express';
import { getMyReferrals, getTopReferrers} from '../controllers/referalController.js';
import { CheckAuthorization } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/myreferals', CheckAuthorization,getMyReferrals);
router.get('/topreferrers', getTopReferrers);



export default router;


