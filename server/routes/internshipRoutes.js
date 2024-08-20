import express from 'express';
import { 
    getAllInternshipsController, 
    getInternshipByIdController, 
    createInternshipController, 
    updateInternshipController, 
    deleteInternshipController 
} from '../controllers/internshipController.js';
// import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/internships', getAllInternshipsController);
router.get('/internships/:id', getInternshipByIdController);
router.post('/internships', createInternshipController);
router.put('/internships/:id', updateInternshipController);
router.delete('/internships/:id', deleteInternshipController);


export default router;
