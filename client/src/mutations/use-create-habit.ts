import { useMutation } from '@tanstack/react-query';

import { habitService } from '../data/habit-service';

export const useCreateHabit = () =>
  useMutation({
    mutationFn: habitService.createHabit,
  });
