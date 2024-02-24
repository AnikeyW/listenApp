import React from 'react';
import styles from './GoogleButton.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const GoogleButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <button
      onClick={() => {
        // signIn('google', {
        //   callbackUrl,
        // });
        router.replace(process.env.NEXT_PUBLIC_BASE_URL! + 'auth/google');
      }}
      className={styles.root}
    >
      <Image src={'/google-icon.svg'} alt={'google'} width={30} height={30} />
      Продолжить с Google
    </button>
  );
};

export default GoogleButton;
