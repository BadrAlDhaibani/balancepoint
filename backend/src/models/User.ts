import { query } from '../config/database';
import { User } from '../types';
import { hashPassword } from '../utils/helpers';

//create a new user
export const createUser = async (
    email: string,
    password: string,
    name: string
): Promise<User> => {
    const hashedPassword = await hashPassword(password);

    const result = await query(
        `INSERT INTO users (email, password, name, created_at, updated_at)
        VALUES ($1, $2, $3, NOW(), NOW())
        RETURNING id, email, name, created_at, updated_at`,
        [email, hashedPassword, name]
    );

    return result.rows[0];
};

//find user by email
export const findUserByEmail = async (email: string): Promise<User | null> => {
    const result = await query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    return result.rows[0] || null;
};

//find user by ID
export const findUserById = async (id: string): Promise<User | null> => {
    const result = await query(
        'SELECT id, email, name, created_at, updated_at FROM users WHERE id = $1',
        [id]
    );

    return result.rows[0] || null;
};

//update user
export const updateUser = async (
    id: string,
    updates: { name?: string; email?: string }
): Promise<User | null> => {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.name) {
        fields.push(`name = $${paramCount}`);
        values.push(updates.name);
        paramCount++;
    }

    if (updates.email) {
        fields.push(`email = $${paramCount}`);
        values.push(updates.email);
        paramCount++;
    }

    if (fields.length == 0){
        return findUserById(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await query(
        `UPDATE users
        SET ${fields.join(', ')}
        WHERE id = $${paramCount}
        RETURNING id, email, name, created_at, updated_at`,
        values
    );

    return result.rows[0] || null;
};

//delete user
export const deleteUser = async (id: string): Promise<boolean> => {
    const result = await query(
        'DELETE FROM users WHERE id = $1',
        [id]
    );

    return result.rowCount !== null && result.rowCount > 0;
};