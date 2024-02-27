import { useMutation, useQueryClient } from '@tanstack/react-query';
import albumService from '@/services/Album.service';
import { mutationKey, queryKey } from '@/constants';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';
import { useState } from 'react';

export const useAddTrackToAlbum = () => {
  const queryClient = useQueryClient();
  const [customError, setCustomError] = useState({ message: '' });

  const { error, ...rest } = useMutation({
    mutationKey: [mutationKey.ADD_TRACK_TO_ALBUM],
    mutationFn: ({ albumId, trackId }: { albumId: string; trackId: string }) =>
      albumService.addTrackToAlbum(albumId, trackId),
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
