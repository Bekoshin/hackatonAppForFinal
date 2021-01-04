export interface Comment {
  id: number;
  parentCommentId: number | null;
  createdAt: Date;
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
