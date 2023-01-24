import { useMutation } from '@tanstack/react-query';

import { habitService } from '../data/habit-service';
import { queryClient } from '../lib/react-query';

export const useCreateHabit = () =>
  useMutation({
    mutationFn: habitService.createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries(['SUMMARY']);
    },
  });
