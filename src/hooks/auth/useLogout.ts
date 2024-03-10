import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '@/services/Auth.service';
import { useAuthStore } from '@/stores/authStore';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';
import { useState } from 'react';
import { queryKey } from '@/constants';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const setUser = useAuthStore((state) => state.setUser);
  const [customError, setCustomError] = useState({ message: '' });

  const { error, ...rest } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsAuth(false);
      setUser(null);
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
