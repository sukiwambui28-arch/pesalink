// pesalink-backend/src/models/account.model.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface AccountAttributes {
  id: number;
  userId: number; // Foreign key
  accountNumber: string;
  type: 'Savings' | 'Checking';
  balance: number;
}

// Some attributes are optional in Model.build and Model.create calls
type AccountCreationAttributes = Optional<AccountAttributes, 'id'>;

class Account extends Model<AccountAttributes, AccountCreationAttributes> implements AccountAttributes {
  public id!: number;
  public userId!: number;
  public accountNumber!: string;
  public type!: 'Savings' | 'Checking';
  public balance!: number;
}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // This is a reference to another model
      key: 'id', // This is the column name of the referenced model
    },
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.ENUM('Savings', 'Checking'),
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
}, {
  sequelize,
  tableName: 'accounts',
});

export default Account;