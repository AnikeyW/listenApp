import authService from '@/services/Auth.service';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';
import { useState } from 'react';
import { IAuthLoginResponse } from '@/types/auth';
import { useAuthStore } from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';

export const useCheckAuth = () => {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const setUser = useAuthStore((state) => state.setUser);
  const [customError, setCustomError] = useState({ message: '' });

  const { error, ...rest } = useMutation({
    mutationKey: ['checkAuth'],
    mutationFn: () => authService.checkAuth(),
    onSuccess: (data: IAuthLoginResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      setIsAuth(true);
      setUser(data.user);
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
