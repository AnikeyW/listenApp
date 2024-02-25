'use client';
import React from 'react';
import Input from '@/components/UI/Input/Input';
import styles from './LoginForm.module.scss';
import Button from '@/components/UI/Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useLogin } from '@/hooks/useLogin';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Обязательное поле')
      .email('Не валидный Email'),
    password: yup
      .string()
      .required('Обязательное поле')
      .min(6, 'Минимум 6 символов'),
  })
  .required();

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange', resolver: yupResolver(schema) });

  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form
      className={styles.root}
      onSubmit={handleSubmit(onSubmit)}
      noValidate={true}
    >
      <Input placeholder={'email'} type={'email'} {...register('email')} />
      <div className={styles.root__error}>
        {errors.email && <ErrorMessage message={errors.email.message!} />}
      </div>

      <Input
        placeholder={'password'}
        type={'password'}
        {...register('password')}
      />
      <div className={styles.root__error}>
        {errors.password && <ErrorMessage message={errors.password.message!} />}
      </div>

      {loginMutation.isError && (
        <ErrorMessage message={loginMutation.error.message} />
      )}

      <Button type={'submit'} disabled={loginMutation.isPending}>
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;
