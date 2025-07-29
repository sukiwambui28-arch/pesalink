// pesalink-backend/src/models/transaction.model.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface TransactionAttributes {
  id: number;
  senderAccountId: number;
  receiverAccountId: number;
  type: 'debit' | 'credit';
  amount: number;
  notes?: string;
}

type TransactionCreationAttributes = Optional<TransactionAttributes, 'id'>;

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: number;
  public senderAccountId!: number;
  public receiverAccountId!: number;
  public type!: 'debit' | 'credit';
  public amount!: number;
  public notes?: string;
}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  senderAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'accounts', key: 'id' },
  },
  receiverAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'accounts', key: 'id' },
  },
  type: {
    type: DataTypes.ENUM('debit', 'credit'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'transactions',
});

export default Transaction;