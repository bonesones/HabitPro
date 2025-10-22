import clsx from 'clsx';

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className: _className, ...props }) => {
  const className = clsx(
    'bg-blue-500 p-2 rounded-md text-white font-medium cursor-pointer',
    _className,
  );

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
