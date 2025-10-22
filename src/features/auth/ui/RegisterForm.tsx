'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { signIn, signUp } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

export const RegisterForm: React.FC<{
  onChangeMode: (mode: 'login' | 'signup') => void;
  onSuccess: () => void;
}> = ({ onChangeMode, onSuccess }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const result = await signUp.email({
      email: data.email,
      password: data.password,
      name: '',
    });

    if (result.data) {
      onSuccess();
      setError(null);
    } else {
      setError(result.error.message ?? null);
    }
  };

  const handleChangeMode = (mode: 'login' | 'signup') => {
    onChangeMode(mode);
  };

  const handleClickGoogle = () => {
    signIn.social({
      provider: 'google',
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-2 mt-5'
    >
      <Input
        type='email'
        placeholder='Email'
        label='Email'
        {...register('email', {
          required: true,
        })}
      />

      <Input
        type='password'
        placeholder='******'
        label='Password'
        {...register('password', { required: true })}
      />

      <Input
        type='password_submit'
        placeholder='******'
        label='Submit password'
        {...register('submitPassword', {
          required: true,
          validate: value =>
            value === watch('password') || 'Password does not match',
        })}
      />

      {errors.submitPassword && (
        <span className='text-red-500'>{errors.submitPassword.message}</span>
      )}

      {error && <span className='text-red-500'>{error}</span>}

      <Button type='submit' className='mt-4'>
        Login
      </Button>

      <Button type='button' onClick={handleClickGoogle}>
        Sign up with Google
      </Button>

      <span className='flex gap-2 text-center'>
        Already have an account?
        <button
          type='button'
          className='text-blue-500'
          onClick={() => handleChangeMode('login')}
        >
          Sign in
        </button>
      </span>
    </form>
  );
};

type FormValues = {
  email: string;
  password: string;
  submitPassword: string;
};
