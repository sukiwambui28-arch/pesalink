// pesalink-backend/src/controllers/transactionController.ts
import { Request, Response } from 'express';
import pool from '../services/db';


// Transfer Money
const transferMoney = async (req: Request, res: Response) => {
  const { senderId, receiverAccountNumber, amount, notes } = req.body;

  if (!senderId || !receiverAccountNumber || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid request. All fields required and amount must be positive.' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Fetch sender account
    const senderResult = await client.query(
      'SELECT * FROM accounts WHERE user_id = $1 FOR UPDATE',
      [senderId]
    );

    if (senderResult.rows.length === 0) {
      throw new Error('Sender account not found.');
    }

    const sender = senderResult.rows[0];

    if (sender.balance < amount) {
      throw new Error('Insufficient funds.');
    }

    // Fetch receiver account
    const receiverResult = await client.query(
      'SELECT * FROM accounts WHERE account_number = $1 FOR UPDATE',
      [receiverAccountNumber]
    );

    if (receiverResult.rows.length === 0) {
      throw new Error('Receiver account not found.');
    }

    const receiver = receiverResult.rows[0];

    // Update sender balance
    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
      [amount, sender.id]
    );

    // Update receiver balance
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, receiver.id]
    );

    // Insert transaction record
    const transactionResult = await client.query(
      `INSERT INTO transactions (sender_account_id, receiver_account_id, amount, notes, type, created_at)
       VALUES ($1, $2, $3, $4, 'transfer', NOW()) RETURNING *`,
      [sender.id, receiver.id, amount, notes]
    );

    await client.query('COMMIT');

    res.status(200).json({
      message: 'Transfer successful.',
      receipt: {
        transactionId: transactionResult.rows[0].id,
        sender: sender.account_number,
        receiver: receiver.account_number,
        amount,
        notes,
        timestamp: transactionResult.rows[0].created_at,
        newBalance: sender.balance - amount
      }
    });

  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error('Transfer failed:', error.message);
res.status(500).json({ error: error.message || 'Transfer failed.' }); 
  } finally {
    client.release();
  }
};

// Get Transaction History (with filters, pagination, sorting)
const getTransactions = async (req: Request, res: Response) => {
  const { accountId } = req.params;
  const { startDate, endDate, type, sortBy = 'created_at', sortOrder = 'desc', page = '1', limit = '10' } = req.query;

  const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

  try {
    const filters: string[] = ['(sender_account_id = $1 OR receiver_account_id = $1)'];
    const values: any[] = [accountId];
    let paramIndex = 2;

    if (type) {
      filters.push(`type = $${paramIndex++}`);
      values.push(type);
    }

    if (startDate) {
      filters.push(`created_at >= $${paramIndex++}`);
      values.push(startDate);
    }

    if (endDate) {
      filters.push(`created_at <= $${paramIndex++}`);
      values.push(endDate);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const baseQuery = `SELECT * FROM transactions ${whereClause} ORDER BY ${sortBy} ${sortOrder} LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    values.push(parseInt(limit as string), offset);

    const result = await pool.query(baseQuery, values);

    res.status(200).json({
      total: result.rowCount,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      data: result.rows,
    });

  } catch (error: any) {
    console.error('Fetch transactions failed:', error.message);
    res.status(500).json({ error: 'Failed to retrieve transactions.' });
  }
};

export { transferMoney, getTransactions };
