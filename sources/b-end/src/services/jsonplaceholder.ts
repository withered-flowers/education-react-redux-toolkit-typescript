// Ingat bahwa services ini sifatnya juga akan membuat reducer function
// sehingga ekstensinya adalah .ts bukan .tsx yah !

// Import method yang dibutuhkan untuk membuat service
// Service di sini adalah suatu kumpulan fungsi yang digunakan untuk menembak suatu API

// Ada kemungkinan fungsi ini tidak bisa ditemukan secara langsung
// Karena ada banyak slash di dalamnya
// Sehingga harus ditulis manual
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Karena type Comment kita ada di luar file ini, jadinya kita harus import juga
// TODO: RTK Query - Fetch Comments By Id (2)
// Karena di sini kita menggunakan CommentDetail, jangan lupa diimport
import type { Comment, CommentDetail } from "../schemas/comment";

// ----- HATI HATI BANYAK MAGIC YANG DIBUAT DI DALAM SINI ! -----
// ----- BACA PERLAHAN-LAHAN UNTUK BISA MENGERTI MAKSUDNYA ! -----

// Sekarang di sini kita akan mendefinisikan service yang dibutuhkan dengan menggunakan
// Suatu base URL dan endpoint yang harus ditembak

// Di sini kita akan menggunakan createApi

// Ini adalah fungsi bawaan dari RTK Query yang akan membuatkan kita
// Reducer, Action, dan State yang dibutuhkan untuk mencomot data dari API tertentu
// SECARA OTOMATIS !

// Sehingga walaupun di dalam sini akan ada reducer, action, dan state yang seharusnya kita buat
// namun kita tidak perlu memikirkan hal ini, karena sudah di-abstraksi-kan oleh createApi ini
export const jsonPlaceholderAPI = createApi({
  // Di dalam Object ini ada beberapa props yang harus disediakan:
  // - reducerPath, ini merupakan key yang akan dituliskan dan bersifat HARUS UNIQUE
  //      (anggap saja ini adalah nama alias untuk dimasukkan ke dalam store)
  reducerPath: "jsonPlaceholderAPI",

  // - baseQuery: ini adalah fungsi untuk mendefinisikan baseURL dari endpoint yang akan dibuat
  //      di sini kita akan menggunakan fetchBaseQuery

  // Fungsi fetchBaseQuery ini akan menerima sebuah Object
  //      yang harus memiliki baseUrl yang didefinisikan
  baseQuery: fetchBaseQuery({
    // Biasakan untuk baseUrl ini menuliskan `/` di belakangnya
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),

  // - endpoints: ini merupakan endpoint mana saja berdasarkan baseUrl ini data akan dicomot
  //      endpoints ini akan berupa suatu fungsi yang akan membuat actionCreator dan reducer nya
  //      SECARA OTOMATIS !

  //   endpoints ini berupa sebuah fungsi yang akan menerima parameter "builder"
  //      builder ini juga merupakan sebuah Object yang memiliki props "query" dan "mutation"

  //      builder.query (Function): mirip dengan method GET
  //      builder.mutation (Function): mirip dengan method sisanya (POST PUT PATCH DELETE)
  endpoints: (builder) => ({
    // Di sini kita bisa mendefinisikan fungsi apa yang kita butuhkan untuk melakukan fetch data

    // Karena di sini kita akan melakukan fetching comments seluruhnya, maka di sini kita akan
    // memberikan nama fungsinya adalah getComments

    // Di sini karena kita akan melakukan method GET, maka kita mengetahui bahwa kita akan
    // membuat suatu query, oleh karena itu kita akan menggunakan builder.query

    // Supaya TypeScript mengetahui kembalian datanya seperti apa,
    // maka kita akan mendefinisikannya
    // di dalam Generic <TipeDataKembalian, TipeDataInputan>

    // Karena getComments ini akan mengembalikan Array of Type Comment
    // dan tidak menerima input apapun

    // Maka di sini kita akan menuliskannya sebagai builder.query<Comment[], void>
    getComments: builder.query<Comment[], void>({
      // builder.query merupakan suatu fungsi yang akan menerima suatu Object
      // di dalam Object ini kita membutuhkan sebuah props: "query"
      //    "query": sebuah fungsi yang membutuhkan suatu parameter berupa
      //             input-an dari query yang akan ditembak

      //             Fungsi ini akan mengembalikan sebuah Object
      //             yang membutuhkan property suatu "url"

      //             Atau bisa mengembalikan langsung string saja
      //             () => Object | string

      // Pada saat kita menembak ke https://jsonplaceholder.typicode.com/comments
      // kita tidak membutuhkan input, sehingga pada fungsi query di bawah
      // parameternya adalah kosong
      query: () => ({
        url: "comments",
      }),
      // Bisa juga dituliskan dengan shorthand langsung url sebagai berikut
      // query: () => "comments"

      // Gunakan cara Object bila ingin melakukan transformResponse / transformErrorResponse
      // Gunakan cara shorthand bila ingin semua diotomasi oleh RTK Query

      // FYI:
      // Untuk yang membutuhkan response yang diubah
      // Misalnya: kembalian JSONnya tidak tepat dan butuh diubah supaya tepat

      // RTK Query sudah menyediakan juga yang dinamakan dengan transformResponse
      // https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-query-responses-with-transformresponse
    }),

    // TODO: RTK Query - Fetch Comments By Id (3)
    // Sekarang di sini kita akan menambahkan sebuah Endpoint yang baru

    // karena ini akan mengambil comment berdasarkan id, sebut saja namanya adalah
    // "getCommentById"

    // Karena getCommentById ini harapannya akan mengembalikan sebuah CommentDetail,
    // dan membutuhkan parameter berupa id dari CommentDetail yang akan diambil
    // Maka cara membuat builder.query nya sekarang berbeda dengan yang ada di atas

    // Akan kita buat Genericnya menjadi <CommentDetail, number>

    // Maksudnya adalah:
    // - TipeDataOutput dari fetch-er ini adalah CommentDetail
    // - TipeDataInput dari fetch-er ini adalah number

    // FYI:
    // Input di sini HANYA boleh menerima satu saja variabelnya <TipeDataInput>
    // Apabila input-nya lebih dari satu, WAJIB dibuatkan Type-nya terlebih dahulu
    // Sehingga nanti akan berupa suatu Object yang bisa menerima banyak property
    getCommentById: builder.query<CommentDetail, number>({
      // Pada saat kita menembak ke https://jsonplaceholder.typicode.com/comments/{id}
      // Kita membutuhkan input berupa id

      // Seharusnya TypeScript tidak mengerti bahwa id yang dimaksud adalah suatu number
      // Namun, karena pada builder.query kita sudah mendefinisikan Generic Type untuk
      // Inputnya <TipeDataOutput, TipeDataInput> nya adalah suatu number

      // Sehingga di sini, apabila id-nya kita hover, TypeScript akan mengetahui
      // bahwa id ini akan memiliki tipe data "number"

      // Menarik bukan?
      query: (id) => ({
        url: `comments/${id}`,
      }),
    }),
  }),
});

// Nah pertanyaannya sekarang adalah, kalau sebanyak ini yang diotomasi:
// Q: Bagaimana cara kita menggunakannya di dalam Component yang akan kita buat nanti?
// A: Dengan menggunakan Hooks !

// Lalu pertanyaan selanjutnya adalah:
// Q: Hooks nya dapat dari mana? Bikin sendiri?
// A: OTOMATIS ! dari RTK Query !

// Sekarang kita perlu untuk meng-export Hooks yang otomatis ini supaya bisa digunakan di dalam
// Component yang digunakan

// Caranya adalah dengan....
// Cukup export saja !

// Jadi sebenarnya pada saat kita membuat service dengan menggunakan createApi
// Untuk setiap endpoints yang dibuat, akan secara OTOMATIS dibuatkan Hooks-nya

// Penamaan hooksnya adalah sebagai berikut:
// use<NamaFunctionDiDalamEndpoints>Query bila menggunakan builder.query
// use<NamaFunctionDiDalamEndpoints>Mutation bila menggunakan builder.mutation

// Karena di dalam endpoints nama nya adalah getComments dan dibuat dengan builder.query
// maka yang diexport hooks nya adalah useGetCommentsQuery
export const {
  useGetCommentsQuery,
  // TODO: RTK Query - Fetch Comments By Id (4)
  // Di sini kita akan menambahkan Hooks untuk getCommentById
  // yaitu useGetCommentByIdQuery
  useGetCommentByIdQuery,
} = jsonPlaceholderAPI;
