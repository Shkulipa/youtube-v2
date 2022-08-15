import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { IVideo } from '@/types/video.interface';

import { UserAvatar } from '../userAvatar/userAvatar';

import VideoDuration from './videoDuration';
import styles from './videoItem.module.scss';
import VideoStatistics from './videoStatistics';

interface ILargeVideoItemProps {
	video: IVideo;
}

export function LargeVideoItem({ video }: ILargeVideoItemProps): JSX.Element {
	return (
		<div className={cn(styles.video_item, styles.large_item)}>
			<div className={styles.thumbnail}>
				{video.thumbnailPath && (
					<Image
						src={video.thumbnailPath}
						alt={video.name}
						layout="fill"
						className={styles['bg-image']}
						priority
					/>
				)}
				{video.duration && <VideoDuration isBottom duration={video.duration} />}

				<div className={styles.information}>
					<Link href={`/v/${video.id}`}>
						<a className={styles.name}>{video.name}</a>
					</Link>

					{video?.user?.avatarPath && <UserAvatar user={video.user} isWhite />}

					<div className={styles.author}>{video.user?.name}</div>

					{video.views && (
						<VideoStatistics views={video.views} createAt={video.createdAt} />
					)}
				</div>
			</div>
		</div>
	);
}
