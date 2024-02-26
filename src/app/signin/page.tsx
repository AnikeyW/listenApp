import React from 'react';
import styles from './page.module.scss';
import LoginForm from '@/components/auth/loginForm/LoginForm';
import MyLink from '@/components/UI/myLink/MyLink';

const Page = () => {
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
