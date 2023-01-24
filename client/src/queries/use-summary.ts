import { useQuery } from '@tanstack/react-query';

import { habitService } from '../data/habit-service';

export const useSummary = () =>
  useQuery(['SUMMARY'], {
    queryFn: habitService.getSummary,
  });
