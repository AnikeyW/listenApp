'use client';
import React from 'react';
import styles from './page.module.scss';
import ThemeToggle from '@/components/UI/themeToggle/ThemeToggle';
import { useSession, signOut } from 'next-auth/react';
import Button from '@/components/UI/Button/Button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import authService from '@/services/Auth.service';

const Page = () => {
  const router = useRouter();
  const session = useSession();
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);

  return (
    <div className={styles.root}>
      {session.data || isAuth ? (
        <div>
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
                authService.logout();
              }}
            >
              Выйти
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => router.replace('/signin')}>Войти</Button>
      )}
      <ThemeToggle />
    </div>
  );
};

export default Page;
