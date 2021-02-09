import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@mlvtickets/common';
import { body } from 'express-validator';

import { Password } from '../services/password';
import { User } from '../models/user';

const router = express.Router();

const validator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must provide a password'),
];

const generateToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_KEY!);
};

router.post(
  '/api/users/signin',
  validator,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const userJwt = generateToken(existingUser.id, existingUser.email);
    req.session = { jwt: userJwt };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
