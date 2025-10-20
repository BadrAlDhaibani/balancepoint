import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

//create postgreSQL connection pool for Neon
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20, // maximum number of clients in the pool
    idleTimeoutMillis: 30000, // close idle clients after 30 seconds
    connectionTimeoutMillis: 30000, // return an error after 30 seconds if connection could not be established
});

//test database connection
pool.on('connect', () => {
    console.log('Connected to PostegreSQL database');
});

pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
    process.exit(-1);
});

//helper function to execute queries
export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    }
    catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

//helper function to get a client from the pool (for transactions)
export const getClient = async () => {
    const client = await pool.connect();
    return client;
};

export default pool;