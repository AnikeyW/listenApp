'use client';
import React, { FC, ReactNode, useEffect } from 'react';
import { useCheckAuth } from '@/hooks/useCheckAuth';
import Loader from '@/components/UI/Loader/Loader';
import { useAuthStore } from '@/stores/authStore';

interface Props {
  children: ReactNode;
}

const AppRoot: FC<Props> = ({ children }) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const checkAuth = useCheckAuth();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      checkAuth.mutate();
    }
  }, []);

  return (
    <>{checkAuth.isPending && !checkAuth.isSuccess ? <Loader /> : children}</>
  );
};

export default AppRoot;
