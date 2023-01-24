import { api } from '../../lib/api';

import { TSummary, TDateHabits } from './types';

type TCreateHabit = {
  title: string;
  weekDays: Array<number>;
};

class HabitService {
  async createHabit({ title, weekDays }: TCreateHabit) {
    if (!title || weekDays.length === 0)
      return Promise.reject('You must provide both Title and Week days.');

    return await api.post('/habit', { title, weekDays: weekDays.map((w) => +w) });
  }

  async getSummary() {
    const { data } = await api.get<TSummary[]>('/summary');

    return data;
  }

  async getDateHabits(date: string) {
    const { data } = await api.get<TDateHabits>('/day', {
      params: { date },
    });

    return data;
  }

  async toggleHabit(id: string) {
    return await api.patch(`habit/${id}/toggle`);
  }
}

export const habitService = new HabitService();
