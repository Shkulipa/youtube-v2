import Layout from 'components/layout/layout';
import React from 'react';

import { Catalog } from '../home/catalog/catalog';
import { ChannelInfoSmall } from '../ui/channelInfoSmall/channelInfoSmall';
import { SubscribeButton } from '../ui/subscribeButton/subscribeButton';

import { IChannel } from './channel.interface';

export function Channel({ channel }: IChannel): JSX.Element {
	return (
		<Layout title={channel.name}>
			<div className="mb-10 w-1/3">
				<div className="flex items-center gap-12">
					<ChannelInfoSmall channel={channel} />
					<SubscribeButton channelIdForSubscribe={channel.id} />
				</div>
				<article className="text-gray-500 mt-3">{channel.description}</article>
			</div>
			<Catalog newVideos={channel.videos || []} />
		</Layout>
	);
}
