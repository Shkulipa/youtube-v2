import cn from 'classnames';
import { BsFullscreen } from 'react-icons/bs';
import { IoMdPause, IoMdPlay } from 'react-icons/io';

import { usePlayer } from './usePlayer';
import { IVideoProps } from './videoPlayer.interface';
import styles from './videoPlayer.module.scss';

export function VideoPlayer({ videoPath }: IVideoProps): JSX.Element {
	const { videoRef, toggleVideo, status, fullScreen } = usePlayer();

	return (
		<div className={styles.wrapper}>
			<video
				ref={videoRef}
				className={styles.player}
				src={`${videoPath}#t=8`}
				preload="metadata"
				onClick={toggleVideo}
			/>
			<div
				className={cn(styles.controls, {
					[styles.hide]: status.isPlaying
				})}
			>
				<button onClick={toggleVideo}>
					{status.isPlaying ? <IoMdPause /> : <IoMdPlay />}
				</button>

				<div className={styles.progressBarWrapper}>
					<div
						className={styles.progressBar}
						style={{
							width: `${status.progress}`
						}}
					/>
				</div>

				<div className={styles.timeControls}>
					<p>
						{Math.floor(status.currentTime / 60) +
							':' +
							('0' + Math.floor(status.currentTime % 60)).slice(-2)}
					</p>
					<p>/</p>
					<p>
						{Math.floor(status.videoTime / 60) +
							':' +
							('0' + Math.floor(status.videoTime % 60)).slice(-2)}
					</p>
				</div>

				<button onClick={fullScreen}>
					<BsFullscreen className="text-tiny" />
				</button>
			</div>
		</div>
	);
}
