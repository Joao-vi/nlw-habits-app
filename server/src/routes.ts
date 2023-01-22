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

  app.patch('/habit/:id/toggle', async (request) => {
    const toggleParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleParams.parse(request.params);
    const today = dayjs().startOf('day').toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  });
};
