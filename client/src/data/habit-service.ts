import { api } from '../lib/api';

type TCreateHabit = {
  title: string;
  weekDays: Array<number>;
};

class HabitService {
  async createHabit({ title, weekDays }: TCreateHabit) {
    if (!title || weekDays.length === 0)
      return Promise.reject('You must provide both Title and Week days.');

    return await api.post('/habit', { title, weekDays });
  }
}

export const habitService = new HabitService();
