import { Field } from 'components/pages/ui/field/field';
import Textarea from 'components/pages/ui/textArea/textarea';
import { UploadField } from 'components/pages/ui/uploadField/uploadField';
import { Controller } from 'react-hook-form';

import { IMediaResponse } from '@/services/media/media.interface';

import styles from './../upload.module.scss';
import { FooterForm } from './footerForm/footerForm';
import { SuccessMessage } from './successMessage';
import { TogglePublic } from './togglePublic/togglePublic';
import { useUploadVideoForm } from './useUploadVideoForm';
import { VideoInformation } from './videoInformation/videoInformation';

interface IUploadVideoFormProps {
	videoId: number;
	handleCloseModal: () => void;
}

export function UploadVideoForm({
	videoId,
	handleCloseModal
}: IUploadVideoFormProps): JSX.Element {
	const { form, status, media } = useUploadVideoForm({
		videoId,
		handleCloseModal
	});

	return (
		<form
			onSubmit={form.handleSubmit(form.onSubmit)}
			className="flex flex-wrap"
		>
			{status.isSuccess && <SuccessMessage />}
			{status.isChosen ? (
				<>
					<div className="w-7/12 pr-6 pt-3">
						<Field
							{...form.register('name', {
								required: 'required!'
							})}
							placeholder="name..."
							error={form.errors.name}
						/>
						<Textarea
							{...form.register('description', {
								required: 'Description'
							})}
							placeholder="Description..."
							error={form.errors.name}
						/>
						<div className="mt-8">
							<Controller
								control={form.control}
								name="thumbnailPath"
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
							control={form.control}
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
					<div className={'w-5/12 p-3 pl-10'}>
						<VideoInformation
							fileName={media.videoFileName}
							videoId={videoId}
							isUploaded={status.isUploaded}
							thumbnailPath={media.thumbnailPath}
						/>
					</div>

					<FooterForm isUploaded={status.isUploaded} percent={status.percent} />
				</>
			) : (
				<div className={styles.uploadScreen}>
					<Controller
						control={form.control}
						name="videoPath"
						render={() => (
							<UploadField
								title="firstly load a video"
								folder="videos"
								onChange={media.handleUploadVideo}
								setValue={status.setProgressPercentage}
								setIsChosen={status.setIsChosen}
							/>
						)}
					/>
				</div>
			)}
		</form>
	);
}
