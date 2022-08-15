import cn from 'classnames';
import { Button } from 'components/pages/ui/button/button';
import { MdCheckCircle, MdUpload } from 'react-icons/md';

import { IFooterFormProps } from './footerForm.interface';
import styles from './footerForm.module.scss';

export function FooterForm({
	percent,
	isUploaded
}: IFooterFormProps): JSX.Element {
	return (
		<div className={styles.footer}>
			<div
				className={cn(styles.status, {
					[styles['icons-uploaded']]: isUploaded
				})}
			>
				<MdUpload className={styles['upload-icon']} />
				<MdCheckCircle className={styles['check-icon']} />
				<span>
					{isUploaded ? 'Video was uploaded' : `Uploading ${percent}...`}
				</span>
			</div>
			<div>
				<Button>Save</Button>
			</div>
		</div>
	);
}
