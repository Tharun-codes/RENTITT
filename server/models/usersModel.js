// server/models/usersModel.js
import pool from '../db.js';

export const findByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  } catch (err) {
    console.error('Error finding user by email:', err);
    throw err;
  }
};

export const createUser = async ({ email }) => {
  try {
    const result = await pool.query(
      "INSERT INTO users (email) VALUES ($1) RETURNING *",
      [email]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};
