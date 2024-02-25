'use client';
import React, { FC, ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
  callbackUrl: string;
}

const PrivateRoute: FC<Props> = ({ children, callbackUrl }) => {
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);

  useEffect(() => {
    const redirect = () => {
      if (!isAuth && typeof window !== 'undefined') {
        router.replace(`signin?callbackUrl=${callbackUrl}`);
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
