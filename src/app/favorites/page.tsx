'use client';
import React from 'react';
import PrivateRoute from '@/components/auth/privateRoute/PrivateRoute';
import { usePathname } from 'next/navigation';

const Page = () => {
  const pathname = usePathname();

  return (
    <PrivateRoute callbackUrl={pathname}>
      <div>favorites</div>
    </PrivateRoute>
  );
};

export default Page;
