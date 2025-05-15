export type UserRole = 'admin' | 'mentor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface Mentor extends User {
  role: 'mentor';
  baseRate: number;
  specialization?: string;
  joinedAt: string;
  paymentDetails?: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
  };
}