interface IUser {
	id: number;
	email: string;
}

export interface IAuthData {
	user: IUser | null;
	accessToken: string;
}
