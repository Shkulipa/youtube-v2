import cn from 'classnames';
import { BsPersonPlusFill } from 'react-icons/bs';

import { useAuth } from '@/hooks/useAuth';

import { api } from '@/store/api/api';

import { ISubscribeButtonProps } from './subscribeButton.interface';
import styles from './subscribeButton.module.scss';

export function SubscribeButton({
	channelIdForSubscribe
}: ISubscribeButtonProps): JSX.Element {
	const { user } = useAuth();

	const { data: profile } = api.useGetProfileQuery(null, {
		skip: !user
	});

	const [subscribe, { isLoading, data }] = api.useSubscribeToChannelMutation();

	if (user?.id === channelIdForSubscribe) return <></>;

	const isSubscribed =
		profile?.subscription?.some(
			sub => sub.toChannel.id === channelIdForSubscribe
		) || !!data;

	return (
		<button
			className={cn(styles.button, {
				[styles.subscribed]: isSubscribed
			})}
			onClick={() => subscribe(channelIdForSubscribe).unwrap()}
			disabled={isLoading}
		>
			<BsPersonPlusFill />
			{isSubscribed ? 'alredy Subscribed' : 'Subscribe'}
		</button>
	);
}
