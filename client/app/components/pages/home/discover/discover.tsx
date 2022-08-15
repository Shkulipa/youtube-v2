import { LargeVideoItem } from 'components/pages/ui/videoItem/largeVideoItem';
import React from 'react';

import { IDiscoverProps } from './discover.interface';
import styles from './discover.module.scss';

export function Discover({
	topVideo,
	randomVideo
}: IDiscoverProps): JSX.Element {
	return (
		<div className={styles.discover}>
			<div className={styles.top_video}>
				<LargeVideoItem video={topVideo} />
			</div>
			<div className={styles.random_video}>
				<LargeVideoItem video={randomVideo} />
			</div>
		</div>
	);
}
