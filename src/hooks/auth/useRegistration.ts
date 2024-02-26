import { useMutation } from '@tanstack/react-query';
import authService from '@/services/Auth.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';
import { IUser } from '@/types/user';

interface IRegistration {
  name: string;
  email: string;
  password: string;
}

export const useRegistration = () => {
  const router = useRouter();
  const [customError, setCustomError] = useState({ message: '' });

  const { error, ...rest } = useMutation({
    mutationKey: ['registration'],
    mutationFn: ({ email, password, name }: IRegistration) =>
      authService.registration(email, password, name),
    onSuccess: (data: IUser) => {
      router.push('/signin');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const responseData = axiosError.response.data as ErrorResponse;
          if (responseData.message) {
            setCustomError({ message: responseData.message });
            throw new Error(responseData.message);
          }
        } else {
          setCustomError({ message: axiosError.message });
          console.log('Error message:', axiosError.message);
        }
      } else {
        setCustomError({ message: 'Неизвестная ошибка' });
        console.error('Unknown error:', error);
      }
    },
  });

  return {
    ...rest,
    error: customError,
  };
};
