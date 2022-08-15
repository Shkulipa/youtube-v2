import { Tranding } from 'components/pages/tranding/tranding';
import { ITrandingProps } from 'components/pages/tranding/tranding.interface';
import { GetStaticProps, NextPage } from 'next';

import { VideoService } from '@/services/video.service';

const TrandingPage: NextPage<ITrandingProps> = ({ topVideos }) => {
	return <Tranding topVideos={topVideos} />;
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: topVideos } = await VideoService.getMostPopular();

		return {
			props: {
				topVideos
			},
			revalidate: 60
		};
	} catch (err) {
		console.error(err);
		return {
			props: {
				newVideos: []
			}
		};
	}
};

export default TrandingPage;
