import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import incomeRoutes from './routes/incomeRoutes';
import expenseRoutes from './routes/expenseRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { errorHandler } from './middleware/errorHandler';

//load encironment variables
dotenv.config();

//create express app
const app: Application = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//basic health check route
app.get('/', (req, res) => {
    res.json({
        message: 'BalancePoint API is running!',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

//API routes
app.use('/api/auth', authRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/dashboard', dashboardRoutes);

//404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

//global error handler
app.use(errorHandler);

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Health check: http://localhost:${PORT}/`);
})
