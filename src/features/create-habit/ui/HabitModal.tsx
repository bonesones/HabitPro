'use client';

import { useContext } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { CategoriesContext } from '@/app/providers';

import { Button, Input, Modal, Select } from '@/shared/ui';

import { createHabit, NextHabit, useHabitsStore } from '@/entities/habit/model';

export const HabitModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NextHabit>();

  const { loading, error } = useHabitsStore();
  const categories = useContext(CategoriesContext);

  const options = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

  const onSubmit: SubmitHandler<NextHabit> = async data => {
    const { name, categoryId, goal } = data;

    const nextData = {
      name,
      goal: Number(goal),
      categoryId,
    };

    await createHabit(nextData);

    if (!error) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className='text-xl font-bold'>New Habit</h2>
      {loading && 'loading....'}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2 mt-5'
      >
        <Input
          type='text'
          label='Habit name'
          {...register('name', { required: true })}
        />

        {errors.name && (
          <span className='text-red-500'>{errors.name.message}</span>
        )}
        <Controller
          name='categoryId'
          control={control}
          rules={{ required: 'Category is required' }}
          render={({ field, fieldState }) => (
            <>
              <Select
                options={options}
                onChange={option => field.onChange(option.value)}
                onClear={() => field.onChange(null)}
                value={options.find(option => option.value === field.value)}
              />

              {fieldState.error && (
                <span className='text-red-500'>{fieldState.error.message}</span>
              )}
            </>
          )}
        />

        <Input
          type='number'
          label='Goal (times per week)'
          min={1}
          max={7}
          {...register('goal', { required: true, min: 1, max: 7 })}
        />

        {errors.goal && (
          <span className='text-red-500'>{errors.goal.message}</span>
        )}

        {error && <span className='text-red-500'>{error}</span>}

        <Button className='mt-4'>Create Habit</Button>
      </form>
    </Modal>
  );
};
