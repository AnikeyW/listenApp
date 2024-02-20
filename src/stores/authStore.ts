import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IUser {
  email?: string | null | undefined;
  image?: string | null | undefined;
  name?: string | null | undefined;
}

interface IAuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const useAuthStore = create<IAuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
  })),
);
