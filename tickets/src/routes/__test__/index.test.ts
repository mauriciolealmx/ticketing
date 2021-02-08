import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { response } from 'express';

const createTicket = () => {
  return request(app).post('/api/tickets').set('Cookie', global.signup()).send({
    title: 'Valid title',
    price: 20,
  });
};

it('can get a list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const reponse = await request(app).get('/api/tickets').send().expect(200);

  expect(reponse.body.length).toEqual(3);
});
