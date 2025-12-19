import { Header } from '@/components/layout/Header';
import { BalanceOverview } from '@/components/dashboard/BalanceOverview';
import { GroupList } from '@/components/dashboard/GroupList';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your shared expenses and settle up with friends
          </p>
        </div>

        <div className="space-y-8">
          <BalanceOverview />
          
          <div className="grid gap-8 lg:grid-cols-2">
            <GroupList />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
