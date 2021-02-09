import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@mlvtickets/common';
import { body } from 'express-validator';

import { User } from '../models/user';

const router = express.Router();

const validator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
];

const generateToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_KEY!);
};

router.post(
  '/api/users/signup',
  validator,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = generateToken(user.id, user.email);
    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
