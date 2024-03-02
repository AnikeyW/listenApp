import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants';
import albumService from '@/services/Album.service';

export const useGetMyAlbums = () => {
  return useQuery({
    queryKey: [queryKey.GET_MY_ALBUMS],
    queryFn: () => albumService.getMyAlbums(),
    staleTime: 60 * 1000,
  });
};
