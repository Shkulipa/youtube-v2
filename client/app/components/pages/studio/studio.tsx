import Layout from 'components/layout/layout';

import { api } from '@/store/api/api';

import { Catalog } from '../home/catalog/catalog';
import { Loader } from '../ui/loader/loader';

export function Studio(): JSX.Element {
	const { data, isLoading } = api.useGetProfileQuery(null);

	const videos = data?.videos;

	return (
		<Layout title="Youtube 2.0 studio">
			<div>
				{isLoading ? (
					<Loader count={5} />
				) : videos?.length ? (
					<Catalog newVideos={videos} />
				) : (
					<p>Video wan&apos;t found</p>
				)}
			</div>
		</Layout>
	);
}
