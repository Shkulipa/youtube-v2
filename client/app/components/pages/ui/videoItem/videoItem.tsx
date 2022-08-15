import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiEdit, BiTrash } from 'react-icons/bi';

import { UserAvatar } from '../userAvatar/userAvatar';

import VideoDuration from './videoDuration';
import { IVideoItem } from './videoItem.interface';
import styles from './videoItem.module.scss';
import VideoStatistics from './videoStatistics';

export default function VideoItem({
	isSmall,
	isUpdateLink,
	removeHandler,
	item
}: IVideoItem): JSX.Element {
	const { push } = useRouter();

	return (
		<div
			className={cn(styles.video_item, {
				[styles.small]: isSmall
			})}
		>
			{!!removeHandler && (
				<button
					className="absolute bottom-3 right-3 z-10"
					onClick={() => removeHandler(item.id)}
				>
					<BiTrash className="text-lg text-red-700" />
				</button>
			)}
			{!!isUpdateLink && (
				<button
					className="absolute bottom-3 right-11 z-10"
					onClick={() => push(`/v/edit/${item.id}`)}
				>
					<BiEdit className="text-lg text-blue-600" />
				</button>
			)}

			<div className={styles.thumbnail}>
				{item.thumbnailPath && (
					<Image
						src={item.thumbnailPath}
						alt={item.name}
						width={185}
						height={103}
						layout="responsive"
						priority
					/>
				)}
				<VideoDuration duration={item.duration!} />
				{item?.user?.avatarPath && (
					<div>
						<div className="absolute right-3 -bottom-7">
							<UserAvatar user={item.user} />
						</div>
					</div>
				)}
			</div>

			<div className={styles.information}>
				{!isSmall && <div className={styles.author}>{item.user?.name}</div>}
				<Link href={`/v/${item.id}`}>
					<a className={styles.name}>{item.name}</a>
				</Link>
				<VideoStatistics
					views={item.views!}
					createAt={!isSmall ? item.createdAt : undefined}
				/>
			</div>
		</div>
	);
}
