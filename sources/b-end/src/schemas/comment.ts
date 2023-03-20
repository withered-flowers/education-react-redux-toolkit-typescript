export type Comment = {
  id: number;
  email: string;
  body: string;
};

// TODO: RTK Query - Fetch Comments By Id (1)
// Karena sekarang CommentDetail akan digunakan pada services
// Ada baiknya kita type pindahkan CommentDetail dari pages/CommentDetailPage.tsx ke sini
export type CommentDetail = Comment & {
  postId: number;
  name: string;
};
