'use client';
import React, { useEffect } from 'react';
import styles from './page.module.scss';
import LoginForm from '@/components/auth/loginForm/LoginForm';
import MyLink from '@/components/UI/myLink/MyLink';
import { useAuthStore } from '@/stores/authStore';
import { useRouter, useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);
  const callbackUrl = searchParams.get('callbackUrl');

  useEffect(() => {
    const redirect = () => {
      if (isAuth && typeof window !== 'undefined') {
        router.replace(callbackUrl ? callbackUrl : '/settings');
      }
    };

    redirect();
  }, []);

  if (isAuth) {
    return null;
  }

  return (
    <div className={styles.root}>
      <h2 className={styles.root__title}>Авторизация</h2>
      <LoginForm />
      <div className={styles.root__regLink}>
        <p style={{ fontSize: '14px' }}>Не зарегистрированы?</p>
        <MyLink href={'/registration'}>Создать аккаунт</MyLink>
      </div>
    </div>
  );
};

export default Page;
