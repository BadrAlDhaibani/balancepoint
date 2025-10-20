import { query } from '../config/database';
import { Expense } from '../types';

//create a new expense entry
export const createExpense = async (
    userId: string,
    description: string,
    amount: number,
    date: string | Date,
    isRecurring: boolean,
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly'
): Promise<Expense> => {
    const result = await query(
        `INSERT INTO expenses (user_id, description, amount, date, is_recurring, frequency, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        RETURNING *`,
        [userId, description, amount, date, isRecurring, frequency || null]
    );

    return result.rows[0];
};

//get all expense entries for a user
export const getExpensesByUserId = async (userId: string): Promise<Expense[]> => {
    const result = await query(
        'SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC',
        [userId]
    );

    return result.rows;
};

//get a single expense entry by ID
export const getExpenseById = async (
    id: string,
    userId: string
): Promise<Expense | null> => {
    const result = await query(
        'SELECT * FROM expenses WHERE id = $1 AND user_id = $2',
        [id, userId]
    );

    return result.rows[0] || null;
};

//get only recurring expenses for a user
export const getRecurringExpenses = async (userId: string): Promise<Expense[]> => {
    const result = await query(
        'SELECT * FROM expenses WHERE user_id = $1 AND is_recurring = true ORDER BY date DESC',
        [userId]
    );

    return result.rows;
};

//get only one-time expenses for a user
export const getOneTimeExpenses = async (userId: string): Promise<Expense[]> => {
    const result = await query(
        'SELECT * FROM expenses WHERE user_id = $1 AND is_recurring = false ORDER BY date DESC',
        [userId]
    );

    return result.rows;
};

//update an expense entry
export const updateExpense = async (
    id: string,
    userId: string,
    updates: {
        description?: string;
        amount?: number;
        date?: string | Date;
        is_recurring?: boolean;
        frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | null;
    }
): Promise<Expense | null> => {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.description !== undefined) {
        fields.push(`description = $${paramCount}`);
        values.push(updates.description);
        paramCount++;
    }

    if (updates.amount !== undefined) {
        fields.push(`amount = $${paramCount}`);
        values.push(updates.amount);
        paramCount++;
    }

    if (updates.date !== undefined) {
        fields.push(`date = $${paramCount}`);
        values.push(updates.date);
        paramCount++;
    }

    if (updates.is_recurring !== undefined) {
        fields.push(`is_recurring = $${paramCount}`);
        values.push(updates.is_recurring);
        paramCount++;
    }

    if (updates.frequency !== undefined) {
        fields.push(`frequency = $${paramCount}`);
        values.push(updates.frequency);
        paramCount++;
    }

    if (fields.length === 0) {
        return getExpenseById(id, userId);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);
    const idParam = paramCount;
    paramCount++;
    values.push(userId);

    const result = await query(
        `UPDATE expenses 
         SET ${fields.join(', ')}
         WHERE id = $${idParam} AND user_id = $${paramCount}
         RETURNING *`,
        values
    );

    return result.rows[0] || null;
};

//delete an expense entry
export const deleteExpense = async (
    id: string,
    userId: string
): Promise<boolean> => {
    const result = await query(
        'DELETE FROM expenses WHERE id = $1 AND user_id = $2',
        [id, userId]
    );

    return result.rowCount !== null && result.rowCount > 0;
};