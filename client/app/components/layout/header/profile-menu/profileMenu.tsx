import Image from 'next/image';
import Link from 'next/link';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { useOutside } from '@/hooks/useOutside';

import { api } from '@/store/api/api';

import styles from './profileMenu.module.scss';

export default function ProfileMenu(): JSX.Element {
	const { user } = useAuth();

	const { data, isLoading } = api.useGetProfileQuery(null, {
		skip: !user
	});

	const { isShow, setIsShow, ref } = useOutside(false);

	const { logout } = useActions();
	if (isLoading) return <div>Loading...</div>;

	return (
		<div ref={ref} className={styles.wrapper}>
			<button onClick={() => setIsShow(!isShow)}>
				{data?.avatarPath && (
					<Image
						src={data.avatarPath}
						alt={data?.name}
						width={40}
						height={40}
						priority
					/>
				)}
				<span className={styles.name}>{data?.email}</span>
				{isShow ? <GoChevronUp /> : <GoChevronDown />}
			</button>

			{isShow && (
				<div className={styles['profile-menu']}>
					<ul>
						<li>
							<Link href={`/c/${user?.id}`}>
								<a>My channel</a>
							</Link>
						</li>
						<li>
							<Link href={`/studio`}>
								<a>Studio</a>
							</Link>
						</li>
						<li>
							<button onClick={logout}>Logout</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}
