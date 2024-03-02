import { useMutation } from '@tanstack/react-query';
import { mutationKey } from '@/constants';
import userService from '@/services/UserService';
import { useAuthStore } from '@/stores/authStore';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';
import { useState } from 'react';

interface IUpdateUserImage {
  picture: File;
}

export const useUpdateUserImage = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [customError, setCustomError] = useState({ message: '' });

  const { error, ...rest } = useMutation({
    mutationKey: [mutationKey.UPDATE_USER_IMAGE],
    mutationFn: ({ picture }: IUpdateUserImage) =>
      userService.updateImage(picture),
    onSuccess: (user) => {
      setUser(user);
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
