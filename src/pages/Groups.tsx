import { Link } from 'react-router-dom';
import { Users, Plus, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useExpenseStore } from '@/store/expenseStore';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const Groups = () => {
  const { groups, currentUser, getGroupBalances } = useExpenseStore();

  const userGroups = groups.filter((group) =>
    group.members.some((m) => m.id === currentUser.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
            <p className="text-muted-foreground mt-1">
              Manage your expense sharing groups
            </p>
          </div>
          <Link to="/groups/new">
            <Button variant="gradient" size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Create Group
            </Button>
          </Link>
        </div>

        {userGroups.length === 0 ? (
          <Card className="animate-slide-up">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-primary/10 p-6 mb-6">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No groups yet</h2>
              <p className="text-muted-foreground text-center max-w-sm mb-6">
                Create a group to start splitting expenses with friends, roommates, or colleagues.
              </p>
              <Link to="/groups/new">
                <Button variant="gradient" size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Create your first group
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userGroups.map((group, index) => {
              const balances = getGroupBalances(group.id);
              const userBalance = balances.find((b) => b.userId === currentUser.id);
              const netBalance = userBalance?.netBalance || 0;

              return (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <Card 
                    className="h-full cursor-pointer hover:border-primary/50 animate-slide-up group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg">
                          {group.name.slice(0, 2).toUpperCase()}
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                        {group.name}
                      </CardTitle>
                      {group.description && (
                        <p className="text-sm text-muted-foreground">
                          {group.description}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {group.members.length} members
                        </span>
                        <span className="text-muted-foreground">
                          Created {format(new Date(group.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Total Expenses</p>
                            <p className="font-semibold">${group.totalExpenses.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Your Balance</p>
                            <p
                              className={cn(
                                'font-semibold',
                                netBalance > 0 ? 'text-success' : netBalance < 0 ? 'text-destructive' : 'text-muted-foreground'
                              )}
                            >
                              {netBalance >= 0 ? '+' : '-'}${Math.abs(netBalance).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Groups;
