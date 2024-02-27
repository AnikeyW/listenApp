import { useQuery } from '@tanstack/react-query';
import trackService from '@/services/Track.service';
import { queryKey } from '@/constants';

export const useGetAllTracks = () => {
  return useQuery({
    queryKey: [queryKey.GET_ALL_TRACKS],
    queryFn: () => trackService.getAll(),
    staleTime: 60 * 1000,
  });
};
