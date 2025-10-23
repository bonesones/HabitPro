import clsx from 'clsx';

export const Loading: React.FC<{
  className?: string;
}> = ({ className: _className }) => {
  const className = clsx('w-2 h-2 rounded-full animate-bounce', _className);

  return (
    <div className='flex items-center justify-center space-x-1'>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className={className}
          style={{ animationDelay: `${i * 0.2}s` }}
        ></span>
      ))}
    </div>
  );
};
