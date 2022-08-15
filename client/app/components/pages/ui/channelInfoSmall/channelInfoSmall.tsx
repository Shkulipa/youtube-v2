import React from 'react';

import { formatNumberToK } from '@/utils/format-number-to-k';

import { UserAvatar } from '../userAvatar/userAvatar';

import { IChannelInfoSmall } from './channelInfoSmall.interface';
import styles from './channelInfoSmall.module.scss';

export function ChannelInfoSmall({
	channel,
	message
}: IChannelInfoSmall): JSX.Element {
	return (
		<div className={styles.profile_info}>
			{channel.avatarPath && <UserAvatar user={channel} />}

			<div>
				<div className={styles.name}>{channel.name}</div>
				<div className={styles.subscribers_count}>
					{message ||
						formatNumberToK(channel.subscribersCount!) + ' subscribers'}
				</div>
			</div>
		</div>
	);
}
