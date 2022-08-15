import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { formatNumberToK } from '@/utils/format-number-to-k';

import styles from './videoItem.module.scss';

dayjs.extend(relativeTime);

interface IVideoStatisticsProps {
	views: number;
	createAt?: string;
}

export default function VideoStatistics({
	views,
	createAt
}: IVideoStatisticsProps): JSX.Element {
	return (
		<div className={styles.number_info}>
			<div className={styles.views}>{formatNumberToK(views)} views</div>
			{!!createAt && (
				<div className={styles.date}>{dayjs(new Date(createAt)).fromNow()}</div>
			)}
		</div>
	);
}
