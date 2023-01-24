export type TSummary = {
  id: string;
  date: string;
  completed: number;
  amount: number;
};

export type THabit = {
  id: string;
  title: string;
  created_at: string;
};

export type TDateHabits = {
  possibleHabits: THabit[];
  completedHabits: string[];
};
