import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import dayjs from 'dayjs';

import { prisma } from './lib/prisma';
/**
 * API restfull
 * HTTPS Methods: get, post, put, patch and delete.
 */

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/habit', async (request) => {
    const newHabit = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = newHabit.parse(request.body);
    const today = dayjs().startOf('day').toDate();

    await prisma.habit.create({
      data: {
        title,
        weekDays: {
          create: weekDays.map((weekDay) => ({ week_day: weekDay })),
        },
        created_at: today,
      },
    });
  });
};
