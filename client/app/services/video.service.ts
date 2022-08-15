import { axiosClassic } from 'api/axios';

import { IVideo } from './../types/video.interface';

const VIDEO = 'video';

export const VideoService = {
	async getAll() {
		return axiosClassic.get<IVideo[]>(`/${VIDEO}`);
	},

	async getMostPopular() {
		return axiosClassic.get<IVideo[]>(`/${VIDEO}/popular`);
	}
};
