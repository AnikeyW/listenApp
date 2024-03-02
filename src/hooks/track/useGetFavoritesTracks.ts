import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants';
import trackService from '@/services/Track.service';

export const useGetFavoritesTracks = (count?: number, offset?: number) => {
  return useQuery({
    queryKey: [queryKey.GET_FAVORITES_TRACKS],
    queryFn: () => trackService.getFavoritesTracks(count, offset),
    staleTime: 60 * 1000,
  });
};
