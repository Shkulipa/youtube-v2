import { ChannelInfoSmall } from 'components/pages/ui/channelInfoSmall/channelInfoSmall';
import { SubscribeButton } from 'components/pages/ui/subscribeButton/subscribeButton';
import dayjs from 'dayjs';
import { HiCalendar } from 'react-icons/hi';
import { IoMdEye } from 'react-icons/io';
import { RiHeart2Fill } from 'react-icons/ri';

import { videoApi } from '@/store/api/video.api';

import { formatNumberToK } from '@/utils/format-number-to-k';

import { IVideoDetailProps } from './videoDetail.interface';
import styles from './videoDetail.module.scss';

export function VideoDetail({
	video,
	channel
}: IVideoDetailProps): JSX.Element {
	const [updateLike, { isLoading: isLikeLoading }] =
		videoApi.useUpdateLikesMutation();

	return (
		<div className={styles.detail}>
			<div>
				<ChannelInfoSmall channel={channel} />
				<h1>{video.name}</h1>
				<article className={styles.article}>{video.description}</article>
			</div>
			<div className="pt-2">
				<div className={styles.wrapper_button}>
					{video.user?.id && (
						<SubscribeButton channelIdForSubscribe={video.user.id} />
					)}
					<button
						className={styles.likeButton}
						disabled={isLikeLoading}
						onClick={() => updateLike(video.id)}
					>
						<RiHeart2Fill />
						Like
					</button>
				</div>

				<div className={styles.number_info}>
					<div>
						<IoMdEye />
						<span>{formatNumberToK(video.views!)} views</span>
					</div>
					<div>
						<RiHeart2Fill />
						<span>{formatNumberToK(video.likes!)} likes</span>
					</div>
					<div>
						<HiCalendar />
						<span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
