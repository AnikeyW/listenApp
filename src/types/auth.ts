import { IUser } from '@/types/user';

export interface IAuthLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
