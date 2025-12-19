# Expense Sharing Application

A modern, intuitive expense sharing application built with React and TypeScript that helps groups split expenses fairly and track balances effortlessly.

![Expense Sharing App Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Expense+Sharing+Dashboard)

## ✨ Features

### 💰 Expense Management
- **Multiple Split Types**: Equal splits, exact amounts, or percentage-based divisions
- **Category Tracking**: Organize expenses by categories (food, accommodation, utilities, etc.)
- **Real-time Calculations**: Automatic balance calculations and updates

### 👥 Group Management
- **Create Groups**: Form groups for trips, roommates, office lunches, or any shared expenses
- **Member Management**: Add and manage group members with ease
- **Group Overview**: See total expenses and member balances at a glance

### 📊 Dashboard & Analytics
- **Balance Overview**: Visual representation of who owes what
- **Recent Activity**: Track latest expenses and settlements
- **Settlement Tracking**: Keep records of completed settlements

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Intuitive Navigation**: Clean, modern interface with smooth transitions

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **bun** package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Annepuuday111/Expense_Sharing_Application.git
   cd expense-sharing-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun run dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` to see the application running.

## 📖 Usage Guide

### Getting Started

1. **Create Your First Group**
   - Click on "Groups" in the navigation
   - Select "Create New Group"
   - Add a group name and description
   - Invite members by email

   ![Create Group Screenshot](https://via.placeholder.com/600x300/10B981/FFFFFF?text=Create+New+Group)

2. **Add Expenses**
   - Navigate to your group
   - Click "Add Expense"
   - Enter expense details (description, amount, category)
   - Choose who paid and how to split the expense
   - Select split type: Equal, Exact amounts, or Percentage

   ![Add Expense Screenshot](https://via.placeholder.com/600x300/F59E0B/FFFFFF?text=Add+Expense)

3. **Track Balances**
   - View the dashboard for overall balance overview
   - Check individual group balances
   - See who owes what at a glance

   ![Balance Overview](https://via.placeholder.com/600x300/EF4444/FFFFFF?text=Balance+Overview)

### Split Types Explained

- **Equal Split**: Divide the expense equally among all group members
- **Exact Amounts**: Specify exact amounts each person should pay
- **Percentage Split**: Divide based on custom percentages

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── dashboard/      # Dashboard-specific components
│   ├── group/          # Group-related components
│   └── layout/         # Layout components
├── pages/              # Page components
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
├── data/               # Mock data and constants
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Dashboard Components
- **BalanceOverview**: Shows net balances across all groups
- **GroupList**: Displays all user's groups with summaries
- **RecentActivity**: Lists recent expenses and settlements

### Group Components
- **ExpenseList**: Displays all expenses in a group
- **BalanceList**: Shows balances between group members
- **SettlementList**: Tracks completed settlements

### Form Components
- **AddExpense**: Form for creating new expenses
- **NewGroup**: Form for creating new groups

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Expense Sharing App
```

### Tailwind Configuration

The app uses custom Tailwind configuration in `tailwind.config.ts`:

- Custom color palette
- Extended spacing and typography
- Animation utilities

### ESLint Configuration

ESLint is configured in `eslint.config.js` with:
- React and TypeScript rules
- Import sorting
- Code formatting standards

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy Options

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for consistent iconography
- [React](https://reactjs.org/) community for excellent documentation

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Reach out to the maintainers

---

## 👨‍💻 About the Developer

<div align="center">

### **Annepu Uday Kumar**

**Full Stack Developer & Software Engineer**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/annepu-uday-kumar-176583270/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Annepuuday111)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://annepuudaykumar.netlify.app/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:annepuuday111@gmail.com)

---

### 📧 Contact Information

| 📱 **Phone** | ✉️ **Email** | 🌐 **Portfolio** |
|-------------|-------------|------------------|
| [+91] 7075285071 | annepuuday111@gmail.com | [annepuudaykumar.netlify.app](https://annepuudaykumar.netlify.app/) |

### 🚀 Professional Links

| 🔗 **LinkedIn** | 💻 **GitHub** |
|----------------|---------------|
| [Annepu Uday Kumar](https://www.linkedin.com/in/annepu-uday-kumar-176583270/) | [Annepuuday111](https://github.com/Annepuuday111) |

---

### 💡 Tech Expertise

**Frontend:** React, TypeScript, Next.js, Vue.js, Angular  
**Backend:** Node.js, Express, Python, Django, FastAPI  
**Database:** MongoDB, PostgreSQL, MySQL, Redis  
**DevOps:** Docker, AWS, Vercel, Netlify, GitHub Actions  
**Tools:** Git, VS Code, Figma, Postman, Jest, Cypress  

### 🎯 Passionate About

- Building scalable web applications
- Creating intuitive user experiences
- Solving complex problems with clean code
- Open source contributions
- Continuous learning and growth

---

</div>

## 🔄 Complete Project Workflow

### Application Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Interface │    │  State Management │    │   Data Layer    │
│                 │    │                 │    │                 │
│ • React Components│    │ • Zustand Store │    │ • Mock Data      │
│ • TypeScript     │    │ • Actions       │    │ • API Integration│
│ • Responsive UI  │    │ • Selectors     │    │ • Local Storage  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Core Features  │
                    │                 │
                    │ • Group Mgmt    │
                    │ • Expense Split │
                    │ • Balance Calc  │
                    │ • Settlements   │
                    └─────────────────┘
```

### Detailed Working Process

#### 1. **User Authentication & Onboarding**
- User logs in or signs up
- Profile creation with avatar and preferences
- Dashboard initialization with existing groups

#### 2. **Group Creation & Management**
```
User Action → Form Validation → API Call → State Update → UI Refresh
    ↓              ↓              ↓          ↓          ↓
Create Group → Validate Data → Save to DB → Update Store → Show Success
```

#### 3. **Expense Addition Workflow**
```
Select Group → Fill Expense Form → Choose Split Type → Validate → Calculate → Save
     ↓              ↓                    ↓              ↓          ↓        ↓
  Group Detail → Description/Amount → Equal/Exact/% → Check Data → Auto Calc → Database
```

#### 4. **Balance Calculation Algorithm**
```
For each expense:
  1. Identify payer (who paid)
  2. Calculate each member's share based on split type
  3. Update individual balances (positive/negative)
  4. Aggregate balances across all expenses
  5. Generate settlement suggestions
```

#### 5. **Settlement Process**
```
View Balances → Select Settlement → Confirm Payment → Update Records → Refresh Balances
     ↓              ↓                  ↓              ↓              ↓
Balance List → Choose Amount → Mark as Paid → Database Update → UI Update
```

### Key Algorithms

#### **Equal Split Calculation**
```typescript
const calculateEqualSplit = (totalAmount: number, memberCount: number) => {
  const share = totalAmount / memberCount;
  return members.map(member => ({
    userId: member.id,
    amount: share,
    percentage: 100 / memberCount
  }));
};
```

#### **Balance Aggregation**
```typescript
const calculateBalances = (expenses: Expense[], userId: string) => {
  return expenses.reduce((balance, expense) => {
    if (expense.paidBy === userId) {
      // User paid, add the amount they lent
      return balance + expense.amount;
    } else {
      // User owes, subtract their share
      const userShare = expense.splits.find(split => split.userId === userId);
      return balance - (userShare?.amount || 0);
    }
  }, 0);
};
```

### Data Flow Architecture

```
User Interaction → Component State → Zustand Store → API Layer → Database
      ↓                ↓              ↓            ↓          ↓
   UI Update ← Component Re-render ← State Change ← Response ← Data
```

### State Management Structure

```typescript
interface AppState {
  // User Management
  currentUser: User;
  users: User[];

  // Group Management
  groups: Group[];
  selectedGroup: Group | null;

  // Expense Management
  expenses: Expense[];
  settlements: Settlement[];

  // UI State
  isLoading: boolean;
  error: string | null;
}
```

### Component Hierarchy

```
App
├── Header/Navigation
├── Dashboard
│   ├── BalanceOverview
│   ├── GroupList
│   └── RecentActivity
├── Groups
│   ├── GroupCard
│   ├── GroupDetail
│   │   ├── ExpenseList
│   │   ├── BalanceList
│   │   └── SettlementList
│   └── NewGroup Form
└── AddExpense Form
```

### Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Memoization**: Expensive calculations cached
- **Virtual Scrolling**: Large lists optimized
- **Code Splitting**: Bundle size optimization
- **Image Optimization**: Responsive images with lazy loading

---

**Made with ❤️ by Annepu Uday Kumar for hassle-free expense sharing**
