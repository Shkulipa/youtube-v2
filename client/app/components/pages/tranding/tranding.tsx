import Layout from 'components/layout/layout';
import React from 'react';

import { Catalog } from '../home/catalog/catalog';

import { ITrandingProps } from './tranding.interface';

export function Tranding({ topVideos }: ITrandingProps): JSX.Element {
	return (
		<Layout title="Trends">
			<Catalog newVideos={topVideos} />
		</Layout>
	);
}
