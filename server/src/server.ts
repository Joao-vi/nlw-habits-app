import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

/**
 * API restfull
 * HTTPS Methods: get, post, put, patch and delete.
 */

app.get('/', async (request) => {
  const habits = await prisma.habit.findMany();
  return habits;
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP - SERVER RUNING');
  });
