import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { mutationKey, queryKey } from '@/constants';
import trackService from '@/services/Track.service';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';
import { useAuthStore } from '@/stores/authStore';

export const useAddTrackToFavorites = () => {
  const queryClient = useQueryClient();
  const [customError, setCustomError] = useState({ message: '' });
  const setUser = useAuthStore((state) => state.setUser);

  const { error, ...rest } = useMutation({
    mutationKey: [mutationKey.ADD_TRACK_TO_FAVORITES],
    mutationFn: ({ trackId, userId }: { trackId: string; userId: string }) =>
      trackService.addTrackToFavorites(trackId as string, userId as string),
    onSuccess: (user) => {
      setUser(user);
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
