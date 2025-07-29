// pesalink-backend/src/routes/userRoutes.ts

import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/userController';

const router = Router();

// Route to get all users
router.get('/', getAllUsers);

// Route to get a single user by their ID
router.get('/:id', getUserById);

export default router;