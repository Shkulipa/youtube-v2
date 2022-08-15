import { Studio } from 'components/pages/studio/studio';

import { NextPageAuth } from '@/providers/privateRoute.interface';

const StudioPage: NextPageAuth = () => {
	return <Studio />;
};

StudioPage.isOnlyUser = true;

export default StudioPage;
