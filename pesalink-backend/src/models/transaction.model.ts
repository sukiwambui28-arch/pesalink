export interface Transaction {
  id: number;
  sender_account_id: number;
  receiver_account_id: number;
  amount: number;
  notes: string;
  type: 'credit' | 'debit';
  created_at: string;
}
