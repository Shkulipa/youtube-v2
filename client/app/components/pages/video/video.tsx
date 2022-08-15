import cn from 'classnames';
import Layout from 'components/layout/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { IUser } from '@/types/user.interface';
import { IVideo } from '@/types/video.interface';

import { videoApi } from '@/store/api/video.api';

import styles from './video.module.scss';
import { VideoDetail } from './videoDetail/videoDetail';
import { Comments } from './videoPlayer/comments/comments';
import { VideoPlayer } from './videoPlayer/videoPlayer';

export default function Video(): JSX.Element {
	const { query } = useRouter();

	const { data: video = {} as IVideo } = videoApi.useGetVideoByIdQuery(
		Number(query.id),
		{
			skip: !query?.id
		}
	);

	const [updateViews] = videoApi.useUpdateViewsMutation();

	useEffect(() => {
		if (query.id) updateViews(Number(query.id));
	}, [query.id]);

	return (
		<Layout title={video.name}>
			<div className={styles.layout}>
				<VideoPlayer videoPath={video.videoPath} />
				<Comments videoId={video.id} comments={video.comments || []} />
			</div>
			<div className={cn(styles.layout, 'mt-7')}>
				<VideoDetail video={video} channel={video.user || ({} as IUser)} />
				<div></div>
			</div>
		</Layout>
	);
}
