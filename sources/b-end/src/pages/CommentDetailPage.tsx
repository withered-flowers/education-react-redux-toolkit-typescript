import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "../schemas/comment";

type CommentDetail = Comment & {
  postId: number;
  name: string;
};

const CommentDetailPage = () => {
  const { id } = useParams();
  const [commentDetail, setCommentDetail] = useState<CommentDetail>();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments/${id}`
        );

        if (!response.ok) {
          throw new Error("Terjadi sebuah error !");
        }

        const responseJson: CommentDetail = await response.json();
        setCommentDetail(responseJson);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    })();
  }, [id]);

  return (
    <>
      <p>Id: {commentDetail?.id}</p>
      <p>PostId: {commentDetail?.postId}</p>
      <p>Name: {commentDetail?.name}</p>
      <p>Email: {commentDetail?.email}</p>
      <p>Body: {commentDetail?.body}</p>
    </>
  );
};

export default CommentDetailPage;
