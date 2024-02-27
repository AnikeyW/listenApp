import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants';
import trackService from '@/services/Track.service';
import { useAuthStore } from '@/stores/authStore';

export const useGetMyTracks = (count?: number, offset?: number) => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: [queryKey.GET_MY_TRACKS],
    queryFn: () => trackService.getMyTracks(user?._id!, count, offset),
    staleTime: 0,
  });
};
