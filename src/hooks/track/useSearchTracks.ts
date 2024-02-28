import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants';
import trackService from '@/services/Track.service';

export const useSearchTracks = (query: string) => {
  return useQuery({
    queryKey: [queryKey.GET_SEARCH_TRACKS, query],
    queryFn: () => {
      if (query !== '') {
        return trackService.search(query);
      }
      return [];
    },
    staleTime: 0,
    enabled: !!query,
  });
};
