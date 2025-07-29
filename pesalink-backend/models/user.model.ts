// pesalink-backend/src/models/user.model.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // We will create this file next
import bcrypt from 'bcrypt';

// Interface for User attributes
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  accountNumber:string,
  balance:number,
  accountType:string,
  password?: string; // Password is optional on retrieval
}

// Interface for User creation attributes (password is required)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
    password?: string;
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public accountNumber:string;
  public balance!:number;
  public accountType!:string;
  public email!: string;
  public readonly password!: string;

   // Timestamps (optional)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to check password validity
  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
   accountNumber:{
   type: DataTypes.STRING,
   allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: true, // createdAt and updatedAt
  hooks: {
    // Hash password before creating a user
    beforeCreate: async (user: User) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

export default User;