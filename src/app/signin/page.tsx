'use client';
import React from 'react';
import styles from './page.module.scss';
import GoogleButton from '@/components/auth/googleButton/GoogleButton';
import GithubButton from '@/components/auth/githubButton/GithubButton';
import LoginForm from '@/components/auth/loginForm/LoginForm';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        <h2>Авторизация</h2>
        {/*<GoogleButton />*/}
        {/*<GithubButton />*/}
        {/*<div>или</div>*/}
        <LoginForm />
        <div>
          <span style={{ fontSize: '14px' }}>Не зарегистрированы?</span>
          <span
            onClick={() => {
              router.push('/registration');
            }}
            style={{ color: 'lightblue' }}
          >
            Создать аккаунт
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
