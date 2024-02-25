'use client';
import React from 'react';
import styles from './page.module.scss';
import ThemeToggle from '@/components/UI/themeToggle/ThemeToggle';
import { useSession, signOut } from 'next-auth/react';
import Button from '@/components/UI/Button/Button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import authService from '@/services/Auth.service';
import { useLogout } from '@/hooks/useLogout';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import $api from '@/http';

const Page = () => {
  const router = useRouter();
  const session = useSession();
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
      {session.data || isAuth ? (
        <>
          {session.data?.user?.image ||
            (user?.image && (
              <img
                src={session.data?.user?.image || user.image}
                alt={'profile photo'}
                width={50}
                height={50}
              />
            ))}

          <div>{session.data?.user?.name || user?.name}</div>
          <div>
            <Button
              onClick={() => {
                // signOut({ callbackUrl: '/' });
                logout.mutate();
              }}
            >
              Выйти
            </Button>
          </div>
          {logout.isError && <ErrorMessage message={logout.error.message} />}
        </>
      ) : (
        <Button onClick={() => router.replace('/signin')}>Войти</Button>
      )}
      <ThemeToggle />
      <Button onClick={() => getProfile()}>Тест</Button>
    </div>
  );
};

export default Page;
