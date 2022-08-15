import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IAuthData } from '@/services/auth/auth.helper';

import { login, logout, register } from './auth.actions';
import { IAuthInitialState } from './auth.interface';

const initialState: IAuthInitialState = {
	user: null,
	accessToken: '',
	isLoading: false
};

interface IPayloadStateAuth {
	state: IAuthInitialState;
	payload: IAuthData;
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		return (
			builder
				/**
				 * @info login
				 */
				.addCase(login.pending, state => {
					state.isLoading = true;
				})
				.addCase(
					login.fulfilled,
					(state, { payload }: PayloadAction<IAuthData>) => {
						state.isLoading = false;
						state.user = payload.user;
						state.accessToken = payload.accessToken;
					}
				)
				.addCase(login.rejected, state => {
					state.isLoading = false;
					state.user = null;
					state.accessToken = '';
				})

				/**
				 * @info register
				 */
				.addCase(register.pending, state => {
					state.isLoading = true;
				})
				.addCase(
					register.fulfilled,
					(state, { payload }: PayloadAction<IAuthData>) => {
						state.isLoading = false;
						state.user = payload.user;
						state.accessToken = payload.accessToken;
					}
				)
				.addCase(register.rejected, state => {
					state.isLoading = false;
					state.user = null;
					state.accessToken = '';
				})

				/**
				 * @info logout
				 */
				.addCase(logout.pending, state => {
					state.user = null;
					state.isLoading = false;
					state.user = null;
					state.accessToken = '';
				})
		);
	}
});
