import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosCheckmarkCircle } from 'react-icons/io';

import { IUserAvatarProps } from './userAvatar.interface';
import styles from './userAvatar.module.scss';

export function UserAvatar({ user, isWhite }: IUserAvatarProps): JSX.Element {
	return (
		<Link href={`/c/${user.id}`}>
			<a>
				<span
					className={cn(styles.avatar, {
						[styles.white]: isWhite
					})}
				>
					<Image
						width={45}
						height={45}
						alt={user.name}
						src={user.avatarPath || ''}
					/>
					{user.isVerified && (
						<span className={styles.isVerified}>
							<IoIosCheckmarkCircle />
						</span>
					)}
				</span>
			</a>
		</Link>
	);
}
