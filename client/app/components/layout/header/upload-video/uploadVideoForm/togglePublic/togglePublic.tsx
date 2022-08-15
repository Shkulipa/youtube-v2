import { Switch } from '@headlessui/react';
import cn from 'classnames';

import { ITogglePublicProps } from './togglePublic.interface';
import styles from './togglePublic.module.scss';

export function TogglePublic({
	isEnabled,
	clickHandler
}: ITogglePublicProps): JSX.Element {
	return (
		<div className={styles.wrapper}>
			<Switch
				checked={isEnabled}
				onChange={clickHandler}
				className={cn(styles.switch, {
					'bg-primary bg-opacity-80': isEnabled,
					'bg-gray-200': !isEnabled
				})}
			>
				<span
					className={cn(styles.point, {
						[styles['position-left']]: isEnabled,
						[styles['position-right']]: !isEnabled
					})}
				/>
			</Switch>
			<span onClick={clickHandler}>Public Video</span>
		</div>
	);
}
