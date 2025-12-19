import { ArrowRightLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenseStore } from '@/store/expenseStore';
import { cn } from '@/lib/utils';

interface BalanceListProps {
  groupId: string;
}

export function BalanceList({ groupId }: BalanceListProps) {
  const { getGroupBalances, users, currentUser } = useExpenseStore();

  const balances = getGroupBalances(groupId);

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user?.id === currentUser.id ? 'You' : user?.name || 'Unknown';
  };

  const getUserInitials = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user?.name.split(' ').map(n => n[0]).join('') || '?';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-primary" />
          Balance Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {balances.map((balance) => {
          const isCurrentUser = balance.userId === currentUser.id;
          
          return (
            <div
              key={balance.userId}
              className={cn(
                'p-4 rounded-lg border transition-colors',
                isCurrentUser ? 'bg-primary/5 border-primary/20' : 'bg-card'
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full font-semibold',
                      isCurrentUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    )}
                  >
                    {getUserInitials(balance.userId)}
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      {getUserName(balance.userId)}
                      {isCurrentUser && <span className="text-muted-foreground"> (You)</span>}
                    </h4>
                    <p
                      className={cn(
                        'text-sm font-medium',
                        balance.netBalance > 0
                          ? 'text-success'
                          : balance.netBalance < 0
                          ? 'text-destructive'
                          : 'text-muted-foreground'
                      )}
                    >
                      {balance.netBalance > 0 ? 'Gets back' : balance.netBalance < 0 ? 'Owes' : 'Settled up'}
                      {balance.netBalance !== 0 && ` $${Math.abs(balance.netBalance).toFixed(2)}`}
                    </p>
                  </div>
                </div>
                
                <div
                  className={cn(
                    'flex items-center gap-1 text-lg font-bold',
                    balance.netBalance > 0
                      ? 'text-success'
                      : balance.netBalance < 0
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  )}
                >
                  {balance.netBalance > 0 ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : balance.netBalance < 0 ? (
                    <TrendingDown className="h-5 w-5" />
                  ) : null}
                  {balance.netBalance >= 0 ? '+' : '-'}${Math.abs(balance.netBalance).toFixed(2)}
                </div>
              </div>

              {/* Detailed breakdown */}
              {(balance.owes.length > 0 || balance.isOwed.length > 0) && (
                <div className="pt-3 border-t space-y-2">
                  {balance.owes.map((owe) => (
                    <div
                      key={owe.toUserId}
                      className="flex items-center justify-between text-sm p-2 rounded bg-destructive/10"
                    >
                      <span className="text-muted-foreground">
                        Owes <span className="font-medium text-foreground">{getUserName(owe.toUserId)}</span>
                      </span>
                      <span className="font-medium text-destructive">
                        ${owe.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {balance.isOwed.map((owed) => (
                    <div
                      key={owed.fromUserId}
                      className="flex items-center justify-between text-sm p-2 rounded bg-success/10"
                    >
                      <span className="text-muted-foreground">
                        <span className="font-medium text-foreground">{getUserName(owed.fromUserId)}</span> owes
                      </span>
                      <span className="font-medium text-success">
                        ${owed.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
