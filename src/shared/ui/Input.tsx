import clsx from "clsx";

export const Input: React.FC<InputProps> = ({
  className: _className,
  label,
  ...props
}) => {
  const className = clsx("border-1 border-gray-300 rounded-md p-2", _className);

  return (
    <label className="flex flex-col gap-1">
      <span>{label}</span>
      <input className={className} {...props} />
    </label>
  );
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};
