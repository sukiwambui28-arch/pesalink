// pesalink-backend/src/routes/transactionRoutes.ts
import { Router } from 'express';
import { getTransactions, transferMoney } from '../controllers/transactionController';

const router = Router();

// Get transactions (mocked filtering/pagination)
router.get('/account/:accountId', getTransactions);

// Transfer money
router.post('/transfer', transferMoney);

export default router;
