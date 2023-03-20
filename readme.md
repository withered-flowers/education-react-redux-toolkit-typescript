# Education React Redux Toolkit (TypeScript ver)

## Table of Content

- [Disclaimer & Prerequisites](#disclaimer--prerequisites)
- [Intro](#intro)
- [Redux Toolkit](#redux-toolkit)
- [Redux Toolkit Query](#redux-toolkit-query)
- [Let's Demo (Redux Toolkit)](#lets-demo-redux-toolkit)
  - [Langkah 1 - Inisialisasi Project](#langkah-1---inisialisasi-project)
  - [Langkah 2 - Mulai RTK (duoCounter)](#langkah-2---mulai-rtk-duocounter)
- [Let's Demo (RTK Query)](#lets-demo-rtk-query)

## Disclaimer & Prerequisites

Pada pembelajaran ini diharapkan Anda sudah:

- Mengerti tentang React dan bagaimana cara membuat Custom Hooks
- Mengerti tentang konsep Reducer dan bagaimana cara membuat Reducer Function
- Mengerti sedikit tentang dasar TypeScript
- [OPTIONAL] Mengerti penggunakan Redux (Non-Toolkit)
- [OPTIONAL] Sudah membaca tentang pembelajaran sebelumnya mengenai [React Router TypeScript ver](https://education.withered-flowers.dev/education-react-router-typescript/)

Pada pembelajaran ini Anda diharapkan:

- Menggunakan Rulers > 100 column pada setting VSCode (`editor.rulers: [100]`)
  - `CTRL + SHIFT + P` / `CMD + SHIFT + P` -> ketik `Preferences: Open User Settings (JSON)`
- Tidak membaca kode ini dari `Smartphone` / `HP` ! Karena mengoding butuh layar yang cukup lebar dan panjang agar mata niat mengerjakannya 😊

## Intro

Pada saat kita membuat aplikasi di dalam React, apabila aplikasi kita sudah cukup kompleks, maka kita umumnya akan menemukan masalah dalam mengelola state nya, karena sudah mulai banyak loncatan dari satu Component, ke Component lainnya (`Parent` to `Grand-Grand Children` atau bahkan `Cross Parent Component`) yang menyebabkan harus menggunakan banyak sekali props.

Oleh karena itu umumnya kita akan menggunakan suatu teknik yang bernama `State Management` untuk menyelesaikan hal ini. Nah salah satu `State Management` yang cukup populer ini adalah yang bernama `Redux`.

Nah, dalam perkembangannya, `Redux` dirasa terlalu sulit, sehingga para developer `Redux` mengembangkan cara menggunakan `Redux` yang lebih sederhana bernama `Redux Toolkit`.

## Redux Toolkit

Redux Toolkit, selanjutnya disebut dengan `RTK` merupakan salah satu state management yang cukup populer di kalangan pengguna React, NAMUN memiliki learning curve yang dirasa cukup tinggi ketimbang state management yang lainnya (`useContext` + `Provider` + `useReducer` / `Zustand` / `XState`).

Pada pembelajaran ini kita akan mencoba untuk mencoba menggunakan RTK di dalam aplikasi yang sudah ada sebelumnya yah !

Mohon diperhatikan dalam penggunaan `Redux Toolkit` ini karena cukup banyak `magic` yang digunakan di sini

## Let's Demo (Redux Toolkit)

### Langkah 1 - Inisialisasi Project

Pada langkah ini kita akan melakukan inisialisasi project dan meng-install package yang dibutuhkan untuk menggunakan redux-toolkit terlebih dahulu yah.

Langkah langkah untuk inisialisasi projectnya adalah sebagai berikut:

1. Clone project yang digunakan untuk pembelajaran kali ini: [Repository]https://github.com/withered-flowers/education-react-redux-toolkit
1. Pindah ke directory `sources/a-start` kemudian install package yang digunakan dengan perintah:
   - [npm] npm install
   - [yarn] yarn add
   - [pnpm] pnpm install
1. Untuk bisa menggunakan RTK, kita akan menambahkan package `react-redux` dan `@reduxjs/toolkit`, dengan menggunakan perintah;

   - [npm] npm install react-redux @reduxjs/toolkit
   - [yarn] yarn add react-redux @reduxjs/toolkit
   - [pnpm] pnpm install react-redux @reduxjs/toolkit

1. Sampai pada tahap ini artinya kita sudah siap untuk menuliskan kode kita untuk menggunakan React dengan RTK yah !

### Langkah 2 - Mulai RTK (duoCounter)

Selanjutnya pada langkah ini kita akan memindahkan state `duoCounter` yang ada pada `/src/pages/CounterPage.tsx` ke `Global State` (State yang bisa diakses dari Component manapun) via `RTK`.

Langkah yang harus dilakukan adalah sebagai berikut:

1. Pertama-tama kita akan memindahkan state dan segala macam fungsi perubahan statenya menjadi sebuah `reducer function` yang dimiliki oleh `duoCounter`.

   Karena di dalam React ini sebenarnya `unopinionated`, maka sebenarnya tidak ada folder yang pasti untuk menaruh `reducer function` nya dimana.

   Mungkin pada saat menggunakan `Redux`, teman-teman pada saat membaca dokumentasinya adalah menggunakan folder `reducers` (`/src/reducers`).

   Namun pada saat menggunakan `RTK`, folder yang disarankan adalah `features` (`src/features`), dimana kita akan membuat `reducer function`-nya. Dimana di dalam RTK, namanya menjadi suatu `slice`.

   Jadi pada langkah selanjutnya kita akan membuat sebuah `slice` di dalam `/src/features`

1. Buat sebuah file dengan nama `/src/features/counterSlice.ts`, kemudian menuliskan kode sebagai berikut:

   ```ts
   // Ingat bahwa slice ini sifatnya hanyalah pure function tanpa memiliki Components
   // Sehingga slice SELALU .ts, bukan .tsx !

   // Import method yang dibutuhkan untuk membuat Slice
   import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

   // Sekarang di sini kita akan membuat tipe data untuk duoCounter
   type DuoCounter = {
     firstCounter: number;
     secondCounter: number;
   };

   // Di sini kita akan mendefinisikan initialState pada Slice
   const initialState: DuoCounter = {
     firstCounter: 100,
     secondCounter: 500,
   };

   // Di sini kita akan membuat Slice yang dibutuhkan
   export const counterSlice = createSlice({
     // Di sini kita membutuhkan beberapa property yang required
     // Yang pertama adalah name
     // Ini adalah nama dari slice yang akan dibuat
     // Sebisa mungkin antar satu slice dengan yang lainnya jangan dibuat sama
     name: "counter",

     // Yang kedua adalah initialState
     // dimana kita akan memberikan valuenya adalah initialState yang dibuat
     // di atas
     initialState,

     // Yang ketiga adalah reducers
     // dimana ini adalah object yang berisi seluruh fungsi yang akan
     // memutasikan state yang ada di dalam slice ini
     reducers: {
       // Yang dibutuhkan di dalam reducer ini
       // apabila sesuai dengan CounterPage.tsx yang ada, adalah:
       // 1. Menambahkan firstCounter sebesar 1
       // 2. Menambahkan secondCounter sebesar angka tertentu (amount)

       // Maka di sini kita juga akan membuat dua buah fungsi tersebut

       // Fungsi (1)
       // Fungsi ini akan menerima sebuah parameter
       //   - tipe data WritableDraft dari tipe state yang dibuat:
       //     WritableDraft<DuoCounter> a.k.a state
       // Karena di sini tidak menerima parameter dinamis, maka hanya
       // menerima satu parameter saja

       // state ini berisi seluruh state yang didefine yang sama dengan
       // initialState yang diberikan.
       incrementFirstCounter: (state) => {
         // Di sini karena kita hanya ingin mengganti firstCounter saja
         // maka kita langsung re-assign saja value state.firstCounter sebesar 1

         // DISCLAIMER:
         //    Apabila dari tim Redux, di sini mungkin akan berasa bingung...
         //    Biasanya kan state sifatnya adalah "immutable" (tidak dapat berubah)
         //    di dalam Reducer Function...
         //    Kenapa di sini bisa langsung diassign / diubah begitu?

         //    Jawabannya adalah karena di balik layarnya, RTK ini menggunakan
         //    suatu library tambahan yang bernama "immer".

         //    Dengan "immer" ini, bisa memudahkan kita untuk melakukan mutasi
         //    terhadap sesuatu yang sifatnya "immutable" menjadi seakan-akan
         //    bersifat "mutable", sehingga valuenya BISA langsung diassign !

         //    Asyique kan?
         state.firstCounter += 1;
       },

       // Fungsi (2)
       // Fungsi ini akan menerima dua buah parameter
       //   - state dengan tipe data WritableDraft dari tipe state yang dibuat
       //     (WritableDraft<DuoCounter>)
       //   - action dengan tipe data PayloadAction dengan menyertakan tipe data yang ingin diterima
       //     e.g. PayloadAction<number>
       //       Hal ini menyatakan bahwa action, yang merupakan sebuah Object,
       //       akan memiliki dua buah property yang akan digunakan di untuk memutasi state, yaitu:
       //          action.type => tipe data string, yang menyatakan "logic" dalam memilih
       //                         aksi yang akan dilakukan
       //          action.payload => tipe data sesuai yang diberikan <number>, berarti menjadi number
       //                            merupakan inputan yang diterima
       incrementSecondCounterByAmount: (
         state,
         action: PayloadAction<number>
       ) => {
         // Pada logic yang ada di sini, kita menginginkan
         // secondCounter akan bertambah sesuai dengan payload (number) yang diberikan
         state.secondCounter += action.payload;
       },
     },
   });

   // Untuk setiap reducers yang dibuat di dalam slice di atas,
   // Akan di-export menjadi sebuah fungsi yang dapat dipanggil (di-dispatch)
   // Untuk bisa mengetahui fungsi yang di-dispatch tersebut
   // Umumnya kita membutuhkan nama dari "action" yang akan dilakukan
   // (actionType & actionCreator)

   // Nah dalam RTK kita tidak perlu repot lagi memberikan penamaan action (actionType)
   // ataupun fungsi pembuat actionnya (actionCreator) nya lagi
   // Karena di dalam RTK, SEMUA SUDAH DIBUAT SECARA OTOMATIS !

   // Kita hanya perlu untuk export dari namaSlice.actions
   // untuk mendapatkan fungsi pembuat action-nya (actionCreator)

   // Sebagai informasi untuk tipe datanya adalah:
   // incrementFirstCounter (tanpa payload):
   //    - ActionCreatorWithoutPayload<"namaSlice/namaReducerFn">
   // incrementSecondCounterByAmount (dengan payload):
   //    - ActionCreatorWithPayload<tipePayload, "namaSlice/namaReducerFn">
   export const { incrementFirstCounter, incrementSecondCounterByAmount } =
     counterSlice.actions;

   // Kita hanya perlu untuk export reducer dari namaSlice.reducer
   // untuk mendapatkan seluruh reducer yang dapat digunakan nantinya
   export default counterSlice.reducer;
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

1. Selanjutnya setelah membuat `counterSlice.ts`, kita akan mencoba untuk membuat `store`. `store` isinya adalah fungsi yang dibutuhkan untuk menggabungkan `slice` yang sudah kita buat menjadi satu tempat saja untuk siap disuntik ke dalam aplikasi kita.

   Sekali lagi, pada React, sebenarnya tidak teropini untuk membuat foldernya, namun cara yang disarankan adalah membuat store pada `app/store.ts`.

1. Buat sebuah file dengan nama `/src/app/store.ts`, kemudian menuliskan kode sebagai berikut:

   ```ts
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
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

1. Pada langkah selanjutnya kita akan menyuntikkan `store` yang sudah dibuat ke dalam aplikasi yang kita miliki. Untuk kita kita akan memodifikasi `/src/main.tsx` untuk menggunakan `store` yang kita miliki. Kode yang harus dimodifikasi adalah sebagai berikut:

   ```ts
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
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

1. Sebenarnya kita bisa saja langsung menggunakan kode RTK ini di dalam aplikasi kita dengan menggunakan hooks `useSelector` (untuk mendapatkan state / getter state) dan `useDispatch` (untuk memanggil reducer function dan menjalankan action).

   Hanya saja, sekali lagi, karena kita menggunakan TypeScript, kita menginginkan adanya pengetahuan tentang tipe data apa saja dari fungsi dan variabel yang sudah kita tuliskan.

   Nah apabila menggunakan `useDispatch` dan `useSelector`, hal ini tidak dapat dilakukan, karena TypeScript tidak mengerti tipe data dari dalaman `store` yang sudah kita buat ada apa saja.

   Untuk itu, dari tim RTK sendiri, menyarankan kita untuk membuat sebuah `Custom Hooks`.

   Oleh sebab itu, kita akan membuat `Custom Hooks` nya yah !

   Dari tim RTK sendiri, untuk `Custom Hooks` ini akan dibuat pada file dengan nama `app/hooks.ts`

1. Buat sebuah file baru dengan nama `/src/app/hooks.ts`, kemudian menuliskan kode sebagai berikut:

   ```ts
   // https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks

   // Di sini kita akan import hooks yang sudah disediakan oleh react-redux

   // Q: Padahal ada "hooks", tapi kenapa filenya bukan .tsx yah?
   // A: Karena di sini kita hanya memodifikasi Hooks-nya saja,
   //    tidak melakukan invoke terhadap hooks tersebut
   import { useDispatch, useSelector } from "react-redux";

   // Di sini kita akan import TypeScript related
   import { type TypedUseSelectorHook } from "react-redux";
   import { RootState, AppDispatch } from "./store";

   // Di sini kita akan membuat custom hooks yang akan kita gunakan
   // di dalam Component kita nanti

   // Langsung kita export saja yah !

   // Di sini kita akan "me-rename" useDispatch menjadi useAppDispatch
   // Sambil memberitahukan kepada TS bahwa useAppDispatch adalah sebuah fungsi
   // yang akan mengembalikan AppDispatch dari store yang kita sudah buat
   export const useAppDispatch: () => AppDispatch = useDispatch;

   // Di sini kita akan "me-rename" useSelector menjadi useAppSelector
   // Sambil memberitahukan kepada TS bahwa useAppSelector
   // adalah TypedUseSelectorHook yang memiliki state yang diambil dari RootState
   export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

   // Sehingga sampai pada titik ini, kita akan memiliki dua buah hooks
   // yang bisa kita gunakan:
   // - useAppDispatch untuk men-dispatch action yang akan memanggil reducer function
   // - useAppSelector untuk memilih / mengambil state yang akan dibaca oleh Component kita
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

1. Selanjutnya kita akan mencoba RTK ini di dalam Component kita. Buka kembali file `/src/pages/CounterPage.tsx` dan modifikasi kodenya menjadi sebagai berikut:

   ```ts
   import { ChangeEvent, useState } from "react";

   // TODO: RTK counterSlice - Menggunakan RTK dalam Component (1)
   // Import hooks dan ActionCreator yang dibutuhkan
   import { useAppDispatch, useAppSelector } from "../app/hooks";
   import {
     incrementFirstCounter,
     incrementSecondCounterByAmount,
   } from "../features/counterSlice";

   // TODO: RTK counterSlice - Menggunakan RTK dalam Component (2)
   // Comment data type
   // type DuoCounter = {
   //   firstCounter: number;
   //   secondCounter: number;
   // };

   const CounterPage = () => {
     // TODO: RTK counterSlice - Menggunakan RTK dalam Component (3)
     // Comment useState
     // const [duoCounter, setDuoCounter] = useState<DuoCounter>({
     //   firstCounter: 0,
     //   secondCounter: 0,
     // });

     // TODO: RTK counterSlice - Menggunakan RTK dalam Component (4)
     // Menggunakan useAppSelector untuk mendapatkan seluruh state "counter"
     // "counter" state didapat dari nama "reducers" yang dituliskan pada `app/store.ts`
     // --- configureStore( { reducers: ... } )) ---
     // Kita berikan nama duoCounter agar tidak mengubah kode terlalu banyak dengan sebelumnya

     // Perhatikan pada saat menuliskan state(.) akan muncul counter secara otomatis
     // Karena TypeScript bisa membaca state apa saja yang ada dari RootState !

     // Asik bukan?
     const duoCounter = useAppSelector((state) => state.counter);

     // TODO: RTK counterSlice - Menggunakan RTK dalam Component (5)
     // Menggunakan useAppDispatcher untuk bisa memanggil action yang akan memanggil reducer
     const dispatcher = useAppDispatch();

     const buttonFirstIncrementOnClickHandler = () => {
       // TODO: RTK counterSlice - Menggunakan RTK dalam Component (6)
       // Comment setState dan gunakan useAppDispatch
       // setDuoCounter({
       //   ...duoCounter,
       //   firstCounter: duoCounter.firstCounter + 1,
       // });

       // Perhatikan pada saat meng-hover mouse ke incrementFirstCounter
       // Maka TypeScript akan mengetahui bahwa incrementFirstCounter
       // adalah fungsi ActionCreator yang tidak membutuhkan argument
       dispatcher(incrementFirstCounter());
     };

     const [amount, setAmount] = useState<number>(0);

     const inputAmountOnChangeHandler = (
       event: ChangeEvent<HTMLInputElement>
     ) => {
       const amountValue = event.currentTarget.value;
       const amounValueInNumber = parseInt(amountValue);
       setAmount(amounValueInNumber);
     };

     const buttonSecondIncrementOnClickHandler = () => {
       // TODO: RTK counterSlice - Menggunakan RTK dalam Component (7)
       // Comment setState dan gunakan useAppDispatch
       // setDuoCounter({
       //   ...duoCounter,
       //   secondCounter: duoCounter.secondCounter + amount,
       // });

       // Perhatikan pada saat meng-hover mouse ke incrementSecondCounterByAmount
       // Maka TypeScript akan mengetahui bahwa incrementSecondCounterByAmount
       // adalah fungsi ActionCreator yang membutuhkan argument payload berupa number
       dispatcher(incrementSecondCounterByAmount(amount));
     };

     return (
       <>
         <section className="Duo Counter">
           <p>Value dari firstCounter adalah: {duoCounter.firstCounter}</p>
           <p>Value dari secondCounter adalah: {duoCounter.secondCounter}</p>

           <div style={{ marginBottom: "1em" }}>
             <button onClick={buttonFirstIncrementOnClickHandler}>
               Tambah (firstCounter)
             </button>
           </div>

           <div>
             <input
               style={{ marginRight: "1em" }}
               type="number"
               placeholder="Amount"
               value={amount}
               onChange={inputAmountOnChangeHandler}
             />

             <button onClick={buttonSecondIncrementOnClickHandler}>
               Tambah (secondCounter)
             </button>
           </div>
         </section>
       </>
     );
   };

   export default CounterPage;
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

   Perhatikan bahwa pada kode ini kita tetap menggunakan `useState` yah, hanya saja untuk kebutuhan yang lebih simpel saja (menyimpan form input value)

## Redux Toolkit Query

## Let's Demo (RTK Query)
