import { Button } from 'components/pages/ui/button/button';
import { Field } from 'components/pages/ui/field/field';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { useOutside } from '@/hooks/useOutside';

import stylesIcons from './../icons-right/iconsRight.module.scss';
import { validEmail } from './auth.valid';
import { IAuthFields } from './authForm.interface';
import styles from './authForm.module.scss';

export default function AuthForm(): JSX.Element {
	const { ref, setIsShow, isShow } = useOutside(false);

	const [type, setType] = useState<'login' | 'register'>('login');

	const { login, register: registerAsync } = useActions();

	const { isLoading } = useAuth();

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<IAuthFields>({
		mode: 'onChange'
	});

	const onSubmit: SubmitHandler<IAuthFields> = data => {
		if (type === 'login') login(data);
		else registerAsync(data);
	};

	return (
		<div className={styles.wrapper} ref={ref}>
			<button className={stylesIcons.button} onClick={() => setIsShow(s => !s)}>
				<FaUserCircle fill="#A4A4A4" />
			</button>

			{isShow && (
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Field
						{...register('email', {
							required: 'Email required',
							pattern: {
								value: validEmail,
								message: 'Not valid Email'
							}
						})}
						placeholder="Email"
						error={errors.email}
					/>

					<Field
						{...register('password', {
							required: 'Email required',
							minLength: {
								value: 6,
								message: 'Min length 6'
							}
						})}
						placeholder="Password"
						error={errors.password}
						type="password"
					/>

					<div className={'mt-5 mb-1 text-center'}>
						<Button onClick={() => setType('login')} disabled={isLoading}>
							Login
						</Button>
					</div>
					<button
						className={styles.register}
						disabled={isLoading}
						onClick={() => setType('register')}
					>
						Register
					</button>
				</form>
			)}
		</div>
	);
}
