# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BalancePoint is a personal finance management application built with a TypeScript full-stack architecture:
- **Backend**: Express.js REST API with PostgreSQL (Neon serverless)
- **Frontend**: React 19 with Redux Toolkit for state management
- **Styling**: styled-components with a centralized theme system
- **Authentication**: JWT-based auth with protected routes

## Development Commands

### Backend (from `backend/` directory)
```bash
yarn dev          # Start development server with nodemon (port 5000)
yarn build        # Compile TypeScript to dist/
yarn start        # Run production build from dist/
```

### Frontend (from `frontend/` directory)
```bash
npm start         # Start CRA dev server (port 3000)
npm test          # Run Jest test suite in watch mode
npm run build     # Build production bundle
```

### Running the Application
1. Start backend first: `cd backend && yarn dev`
2. Start frontend: `cd frontend && npm start`
3. Backend runs on http://localhost:5000
4. Frontend runs on http://localhost:3000

## Architecture

### Backend Structure
```
backend/src/
├── config/          # Database connection (Neon PostgreSQL with pooling)
├── controllers/     # Request handlers (auth, income, expense, dashboard)
├── middleware/      # Auth (JWT), error handling, validation
├── models/          # Database query functions (User, Income, Expense)
├── routes/          # Express route definitions
├── types/           # TypeScript type definitions
├── utils/           # Helpers (bcrypt, validation)
└── server.ts        # Express app setup and startup
```

**Key patterns:**
- Database access via `query()` helper from `config/database.ts`
- All models export async functions that return typed results
- Controllers use `asyncHandler` wrapper for automatic error handling
- JWT auth middleware (`authenticateToken`) adds `userId` to request object

### Frontend Structure
```
frontend/src/
├── components/
│   ├── auth/            # Login, Register components
│   ├── common/          # Header, Sidebar, ProtectedRoute
│   ├── dashboard/       # Dashboard widgets
│   ├── income/          # Income management views
│   └── expenses/        # Expense management views
├── store/
│   └── slices/          # Redux Toolkit slices (income, expense)
├── services/            # API client functions (axios-based)
├── utils/               # Global styles, theme definitions
└── App.tsx              # Router setup with protected routes
```

**Key patterns:**
- Each feature has a main component file (e.g., `Income.tsx`) and a styled component file (`IncomeStyled.tsx`)
- Sub-components organized in feature directories with index files for clean imports
- Redux slices currently use mock data but have structure for API integration
- Services layer provides typed API methods (auth, income, expense)
- ProtectedRoute wrapper handles authentication checks and redirects

### State Management
- Redux Toolkit with typed hooks (`useAppDispatch`, `useAppSelector`)
- Current slices: `income`, `expense`
- **Important**: Auth state NOT yet in Redux - currently using local storage tokens
- Services are ready but not yet connected to Redux actions/thunks

### Routing
- React Router v7 with nested routes
- Public routes: `/login`, `/register`
- Protected routes (require auth): `/dashboard`, `/income`, `/expenses`
- All protected routes wrapped in `ProtectedRoute` component
- Header/Sidebar only shown on protected routes

### Database
- PostgreSQL via Neon serverless platform
- Connection pooling configured (max 20 clients, 30s timeouts)
- SSL required for connections
- Query logging with duration tracking enabled
- **No migration system** - database schema must be created manually

### API Endpoints
All backend routes are prefixed with `/api`:

**Auth** (`/api/auth`):
- `POST /register` - User registration with validation
- `POST /login` - Returns JWT token
- `GET /profile` - Protected, returns user info

**Income** (`/api/income`):
- Full CRUD implemented in controller/routes

**Expenses** (`/api/expenses`):
- Full CRUD implemented in controller/routes

**Dashboard** (`/api/dashboard`):
- Aggregated financial data endpoint

### Environment Configuration

**Backend** (`.env` in `backend/`):
```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

**Frontend**: No `.env` needed yet - API URL hardcoded in services

## Current Implementation Status

**Completed:**
- Backend API structure with all routes/controllers
- Database models for User, Income, Expense
- JWT authentication middleware
- Frontend UI components for all main views
- Redux store structure with typed slices
- Service layer with API client setup
- Routing with protected routes
- Basic styling system with theme

**Partially Complete:**
- Auth flow exists but needs Redux integration
- Service functions defined but not called from components
- Redux slices have mock data instead of API calls
- Dashboard aggregation logic in controller but no frontend integration

**Not Yet Implemented:**
- Database migrations/schema setup scripts
- Redux thunks for async API calls
- Error handling UI (toasts/notifications)
- Loading states in UI
- Form validation on frontend
- Token refresh logic
- User profile editing
- Data persistence (components don't save to backend yet)

## Important Notes

- **Git status shows uncommitted auth components** - new auth system is built but not fully integrated
- **Mock data in Redux** - Income/Expense slices have hardcoded items for development
- **Two-way binding missing** - Forms exist but don't dispatch to Redux or call API
- **No tests** - Testing infrastructure present (Jest/RTL) but no test files written
- **Type safety** - Backend types in `types/index.ts`, frontend types duplicated in slices (should be unified)
- **Windows development** - Project developed on Windows (note path separators, line endings)

## Common Development Tasks

### Adding a New API Endpoint
1. Define types in `backend/src/types/index.ts`
2. Create model function in `backend/src/models/`
3. Implement controller in `backend/src/controllers/`
4. Add route in `backend/src/routes/`
5. Register route in `server.ts`
6. Create service function in `frontend/src/services/`
7. Add Redux slice action/thunk if needed
8. Connect to component

### Connecting Redux to API
1. Convert slice to use `createAsyncThunk` from RTK
2. Import service function
3. Handle pending/fulfilled/rejected states
4. Update component to dispatch thunk
5. Add loading/error UI

### Adding Protected Route
1. Create component in `frontend/src/components/`
2. Add Route inside ProtectedRoute wrapper in `App.tsx`
3. Add navigation link in Sidebar component
