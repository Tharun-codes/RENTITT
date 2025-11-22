// server/controllers/authController.js
import * as Users from '../models/usersModel.js';
import generateJWT from '../utils/generateJWT.js';
import { validateLoginInput } from '../utils/validateInput.js';

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let user = await Users.findByEmail(email);
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = await Users.createUser({ email });

    const token = generateJWT({ id: user.id, email: user.email });
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email } = req.body;

    const { valid, error } = validateLoginInput({ email });
    if (!valid) return res.status(400).json({ error });

    const user = await Users.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please register.' });
    }

    const token = generateJWT({ id: user.id, email: user.email });
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
};
