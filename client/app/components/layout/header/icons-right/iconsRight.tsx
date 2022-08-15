import React from 'react';

import { useAuth } from '@/hooks/useAuth';

import AuthForm from '../auth-form/authForm';
import ProfileMenu from '../profile-menu/profileMenu';
import UploadVideo from '../upload-video/uploadVideo';

import styles from './iconsRight.module.scss';

export default function IconsRight(): JSX.Element {
	const { user } = useAuth();

	return (
		<div className={styles.icons}>
			{user ? (
				<>
					<ProfileMenu />
					<UploadVideo />
				</>
			) : (
				<AuthForm />
			)}
		</div>
	);
}
