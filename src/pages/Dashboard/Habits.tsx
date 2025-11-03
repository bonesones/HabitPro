import { useHabitsStore } from '@/entities/habit/model';
import { HabitCard } from '@/entities/habit/ui';

export const Habits = () => {
  const habits = useHabitsStore(state => state.habits);

  return (
    <div className='flex flex-col items-center gap-6 py-8'>
      {habits.map(habit => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
};
