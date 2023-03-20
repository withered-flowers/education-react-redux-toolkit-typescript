import { type Comment } from "../schemas/comment";
// TODO: RTK Query - Comot semua Comments (5)
// Comment useLoaderData karena sudah tidak digunakan lagi
// import { useLoaderData } from "react-router-dom";

import { Outlet, useNavigate } from "react-router-dom";

// TODO: RTK Query - Comot semua Comments (6)
// Import Hooks yang dibutuhkan di sini
import { useGetCommentsQuery } from "../services/jsonplaceholder";

const TablePage = () => {
  // TODO: RTK Query - Comot semua Comments (7)
  // Comment si comments yang menggunakan useLoaderData
  // let comments = useLoaderData() as Comment[];

  // TODO: RTK Query - Comot semua Comments (8)
  // Di sini kita akan gunakan kembalian data dari Hooks yang sudah diimport
  // Untuk melihat kembaliannya ada apa saja, kita bisa baca di dokumentasi berikut:
  // https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values

  // Yang akan kita gunakan di sini hanyalah "data" saja

  // FYI:
  // - Untuk manual refetch, coba lihat property "refetch" yah !
  // - Ada juga yang cukup umum digunakan, yaitu "isLoading" dan "isError"

  // Supaya tidak mengubah kode terlalu banyak, kita akan menggunakan
  // alias dengan nama "comments"

  // Perhatikan tipe data dari "data" yang ada di sini
  // Bisa Comment[] ATAU undefined !
  let { data: comments } = useGetCommentsQuery();

  const eachRowButtonDeleteOnClickHandler = (data: Comment) => {
    // TODO: RTK Query - Comot semua Comments (9)
    // Karena di sini comments sudah bisa undefined, maka kita harus menggunakan
    // Optional Chaining (?.)
    let filteredComments = comments?.filter(
      (comment) => comment.id !== data.id
    );

    // Sebenarnya di sini tetap kurang bisa digunakan
    // Karena seharusnya di sini menggunakan refetch
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
          {/* // TODO: RTK Query - Comot semua Comments (10) */}
          {/* // Karena di sini bisa undefined, gunakan Optional Chaining (?.) */}
          {comments?.map((comment) => (
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
