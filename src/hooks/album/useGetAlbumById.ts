import { useQuery } from '@tanstack/react-query';
import albumService from '@/services/Album.service';
import { queryKey } from '@/constants';

export const useGetAlbumById = (albumId: string) => {
  return useQuery({
    queryKey: [queryKey.GET_ALL_ALBUMS, albumId],
    queryFn: () => albumService.getOne(albumId),
    staleTime: 60 * 1000,
  });
};
