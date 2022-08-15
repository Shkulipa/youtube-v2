import { IUploadFieldProps } from './uploadField.interface';
import styles from './uploadField.module.scss';
import { useUploadFile } from './useUploadFile';

export function UploadField({
	onChange,
	folder,
	setValue,
	setIsChosen,
	title
}: IUploadFieldProps): JSX.Element {
	const { uploadFile } = useUploadFile({
		onChange,
		folder,
		setValue,
		setIsChosen
	});

	return (
		<div className={styles.file}>
			{title && <h1>{title}</h1>}
			<label>
				<span className="sr-only">Choose file</span>
				<input type="file" onChange={uploadFile} />
			</label>
		</div>
	);
}
