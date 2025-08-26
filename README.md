# BalancePoint Documentation

## Technologies

- **Frontend**: TypeScript, React
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Neon
- **Hosting**: Frontend on Netlify/Vercel, Backend on Vercel

## Product Vision

*"Who said managing money can't be fun?"*

BalancePoint is a smart money management tool designed for universal use - from personal finances to business expenses. The app focuses on **predictable financial planning** through recurring income and expense tracking, with manual entry for significant one-time transactions.

### Core Use Cases

- **Personal**: Home bills, groceries, salary tracking
- **Business**: Invoicing, vendor bills, operational expenses
- **Groups**: Shared funds, activity expenses, bill splitting

## App Philosophy

BalancePoint balances your expenses and revenue across all aspects of life. The system is built around **recurring financial patterns** - users set up their regular income and expenses, then manually add significant one-time transactions as needed. This approach provides 80% of financial planning value with minimal daily input required.

## Key Features

### Smart Financial Health Monitoring

- Real-time available balance calculation
- Health status indicators (Good/Warning/Critical)
- Income vs expenses ratio visualization
- Days until next income tracking
- Predictive spending alerts based on recurring patterns

### Intelligent Insights Engine

- Spending pattern analysis and trend detection
- Subscription audit recommendations
- Budget variance notifications
- Comparative spending insights
- Personalized money-saving opportunities

### Manual + Automated Transaction System

- **Recurring Income**: Salary, freelance contracts, regular payments
- **Recurring Expenses**: Rent, utilities, subscriptions, loan payments
- **Manual Entries**: Groceries, dining, shopping, one-time purchases
- **Smart Categorization**: Automatic grouping with manual override capability

## User Interface

### Navigation Structure

- **Dashboard**: Complete financial overview and quick actions
- **Income**: Manage recurring and one-time income sources
- **Expenses**: Track recurring bills and manual expense entries
- **Transactions**: View and manage all financial activity

### Dashboard Components

### Financial Health Overview

- Large, prominent available balance display
- Visual health status with color coding
- Quick ratio bar: Monthly income vs expenses
- Next income countdown with amount and date

### Quick Actions Panel

- Add Income (accessible from anywhere via + button)
- Add Expense (accessible from anywhere via + button)
- Streamlined entry process for common transactions

### Smart Insights Panel

- Data-driven spending observations
- Trend alerts (spending increases/decreases)
- Optimization suggestions (unused subscriptions)
- Weekly/monthly financial pattern analysis

### Upcoming Financial Events

- Bills due in next 7-14 days with amounts
- Recurring payment schedules
- Expected income dates
- Financial milestone reminders

### Recent Activity Feed

- Last 5-7 transactions (manual + automated)
- Clear labeling of manual vs auto transactions
- Transaction types with visual indicators
- Quick access to transaction details

### Global Actions

- **+ Button**: Always-accessible creation menu in header
    - Add one-time income
    - Add one-time expense
    - Set up recurring income
    - Set up recurring expense

## Smart Features

### Running Low on Funds Prevention

BalancePoint considers upcoming income when expenses are added. Users can set custom alert thresholds - when monthly expenses reach a specified percentage of monthly income, they receive intelligent warnings that factor in upcoming income timing.

### Predictive Balance Management

The system maintains awareness of recurring expenses when calculating available spending money. Instead of just showing current balance, it shows "available to spend" after accounting for upcoming bills and regular expenses.

### Subscription Management

Automatic detection of recurring charges with suggestions for optimization. The system identifies unused or redundant subscriptions and provides cost-saving recommendations.

## Technical Approach

### Data Model Focus

- **Recurring Patterns**: Primary data structure for predictable income/expenses
- **Manual Transactions**: Secondary layer for one-time entries
- **Smart Categorization**: Flexible tagging system for organization
- **Predictive Calculations**: Forward-looking balance projections

### Manual Entry Strategy

Rather than complex bank integrations, BalancePoint uses a curated manual entry system:

- Users input their recurring financial patterns once
- Manual entry for significant one-time transactions
- Smart defaults and suggestions based on patterns
- Focus on financial awareness rather than perfect transaction capture

This approach reduces complexity, increases user privacy, and focuses on the 80% of financial planning that comes from predictable patterns rather than tracking every small purchase.

## Success Metrics

- Time to set up recurring income/expenses (target: under 5 minutes)
- Frequency of manual transaction entry (target: 2-3 times per week)
- Accuracy of spending predictions (target: within 10% of actual)
- User engagement with smart insights (target: 70% of insights viewed)

## Future Enhancements

- Group expense splitting and management
- Savings goal tracking with milestone celebrations
- Integration with popular payment platforms (optional)
- Advanced analytics and spending pattern reports
- Mobile app with push notification reminders
