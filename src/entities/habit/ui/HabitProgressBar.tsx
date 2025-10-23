export const HabitProgressBar: React.FC<{
  progress: number;
  goal: number;
}> = ({ progress, goal }) => {
  const ratio = progress / goal;
  let colorClass = 'text-red-500';
  if (ratio >= 1) {
    colorClass = 'text-lime-500';
  } else if (ratio >= 0.5) {
    colorClass = 'text-yellow-500';
  }

  const className = `${colorClass} h-2 w-full`;

  return (
    <div>
      <div className='flex justify-between'>
        <span className='text-gray-600'>Progress</span>

        <span className='font-medium'>{goal / progress}</span>
      </div>

      <progress value={progress} max={goal} className={className}></progress>
    </div>
  );
};
