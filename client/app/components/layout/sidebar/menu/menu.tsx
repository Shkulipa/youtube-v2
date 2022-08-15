import React from 'react';

import { IMenuItem } from './menu.interface';
import styles from './menu.module.scss';
import { MenuItem } from './menuItem';

interface IMenu {
	title: string;
	items: IMenuItem[];
}

export default function Menu({ title, items }: IMenu): JSX.Element {
	return (
		<nav className={styles.mnu_sidebar}>
			<h3>{title}</h3>
			<ul>
				{items.map(menuItem => (
					<MenuItem item={menuItem} key={menuItem.link} />
				))}
			</ul>
		</nav>
	);
}
