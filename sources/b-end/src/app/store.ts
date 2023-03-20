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
  },
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
