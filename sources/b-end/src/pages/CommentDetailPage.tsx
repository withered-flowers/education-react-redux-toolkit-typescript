import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// TODO: RTK Query - Fetch Comments By Id (5)
// Comment import Comment dan type CommentDetail di sini karena sudah dipindahkan ke schemas
// import { Comment } from "../schemas/comment";

// type CommentDetail = Comment & {
//   postId: number;
//   name: string;
// };

// TODO: RTK Query - Fetch Comments By Id (6)
// Import Hooks yang dibutuhkan (useGetCommentByIdQuery)
import { useGetCommentByIdQuery } from "../services/jsonplaceholder";

const CommentDetailPage = () => {
  const { id } = useParams();

  // TODO: RTK Query - Fetch Comments By Id (7)
  // Comment state dan useEffect yang ada di sini, karena belum dibutuhkan lagi
  // const [commentDetail, setCommentDetail] = useState<CommentDetail>();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetch(
  //         `https://jsonplaceholder.typicode.com/comments/${id}`
  //       );

  //       if (!response.ok) {
  //         throw new Error("Terjadi sebuah error !");
  //       }

  //       const responseJson: CommentDetail = await response.json();
  //       setCommentDetail(responseJson);
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         console.log(err.message);
  //       }
  //     }
  //   })();
  // }, [id]);

  // TODO: RTK Query - Fetch Comments By Id (8)
  // Di sini kita akan coba menggunakan isLoading dan data dari Hooks
  const { data: commentDetail, isLoading } = useGetCommentByIdQuery(Number(id));

  return (
    <>
      {/* // TODO: RTK Query - Fetch Comments By Id (9) */}
      {/* Di sini kita akan mencoba untuk menggunakan isLoading bawaan dari Hooks */}
      {isLoading && (
        <>
          <p>Loading ...</p>
        </>
      )}
      {!isLoading && (
        <>
          <p>Id: {commentDetail?.id}</p>
          <p>PostId: {commentDetail?.postId}</p>
          <p>Name: {commentDetail?.name}</p>
          <p>Email: {commentDetail?.email}</p>
          <p>Body: {commentDetail?.body}</p>
        </>
      )}
    </>
  );
};

export default CommentDetailPage;
