export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: User[];
  createdAt: Date;
  totalExpenses: number;
}

export interface ExpenseSplit {
  userId: string;
  amount: number;
  percentage?: number;
}

export type SplitType = 'equal' | 'exact' | 'percentage';

export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string;
  splitType: SplitType;
  splits: ExpenseSplit[];
  createdAt: Date;
  category?: string;
}

export interface Balance {
  fromUserId: string;
  toUserId: string;
  amount: number;
}

export interface Settlement {
  id: string;
  groupId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  settledAt: Date;
}

export interface UserBalance {
  userId: string;
  owes: { toUserId: string; amount: number }[];
  isOwed: { fromUserId: string; amount: number }[];
  netBalance: number;
}
