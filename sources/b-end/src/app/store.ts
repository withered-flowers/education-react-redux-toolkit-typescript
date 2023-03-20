// Pada file ini kita akan membuat store yang dibutuhkan
// Anggap saja store ini adalah file utama untuk State Management yang kita miliki

// Ingat bahwa pada app/store.ts ini hanya berisi fungsi fungsi yang kita butuhkan
// untuk menggunakan RTK, sehingga di sini selalu HANYALAH fungsi saja
// ekstensi filenya adalah .ts, bukan .tsx !

// Di sini kita harus menggunakan fungsi bawaan dari RTK yang bernama configureStore

// INGAT (untuk pengguna Redux yang lama):
// - Kita tidak menggunakan createStore / legacy_createStore lagi yah di sini !
import { configureStore } from "@reduxjs/toolkit";

// Yang diexport secara default dari counterSlice adalah counterSlice.reducers
// Sehingga di sini lebih cocok disebut dengan counterReducer
import counterReducer from "../features/counterSlice";

// TODO: RTK Query - Comot Semua Comments (1)
// Import service yang sudah dibuat
import { jsonPlaceholderAPI } from "../services/jsonplaceholder";

// Di sini kita akan membuat storenya
// configureStore ini akan menerima sebuah Object
export const store = configureStore({
  // props paling dibutuhkan di dalam store, apabila kita menggunakan RTK
  // adalah "reducer"

  // "reducer" ini menerima Object yang isinya adalah:
  //   ---- bebas ----
  //   nah loh, mengapa bebas?
  //   Karena isinya adalah:
  //   - props nya adalah alias dari reducer yang akan digunakan
  //   - valuenya adalah nama dari reducer yang akan digunakan
  reducer: {
    counter: counterReducer,

    // TODO: RTK Query - Comot Semua Comments (2)
    // Masukkan reducer dari services yang sudah dibuat disini

    // Dari mana tuh reducernya ada?
    // OTOMATIS dibuatkan pada saat membuat service (creatApi)
    // kita hanya perlu definisikan saja !

    // Ingat di sini perlu menggunakan []

    // Semuanya OTOMATIS !
    [jsonPlaceholderAPI.reducerPath]: jsonPlaceholderAPI.reducer,
  },

  // TODO: RTK Query - Comot semua Comments (3)
  // Karena RTK Query ini sebenarnya di balik layar menggunakan Thunk
  // Kita harus menyelipkan middlewarenya di sini

  // Tapi.....

  // Lagi lagi karena kita menggunakan RTK Query

  // Middleware (dan Redux Thunk) nya sudah dibuatkan (dan diselipkan) !
  // Jadi kita tinggal sisipkan saja !
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonPlaceholderAPI.middleware),
});

// Untuk memudahkan kita dalam menggunakan TypeScriptnya nanti,
// Ada beberapa variabel khusus TypeScript yang harus digunakan

// https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types

// Bagi yang malas baca:
//    Kedua variabel di bawah ini akan digunakan untuk membuat Custom Hooks yang akan
//    kita gunakan agar TypeScript mengerti tipe data yang digunakan untuk masing masing
//    Reducer function yang dipilih (action dispatcher) dan
//    tipe data dari State yang bisa dipilih (state selector)

// Ingat bahwa dengan menggunakan TypeScript kita SANGAT MENGINGINKAN pengetahuan
// tentang tipe data serta props apa saja yang dibutuhkan untuk sebuah variabel / fungsi,
// TIDAK HANYA SEKEDAR any saja !

// Yaitu State global (kita sebut dengan RootState)
export type RootState = ReturnType<typeof store.getState>;

// Dan Dispatch yang bisa membaca seluruh dispatch yang ada (kita sebut AppDispatch)
export type AppDispatch = typeof store.dispatch;
