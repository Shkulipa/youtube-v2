import { useMutation } from '@tanstack/react-query';
import { ChangeEvent } from 'react';

import { MediaService } from '@/services/media/media.service';

import { useAuth } from '@/hooks/useAuth';

import { errorCatch } from './../../../../utils/api.utils';
import { IUseUploadFileProps } from './uploadField.interface';

export function useUploadFile({
	onChange,
	folder,
	setValue,
	setIsChosen
}: IUseUploadFileProps) {
	const { accessToken } = useAuth();

	const { mutateAsync } = useMutation(
		['upload-file'],
		(data: FormData) =>
			MediaService.upload(data, folder, setValue, accessToken),
		{
			onSuccess: ({ data }) => {
				onChange(data);
			},
			onError: (error: any) => {
				alert(errorCatch(error));
			}
		}
	);

	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files?.length) return;

		setIsChosen && setIsChosen(true);

		const formData = new FormData();
		formData.append('media', files[0]);

		await mutateAsync(formData);
	};

	return {
		uploadFile
	};
}
