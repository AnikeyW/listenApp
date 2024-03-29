import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants';
import trackService from '@/services/Track.service';

export const useGetMyTracks = (count?: number, offset?: number) => {
  return useQuery({
    queryKey: [queryKey.GET_MY_TRACKS],
    queryFn: () => trackService.getMyTracks(count, offset),
    staleTime: 60 * 1000,
  });
};
