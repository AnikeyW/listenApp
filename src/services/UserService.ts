import { IUser } from '@/types/user';
import $api from '@/http';

class UserService {
  async updateImage(userId: string, picture: File): Promise<IUser> {
    const formData = new FormData();
    formData.append('picture', picture);
    return await $api
      .patch<IUser>(`user/${userId}`, formData)
      .then((res) => res.data);
  }
}

export default new UserService();
