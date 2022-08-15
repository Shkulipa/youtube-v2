import { IUser } from '@/types/user.interface';
import { IVideo } from '@/types/video.interface';

export interface IVideoDetailProps {
	video: IVideo;
	channel: IUser;
}
