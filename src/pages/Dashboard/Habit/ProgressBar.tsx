export const ProgressBar: React.FC<{
  progress: number;
  goal: number;
}> = ({ progress, goal }) => (
  <div>
    <div className="flex justify-between">
      <span className="text-gray-600">Progress</span>

      <span className="font-medium">
        {progress}/{goal}
      </span>
    </div>

    <progress value={progress} max={goal} className="h-2 w-full" />
  </div>
);
