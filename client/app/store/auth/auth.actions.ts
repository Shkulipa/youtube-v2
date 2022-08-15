import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthFields } from 'components/layout/header/auth-form/authForm.interface';
import { toastr } from 'react-redux-toastr';

import { IAuthData } from '@/services/auth/auth.helper';
import { AuthService } from '@/services/auth/auth.service';

import { toastError } from './../../utils/api.utils';

export const register = createAsyncThunk<IAuthData, IAuthFields>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const res = await AuthService.register(email, password);
			toastr.success('Register', 'Succes completed!');
			return res;
		} catch (err) {
			toastError(err);
			return thunkApi.rejectWithValue(err);
		}
	}
);

export const login = createAsyncThunk<IAuthData, IAuthFields>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const res = await AuthService.login(email, password);
			toastr.success('login', 'Succes completed!');
			return res;
		} catch (err) {
			toastError(err);
			return thunkApi.rejectWithValue(err);
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	return {};
});
