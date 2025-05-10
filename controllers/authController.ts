import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';
import User from '../models/userModel';
import {redisClient} from '../config/db'

export const registerUser: RequestHandler = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    await redisClient.set(
      `user:${newUser.id}`,
      JSON.stringify({
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email
      }),
      { EX: 60 * 60 }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
