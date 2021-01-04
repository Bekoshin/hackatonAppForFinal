import {Comment} from '../../models/Comment';

export const parseComment = (json: any): Comment => {
  return {
    id: json.id,
    parentCommentId: json.parent_comment_id,
    createdAt: new Date(json.created_at),
    message: json.message,
    user: json.user,
  };
};
