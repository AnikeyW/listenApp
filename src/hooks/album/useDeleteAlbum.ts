import { useMutation, useQueryClient } from '@tanstack/react-query';
import albumService from '@/services/Album.service';
import { mutationKey, queryKey } from '@/constants';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';
import { useState } from 'react';

export const useDeleteAlbum = () => {
  const queryClient = useQueryClient();
  const [customError, setCustomError] = useState({ message: '' });

  const { error, ...rest } = useMutation({
    mutationKey: [mutationKey.DELETE_ALBUM],
    mutationFn: (albumId: string) => albumService.delete(albumId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_MY_ALBUMS] });
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_MY_TRACKS] });
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_ALL_ALBUMS] });
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_ALL_TRACKS] });
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
