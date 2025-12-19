import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useExpenseStore } from '@/store/expenseStore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface SettlementListProps {
  groupId: string;
}

export function SettlementList({ groupId }: SettlementListProps) {
  const { getSimplifiedBalances, users, addSettlement, currentUser } = useExpenseStore();
  const { toast } = useToast();
  const [settlingId, setSettlingId] = useState<string | null>(null);

  const simplifiedBalances = getSimplifiedBalances(groupId);

  const handleSettle = (fromUserId: string, toUserId: string, amount: number) => {
    const key = `${fromUserId}-${toUserId}`;
    setSettlingId(key);
    
    // Simulate settlement
    setTimeout(() => {
      addSettlement({
        groupId,
        fromUserId,
        toUserId,
        amount,
      });
      
      toast({
        title: 'Payment Recorded',
        description: `Settlement of $${amount.toFixed(2)} has been recorded.`,
      });
      
      setSettlingId(null);
    }, 500);
  };

  if (simplifiedBalances.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-success/10 p-6 mb-4">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h3 className="text-lg font-semibold mb-1">All Settled Up!</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            Everyone is square. No payments needed.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settle Up</CardTitle>
        <CardDescription>
          Simplified payments to settle all balances
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {simplifiedBalances.map((balance) => {
          const key = `${balance.from.id}-${balance.to.id}`;
          const isSettling = settlingId === key;
          const isCurrentUserInvolved = balance.from.id === currentUser.id || balance.to.id === currentUser.id;

          return (
            <div
              key={key}
              className={cn(
                'flex items-center justify-between p-4 rounded-lg border',
                isCurrentUserInvolved ? 'bg-accent/30' : 'bg-card'
              )}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive font-semibold text-sm">
                  {balance.from.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">
                      {balance.from.id === currentUser.id ? 'You' : balance.from.name}
                    </p>
                    <p className="text-xs text-muted-foreground">pays</p>
                  </div>
                  
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  
                  <div>
                    <p className="font-medium">
                      {balance.to.id === currentUser.id ? 'You' : balance.to.name}
                    </p>
                    <p className="text-xs text-muted-foreground">receives</p>
                  </div>
                </div>
                
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-success font-semibold text-sm">
                  {balance.to.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-xl font-bold">${balance.amount.toFixed(2)}</p>
                
                {balance.from.id === currentUser.id && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSettle(balance.from.id, balance.to.id, balance.amount)}
                    disabled={isSettling}
                  >
                    {isSettling ? 'Recording...' : 'Mark as Paid'}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
        
        <p className="text-sm text-muted-foreground text-center pt-4">
          These are simplified payments. The minimum number of transactions needed to settle everyone.
        </p>
      </CardContent>
    </Card>
  );
}
