import express from 'express';
import { registerCompany } from '../controllers/companyController.js';

const router = express.Router();

router.post('/register/company', registerCompany);


export default router;
