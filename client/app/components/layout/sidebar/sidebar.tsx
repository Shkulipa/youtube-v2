import Link from 'next/link';
import React from 'react';

import { useAuth } from '@/hooks/useAuth';

import { api } from '@/store/api/api';

import Menu from './menu/menu';
import { menu } from './menu/menu.data';
import styles from './sidebar.module.scss';

export function Sidebar(): JSX.Element {
	const { user } = useAuth();

	const { data } = api.useGetProfileQuery(null, {
		skip: !user
	});

	return (
		<aside className={styles.sidebar}>
			<Link href="/">
				<a className={styles.logo}>Youtube 2.0</a>
			</Link>

			<Menu title="Menu" items={menu} />

			{user && (
				<Menu
					title="My subscribtions"
					items={
						data?.subscription.map(({ toChannel }) => ({
							image: toChannel.avatarPath,
							title: toChannel.name,
							link: '/c/' + toChannel.id
						})) || []
					}
				/>
			)}

			<div className={styles.copy}>&copy; 2022 RUTUBE 2.0</div>
		</aside>
	);
}
