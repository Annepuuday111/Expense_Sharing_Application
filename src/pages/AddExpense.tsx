import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Receipt, DollarSign, Users, Percent, Equal, Hash } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExpenseStore } from '@/store/expenseStore';
import { useToast } from '@/hooks/use-toast';
import { SplitType, ExpenseSplit } from '@/types/expense';
import { cn } from '@/lib/utils';

const categories = [
  { value: 'food', label: 'Food & Dining', emoji: '🍽️' },
  { value: 'accommodation', label: 'Accommodation', emoji: '🏨' },
  { value: 'transport', label: 'Transport', emoji: '🚗' },
  { value: 'utilities', label: 'Utilities', emoji: '💡' },
  { value: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { value: 'other', label: 'Other', emoji: '💰' },
];

const AddExpense = () => {
  const { id: groupId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { groups, addExpense, currentUser } = useExpenseStore();

  const group = groups.find((g) => g.id === groupId);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(currentUser.id);
  const [splitType, setSplitType] = useState<SplitType>('equal');
  const [category, setCategory] = useState('food');
  const [customSplits, setCustomSplits] = useState<Record<string, string>>({});
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    group?.members.map((m) => m.id) || []
  );

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

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const calculateSplits = (): ExpenseSplit[] => {
    const totalAmount = parseFloat(amount) || 0;
    
    if (splitType === 'equal') {
      const splitAmount = totalAmount / selectedMembers.length;
      return selectedMembers.map((userId) => ({
        userId,
        amount: splitAmount,
      }));
    }
    
    if (splitType === 'exact') {
      return selectedMembers.map((userId) => ({
        userId,
        amount: parseFloat(customSplits[userId] || '0'),
      }));
    }
    
    if (splitType === 'percentage') {
      return selectedMembers.map((userId) => {
        const percentage = parseFloat(customSplits[userId] || '0');
        return {
          userId,
          amount: (totalAmount * percentage) / 100,
          percentage,
        };
      });
    }
    
    return [];
  };

  const validateSplits = (): boolean => {
    const totalAmount = parseFloat(amount) || 0;
    
    if (splitType === 'exact') {
      const total = selectedMembers.reduce(
        (sum, userId) => sum + (parseFloat(customSplits[userId] || '0')),
        0
      );
      return Math.abs(total - totalAmount) < 0.01;
    }
    
    if (splitType === 'percentage') {
      const total = selectedMembers.reduce(
        (sum, userId) => sum + (parseFloat(customSplits[userId] || '0')),
        0
      );
      return Math.abs(total - 100) < 0.01;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast({ title: 'Error', description: 'Please enter a description', variant: 'destructive' });
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({ title: 'Error', description: 'Please enter a valid amount', variant: 'destructive' });
      return;
    }
    
    if (selectedMembers.length < 2) {
      toast({ title: 'Error', description: 'Select at least 2 members to split', variant: 'destructive' });
      return;
    }
    
    if (!validateSplits()) {
      const message = splitType === 'exact'
        ? 'Exact amounts must equal the total'
        : 'Percentages must add up to 100%';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return;
    }

    addExpense({
      groupId: group.id,
      description: description.trim(),
      amount: parseFloat(amount),
      paidBy,
      splitType,
      splits: calculateSplits(),
      category,
    });

    toast({
      title: 'Expense Added',
      description: `$${parseFloat(amount).toFixed(2)} for "${description}" has been added.`,
    });

    navigate(`/groups/${group.id}`);
  };

  const totalAmount = parseFloat(amount) || 0;
  const splitPreview = splitType === 'equal' && selectedMembers.length > 0
    ? (totalAmount / selectedMembers.length).toFixed(2)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-2xl py-8">
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Link to={`/groups/${group.id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add Expense</h1>
            <p className="text-muted-foreground mt-1">
              Add a new expense to {group.name}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Expense Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Input
                    id="description"
                    placeholder="What was this expense for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="pl-9"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <span className="flex items-center gap-2">
                              <span>{cat.emoji}</span>
                              <span>{cat.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paidBy">Paid by</Label>
                  <Select value={paidBy} onValueChange={setPaidBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {group.members.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                          {member.id === currentUser.id && ' (You)'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Split Type */}
            <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Split Type
                </CardTitle>
                <CardDescription>
                  Choose how to split this expense
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { value: 'equal', label: 'Equal', icon: Equal, desc: 'Split evenly' },
                    { value: 'exact', label: 'Exact', icon: Hash, desc: 'Enter amounts' },
                    { value: 'percentage', label: 'Percentage', icon: Percent, desc: 'By percent' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSplitType(type.value as SplitType)}
                      className={cn(
                        'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all',
                        splitType === type.value
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent bg-secondary hover:border-primary/30'
                      )}
                    >
                      <type.icon className={cn(
                        'h-6 w-6',
                        splitType === type.value ? 'text-primary' : 'text-muted-foreground'
                      )} />
                      <span className="font-medium">{type.label}</span>
                      <span className="text-xs text-muted-foreground">{type.desc}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Members & Splits */}
            <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>Split Between</CardTitle>
                <CardDescription>
                  {splitType === 'equal' && splitPreview && (
                    <span className="text-primary font-medium">
                      ${splitPreview} per person
                    </span>
                  )}
                  {splitType === 'exact' && 'Enter the exact amount for each person'}
                  {splitType === 'percentage' && 'Enter the percentage for each person (must total 100%)'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {group.members.map((member) => {
                  const isSelected = selectedMembers.includes(member.id);
                  
                  return (
                    <div
                      key={member.id}
                      className={cn(
                        'flex items-center gap-4 p-3 rounded-lg border transition-all',
                        isSelected ? 'bg-accent/50 border-primary/30' : 'bg-secondary/50'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => toggleMember(member.id)}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-colors',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </button>
                      
                      <div className="flex-1">
                        <p className="font-medium">
                          {member.name}
                          {member.id === currentUser.id && (
                            <span className="text-muted-foreground"> (You)</span>
                          )}
                        </p>
                      </div>

                      {isSelected && splitType !== 'equal' && (
                        <div className="w-28">
                          <div className="relative">
                            {splitType === 'exact' && (
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            )}
                            {splitType === 'percentage' && (
                              <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            )}
                            <Input
                              type="number"
                              step={splitType === 'exact' ? '0.01' : '1'}
                              min="0"
                              max={splitType === 'percentage' ? '100' : undefined}
                              placeholder="0"
                              className={splitType === 'exact' ? 'pl-9' : 'pr-9'}
                              value={customSplits[member.id] || ''}
                              onChange={(e) =>
                                setCustomSplits((prev) => ({
                                  ...prev,
                                  [member.id]: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      )}

                      {isSelected && splitType === 'equal' && splitPreview && (
                        <span className="text-sm font-medium text-muted-foreground">
                          ${splitPreview}
                        </span>
                      )}
                    </div>
                  );
                })}

                {splitType === 'exact' && (
                  <div className="pt-3 border-t flex justify-between text-sm">
                    <span className="text-muted-foreground">Total entered:</span>
                    <span className={cn(
                      'font-semibold',
                      Math.abs(
                        selectedMembers.reduce((sum, id) => sum + (parseFloat(customSplits[id] || '0')), 0) - totalAmount
                      ) < 0.01
                        ? 'text-success'
                        : 'text-destructive'
                    )}>
                      ${selectedMembers.reduce((sum, id) => sum + (parseFloat(customSplits[id] || '0')), 0).toFixed(2)}
                      {' '}/{' '}${totalAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                {splitType === 'percentage' && (
                  <div className="pt-3 border-t flex justify-between text-sm">
                    <span className="text-muted-foreground">Total percentage:</span>
                    <span className={cn(
                      'font-semibold',
                      Math.abs(
                        selectedMembers.reduce((sum, id) => sum + (parseFloat(customSplits[id] || '0')), 0) - 100
                      ) < 0.01
                        ? 'text-success'
                        : 'text-destructive'
                    )}>
                      {selectedMembers.reduce((sum, id) => sum + (parseFloat(customSplits[id] || '0')), 0).toFixed(0)}%
                      {' '}/{' '}100%
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(`/groups/${group.id}`)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="gradient" className="flex-1">
                Add Expense
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddExpense;
