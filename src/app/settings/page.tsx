'use client';
import React from 'react';
import styles from './page.module.scss';
import ThemeToggle from '@/components/UI/themeToggle/ThemeToggle';
import { useSession, signOut } from 'next-auth/react';
import Button from '@/components/UI/Button/Button';
import { useRouter } from 'next/navigation';
// import { getServerSession } from 'next-auth';
// import { authConfig } from '@/configs/auth';

const Page = () => {
  const router = useRouter();
  const session = useSession();
  //для серверного компонента:
  // const session = await getServerSession(authConfig);

  return (
    <div className={styles.root}>
      {session.data ? (
        <div>
          {session.data.user?.image && (
            <img
              src={session.data.user?.image}
              alt={'profile photo'}
              width={50}
              height={50}
            />
          )}

          <div>{session.data.user?.name}</div>
          <div>
            <Button
              onClick={() => {
                signOut({ callbackUrl: '/' });
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
