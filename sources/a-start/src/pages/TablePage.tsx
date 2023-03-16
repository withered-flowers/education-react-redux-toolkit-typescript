import { type Comment } from "../schemas/comment";
import { useLoaderData } from "react-router-dom";

import { Outlet, useNavigate } from "react-router-dom";

const TablePage = () => {
  let comments = useLoaderData() as Comment[];

  const eachRowButtonDeleteOnClickHandler = (data: Comment) => {
    let filteredComments = comments.filter((comment) => comment.id !== data.id);
    comments = filteredComments;
  };

  const navigate = useNavigate();
  const eachRowButtonDetailOnClickHandler = (data: Comment) => {
    navigate(`/table/${data.id}`);
  };

  return (
    <>
      <p>Ini adalah halaman Table</p>

      <Outlet />

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
              <td>
                <button
                  onClick={() => eachRowButtonDetailOnClickHandler(comment)}
                >
                  Detail
                </button>
                <button
                  onClick={() => eachRowButtonDeleteOnClickHandler(comment)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TablePage;
