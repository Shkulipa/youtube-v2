import VideoItem from 'components/pages/ui/videoItem/videoItem';
import React from 'react';

import styles from './search.module.scss';
import { useSearch } from './useSearch';

export default function Search(): JSX.Element {
	const { data, handleSearch, searchTerm, isSuccess } = useSearch();

	return (
		<div className={styles.search_top}>
			<label>
				<input
					type="text"
					placeholder="Search a video..."
					value={searchTerm}
					onChange={handleSearch}
				/>
				<img src="/img/common/search.svg" alt="" />
			</label>
			{isSuccess && (
				<div className={styles.result}>
					{data?.length ? (
						data.map(video => <VideoItem isSmall item={video} key={video.id} />)
					) : (
						<div className="text-white">Video wasn&apos;t found</div>
					)}
				</div>
			)}
		</div>
	);
}
