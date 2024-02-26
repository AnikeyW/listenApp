import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTrackDtoType } from '@/types/track';
import trackService from '@/services/Track.service';
import { useTrackStore } from '@/stores/trackStore';
import { mutationKey, queryKey } from '@/constants';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';

export const useCreateTrack = () => {
  const resetAllFields = useTrackStore((state) => state.resetAllFields);
  const queryClient = useQueryClient();
  const [customError, setCustomError] = useState({ message: '' });

  const { error, ...rest } = useMutation({
    mutationKey: [mutationKey.CREATE_TRACK],
    mutationFn: (data: CreateTrackDtoType) => trackService.create(data),
    onSuccess: () => {
      resetAllFields();
      Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKey.GET_ALL_TRACKS] }),
        queryClient.invalidateQueries({ queryKey: [queryKey.GET_ALL_ALBUMS] }),
      ]);
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
