import { useQuery } from '@tanstack/react-query';
import albumService from '@/services/Album.service';
import { queryKey } from '@/constants';

export const useGetAllAlbums = () => {
  return useQuery({
    queryKey: [queryKey.GET_ALL_ALBUMS],
    queryFn: () => albumService.getAll(),
    staleTime: 60 * 1000,
  });
};
