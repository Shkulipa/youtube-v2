import { ChannelInfoSmall } from 'components/pages/ui/channelInfoSmall/channelInfoSmall';

import { ICommentItemProps } from './comment.interfaces';
import styles from './comment.module.scss';

export default function CommentItem({
	comment
}: ICommentItemProps): JSX.Element {
	return (
		<div className={styles.commentItem}>
			<ChannelInfoSmall channel={comment.user} message={comment.message} />
		</div>
	);
}
