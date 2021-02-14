import 'express-async-errors';
import cookieSession from 'cookie-session';
import express from 'express';
import { errorHandler, NotFoundError, currentUser } from '@mlvtickets/common';
import { json } from 'body-parser';
import { createChargeRouter } from './routes/new';
import { paypalCapture } from './routes/paypal-capture';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(paypalCapture);
app.use(createChargeRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
