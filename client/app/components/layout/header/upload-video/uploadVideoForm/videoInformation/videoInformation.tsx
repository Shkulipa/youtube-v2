import Image from 'next/image';
import Link from 'next/link';

import styles from './videoInformation.module.scss';

interface IVideoInformation {
	thumbnailPath?: string;
	videoId: number;
	fileName: string;
	isUploaded: boolean;
}

export function VideoInformation({
	thumbnailPath,
	videoId,
	fileName,
	isUploaded
}: IVideoInformation): JSX.Element {
	return (
		<div className={styles.info}>
			{!thumbnailPath ? (
				<div className={styles.thumbnail}>
					{!isUploaded ? 'Loading...' : 'you should load a preview'}
				</div>
			) : (
				<Image
					src={thumbnailPath}
					width={344}
					height={190}
					alt=""
					layout="responsive"
				/>
			)}
			<div className={styles.details}>
				<div>
					<span>Video link</span>
					<span>
						<Link href={`/v/${videoId}`}>
							<a>http://local/v/{videoId}</a>
						</Link>
					</span>
				</div>
				<div>
					<span>Filename</span>
					<span>{fileName}</span>
				</div>
			</div>
		</div>
	);
}
