import { TogglePublic } from 'components/layout/header/upload-video/uploadVideoForm/togglePublic/togglePublic';
import { VideoInformation } from 'components/layout/header/upload-video/uploadVideoForm/videoInformation/videoInformation';
import Layout from 'components/layout/layout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toastr } from 'react-redux-toastr';

import { IMediaResponse } from '@/services/media/media.interface';

import { IVideoDto } from '@/types/video.interface';

import { videoApi } from '@/store/api/video.api';

import { Button } from '../ui/button/button';
import { Field } from '../ui/field/field';
import { Loader } from '../ui/loader/loader';
import Textarea from '../ui/textArea/textarea';
import { UploadField } from '../ui/uploadField/uploadField';

export function VideoEdit(): JSX.Element {
	const { query } = useRouter();
	const videoId = Number(query.id);

	const { data, isLoading } = videoApi.useGetVideoByIdQuery(videoId, {
		skip: !videoId
	});

	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		watch,
		setValue
	} = useForm<IVideoDto>({
		mode: 'onChange'
	});

	useEffect(() => {
		if (!watch('name') && data) {
			setValue('name', data.name);
			setValue('description', data.description);
			setValue('videoPath', data.videoPath);
			setValue('thumbnailPath', data.thumbnailPath);
			setValue('isPublic', data.isPublic);
		}
	}, [data]);

	const [updateVideo, { isLoading: isUpdateLoading }] =
		videoApi.useUpdateVideoMutation();

	const { push } = useRouter();

	const onSubmit: SubmitHandler<IVideoDto> = data => {
		updateVideo({ ...data, id: videoId })
			.unwrap()
			.then(() => {
				toastr.success('Status', 'Video updated!');
				push('/studio');
			});
	};

	return (
		<Layout title="Video Editing">
			<div>
				{isLoading ? (
					<Loader count={5} />
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
						<div className="w-7/12 pr-6 pt-8">
							<Field
								{...register('name', {
									required: 'is required!'
								})}
								placeholder="Name"
								error={errors.name}
							/>
							<Textarea
								{...register('description', {
									required: 'is required!'
								})}
								placeholder="Description..."
								error={errors.description}
							/>
							<div className="mt-8">
								<Controller
									control={control}
									name="thumbnailPath"
									render={({ field: { onChange } }) => (
										<UploadField
											folder="thumbnail"
											onChange={(value: IMediaResponse) => {
												onChange(value.url);
											}}
										/>
									)}
								/>
							</div>
							<div className="mt-8">
								<span className="text-white mb-2 block">Video:</span>
								<Controller
									control={control}
									name="videoPath"
									render={({ field: { onChange } }) => (
										<UploadField
											folder="thumbnails"
											onChange={(value: IMediaResponse) => {
												onChange(value.url);
											}}
										/>
									)}
								/>
							</div>
							<Controller
								control={control}
								name="isPublic"
								render={({ field: { onChange, value } }) => (
									<TogglePublic
										clickHandler={() => {
											onChange(!value);
										}}
										isEnabled={!!value}
									/>
								)}
							/>
						</div>
						<div className="w-5/12 p-3 pl-10">
							<VideoInformation
								fileName={''}
								videoId={videoId}
								isUploaded
								thumbnailPath={watch('thumbnailPath')}
							/>
						</div>

						<div className={'mt-10'}>
							<Button>{isUpdateLoading ? 'Wait...' : 'Save'}</Button>
						</div>
					</form>
				)}
			</div>
		</Layout>
	);
}
