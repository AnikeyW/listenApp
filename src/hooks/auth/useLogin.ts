import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '@/services/Auth.service';
import { IAuthLoginResponse } from '@/types/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { ErrorResponse } from '@/types/error';
import { queryKey } from '@/constants';

interface ILogin {
  email: string;
  password: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const setUser = useAuthStore((state) => state.setUser);
  const [customError, setCustomError] = useState({ message: '' });

  const callbackUrl = searchParams.get('callbackUrl');

  const { error, ...rest } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }: ILogin) =>
      authService.login(email, password),
    onSuccess: (data: IAuthLoginResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setIsAuth(true);
      setUser(data.user);
      router.push(callbackUrl ? callbackUrl : '/settings');
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_MY_ALBUMS] });
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_MY_TRACKS] });
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
