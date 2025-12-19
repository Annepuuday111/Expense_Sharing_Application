import { Receipt, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenseStore } from '@/store/expenseStore';
import { format } from 'date-fns';

export function RecentActivity() {
  const { expenses, groups, users } = useExpenseStore();

  // Get last 5 expenses sorted by date
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getGroupName = (groupId: string) => {
    return groups.find((g) => g.id === groupId)?.name || 'Unknown';
  };

  const getUserName = (userId: string) => {
    return users.find((u) => u.id === userId)?.name || 'Unknown';
  };

  const getCategoryEmoji = (category?: string) => {
    const emojis: Record<string, string> = {
      food: '🍽️',
      accommodation: '🏨',
      transport: '🚗',
      utilities: '💡',
      entertainment: '🎬',
      shopping: '🛍️',
    };
    return emojis[category || ''] || '💰';
  };

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '300ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentExpenses.length === 0 ? (
          <div className="text-center py-8">
            <Receipt className="h-12 w-12 mx-auto text-muted-foreground/40" />
            <p className="mt-3 text-muted-foreground">No expenses yet</p>
          </div>
        ) : (
          recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg">
                {getCategoryEmoji(expense.category)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{expense.description}</p>
                <p className="text-sm text-muted-foreground">
                  {getUserName(expense.paidBy)} paid • {getGroupName(expense.groupId)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${expense.amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(expense.createdAt), 'MMM d')}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
