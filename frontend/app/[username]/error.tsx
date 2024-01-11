'use client'; // Error components must be Client Components

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error?.message);
  }, [error]);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">OOPS! {error?.message}</h2>
      <h2 className="text-2xl font-bold">Apologies 🙇‍♂️</h2>
    </div>
  );
}
