export const HabitPageProgressBar: React.FC<{
  progress: number;
  goal: number;
}> = ({ progress, goal }) => (
  <div>
    <progress
      value={progress}
      max={goal}
      className='h-2 w-full text-blue-500'
    />

    <span className='text-gray-500'>
      {progress} of {goal} completed this week
    </span>
  </div>
);
