import Layout from 'components/layout/layout';
import Menu from 'components/layout/sidebar/menu/menu';
import React from 'react';

import { NextPageAuth } from '@/providers/privateRoute.interface';

import { api } from '@/store/api/api';

const Subscriptions: NextPageAuth = () => {
	const { data } = api.useGetProfileQuery(null);

	return (
		<Layout title="My subscriptions">
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
		</Layout>
	);
};

Subscriptions.isOnlyUser = true;

export default Subscriptions;
