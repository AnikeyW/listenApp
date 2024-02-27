import { useMutation } from '@tanstack/react-query';
import trackService from '@/services/Track.service';
import { useQueryClient } from '@tanstack/react-query';
import { mutationKey, queryKey } from '@/constants';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';
import { useState } from 'react';

export const useDeleteTrack = () => {
  const queryClient = useQueryClient();
  const [customError, setCustomError] = useState({ message: '' });

  const { error, ...rest } = useMutation({
    mutationKey: [mutationKey.DELETE_TRACK],
    mutationFn: (trackId: string) => trackService.delete(trackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_MY_TRACKS] });
    },
    onError: (error: unknown) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_MY_TRACKS] });
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
