export const Spinner = () => (
  <div className="flex items-center justify-center space-x-1">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: `${i * 0.2}s` }}
      ></span>
    ))}
  </div>
);
