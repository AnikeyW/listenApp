import { useQuery } from '@tanstack/react-query';
import authService from '@/services/Auth.service';

export const useLogout = () => {
  return useQuery({
    queryKey: ['logout'],
    queryFn: () => authService.logout(),
  });
};
