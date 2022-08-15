import { Dispatch, SetStateAction } from 'react';

export interface IUseUploadFileProps {
	onChange: (...event: any) => void;
	folder?: string;
	setValue?: (val: number) => void;
	setIsChosen?: Dispatch<SetStateAction<boolean>>;
}

export interface IUploadFieldProps extends IUseUploadFileProps {
	title?: string;
}
