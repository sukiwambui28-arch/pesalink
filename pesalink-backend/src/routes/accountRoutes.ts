// pesalink-backend/src/routes/accountRoutes.ts
import { Router } from 'express';
import { getAccountsByUserId, getAccountDetails } from '../controllers/accountController';

const router = Router();

// Route to get all accounts for a specific user ID
router.get('/user/:userId', getAccountsByUserId);

// Route to get details of a single account by its ID
router.get('/:accountId', getAccountDetails);

export default router;