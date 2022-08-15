import { HiChartBar, HiCollection, HiHome, HiStar } from 'react-icons/hi';

import { IMenuItem } from './menu.interface';

export const menu: IMenuItem[] = [
	{
		title: 'Home',
		icon: HiHome,
		link: '/'
	},
	{
		title: 'Trends',
		icon: HiChartBar,
		link: '/trending'
	},
	{
		title: 'My channel',
		icon: HiStar,
		link: '/my-channel'
	},
	{
		title: 'My subscribes',
		icon: HiCollection,
		link: '/subscriptions'
	}
];
