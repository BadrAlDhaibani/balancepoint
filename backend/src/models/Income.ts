import { query } from '../config/database';
import { Income } from '../types';

//create a new income entry
export const createIncome = async (
    userId: string,
    description: string,
    amount: number,
    date: string | Date,
    isRecurring: boolean,
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly'
): Promise<Income> => {
    const result = await query(
        `INSERT INTO income (user_id, description, amount, date, is_recurring, frequency, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        RETURNING *`,
        [userId, description, amount, date, isRecurring, frequency || null]
    );

    return result.rows[0];
};

//get all income entres for a user
export const getIncomeByUserId = async (userId: string): Promise<Income[]> => {
    const result = await query(
        'SELECT * FROM income WHERE user_id = $1 ORDER BY date DESC',
        [userId]
    );

    return result.rows;
};

//get a single income entry by ID
export const getIncomeById = async (
    id: string,
    userId: string
): Promise<Income | null> => {
    const result = await query(
        'SELECT * FROM income WHERE id = $1 AND user_id = $2',
        [id, userId]
    );

    return result.rows[0] || null;
};

//get only recurring income for a user
export const getRecurringIncome = async (userId: string): Promise<Income[]> => {
    const result = await query(
        'SELECT * FROM income WHERE user_id = $1 AND is_recurring = true ORDER BY date DESC',
        [userId]
    );

    return result.rows;
};

//get only one-time income for a user
export const getOneTimeIncome = async (userId: string): Promise<Income[]> => {
    const result = await query(
        'SELECT * FROM income WHERE user_id = $1 AND is_recurring = false ORDER BY date DESC',
        [userId]
    );

    return result.rows;
};

//update an income entry
export const updateIncome = async (
    id: string,
    userId: string,
    updates: {
        description?: string;
        amount?: number;
        date?: string | Date;
        is_recurring?: boolean;
        frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | null;
    }
): Promise<Income | null> => {
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

    if (fields.length == 0) {
        return getIncomeById(id, userId);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);
    const idParam = paramCount;
    paramCount++;
    values.push(userId);

    const result = await query(
        `UPDATE income
        SET ${fields.join(', ')}
        WHERE id = $${idParam} AND user_id = $${paramCount}
        RETURNING *`,
        values
    );

    return result.rows[0] || null;
};

//delete an income entry
export const deleteIncome = async (
    id: string,
    userId: string
): Promise<boolean> => {
    const result = await query(
        'DELETE FROM income WHERE id = $1 AND user_id = $2',
        [id, userId]
    );

    return result.rowCount !== null && result.rowCount > 0;
};

//get historical income (last 30 days including today)
export const getHistoricalIncome = async (userId: string): Promise<Income[]> => {
    const result = await query(
        `SELECT * FROM income
         WHERE user_id = $1
         AND date <= CURRENT_DATE
         AND date >= CURRENT_DATE - INTERVAL '30 days'
         ORDER BY date DESC`,
        [userId]
    );

    return result.rows;
};

//get upcoming income (after today)
export const getUpcomingIncome = async (userId: string): Promise<Income[]> => {
    const result = await query(
        `SELECT * FROM income
         WHERE user_id = $1
         AND date > CURRENT_DATE
         ORDER BY date ASC`,
        [userId]
    );

    return result.rows;
};