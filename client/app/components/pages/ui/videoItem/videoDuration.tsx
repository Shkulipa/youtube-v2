import React from 'react';

import styles from './videoItem.module.scss';

interface IVideoDurationProps {
	duration: number;
	isBottom?: boolean;
}

export default function VideoDuration({
	duration,
	isBottom
}: IVideoDurationProps): JSX.Element {
	return (
		<time className={isBottom ? styles.bottom : ''}>{duration} mins.</time>
	);
}
