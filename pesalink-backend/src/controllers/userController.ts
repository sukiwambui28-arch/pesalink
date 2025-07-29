// pesalink-backend/src/controllers/userController.ts

import { Request, Response } from 'express';
import axios from 'axios';

// In a real application, you would fetch this from your database.
// For this example, we'll use the JSONPlaceholder API as a mock.

//@desc    Get all users
//@route   GET /api/users
//@access  Public

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        // Add mock account data to each user
        const usersWithAccounts = response.data.map((user: any) => ({
            ...user,
            account: {
                // Generate a random account balance for demonstration
                balance: Math.floor(Math.random() * 50000) + 50,
                // Assign a random account type
                type: Math.random() > 0.5 ? 'Savings' : 'Checking',
            },
        }));
        res.status(200).json(usersWithAccounts);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

//@desc    Get a single user by ID
//@route   GET /api/users/:id
//@access  Public

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        // Add more detailed mock data for a single user view
        const user = {
            ...response.data,
            account: {
                balance: Math.floor(Math.random() * 50000) + 50,
                type: Math.random() > 0.5 ? 'Savings' : 'Checking',
            },
            transactions: [ // Mock transaction history
                { id: 1, type: 'credit', amount: 1200, date: '2024-07-20' },
                { id: 2, type: 'debit', amount: 50, date: '2024-07-19' },
                { id: 3, type: 'credit', amount: 3000, date: '2024-07-18' },
            ]
        };
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};