'use client';
import React from 'react';
import Input from '@/components/UI/Input/Input';
import styles from './RegistrationForm.module.scss';
import Button from '@/components/UI/Button/Button';
import { useRegistration } from '@/hooks/auth/useRegistration';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';

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
    name: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'Минимум 3 символа'),
  })
  .required();

type Inputs = {
  email: string;
  password: string;
  name: string;
};

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const registration = useRegistration();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    registration.mutate(data);
  };

  return (
    <form
      className={styles.root}
      onSubmit={handleSubmit(onSubmit)}
      noValidate={true}
    >
      <Input
        placeholder={'Имя пользователя'}
        type={'text'}
        {...register('name')}
      />
      <div className={styles.root__error}>
        {errors.name && <ErrorMessage message={errors.name.message!} />}
      </div>

      <Input placeholder={'Email'} type={'email'} {...register('email')} />
      <div className={styles.root__error}>
        {errors.email && <ErrorMessage message={errors.email.message!} />}
      </div>

      <Input
        placeholder={'Пароль'}
        type={'password'}
        {...register('password')}
      />
      <div className={styles.root__error}>
        {errors.password && <ErrorMessage message={errors.password.message!} />}
      </div>

      <Button type={'submit'}>Зарегистрироваться</Button>
      {registration.isError && (
        <ErrorMessage message={registration.error.message} />
      )}
    </form>
  );
};

export default RegistrationForm;
