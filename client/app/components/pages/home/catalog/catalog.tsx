import { Heading } from 'components/pages/ui/heading/heading';
import VideoItem from 'components/pages/ui/videoItem/videoItem';
import React from 'react';

import { useAuth } from '@/hooks/useAuth';

import { videoApi } from '@/store/api/video.api';

import { ICatalogProps } from './catalog.interfaces';
import styles from './catalog.module.scss';

export function Catalog({ newVideos }: ICatalogProps): JSX.Element {
	const { user, accessToken } = useAuth();
	const [removeHandler] = videoApi.useDeleteVideoMutation();

	return (
		<div className={styles.recommended}>
			<div className={styles.top_block}>
				<Heading title={accessToken ? 'My Vidoes' : 'Recomendation'} />
			</div>

			<div className={styles.catalog}>
				{newVideos.map(video => {
					return (
						<VideoItem
							item={video}
							key={video.id}
							removeHandler={
								accessToken && user?.id === video.user?.id
									? removeHandler
									: undefined
							}
							isUpdateLink={
								(accessToken && user?.id === video.user?.id) || undefined
							}
						/>
					);
				})}
			</div>
		</div>
	);
}
