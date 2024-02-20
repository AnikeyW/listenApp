'use client';
import React from 'react';
import styles from './page.module.scss';
import GoogleButton from '@/components/auth/googleButton/GoogleButton';
import GithubButton from '@/components/auth/githubButton/GithubButton';

const Page = () => {
  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        <h2>Авторизация</h2>
        <GoogleButton />
        <GithubButton />
      </div>
    </div>
  );
};

export default Page;
