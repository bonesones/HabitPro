'use client';

import { redirect } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (error.message.includes('401')) {
    redirect('sign-out');
  }

  const handleClick = () => {
    reset();
  };

  return (
    <div>
      <h2>Something went wrong!</h2>

      <button onClick={handleClick}>Try again</button>
    </div>
  );
}
