import React from 'react';

import { useAuth } from '@/hooks/useAuth';

import { AddCommentForm } from './addCommentForm';
import { ICommentProps } from './comment.interfaces';
import styles from './comment.module.scss';
import CommentItem from './commentItem';

export function Comments({ comments, videoId }: ICommentProps): JSX.Element {
	const { user } = useAuth();

	return (
		<div className={styles.comments}>
			<h2>Comments</h2>
			<div className={styles.line} />

			{comments.length ? (
				<div className={styles.grid}>
					{comments.map(comment => (
						<CommentItem comment={comment} key={comment.id} />
					))}
				</div>
			) : (
				<p>Comments wans&apos;t found</p>
			)}

			{user && (
				<div className={styles.bottomForm}>
					<AddCommentForm videoId={videoId} />
				</div>
			)}
		</div>
	);
}
