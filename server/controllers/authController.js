import * as Users from "../models/usersModel.js";
import generateJWT from "../utils/generateJWT.js";

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let user = await Users.findByEmail(email);

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    user = await Users.createUser({ email });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

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

    let user = await Users.findByEmail(email);

    if (!user) {
      user = await Users.createUser({ email });
    }

    if (!user.is_verified) {
      return res.status(403).json({
        error: "Email not verified. Please verify first."
      });
    }

    const token = generateJWT({
      id: user.id,
      email: user.email
    });

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    next(err);
  }
};
