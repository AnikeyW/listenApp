import React from 'react';
import styles from './page.module.scss';
import RegistrationForm from '@/components/auth/registrationForm/RegistrationForm';

const Page = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.root__title}>Регистрация</h1>
      <RegistrationForm />
    </div>
  );
};

export default Page;
