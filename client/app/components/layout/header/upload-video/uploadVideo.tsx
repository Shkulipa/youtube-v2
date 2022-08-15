import React, { useState } from 'react';
import { HiUpload } from 'react-icons/hi';

import { videoApi } from '@/store/api/video.api';

import stylesIcon from './../icons-right/iconsRight.module.scss';
import { UploadModal } from './uploadModal';

export default function UploadVideo(): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const [videoId, setVideoId] = useState<number>(0);

	const [createVideo, { isLoading }] = videoApi.useCreateVideoMutation();

	return (
		<>
			<button
				className={stylesIcon.button}
				disabled={isLoading}
				onClick={() =>
					createVideo()
						.unwrap()
						.then((id: string) => {
							setVideoId(+id);
							setIsOpen(true);
						})
				}
			>
				<HiUpload />
			</button>
			<UploadModal isOpen={isOpen} setIsOpen={setIsOpen} videoId={videoId} />
		</>
	);
}
