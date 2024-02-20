import React from 'react';
import styles from './GoogleButton.module.scss';
import { signIn } from 'next-auth/react';
import Button from '@/components/UI/Button/Button';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <button
      onClick={() => {
        signIn('google', {
          callbackUrl,
        });
      }}
      className={styles.root}
    >
      <Image src={'/google-icon.svg'} alt={'google'} width={30} height={30} />
      Продолжить с Google
    </button>
  );
};

export default GoogleButton;
