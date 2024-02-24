import { useQuery } from '@tanstack/react-query';
import authService from '@/services/Auth.service';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';
import { useState } from 'react';
import { IAuthLoginResponse } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export const useCheckAuth = () => {
  const router = useRouter();
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const setUser = useAuthStore((state) => state.setUser);
  const [customError, setCustomError] = useState({ message: '' });

  const { error, ...rest } = useQuery({
    queryKey: ['checkAuth'],
    queryFn: () => authService.checkAuth(),

    // onSuccess: (data: IAuthLoginResponse) => {
    //   localStorage.setItem('accessToken', data.accessToken);
    //   setIsAuth(true);
    //   setUser(data.user);
    //   router.push('/settings');
    // },
    // onError: (error: unknown) => {
    //   if (axios.isAxiosError(error)) {
    //     const axiosError = error as AxiosError;
    //     if (axiosError.response) {
    //       const responseData = axiosError.response.data as ErrorResponse;
    //       if (responseData.message) {
    //         setCustomError({ message: responseData.message });
    //         throw new Error(responseData.message);
    //       }
    //     } else {
    //       setCustomError({ message: axiosError.message });
    //       console.log('Error message:', axiosError.message);
    //     }
    //   } else {
    //     setCustomError({ message: 'Неизвестная ошибка' });
    //     console.error('Unknown error:', error);
    //   }
    // },
  });

  return {
    ...rest,
    error: customError,
  };
};
