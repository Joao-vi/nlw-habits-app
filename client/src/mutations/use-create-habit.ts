import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { habitService } from '../data/habit-service';
import { queryClient } from '../lib/react-query';

export const useCreateHabit = () =>
  useMutation({
    mutationFn: habitService.createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries(['SUMMARY']);
      toast.success('Novo hábito criado.');
    },
  });
