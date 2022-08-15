import React from 'react';

import styles from './header.module.scss';
import IconsRight from './icons-right/iconsRight';
import Search from './search/search';

export function Header(): JSX.Element {
	return (
		<header className={styles.header}>
			<Search />
			<IconsRight />
		</header>
	);
}
