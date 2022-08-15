import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function Loader(props: SkeletonProps): JSX.Element {
	return (
		<Skeleton
			baseColor="#2d2c35"
			highlightColor="#353340"
			className="rounded-xl h-8 my-1"
			{...props}
		/>
	);
}
