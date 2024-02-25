'use client';
import React, { FC, ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);

  useEffect(() => {
    const redirect = () => {
      if (!isAuth && typeof window !== 'undefined') {
        router.replace('signin');
      }
    };

    redirect();
  }, [isAuth]);

  if (!isAuth) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
