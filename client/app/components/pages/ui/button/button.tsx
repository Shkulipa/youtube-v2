import cn from 'classnames';
import React, { FC } from 'react';

import { IButton } from './button.interface';
import styles from './button.module.scss';

/* export function Button({ children, className, ...rest }: IButton): JSX.Element {
	return (
		<button className={cn(styles.button, className)} {...rest}>
			{children}
		</button>
	);
} */

export const Button: FC<IButton> = ({
	children,
	className,
	...rest
}): JSX.Element => {
	return (
		<button className={cn(styles.button, className)} {...rest}>
			{children}
		</button>
	);
};
