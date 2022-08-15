import Layout from 'components/layout/layout';

import { Catalog } from './catalog/catalog';
import { Discover } from './discover/discover';
import { IHomeProps } from './home.interface';

export function Home({
	newVideos,
	randomVideo,
	topVideo
}: IHomeProps): JSX.Element {
	return (
		<Layout title="Youtube v2.0 | Videohosting">
			<Discover topVideo={topVideo} randomVideo={randomVideo} />
			<Catalog newVideos={newVideos} />
		</Layout>
	);
}
