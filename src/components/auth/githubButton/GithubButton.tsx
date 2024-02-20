import React from 'react';
import styles from './GithubButton.module.scss';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const GithubButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <button
      onClick={() => {
        signIn('github', {
          callbackUrl,
        });
      }}
      className={styles.root}
    >
      <Image
        src={'/github-icon.svg'}
        alt={'github'}
        width={30}
        height={30}
        className={styles.root__icon}
      />
      Продолжить с Github
    </button>
  );
};

export default GithubButton;
