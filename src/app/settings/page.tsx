'use client';
import React from 'react';
import styles from './page.module.scss';
import ThemeToggle from '@/components/UI/themeToggle/ThemeToggle';
import Button from '@/components/UI/Button/Button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useLogout } from '@/hooks/useLogout';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import $api from '@/http';

const Page = () => {
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  const getProfile = () => {
    $api
      .get('https://localhost:5000/auth/profile')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.root}>
      {isAuth ? (
        <>
          {user?.image && (
            <img
              src={user.image}
              alt={'profile photo'}
              width={50}
              height={50}
            />
          )}

          <div>{user?.name}</div>
          <div>
            <Button
              onClick={() => {
                logout.mutate();
              }}
            >
              Выйти
            </Button>
          </div>
          {logout.isError && <ErrorMessage message={logout.error.message} />}
        </>
      ) : (
        <Button onClick={() => router.push('/signin')}>Войти</Button>
      )}
      <ThemeToggle />
      <Button onClick={() => getProfile()}>Тест</Button>
    </div>
  );
};

export default Page;
