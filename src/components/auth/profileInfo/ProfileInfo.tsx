'use client';
import React from 'react';
import styles from './ProfileInfo.module.scss';
import Button from '@/components/UI/Button/Button';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/hooks/auth/useLogout';
import { RiImageAddLine } from 'react-icons/ri';
import FileUpload from '@/components/fileUploud/FileUpload';
import { useUpdateUserImage } from '@/hooks/user/useUpdateUserImage';

const ProfileInfo = () => {
  const router = useRouter();
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  const updateUserImageMutation = useUpdateUserImage();

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && user) {
      const picture = e.target.files[0];
      updateUserImageMutation.mutate({ userId: user._id, picture });
    } else {
      console.log('Ошибка при изменении фотографии');
    }
  };

  return (
    <div className={styles.root}>
      {isAuth ? (
        <div className={styles.auth}>
          <div className={styles.auth__logout}>
            <p
              onClick={() => {
                logout.mutate();
              }}
            >
              Выйти
            </p>
          </div>
          <div className={styles.auth__profilePhoto}>
            {user?.image ? (
              <img
                src={process.env.NEXT_PUBLIC_BASE_URL + user.image}
                alt={'profile photo'}
              />
            ) : (
              <p>{user?.name && user.name.toUpperCase().split('')[0]}</p>
            )}
          </div>

          <div className={styles.auth__name}>{user?.name}</div>
          <div className={styles.auth__email}>{user?.email}</div>
          <div className={styles.auth__addPhoto}>
            <FileUpload setFile={onChangePicture} accept={'image/*'}>
              <div className={styles.auth__addPhoto_btn}>
                <RiImageAddLine size={28} />
                {user?.image ? 'Изменить фотографию' : 'Выбрать фотографию'}
              </div>
            </FileUpload>
          </div>
          {logout.isError && <ErrorMessage message={logout.error.message} />}
        </div>
      ) : (
        <div className={styles.notAuth}>
          <h2 className={styles.notAuth__title}>Вы не авторизованы</h2>
          <Button onClick={() => router.push('/signin')}>
            Войти в профиль
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
