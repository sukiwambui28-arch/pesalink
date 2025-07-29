// pesalink-backend/src/models/transaction.ts
import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Account from './account';

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  senderAccountId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Accounts',
      key: 'id',
    },
  },
  receiverAccountId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Accounts',
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('transfer', 'deposit', 'withdrawal'),
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'transactions',
  timestamps: false,
});

export default Transaction;
