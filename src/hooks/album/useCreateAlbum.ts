import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateAlbumDtoType } from '@/types/album';
import albumService from '@/services/Album.service';
import { useState } from 'react';
import { useTrackStore } from '@/stores/trackStore';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';
import { mutationKey, queryKey } from '@/constants';

export const useCreateAlbum = () => {
  const queryClient = useQueryClient();
  const [customError, setCustomError] = useState({ message: '' });
  const resetAllFields = useTrackStore((state) => state.resetAllFields);

  const { error, ...rest } = useMutation({
    mutationKey: [mutationKey.CREATE_ALBUM],
    mutationFn: (data: CreateAlbumDtoType) => albumService.create(data),
    onSuccess: () => {
      queryClient.fetchQuery({ queryKey: [queryKey.GET_ALL_ALBUMS] });
      resetAllFields();
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
