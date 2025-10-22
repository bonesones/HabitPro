'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { signIn } from '@/shared/lib';
import { Button, Input, Spinner } from '@/shared/ui';

export const LoginForm: React.FC<{
  onChangeMode: (mode: 'login' | 'signup') => void;
  onSuccess: () => void;
}> = ({ onChangeMode, onSuccess }) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    setLoading(true);

    const result = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (result.data) {
      onSuccess();
      setError(null);
    } else {
      setError(result.error.message ?? null);
    }

    setLoading(false);
  };

  const handleChangeMode = (mode: 'login' | 'signup') => {
    onChangeMode(mode);
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
        disabled={loading}
      />

      <Input
        type='password'
        placeholder='Password'
        label='Password'
        {...register('password', {
          required: true,
        })}
        disabled={loading}
      />

      {error && <span className='text-red-500'>{error}</span>}

      <Button type='submit' className='mt-4' disabled={loading}>
        {loading ? (
          <div className='h-5 flex items-center justify-center'>
            <Spinner className='bg-white' />
          </div>
        ) : (
          'Login'
        )}
      </Button>

      <Button disabled={loading}>Sign in with Google</Button>

      <span className='flex gap-2 text-center'>
        Don&apos;t have an account?
        <button
          type='button'
          className='text-blue-500'
          onClick={() => handleChangeMode('signup')}
        >
          Sign up
        </button>
      </span>
    </form>
  );
};

type FormValues = {
  email: string;
  password: string;
};
