'use client';
import React, { FC, ReactNode, useEffect } from 'react';
import { useCheckAuth } from '@/hooks/auth/useCheckAuth';
import Loader from '@/components/UI/Loader/Loader';

interface Props {
  children: ReactNode;
}

const AppRoot: FC<Props> = ({ children }) => {
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
