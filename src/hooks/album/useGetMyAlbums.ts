import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants';
import albumService from '@/services/Album.service';
import { useAuthStore } from '@/stores/authStore';

export const useGetMyAlbums = () => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: [queryKey.GET_MY_ALBUMS],
    queryFn: () => albumService.getMyAlbums(user?._id!),
    staleTime: 60 * 1000,
  });
};
