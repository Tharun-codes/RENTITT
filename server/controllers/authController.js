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

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // check if user exists
    let user = await Users.findByEmail(email);

    // ✅ AUTO REGISTER IF NOT FOUND
    if (!user) {
      user = await Users.createUser({ email });
    }

    const token = generateJWT({ id: user.id, email: user.email });

    res.json({
      message: "Login successful",
      user,
      token
    });

  } catch (err) {
    next(err);
  }
};
