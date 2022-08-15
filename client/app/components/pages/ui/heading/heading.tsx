import React from 'react';

import { IHeadingProps } from './heading.interfaces';
import styles from './heading.module.scss';

export function Heading({ title }: IHeadingProps): JSX.Element {
	return (
		<div className={styles.title}>
			<h2>{title}</h2>
		</div>
	);
}
