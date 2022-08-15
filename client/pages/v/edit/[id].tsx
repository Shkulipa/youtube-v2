import { VideoEdit } from 'components/pages/videoEdit/videoEdit';

import { NextPageAuth } from '@/providers/privateRoute.interface';

export const VideoEditPage: NextPageAuth = () => {
	return <VideoEdit />;
};

VideoEditPage.isOnlyUser = true;

export default VideoEditPage;
