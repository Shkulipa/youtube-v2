import dynamic from 'next/dynamic';
import { FC, PropsWithChildren } from 'react';

import { TypeComponentAuthFields } from './privateRoute.interface';

const DynamicCheckRole = dynamic(() => import('./checkRole'), {
	ssr: false
});

interface IAuthProviderProps
	extends PropsWithChildren<TypeComponentAuthFields> {}

export const AuthProvider: FC<IAuthProviderProps> = ({
	Component: { isOnlyUser },
	children
}) => {
	return !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
	);
};
