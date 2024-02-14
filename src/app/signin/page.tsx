'use client';
import React, { FormEventHandler } from 'react';
import Button from '@/components/UI/Button/Button';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '@/components/UI/Input/Input';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res && !res.error) {
      router.push('/');
    } else {
      console.log(res);
    }
  };

  return (
    <div>
      Войти
      <Button
        onClick={() => {
          signIn('google', {
            callbackUrl,
          });
        }}
      >
        Продолжить с Google
      </Button>
      <div>Или</div>
      <form onSubmit={handleSubmit}>
        <Input type={'email'} name={'email'} required={true} />
        <Input type={'password'} name={'password'} required={true} />
        <Button type={'submit'}>Войти</Button>
      </form>
    </div>
  );
};

export default Page;
