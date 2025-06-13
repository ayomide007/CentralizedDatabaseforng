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


import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const newCitizen = await prisma.citizen.create({
    data: {
      firstName: 'Ayomide',
      lastName: 'Ajayi',
      gender: 'Male',
      dateOfBirth: new Date('1995-06-10'),
      nin: '12345678901',
      personalAddress: 'No. 12, Adetola Street, Lagos',
      familyAddress: 'No. 2, Family Compound, Osogbo',
      motherName: 'Bola Ajayi',
      fatherName: 'Tunde Ajayi'
    }
  });

  console.log('New Citizen Saved:', newCitizen);
}

main();
