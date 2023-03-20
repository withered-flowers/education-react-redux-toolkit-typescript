import React from "react";
import ReactDOM from "react-dom/client";
// TODO: RTK Store - Initialize (1)
// Import App dan css yang sebelumnya ada dihapus saja yah

// TODO: RTK Store - Initialize (2)
// Sekarang di sini kita akan import "Provider" untuk RTK
import { Provider } from "react-redux";
// TODO: RTK Store - Initialize (3)
// Jangan lupa untuk import store dari store yang sudah kita buat pada /src/app/store.ts
import { store } from "./app/store";

import { RouterProvider } from "react-router-dom";
import router from "./routers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* // TODO: RTK Store - Initialize (4) */}
    {/* Harus membungkus Provider sebelum RouterProvider ! */}
    {/* Anggap saja ini adalah Context teratas yang dibutuhkan */}
    {/* Oleh aplikasi React yang kita buat yah ! */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
