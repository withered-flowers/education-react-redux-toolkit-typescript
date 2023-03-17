import { createBrowserRouter } from "react-router-dom";

import { type Comment } from "../schemas/comment";

import BaseLayout from "../layouts/BaseLayout";
import FormPage from "../pages/FormPage";
import TablePage from "../pages/TablePage";
import CounterPage from "../pages/CounterPage";
import CommentDetailPage from "../pages/CommentDetailPage";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <h1>Terjadi sebuah error</h1>,
    children: [
      {
        path: "form",
        element: <FormPage />,
      },
      {
        path: "table",
        element: <TablePage />,
        loader: async ({ request }: { request: Request }) => {
          console.log(request);

          try {
            const response = await fetch(
              "https://jsonplaceholder.typicode.com/comments"
            );

            if (!response.ok) {
              const body = await response.text();
              throw new Error(body);
            }

            const responseJson: Comment[] = await response.json();

            return responseJson;
          } catch (err) {
            if (typeof err === "string") {
              console.log(err);
            }
          }
        },

        children: [
          {
            path: ":id",
            element: <CommentDetailPage />,
          },
        ],
      },
      {
        path: "counter",
        element: <CounterPage />,
      },
    ],
  },
  // TODO: baseLayout - Import Layout dan Pages (4)
  // Di sini kita menggunakan Catch All / Splats untuk menerima 404
  // Splats / Catch All / Router 404
  {
    path: "*",
    element: <h1>Not Found Oi !</h1>,
  },
]);

export default router;
