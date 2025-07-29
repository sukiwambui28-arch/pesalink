// pesalink-backend/src/controllers/accountController.ts
import { Request, Response } from 'express';

// --- MOCK DATABASE ---
// In a real application, this data would be in your database (e.g., PostgreSQL, MySQL).
const mockAccounts = [
    { accountId: 'ACC001', userId: 1, type: 'Checking', balance: 45850.75, currency: 'KES' },
    { accountId: 'ACC002', userId: 1, type: 'Savings', balance: 120000.00, currency: 'KES' },
    { accountId: 'ACC003', userId: 2, type: 'Checking', balance: 8500.50, currency: 'KES' },
    { accountId: 'ACC004', userId: 3, type: 'Savings', balance: 250000.00, currency: 'KES' },
];


//@desc    Get all accounts for a specific user
//@route   GET /api/accounts/user/:userId
//@access  Private (should be protected by auth middleware in a real app)

export const getAccountsByUserId = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }

        const userAccounts = mockAccounts.filter(acc => acc.userId === userId);

        if (userAccounts.length === 0) {
            return res.status(404).json({ message: 'No accounts found for this user.' });
        }

        res.status(200).json(userAccounts);
    } catch (error: any) {
        console.error('Error fetching user accounts:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

//@desc    Get details for a single account by its ID
//@route   GET /api/accounts/:accountId
//@access  Private

export const getAccountDetails = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params;
        const account = mockAccounts.find(acc => acc.accountId === accountId);

        if (!account) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        res.status(200).json(account);
    } catch (error: any) {
        console.error('Error fetching account details:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};