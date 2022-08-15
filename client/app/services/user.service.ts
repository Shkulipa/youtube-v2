import { axiosClassic } from 'api/axios';

import { IUser } from '@/types/user.interface';

const USER = 'user';

export const UserService = {
	async getAll() {
		return axiosClassic.get<IUser[]>(`/${USER}`);
	},

	async getUser(id: number) {
		return axiosClassic.get<IUser>(`/${USER}/profile/${id}`);
	}
};
