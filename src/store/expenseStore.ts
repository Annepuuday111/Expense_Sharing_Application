import { create } from 'zustand';
import { User, Group, Expense, Settlement, UserBalance, SplitType } from '@/types/expense';
import { mockUsers, mockGroups, mockExpenses, mockSettlements, currentUser } from '@/data/mockData';

interface ExpenseStore {
  users: User[];
  groups: Group[];
  expenses: Expense[];
  settlements: Settlement[];
  currentUser: User;
  
  // Actions
  addGroup: (group: Omit<Group, 'id' | 'createdAt' | 'totalExpenses'>) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  addSettlement: (settlement: Omit<Settlement, 'id' | 'settledAt'>) => void;
  
  // Computed
  getGroupExpenses: (groupId: string) => Expense[];
  getGroupBalances: (groupId: string) => UserBalance[];
  getUserTotalBalance: (userId: string) => number;
  getSimplifiedBalances: (groupId: string) => { from: User; to: User; amount: number }[];
}

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  users: mockUsers,
  groups: mockGroups,
  expenses: mockExpenses,
  settlements: mockSettlements,
  currentUser: currentUser,

  addGroup: (groupData) => {
    const newGroup: Group = {
      ...groupData,
      id: `g${Date.now()}`,
      createdAt: new Date(),
      totalExpenses: 0,
    };
    set((state) => ({ groups: [...state.groups, newGroup] }));
  },

  addExpense: (expenseData) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `e${Date.now()}`,
      createdAt: new Date(),
    };
    set((state) => {
      const updatedGroups = state.groups.map((g) =>
        g.id === expenseData.groupId
          ? { ...g, totalExpenses: g.totalExpenses + expenseData.amount }
          : g
      );
      return {
        expenses: [...state.expenses, newExpense],
        groups: updatedGroups,
      };
    });
  },

  addSettlement: (settlementData) => {
    const newSettlement: Settlement = {
      ...settlementData,
      id: `s${Date.now()}`,
      settledAt: new Date(),
    };
    set((state) => ({ settlements: [...state.settlements, newSettlement] }));
  },

  getGroupExpenses: (groupId) => {
    return get().expenses.filter((e) => e.groupId === groupId);
  },

  getGroupBalances: (groupId) => {
    const { expenses, settlements, groups, users } = get();
    const group = groups.find((g) => g.id === groupId);
    if (!group) return [];

    const groupExpenses = expenses.filter((e) => e.groupId === groupId);
    const groupSettlements = settlements.filter((s) => s.groupId === groupId);

    // Calculate raw balances
    const balances: Record<string, Record<string, number>> = {};

    // Initialize balances for all members
    group.members.forEach((member) => {
      balances[member.id] = {};
      group.members.forEach((other) => {
        if (member.id !== other.id) {
          balances[member.id][other.id] = 0;
        }
      });
    });

    // Process expenses
    groupExpenses.forEach((expense) => {
      const payer = expense.paidBy;
      expense.splits.forEach((split) => {
        if (split.userId !== payer) {
          // split.userId owes payer
          balances[split.userId][payer] = (balances[split.userId][payer] || 0) + split.amount;
        }
      });
    });

    // Process settlements
    groupSettlements.forEach((settlement) => {
      balances[settlement.fromUserId][settlement.toUserId] -= settlement.amount;
    });

    // Convert to UserBalance format
    return group.members.map((member) => {
      const owes: { toUserId: string; amount: number }[] = [];
      const isOwed: { fromUserId: string; amount: number }[] = [];
      let netBalance = 0;

      group.members.forEach((other) => {
        if (member.id !== other.id) {
          const owesAmount = balances[member.id][other.id] || 0;
          const isOwedAmount = balances[other.id][member.id] || 0;
          const net = isOwedAmount - owesAmount;

          if (net < 0) {
            owes.push({ toUserId: other.id, amount: Math.abs(net) });
            netBalance -= Math.abs(net);
          } else if (net > 0) {
            isOwed.push({ fromUserId: other.id, amount: net });
            netBalance += net;
          }
        }
      });

      return {
        userId: member.id,
        owes,
        isOwed,
        netBalance,
      };
    });
  },

  getUserTotalBalance: (userId) => {
    const { groups } = get();
    let total = 0;
    groups.forEach((group) => {
      if (group.members.some((m) => m.id === userId)) {
        const balances = get().getGroupBalances(group.id);
        const userBalance = balances.find((b) => b.userId === userId);
        if (userBalance) {
          total += userBalance.netBalance;
        }
      }
    });
    return total;
  },

  getSimplifiedBalances: (groupId) => {
    const { groups, users } = get();
    const group = groups.find((g) => g.id === groupId);
    if (!group) return [];

    const balances = get().getGroupBalances(groupId);
    const result: { from: User; to: User; amount: number }[] = [];

    balances.forEach((balance) => {
      balance.owes.forEach((owe) => {
        if (owe.amount > 0.01) {
          const fromUser = users.find((u) => u.id === balance.userId);
          const toUser = users.find((u) => u.id === owe.toUserId);
          if (fromUser && toUser) {
            result.push({ from: fromUser, to: toUser, amount: owe.amount });
          }
        }
      });
    });

    return result;
  },
}));
