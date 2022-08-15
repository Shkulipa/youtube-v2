import { axiosClassic } from 'api/axios';

import { IMediaResponse } from './media.interface';

export const MediaService = {
	async upload(
		media: FormData,
		folder?: string,
		setValue?: (val: number) => void,
		accessToken?: string
	) {
		return axiosClassic.post<IMediaResponse>('/media', media, {
			params: { folder },
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${accessToken}`
			},
			onUploadProgress: progressEvent => {
				if (setValue) {
					const progress = (progressEvent.loaded / progressEvent.total) * 100;
					setValue(Math.ceil(progress));
				}
			}
		});
	}
};
