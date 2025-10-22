import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { ArrowDown, Close } from '../icons';
import type { Option } from '../types';

export const Select: React.FC<{
  options: Option[];
  value?: Option;
  onChange?: (option: Option) => void;
  onClear?: () => void;
}> = ({ options, value, onChange, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleChange = (option: Option) => {
    onChange?.(option);
    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).closest('#listbox-button') === null
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const arrowClassName = clsx(
    'transform transition transform text-[9px]',
    isOpen ? 'rotate-180' : 'rotate-0',
  );

  return (
    <div className='relative'>
      <div className='flex flex-col gap-1'>
        <span>Category</span>

        <button
          type='button'
          id='listbox-button'
          onClick={handleToggle}
          className='border-1 border-gray-300 rounded-md p-2 w-full text-start flex justify-between items-center'
        >
          <div className='flex gap-2 items-center'>
            <span className={arrowClassName}>
              <ArrowDown />
            </span>
            {value ? value.label : 'Select'}
          </div>

          {value && (
            <span className='text-xl' onClick={onClear}>
              <Close />
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className='absolute mt-1 bg-white w-full p-2 border-1 border-gray-300 rounded-md'
          role='listbox'
          ref={listRef}
          tabIndex={-1}
        >
          {options.map(option => (
            <div
              key={option.value}
              role='option'
              aria-selected={value?.value === option.value}
              onClick={() => handleChange(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
