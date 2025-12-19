import { Link } from 'react-router-dom';
import { Users, ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useExpenseStore } from '@/store/expenseStore';
import { cn } from '@/lib/utils';

export function GroupList() {
  const { groups, currentUser, getGroupBalances } = useExpenseStore();

  const userGroups = groups.filter((group) =>
    group.members.some((m) => m.id === currentUser.id)
  );

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Your Groups
        </CardTitle>
        <Link to="/groups/new">
          <Button variant="ghost" size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            New
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {userGroups.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-muted-foreground/40" />
            <p className="mt-3 text-muted-foreground">No groups yet</p>
            <Link to="/groups/new">
              <Button variant="outline" className="mt-4">
                Create your first group
              </Button>
            </Link>
          </div>
        ) : (
          userGroups.map((group, index) => {
            const balances = getGroupBalances(group.id);
            const userBalance = balances.find((b) => b.userId === currentUser.id);
            const netBalance = userBalance?.netBalance || 0;

            return (
              <Link key={group.id} to={`/groups/${group.id}`}>
                <div 
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200 cursor-pointer group"
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                      {group.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {group.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {group.members.length} members • ${group.totalExpenses.toFixed(2)} total
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p
                        className={cn(
                          'font-semibold',
                          netBalance > 0 ? 'text-success' : netBalance < 0 ? 'text-destructive' : 'text-muted-foreground'
                        )}
                      >
                        {netBalance >= 0 ? '+' : '-'}${Math.abs(netBalance).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {netBalance > 0 ? 'you are owed' : netBalance < 0 ? 'you owe' : 'settled up'}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
