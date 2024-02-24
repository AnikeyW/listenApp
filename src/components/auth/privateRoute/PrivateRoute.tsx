'use client';
import React, { FC, ReactNode } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);

  if (!isAuth) {
    router.push('signin');
    return;
  }

  return <>{children}</>;
};

export default PrivateRoute;
