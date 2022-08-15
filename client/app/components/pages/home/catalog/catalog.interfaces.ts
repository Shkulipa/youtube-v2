import { IVideo } from '@/types/video.interface';

export interface ICatalogProps {
	newVideos: IVideo[];
	removeHandler?: (videoId: number) => void;
	isUpdateLink?: boolean;
}
