import React, { forwardRef } from 'react';

import { ITextArea } from './textarea.interface';
import styles from './textarea.module.scss';

export const Textarea = forwardRef<HTMLTextAreaElement, ITextArea>(
	({ error, style, ...rest }, ref) => {
		return (
			<div className={styles['editor']} style={style}>
				<textarea ref={ref} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		);
	}
);

Textarea.displayName = 'Textarea';

export default Textarea;
