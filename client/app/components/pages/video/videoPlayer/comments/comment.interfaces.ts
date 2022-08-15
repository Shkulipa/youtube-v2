import { IComment } from '@/types/comment.interface';

export interface ICommentItemProps {
	comment: IComment;
}

export interface IAddCommentProps {
	videoId: number;
}

export interface ICommentProps {
	comments: IComment[];
	videoId: number;
}
