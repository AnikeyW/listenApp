import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUser } from '@/types/user';

interface IAuthState {
  isAuth: boolean;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  setIsAuth: (value: boolean) => void;
}

export const useAuthStore = create<IAuthState>()(
  devtools((set) => ({
    isAuth: false,
    user: null,
    setUser: (user) => set({ user }),
    setIsAuth: (value) => set({ isAuth: value }),
  })),
);
