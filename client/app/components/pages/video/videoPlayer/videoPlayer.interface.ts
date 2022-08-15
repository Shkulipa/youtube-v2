export interface IVideoElement extends HTMLVideoElement {
	msRequestFullScreen?: () => void;
	mozRequestFullScreen?: () => void;
	webkitRequestFullScreen?: () => void;
}

export interface IVideoProps {
	videoPath: string;
}
