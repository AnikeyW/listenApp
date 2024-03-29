import axios from 'axios';
import { IAuthLoginResponse } from '@/types/auth';
import $api from '@/http';
import { IUser } from '@/types/user';

class AuthService {
  async login(email: string, password: string): Promise<IAuthLoginResponse> {
    const response = await $api.post(
      process.env.NEXT_PUBLIC_BASE_URL + 'auth/login',
      { email, password },
    );
    return response.data;
  }

  async registration(
    email: string,
    password: string,
    name: string,
  ): Promise<IUser> {
    const response = await $api.post(
      process.env.NEXT_PUBLIC_BASE_URL + 'auth/registration',
      { email, password, name },
    );
    return response.data;
  }

  async logout(): Promise<any> {
    const response = await $api.post(
      process.env.NEXT_PUBLIC_BASE_URL + 'auth/logout',
      {
        refreshToken: localStorage.getItem('refreshToken'),
      },
    );
    return response.data;
  }

  async checkAuth(): Promise<IAuthLoginResponse> {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + 'auth/refresh',
      {
        refreshToken: localStorage.getItem('refreshToken'),
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  }
}

export default new AuthService();
