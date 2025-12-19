import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenseStore } from '@/store/expenseStore';
import { cn } from '@/lib/utils';

export function BalanceOverview() {
  const { currentUser, getUserTotalBalance, groups, getGroupBalances } = useExpenseStore();
  
  const totalBalance = getUserTotalBalance(currentUser.id);
  
  // Calculate total owed and owing
  let totalOwed = 0;
  let totalOwing = 0;
  
  groups.forEach((group) => {
    if (group.members.some((m) => m.id === currentUser.id)) {
      const balances = getGroupBalances(group.id);
      const userBalance = balances.find((b) => b.userId === currentUser.id);
      if (userBalance) {
        userBalance.isOwed.forEach((item) => {
          totalOwed += item.amount;
        });
        userBalance.owes.forEach((item) => {
          totalOwing += item.amount;
        });
      }
    }
  });

  const stats = [
    {
      title: 'Total Balance',
      value: totalBalance,
      icon: Wallet,
      color: totalBalance >= 0 ? 'text-success' : 'text-destructive',
      bgColor: totalBalance >= 0 ? 'bg-success/10' : 'bg-destructive/10',
    },
    {
      title: 'You are owed',
      value: totalOwed,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'You owe',
      value: totalOwing,
      icon: TrendingDown,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={cn('rounded-full p-2', stat.bgColor)}>
              <stat.icon className={cn('h-4 w-4', stat.color)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={cn('text-2xl font-bold', stat.color)}>
              {stat.value >= 0 ? '+' : '-'}${Math.abs(stat.value).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all groups
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
