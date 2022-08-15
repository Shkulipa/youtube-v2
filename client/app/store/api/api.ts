import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_URL, USER } from 'api/axios';

import { IUser } from '@/types/user.interface';

import { TypeRootState } from '../store';

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Video', 'Profile'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as TypeRootState).auth.accessToken;

			if (token) headers.set('Authorization', `Bearer ${token}`);

			return headers;
		}
	}),
	endpoints: builder => ({
		getProfile: builder.query<IUser, any>({
			query: () => `${USER}/profile`,
			providesTags: () => [{ type: 'Profile' }]
		}),
		subscribeToChannel: builder.mutation<boolean, number>({
			query: channelId => ({
				url: `${USER}/subscribe/${channelId}`,
				method: 'PATCH'
			}),
			invalidatesTags: () => [{ type: 'Profile' }]
		})
	})
});
