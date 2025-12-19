import { User, Group, Expense, Settlement } from '@/types/expense';

export const mockUsers: User[] = [
  { id: '1', name: 'Uday', email: 'uday@email.com', avatar: '' },
  { id: '2', name: 'Purushotham', email: 'purushotham@email.com', avatar: '' },
  { id: '3', name: 'Mohan', email: 'mohan@email.com', avatar: '' },
  { id: '4', name: 'Pavan', email: 'pavan@email.com', avatar: '' },
  { id: '5', name: 'Manoj', email: 'manoj@email.com', avatar: '' },
];


export const currentUser = mockUsers[0];

export const mockGroups: Group[] = [
  {
    id: 'g1',
    name: 'Weekend Trip',
    description: 'Beach getaway expenses',
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    createdAt: new Date('2024-01-15'),
    totalExpenses: 450,
  },
  {
    id: 'g2',
    name: 'Roommates',
    description: 'Monthly shared expenses',
    members: [mockUsers[0], mockUsers[3], mockUsers[4]],
    createdAt: new Date('2024-02-01'),
    totalExpenses: 890,
  },
  {
    id: 'g3',
    name: 'Office Lunch',
    description: 'Daily lunch splits',
    members: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3]],
    createdAt: new Date('2024-03-10'),
    totalExpenses: 245,
  },
];

export const mockExpenses: Expense[] = [
  {
    id: 'e1',
    groupId: 'g1',
    description: 'Hotel booking',
    amount: 300,
    paidBy: '1',
    splitType: 'equal',
    splits: [
      { userId: '1', amount: 100 },
      { userId: '2', amount: 100 },
      { userId: '3', amount: 100 },
    ],
    createdAt: new Date('2024-01-16'),
    category: 'accommodation',
  },
  {
    id: 'e2',
    groupId: 'g1',
    description: 'Dinner at beach restaurant',
    amount: 150,
    paidBy: '2',
    splitType: 'equal',
    splits: [
      { userId: '1', amount: 50 },
      { userId: '2', amount: 50 },
      { userId: '3', amount: 50 },
    ],
    createdAt: new Date('2024-01-17'),
    category: 'food',
  },
  {
    id: 'e3',
    groupId: 'g2',
    description: 'Electricity bill',
    amount: 180,
    paidBy: '1',
    splitType: 'percentage',
    splits: [
      { userId: '1', amount: 90, percentage: 50 },
      { userId: '4', amount: 54, percentage: 30 },
      { userId: '5', amount: 36, percentage: 20 },
    ],
    createdAt: new Date('2024-02-05'),
    category: 'utilities',
  },
  {
    id: 'e4',
    groupId: 'g2',
    description: 'Groceries',
    amount: 250,
    paidBy: '4',
    splitType: 'exact',
    splits: [
      { userId: '1', amount: 100 },
      { userId: '4', amount: 80 },
      { userId: '5', amount: 70 },
    ],
    createdAt: new Date('2024-02-10'),
    category: 'food',
  },
  {
    id: 'e5',
    groupId: 'g3',
    description: 'Team lunch',
    amount: 120,
    paidBy: '1',
    splitType: 'equal',
    splits: [
      { userId: '1', amount: 30 },
      { userId: '2', amount: 30 },
      { userId: '3', amount: 30 },
      { userId: '4', amount: 30 },
    ],
    createdAt: new Date('2024-03-11'),
    category: 'food',
  },
];

export const mockSettlements: Settlement[] = [
  {
    id: 's1',
    groupId: 'g1',
    fromUserId: '3',
    toUserId: '1',
    amount: 50,
    settledAt: new Date('2024-01-20'),
  },
];
