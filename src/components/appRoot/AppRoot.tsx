'use client';
import React, { FC, ReactNode, useEffect } from 'react';
import { useCheckAuth } from '@/hooks/useCheckAuth';

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
  return <>{children}</>;
};

export default AppRoot;
