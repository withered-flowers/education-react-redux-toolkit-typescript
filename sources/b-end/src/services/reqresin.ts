// TODO: RTK Query - POST todo (5)
// Karena sekarang kita menggunakan POST dari reqres.in
// maka ada baiknya kita akan membuat sebuah service yang baru yah !
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type UserRequest, type UserResponse } from "../schemas/user";

// Di sini kita akan mencoba untuk menuliskan API reqresin yang digunakan
export const reqresinAPI = createApi({
  reducerPath: "reqresinAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api/",
  }),
  endpoints: (builder) => ({
    // Karena di sini kita akan melakukan post terhadap user
    // maka kita akan menyebut endpoint kita adalah "createUser"

    // Karena di sini kita menggunakan POST
    // maka kita akan menggunakan builder.mutation

    // builder.mutation merupakan sebuah fungsi yang menerima
    // Generic yang sama dengan builder.query
    // - TipeDataOutput (ResultType)
    // - TipeDataInput (QueryArg)

    // builder.mutation<TipeDataOutput, TipeDataInput>

    // Dan sama dengan builder.query, parameter yang dimasukkan adalah sebuah Object

    // FYI:
    // (Untuk pengguna TypeScript tingkat lanjut)
    // Sebenarnya kita di sini bisa menggunakan TypeScript Utils dengan nama
    // "Pick" dan "Partial" untuk memasukkan TipeDataInput
    createUser: builder.mutation<UserResponse, UserRequest>({
      // Property yang dibutuhkan pun, sama dengan builder.query, yaitu "query"

      // Property query pun sama dengan builder.query punya property query

      // Sebuah fungsi yang menerima input dan mengembalikan sebuah Object
      query: (requestBody) => ({
        // Perbedaannya ada di sini
        // Pada builder.query, kita mungkin hanya menggunakan property yang bernama
        // "url", saja.

        // Namun pada mutation, selain "url", harus ada "method", dan "body" (bila diperlukan)
        // Pada saat kita melakukan POST ke https://reqres.in/api/users dengan data JSON
        // misalnya seperti ini:
        // { "name": "blablabla", "job": "bliblibli" }

        // Maka urlnya adalah "users", method adalah "POST", dan body adalah JSON requestnya
        url: "users",
        method: "POST",
        body: requestBody,
      }),

      // FYI:
      // Di sini juga sebenarnya kita bisa menggunakan property tambahan lainnya seperti
      // - transformResponse
      // - transformErrorResponse
    }),
  }),
});

// Di sini kita akan export Hooks yang didefine
// ----
// Nama Endpoints: createUser
// Tipe builder: mutation
// Nama Hooks yang digenerate => useCreateUserMutation
// ----
export const { useCreateUserMutation } = reqresinAPI;
