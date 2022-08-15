import { Field } from 'components/pages/ui/field/field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdSend } from 'react-icons/md';

import { ICommentDto } from '@/types/comment.interface';

import { commentApi } from '@/store/api/comment.api';

import { IAddCommentProps } from './comment.interfaces';
import styles from './comment.module.scss';

export function AddCommentForm({ videoId }: IAddCommentProps): JSX.Element {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ICommentDto>({
		mode: 'onChange'
	});

	const [writeComment, { isLoading }] = commentApi.useCreateCommentMutation();

	const onSubmit: SubmitHandler<ICommentDto> = async data => {
		writeComment({
			...data,
			videoId
		})
			.unwrap()
			.then(() => reset())
			.catch(err => console.error(err));
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={'relative'}>
				<Field
					{...register('message', {
						required: 'Require Field'
					})}
					placeholder="Enter a message"
					error={errors.message}
				/>

				<button
					className="text-xl absolute right-2 top-1.5 text-purple"
					disabled={isLoading}
				>
					<MdSend />
				</button>
			</div>
		</form>
	);
}
