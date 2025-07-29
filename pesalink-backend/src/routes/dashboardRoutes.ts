// pesalink-backend/src/routes/dashboardRoutes.ts
import { Router } from 'express';
import pool from '../services/db';

const router = Router();

// Dashboard controller function
router.get('/', async (req, res) => {
    try {
        // Example: Fetch summary data from the database
        const userCountQuery = await pool.query('SELECT COUNT(*) AS count FROM users');
        const transactionCountQuery = await pool.query('SELECT COUNT(*) AS count FROM transactions');
        
        const dashboardData = {
            userCount: userCountQuery.rows[0].count,
            transactionCount: transactionCountQuery.rows[0].count,
            timestamp: new Date().toISOString()
        };

        res.json(dashboardData);
    } catch (err) {
        console.error('Dashboard error:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

export default router;