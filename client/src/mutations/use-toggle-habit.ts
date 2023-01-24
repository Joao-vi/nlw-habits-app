import { useMutation } from '@tanstack/react-query';
import { habitService } from '../data/habit-service';
import { queryClient } from '../lib/react-query';

export const useToggleHabit = () =>
  useMutation({
    mutationFn: (props: { id: string; date: string }) => habitService.toggleHabit(props.id),
    onSuccess: (_, { date }) => {
      queryClient.invalidateQueries(['SUMMARY']);
      queryClient.invalidateQueries(['DATE-HABITS', date]);
    },
  });
