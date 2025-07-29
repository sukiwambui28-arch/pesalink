// src/app/core/models/dashboard.model.ts
export interface DashboardData {
  totalUsers: number;
  totalTransactions: number;
  totalBalance: number;
  monthlyStats: {
    month: string;
    transactionCount: number;
  }[];
  quickStats: {
    totalDeposits: number;
    totalWithdrawals: number;
    pendingTransactions: number;
  };
  recentTransactions: {
    id: number;
    amount: number;
    type: 'deposit' | 'withdrawal';
    description: string;
    timestamp: string;
  }[];
}
