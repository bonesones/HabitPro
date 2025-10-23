'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Logo } from '@/shared/icons';
import { Button } from '@/shared/ui';

import { HabitModal } from '@/features/create-habit';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='py-3 px-4 flex justify-between bg-white shadow h-16'>
      <Link href='/dashboard' className='flex items-center gap-2'>
        <span className='text-3xl'>
          <Logo />
        </span>

        <span className='font-bold'>HabitPro</span>
      </Link>

      <Button type='button' onClick={handleOpen}>
        + Add Habit
      </Button>

      <HabitModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};
