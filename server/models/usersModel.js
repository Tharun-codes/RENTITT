// server/models/usersModel.js
import pool from '../db.js';

export const findByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
};

export const createUser = async ({ email }) => {
  const result = await pool.query(
    `INSERT INTO users (email)
     VALUES ($1)
     RETURNING *`,
    [email]
  );
  return result.rows[0];
};
