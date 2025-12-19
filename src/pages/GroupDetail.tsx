import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Users, Receipt, ArrowRightLeft, Settings } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExpenseStore } from '@/store/expenseStore';
import { ExpenseList } from '@/components/group/ExpenseList';
import { BalanceList } from '@/components/group/BalanceList';
import { SettlementList } from '@/components/group/SettlementList';
import { cn } from '@/lib/utils';

const GroupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { groups, currentUser, getGroupBalances } = useExpenseStore();

  const group = groups.find((g) => g.id === id);

  if (!group) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <h2 className="text-xl font-semibold mb-2">Group not found</h2>
              <Link to="/groups">
                <Button variant="outline" className="mt-4">
                  Back to Groups
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const balances = getGroupBalances(group.id);
  const userBalance = balances.find((b) => b.userId === currentUser.id);
  const netBalance = userBalance?.netBalance || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="flex items-center gap-4 mb-6 animate-fade-in">
          <Link to="/groups">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
            {group.description && (
              <p className="text-muted-foreground mt-1">{group.description}</p>
            )}
          </div>
          <Link to={`/groups/${group.id}/add-expense`}>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
          </Link>
        </div>

        {/* Group Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="animate-slide-up">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex -space-x-2">
                {group.members.slice(0, 5).map((member) => (
                  <div
                    key={member.id}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold border-2 border-background text-sm"
                    title={member.name}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
                {group.members.length > 5 && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold border-2 border-background text-sm">
                    +{group.members.length - 5}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {group.members.length} members
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${group.totalExpenses.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Combined group spending
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4" />
                Your Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className={cn(
                  'text-2xl font-bold',
                  netBalance > 0 ? 'text-success' : netBalance < 0 ? 'text-destructive' : 'text-muted-foreground'
                )}
              >
                {netBalance >= 0 ? '+' : '-'}${Math.abs(netBalance).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {netBalance > 0 ? 'You are owed' : netBalance < 0 ? 'You owe' : 'All settled up'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="expenses" className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="expenses" className="gap-2">
              <Receipt className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="balances" className="gap-2">
              <ArrowRightLeft className="h-4 w-4" />
              Balances
            </TabsTrigger>
            <TabsTrigger value="settle" className="gap-2">
              <Users className="h-4 w-4" />
              Settle Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses">
            <ExpenseList groupId={group.id} />
          </TabsContent>

          <TabsContent value="balances">
            <BalanceList groupId={group.id} />
          </TabsContent>

          <TabsContent value="settle">
            <SettlementList groupId={group.id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default GroupDetail;
