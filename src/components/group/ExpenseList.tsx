import { Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useExpenseStore } from '@/store/expenseStore';
import { format } from 'date-fns';

interface ExpenseListProps {
  groupId: string;
}

export function ExpenseList({ groupId }: ExpenseListProps) {
  const { getGroupExpenses, users } = useExpenseStore();

  const expenses = getGroupExpenses(groupId).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getUserName = (userId: string) => {
    return users.find((u) => u.id === userId)?.name || 'Unknown';
  };

  const getSplitTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      equal: 'Split Equally',
      exact: 'Exact Amounts',
      percentage: 'By Percentage',
    };
    return labels[type] || type;
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

  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-primary/10 p-6 mb-4">
            <Receipt className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No expenses yet</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            Add your first expense to start tracking who owes what.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          All Expenses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-xl">
                  {getCategoryEmoji(expense.category)}
                </div>
                <div>
                  <h4 className="font-semibold">{expense.description}</h4>
                  <p className="text-sm text-muted-foreground">
                    Paid by <span className="font-medium">{getUserName(expense.paidBy)}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${expense.amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(expense.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{getSplitTypeLabel(expense.splitType)}</Badge>
              {expense.category && (
                <Badge variant="outline" className="capitalize">
                  {expense.category}
                </Badge>
              )}
            </div>

            <div className="pt-3 border-t">
              <p className="text-sm text-muted-foreground mb-2">Split details:</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {expense.splits.map((split) => (
                  <div
                    key={split.userId}
                    className="flex items-center justify-between text-sm p-2 rounded bg-secondary/50"
                  >
                    <span>{getUserName(split.userId)}</span>
                    <span className="font-medium">
                      ${split.amount.toFixed(2)}
                      {split.percentage && (
                        <span className="text-muted-foreground ml-1">
                          ({split.percentage}%)
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
