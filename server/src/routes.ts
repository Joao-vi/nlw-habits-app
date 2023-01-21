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
    const habitSchema = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = habitSchema.parse(request.body);
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

  app.get('/day', async (request) => {
    const daySchema = z.object({
      date: z.coerce.date(),
    });

    const { date } = daySchema.parse(request.query);
    const parsedDate = dayjs(date).startOf('day');
    const weekDay = parsedDate.get('day');

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map((dayHabit) => dayHabit.habit_id);

    return { possibleHabits, completedHabits };
  });
};
