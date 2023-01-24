import { useQuery } from '@tanstack/react-query';

import { habitService } from '../data/habit-service';

export const useDateHabits = (date: string) =>
  useQuery(['DATE-HABITS', date], {
    queryFn: () => habitService.getDateHabits(date),
  });
