import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, X, Check } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useExpenseStore } from '@/store/expenseStore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const NewGroup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { users, currentUser, addGroup } = useExpenseStore();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([currentUser.id]);

  const availableUsers = users.filter((u) => u.id !== currentUser.id);

  const toggleMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a group name',
        variant: 'destructive',
      });
      return;
    }

    if (selectedMembers.length < 2) {
      toast({
        title: 'Error',
        description: 'Please select at least one other member',
        variant: 'destructive',
      });
      return;
    }

    const members = users.filter((u) => selectedMembers.includes(u.id));
    
    addGroup({
      name: name.trim(),
      description: description.trim() || undefined,
      members,
    });

    toast({
      title: 'Success',
      description: 'Group created successfully!',
    });

    navigate('/groups');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-2xl py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">Create New Group</h1>
          <p className="text-muted-foreground mt-1">
            Set up a new expense sharing group
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Group Details
              </CardTitle>
              <CardDescription>
                Enter the basic information for your new group
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Weekend Trip, Roommates"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="What is this group for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <Label>Select Members *</Label>
                <p className="text-sm text-muted-foreground">
                  You are automatically added to the group
                </p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground">
                    <span className="text-sm font-medium">{currentUser.name}</span>
                    <span className="text-xs opacity-70">(You)</span>
                  </div>
                  
                  {availableUsers.map((user) => {
                    const isSelected = selectedMembers.includes(user.id);
                    return (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => toggleMember(user.id)}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 rounded-lg border transition-all',
                          isSelected
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-secondary border-transparent hover:border-primary/50'
                        )}
                      >
                        <span className="text-sm font-medium">{user.name}</span>
                        {isSelected ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4 opacity-50" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/groups')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              Create Group
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewGroup;
