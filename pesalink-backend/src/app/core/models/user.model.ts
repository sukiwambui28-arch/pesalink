export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  balance?: number;
  createdAt?: Date;
}
