// pesalink-backend/src/controllers/dashboardController.ts
import { Request, Response } from 'express';

// In a real app, this data would come from your database,
// likely by querying transactions for a specific user.
const getDashboardData = async (req: Request, res: Response) => {
    try {
        // Mock data for demonstration purposes.
        const dashboardData = {
            totalBalance: 45850.75,
            recentTransactions: [
                { id: 1, type: 'debit', description: 'Supermarket', amount: 2550, date: '2024-07-23' },
                { id: 2, type: 'credit', description: 'Salary', amount: 50000, date: '2024-07-22' },
                { id: 3, type: 'debit', description: 'Coffee Shop', amount: 450, date: '2024-07-22' },
                { id: 4, type: 'debit', description: 'Online Shopping', amount: 3500, date: '2024-07-21' },
                { id: 5, type: 'debit', description: 'Restaurant', amount: 1200, date: '2024-07-20' },
            ],
            spendingTrends: { // Data for the chart
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Monthly spending by week
                datasets: [
                    {
                        label: 'Spending (KES)',
                        data: [5200, 7800, 6100, 9500],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                    },
                ],
            },
            quickStats: {
                totalDeposits: 50000,
                totalWithdrawals: 7700,
                pendingTransactions: 2,
            }
        };

        res.status(200).json(dashboardData);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
    }
};

export { getDashboardData };