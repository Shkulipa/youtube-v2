import { Home } from 'components/pages/home/home';
import { IHomeProps } from 'components/pages/home/home.interface';
import shuffle from 'lodash/shuffle';
import { GetStaticProps, NextPage } from 'next';

import { VideoService } from '@/services/video.service';

import { IVideo } from '@/types/video.interface';

const HomePage: NextPage<IHomeProps> = props => {
	return <Home {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: newVideos } = await VideoService.getAll();
		const { data: topVideos } = await VideoService.getMostPopular();
		const randomVideo =
			(topVideos[0].id &&
				shuffle(newVideos.filter(v => v.id !== topVideos[0].id))[0]) ||
			({} as IVideo);

		return {
			props: {
				newVideos,
				topVideo: topVideos[0],
				randomVideo
			} as IHomeProps
		};
	} catch (err) {
		console.error(err);
		return {
			props: {
				newVideos: [],
				topVideo: {} as IVideo,
				randomVideo: {} as IVideo
			} as IHomeProps
		};
	}
};

export default HomePage;
