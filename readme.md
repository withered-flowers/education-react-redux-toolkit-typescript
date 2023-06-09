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
  - [Langkah 1 - Mulai RTK Query (Fetch All Comments)](#langkah-1---mulai-rtk-query-fetch-all-comments)
  - [Langkah 2 - Melanjutkan RTK Query (Fetch Comments by Id)](#langkah-2---melanjutkan-rtk-query-fetch-comments-by-id)
  - [Langkah 3 - Menambahkan Mutation RTK Query (Post Todo)](#langkah-3---menambahkan-mutation-rtk-query-post-todo)

## Disclaimer & Prerequisites

Pada pembelajaran ini diharapkan Anda sudah:

- Mengerti tentang React dan bagaimana cara membuat Custom Hooks
- Mengerti tentang konsep Reducer dan bagaimana cara membuat Reducer Function
- Mengerti sedikit tentang dasar TypeScript
- [OPTIONAL] Mengerti penggunakan Redux (Non-Toolkit) + Redux Thunk
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

Sampai pada titik ini artinya kita sudah berhasil untuk menggunakan RTK loh, SELAMAT YAH !

Ternyata RTK tidak begitu sulit bukan jadinya?

(Hanya saja karena ini TypeScript version, jadi ada beberapa data type yang harus dihafal yah 😭)

Nah sekarang kita akan naik ke level berikutnya.

> Bagiamana bila ada data sifatnya tidak menentu?

Sebagai contoh adalah: Pada saat kita melakukan fetch data, hasil tidak tentu bukan? bisa saja berhasil, bisa saja gagal.

Nah hal ini TIDAK BISA dilakukan / dimasukkan secara langsung ke dalam `reducers` yang ada di dalam `slice`.

Karena di dalam `reducer` merupakan fungsi murni (**pure function**) yang harus bisa di-prediksi outputnya seperti apa, tidak boleh ada yang tidak bisa di-prediksi, atau umumnya disebut efek samping (**side effect**).

Untuk itu sebenarnya bisa saja kita menuliskan logicnya adalah sebagai berikut:

```
(Tidak berupa kode lengkap yah, hanya gambaran)

// slice
type DataExernal

state: {
   dataDariExternal: ...
}

reducer: setDataDariExternal(state, action: PayloadAction<DataExternal>) {
   state.dataDariExternal = action.payload
}

// Component
const Component = () => {
   useEffect(() => {
      (async () => {
         const response = await fetch(...);
         const responseJson: DataExternal = await fetch.json();

         // Anggap ini useAppDispatch
         dispatcher(setDataDariExternal(responseJson));
      })()
   }, []);
}
```

Tapi pada akhirnya bila RTK hanya berfungsi sebagai setter / getter dari sebuah state saja, **Apa gunanya donk?**

Untuk itu sebenarnya kita bisa saja menggunakan tambahan lainnya yang bernama `Middleware` untuk menambahkan `Redux Thunk` ataupun library lainnya ke dalam `Redux` agar dapat men-"delay" eksekusi reducer function dan menjalankan **side effect** (e.g. fetch) terlebih dahulu sebelum menggunakan reducer functionnya

> TL;DR: Menyelipkan fungsi yang sifatnya tidak menentu di tengah perjalanan reducer function, sehingga bisa menerima data yang sifatnya tidak menentu / side effect.

Nah permasalahannya adalah: penggunaan `Middleware` ini konfigurasinya cukup sulit dan pada akhirnya akan menuliskan state serta reducer yang cukup banyak.

Untuk itu tim RTK sendiri memperkenalkan sesuatu untuk menyelesaikan permasalahan ini, namanya adalah `Redux Toolkit Query`

## Redux Toolkit Query

`Redux Toolkit Query`, selanjutnya disebut `RTK Query`, bila kita kutip dari web [RTK Official](https://redux-toolkit.js.org/tutorials/rtk-query), adalah suatu tool yang disediakan oleh tim RTK untuk mencomot data dan cache (`data fetching and caching tool`). `RTK Query` ini dibuat di atas RTK dan sudah include di dalam package @reduxjs/toolkit`, sehingga tidak perlu menambah package lagi !

FYI untuk tim Redux: `Redux Thunk` sudah include di dalam `@reduxks/toolkit`, jadi tidak perlu menggunakan package tambahan lagi! Asyique kan?

FYI untuk tim axios: Tidak perlu menggunakan axios ataupun logic data fetching lainnya, karena sudah `include` di dalam `@reduxjs/toolkit` ini, hanya perlu mendefinisikan endpoint dan data yang dibutuhkan / data yang akan dicomot saja !

## Let's Demo (RTK Query)

Disclaimer:

- Pada pembelajaran ini kita tidak akan menggunakan loader dari data api `React Router` yang akan digabungkan dengan `RTK Query` yah, karena ini pembelajaran yang cukup lanjut.
- Fokus pembelajaran `RTK Query` ini adalah penggunaan `RTK Query` sederhananya saja !

Yuk tanpa berlama-lama lagi, mari kita mencoba untuk menggunakan RTK Query yah.

### Langkah 1 - Mulai RTK Query (Fetch All Comments)

Pada langkah ini kita akan memodifikasi kode yang digunakan untuk fetch all comments yang ada pada `src/routers/index.tsx` dan `src/pages/TablePage.tsx`

Langkah langkah untuk menggunakan fetch all comments-nya adalah sebagai berikut:

Dokumentasi:

- https://redux-toolkit.js.org/tutorials/rtk-query

1. Sekarang kita akan membuat reducer, action, dan statenya terlebih dahulu yah. Nah untuk membuat ketiga hal ini, ketika kita menggunakan `RTK Query`,

   > HAL INI TIDAK PERLU DILAKUKAN !

   Loh kenapa demikian? Karena ini semuanya akan dibuat secara otomatis oleh RTK Query ketika menggunakan sebuah fungsi yang bernama `createApi`.

   Karena `RTK Query` ini berfokus pada fetching data, yang umumnya dari eksternal, dan menggunakan `fetch / axios` pada umumnya, maka pada `RTK Query` ini pun demikian, kita menuliskannya pada tempat yang berbeda dengan `feature`

   Umumnya ketika menggunakan `RTK Query`, kita mendefinisikannya pada sebuah folder bernama `services`

   Dan karena kita menggunakan API dari **jsonplaceholder**, maka kita menggunakan nama filenya adalah: `services/jsonplaceholder.ts`

1. Buat sebuah file dengan nama `/src/services/jsonplaceholder.ts`, kemudian tuliskan kode berikut:

   ```ts
   // Ingat bahwa services ini sifatnya juga akan membuat reducer function
   // sehingga ekstensinya adalah .ts bukan .tsx yah !

   // Import method yang dibutuhkan untuk membuat service
   // Service di sini adalah suatu kumpulan fungsi yang digunakan untuk menembak suatu API

   // Ada kemungkinan fungsi ini tidak bisa ditemukan secara langsung
   // Karena ada banyak slash di dalamnya
   // Sehingga harus ditulis manual
   import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

   // Karena type Comment kita ada di luar file ini, jadinya kita harus import juga
   import type { Comment } from "../schemas/comment";

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
   export const { useGetCommentsQuery } = jsonPlaceholderAPI;
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

1. Selanjutnya kita harus menambahkan "reducer" yang sudah dibuat itu ke dalam file `store.ts`. Padahal dari tadi kita tidak membuat reducer sama sekali yah?

   Karena pada saat membuat _data fetching_ dengan `RTK Query`, kita mendapatkan `state, reducer, dan action` nya secara OTOMATIS.

   Oleh sebab itu, kita hanya perlu menambahkannya ke dalam `store.ts` saja.

   Kode yang harus dimodifikasi pada `/src/app/store.ts` adalah sebagai berikut:

   (Lihat: `TODO: RTK Query - Comot Semua Comments`)

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
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

1. Selanjutnya kita akan memodifikasi file `/routers/index.tsx` sehingga tidak menggunakan loader data api lagi. Modifikasi file `/src/routers/index.tsx` menjadi sebagai berikut:

   (Lihat: `TODO: RTK Query - Comot Semua Comments`)

   ```ts
   import { createBrowserRouter, redirect } from "react-router-dom";

   // TODO: RTK Query - Comot semua Comments (4)
   // Comment type ini karena tidak digunakan lagi di sini
   // import { type Comment } from "../schemas/comment";

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
         // Kita tambahkan kode awalnya sehingga selalu redirect ke halaman "/counter"
         // apabila menuju halaman "/" yah !
         {
           path: "/",
           loader: () => {
             return redirect("counter");
           },
         },
         {
           path: "form",
           element: <FormPage />,
         },
         {
           path: "table",
           element: <TablePage />,
           // TODO: RTK Query - Comot semua Comments (3)
           // Karena kita tidak menggunakan loader lagi, maka fungsi ini kita comment
           // loader: async ({ request }: { request: Request }) => {
           //   console.log(request);

           //   try {
           //     const response = await fetch(
           //       "https://jsonplaceholder.typicode.com/comments"
           //     );

           //     if (!response.ok) {
           //       const body = await response.text();
           //       throw new Error(body);
           //     }

           //     const responseJson: Comment[] = await response.json();

           //     return responseJson;
           //   } catch (err) {
           //     if (typeof err === "string") {
           //       console.log(err);
           //     }
           //   }
           // },

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
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

1. Selanjutnya kita akan memodifikasi file `TablePage.tsx` supaya bisa menggunakan `RTK Query` yang dipakai. Buka kembali file `/src/pages/TablePage.tsx` kemudian modifikasi kodenya menjadi seperti berikut:

   (Lihat: `TODO: RTK Query - Comot Semua Comments`)

   ```ts
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
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

Sampai pada titik ini, artinya kita sudah berhasil untuk melakukan pencomotan data dari `jsonplaceholder` dengan menggunakan `RTK Query` versi TypeScript dengan baik.

Cukup mudah bukan 😊 ?

Memang magic untuk RTK Query ini cukup banyak, namun, bila kita sudah mengetahui magicnya, menggunakan RTK Query ini sebenarnya tidak terlalu sulit yah !

Selanjutnya kita akan mencoba lagi untuk menggunakan yang versi memiliki parameter yah, yaitu untuk melakukan fetching comment berdasarkan id yang diberikan (tombol **Detail**)

### Langkah 2 - Melanjutkan RTK Query (Fetch Comments by Id)

Pada langkah ini kita akan coba untuk mengubah kode yang ada pada `/src/pages/CommentDetailPage.tsx` yang semula menggunakan `useEffect` saja dengan menggunakan `RTK Query`, kira kira jadinya bagaimana yah? 🤔

Mari kita coba untuk melihatnya dengan mengikuti langkah langkah berikut:

1. Buka kembali file `/src/schemas/comment.ts` dan pindahkan type `CommentDetail` dari `/src/pages/CommentDetailPage.tsx` ke dalam `comment.ts`, sehingga kode akhirnya menjadi seperti berikut:

   ```ts
   export type Comment = {
     id: number;
     email: string;
     body: string;
   };

   // TODO: RTK Query - Fetch Comments By Id (1)
   // Karena sekarang CommentDetail akan digunakan pada services
   // Ada baiknya kita type pindahkan CommentDetail dari pages/CommentDetailPage.tsx ke sini
   export type CommentDetail = Comment & {
     postId: number;
     name: string;
   };
   ```

1. Buka kembali file `jsonplaceholder.ts` dan kemudian tambahkan sebuah endpoint dengan nama `getCommentById` dan export hooks dengan nama `useGetCommentByIdQuery`. Modifikasi file `/src/services/jsonplaceholder.ts` menjadi sebagai berikut:

   (Lihat: `TODO: RTK Query - Fetch Comments By Id`)

   ```ts
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
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

1. Selanjutnya kita akan memodifikasi `CommentDetailPage.tsx` untuk bisa menggunakan Hooks yang sudah dibuat secara otomatis, yaitu `useGetCommentByIdQuery`. Buka kembali file `/src/pages/CommentDetailPage.tsx` kemudian modifikasi filenya menjadi sebagai berikut:

   (Lihat: `TODO: RTK Query - Fetch Comments By Id`)

   ```tsx
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
     const { data: commentDetail, isLoading } = useGetCommentByIdQuery(
       Number(id)
     );

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
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

Sampai pada titik ini seharusnya kita sudah berhasil untuk menggunakan `RTK Query` dengan sangat baik untuk Mengambil comment berdasarkan id.

Perubahannya terlihat lebih simpel bukan?

Hal ini terjadi karena kita sudah membuat Garis besar kodenya dengan cukup baik, sehingga modifikasi kodenya menjadi lebih sedikit.

Jadi... Apakah sudah mau berpindah hati ke RTK Query ketimbang menuliskannya secara mandiri? 😊

Selanjutnya kita akan masuk pada materi terakhir (Ya, bener, ini terakhir kok !), yaitu untuk melakukan method Mutation.

Mutation yang akan kita gunakan berupa `POST` yah !

### Langkah 3 - Menambahkan Mutation RTK Query (Post Todo)

Pada langkah ini, kita akan mencoba untuk menggunakan Mutation pada `RTK Query` yah.

Di sini kita akan mengganti kode yang ada pada `FormPage.tsx` untuk bisa menggunakan method `POST` dari `https://reqres.in/api/users` dan akan mengembalikan hasil response kembaliannya tampilan webnya yah !

Langkah-langkahnya adalah sebagai berikut:

1. Sebelum kita masuk ke dalam langkah penulisan kodenya, mari kita membaca sedikit yah data apa saja yang dibutuhkan dan yang akan ditampilkan di web kita.

   ```json
   Request
   {
     "name": "morpheus",
     "job": "leader"
   }

   Response
   {
     "name": "morpheus",
     "job": "leader",
     "id": "496",
     "createdAt": "2023-03-20T07:21:49.612Z"
   }
   ```

1. Setelah ini kita akan mencoba untuk menuliskan tipe data yang dibutuhkan untuk User yah, akan kita buat dengan nama `UserRequest` dan `UserResponse`.

   - `UserRequest` adalah data yang dikirimkan ke API
   - `UserResponse` adalah data kembalian dari API

   Kita akan membuatnya di dalam sebuah schema yang baru dengan nama `user.ts`.

   Buat sebuah file baru dengan nama `/src/schemas/user.ts`, kemudian tambahkan kode berikut yah:

   ```ts
   // TODO: RTK Query Post User - POST todo (1)
   // Karena pada JSON yang terlihat lebih banyak kembalian Response daripada Request
   // maka di sini kita menuliskan UserResponse terlebih dahulu
   export type UserResponse = {
     name: string;
     job: string;
     // Di sini kita menggunakan string karena kembaliannya berupa string yah
     id: string;
     createdAt: string;
   };

   // TODO: RTK Query Post User - POST todo (2)
   // Karena Sebenarnya UserRequest ini sama persis dengan UserReponse
   // Hanya saja tanpa id dan createdAt
   // Kita bisa menggunakan Utils dari TypeScript dengan nama Omit

   // Dokumentasi:
   // - https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
   export type UserRequest = Omit<UserResponse, "id" | "createdAt">;

   // Sehingga di di sini TypeScript akan membuatkan kepada kita UserRequest
   // berdasarkan UserResponse namun tanpa "id" dan "createdAt"
   ```

1. Selanjutnya kita akan melakukan modifikasi terhadap page `FormPage.tsx` untuk bisa menerima input berupa `name` dan `job`.

   Pada pembelajaran sebelumnya kita menggunakan uncontrolled components yah.Sedangkan pada pembelajaran ini kita menggunakan controllerd components, dalam artian bahwa component input-nya akan dikontrol oleh Reactnya.

   Buka kembali file `/src/pages/FormPage.tsx` kemudian modifikasi filenya menjadi sebagai berikut:

   (Lihat: `TODO: RTK Query - POST todo`)

   ```tsx
   // TODO: RTK Query - POST todo (3)
   // Comment SELURUH code yang sebelumnya ada di sini
   // import { FormEvent, useState } from "react";

   // type FormState = {
   //   isError: boolean;
   //   isSuccess: boolean;
   // };

   // const FormPage = () => {
   //   const [formState, setFormState] = useState<FormState>({
   //     isError: false,
   //     isSuccess: false,
   //   });

   //   const formOnSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
   //     event.preventDefault();
   //     localStorage.clear();

   //     const target = event.target as typeof event.target & {
   //       username: { value: string };
   //       password: { value: string };
   //       reset: () => void;
   //     };

   //     const username = target.username.value;
   //     const password = target.password.value;

   //     if (username === "belajar" && password === "react-ts") {
   //       setFormState({
   //         isError: false,
   //         isSuccess: true,
   //       });

   //       localStorage.setItem("login", btoa(username + password));
   //     } else {
   //       setFormState({
   //         isSuccess: false,
   //         isError: true,
   //       });
   //     }

   //     target.reset();
   //   };

   //   return (
   //     <>
   //       <p>Ini adalah halaman Form</p>

   //       <form
   //         onSubmit={formOnSubmitHandler}
   //         style={{
   //           display: "flex",
   //           flexDirection: "column",
   //           gap: "1em",
   //           width: "50vw",
   //         }}
   //       >
   //         <input type="text" name="username" placeholder="Username" />
   //         <input type="password" name="password" placeholder="Password" />
   //         <button type="submit">Lakukan Login</button>
   //       </form>

   //       {formState.isSuccess && (
   //         <p style={{ color: "#008744" }}>
   //           Login Berhasil, silahkan cek Local Storage
   //         </p>
   //       )}

   //       {formState.isError && <p style={{ color: "#D62D20" }}>Login Gagal</p>}
   //     </>
   //   );
   // };

   // export default FormPage;

   // TODO: RTK Query - POST todo (4)
   // Membuat halaman Form yang baru
   import { ChangeEvent, FormEvent, useState } from "react";
   import { type UserRequest } from "../schemas/user";

   const FormPage = () => {
     const [userRequest, setUserRequest] = useState<UserRequest>({
       name: "",
       job: "",
     });

     const formOnSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
       event.preventDefault();

       console.log(userRequest);
     };

     const inputNameOnChangeHandler = (
       event: ChangeEvent<HTMLInputElement>
     ) => {
       const name = event.currentTarget.value;
       setUserRequest({
         ...userRequest,
         name,
       });
     };

     const inputJobOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
       const job = event.currentTarget.value;
       setUserRequest({
         ...userRequest,
         job,
       });
     };

     return (
       <>
         <p>Ini adalah halaman Form</p>

         <form
           onSubmit={formOnSubmitHandler}
           style={{
             display: "flex",
             flexDirection: "column",
             gap: "1em",
             width: "50vw",
           }}
         >
           <input
             type="text"
             name="name"
             placeholder="Name"
             onChange={inputNameOnChangeHandler}
             value={userRequest.name}
           />

           <input
             type="text"
             name="job"
             placeholder="Job"
             onChange={inputJobOnChangeHandler}
             value={userRequest.job}
           />

           <button type="submit">POST user</button>
         </form>
       </>
     );
   };

   export default FormPage;
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

1. Selanjutnya kita akan membuat sebuah services yang baru untuk bisa melakukan `POST` ke `https://reqres.in/api/users`.

   Karena API yang kita gunakan adalah dari https://reqres.in, maka file yang akan kita buat adalah `reqresin.ts`

   Buat sebuah file baru dengan nama `/src/services/reqresin.ts`, kemudian masukkan kode di bawah ini:

   (Lihat: `TODO: RTK Query - POST todo`)

   ```ts
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
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

1. Selanjutnya kita akan memodifikasi file `store.ts` untuk bisa menggunakan service yang sudah kita buat di atas. Buka kembali file `/src/app/store.ts`, lalu masukkan kode berikut:

   (Lihat: `TODO: RTK Query - POST todo`)

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

   // TODO: RTK Query - Comot Semua Comments (1)
   // Import service yang sudah dibuat
   import { jsonPlaceholderAPI } from "../services/jsonplaceholder";

   // TODO: RTK Query - POST todo (6)
   // Import service yang sudah dibuat
   import { reqresinAPI } from "../services/reqresin";

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

       // TODO: RTK Query - POST todo (7)
       // Masukkan reducer dari services yang sudah dibuat di sini
       [reqresinAPI.reducerPath]: reqresinAPI.reducer,
     },

     // TODO: RTK Query - Comot semua Comments (3)
     // Karena RTK Query ini sebenarnya di balik layar menggunakan Thunk
     // Kita harus menyelipkan middlewarenya di sini

     // Tapi.....

     // Lagi lagi karena kita menggunakan RTK Query

     // Middleware (dan Redux Thunk) nya sudah dibuatkan (dan diselipkan) !
     // Jadi kita tinggal sisipkan saja !
     middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware()
         .concat(jsonPlaceholderAPI.middleware)
         // TODO: RTK Query - POST todo (8)
         // Concat middleware reqresin di sini
         .concat(reqresinAPI.middleware),
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

1. Selanjutnya kita akan memodifikasi kembali file `FormPage.tsx` untuk menggunakan mutation yang sudah dibuat. Buka kembali file `/src/pages/FormPage.tsx` kemudian modifikasi filenya menjadi seperti berikut:

   (Lihat: `TODO: RTK Query - POST todo (9) ... (12)`)

   ```tsx
   // TODO: RTK Query - POST todo (3)
   // Comment SELURUH code yang sebelumnya ada di sini
   // import { FormEvent, useState } from "react";

   // type FormState = {
   //   isError: boolean;
   //   isSuccess: boolean;
   // };

   // const FormPage = () => {
   //   const [formState, setFormState] = useState<FormState>({
   //     isError: false,
   //     isSuccess: false,
   //   });

   //   const formOnSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
   //     event.preventDefault();
   //     localStorage.clear();

   //     const target = event.target as typeof event.target & {
   //       username: { value: string };
   //       password: { value: string };
   //       reset: () => void;
   //     };

   //     const username = target.username.value;
   //     const password = target.password.value;

   //     if (username === "belajar" && password === "react-ts") {
   //       setFormState({
   //         isError: false,
   //         isSuccess: true,
   //       });

   //       localStorage.setItem("login", btoa(username + password));
   //     } else {
   //       setFormState({
   //         isSuccess: false,
   //         isError: true,
   //       });
   //     }

   //     target.reset();
   //   };

   //   return (
   //     <>
   //       <p>Ini adalah halaman Form</p>

   //       <form
   //         onSubmit={formOnSubmitHandler}
   //         style={{
   //           display: "flex",
   //           flexDirection: "column",
   //           gap: "1em",
   //           width: "50vw",
   //         }}
   //       >
   //         <input type="text" name="username" placeholder="Username" />
   //         <input type="password" name="password" placeholder="Password" />
   //         <button type="submit">Lakukan Login</button>
   //       </form>

   //       {formState.isSuccess && (
   //         <p style={{ color: "#008744" }}>
   //           Login Berhasil, silahkan cek Local Storage
   //         </p>
   //       )}

   //       {formState.isError && <p style={{ color: "#D62D20" }}>Login Gagal</p>}
   //     </>
   //   );
   // };

   // export default FormPage;

   // TODO: RTK Query - POST todo (4)
   // Membuat halaman Form yang baru
   import { ChangeEvent, FormEvent, useState } from "react";
   import { type UserRequest } from "../schemas/user";

   // TODO: RTK Query - POST todo (9)
   // Import Hooks yang digunakan untuk mutation
   import { useCreateUserMutation } from "../services/reqresin";

   const FormPage = () => {
     const [userRequest, setUserRequest] = useState<UserRequest>({
       name: "",
       job: "",
     });

     // TODO: RTK Query - POST todo (10)
     // Menggunakan hooks pada component

     // Query dan Mutation return hooksnya CUKUP BERBEDA
     // Query = returnya sebuah value dalam bentuk Object
     // Mutation returnnya sebuah ARRAY (tuple):
     //    [0]: Merupakan sebuah fungsi untuk menjalankan mutation (dispatcher)
     //         tipe datanya adalah UseMutationTrigger

     //    [1]: Merupakan Object yang isinya MIRIP dengan Query hooks
     //         tipe datanya adalah UseMutationResult | SelectedUseMutationResult

     // Ceritanya di sini karena Objectnya mirip dengan Query hooks
     // Maka kita akan langsung destructuring untuk mengambil isError dan data yang dikembalikan
     const [dispatcher, { isError, data }] = useCreateUserMutation();

     const formOnSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
       event.preventDefault();

       console.log(userRequest);

       // TODO: RTK Query - POST todo (11)
       // Dispatch si mutasi di sini
       // Karena menerima input (UserRequest)

       // Maka inputnya kita berikan lewat dispatchernya
       dispatcher(userRequest);
     };

     const inputNameOnChangeHandler = (
       event: ChangeEvent<HTMLInputElement>
     ) => {
       const name = event.currentTarget.value;
       setUserRequest({
         ...userRequest,
         name,
       });
     };

     const inputJobOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
       const job = event.currentTarget.value;
       setUserRequest({
         ...userRequest,
         job,
       });
     };

     return (
       <>
         <p>Ini adalah halaman Form</p>

         <form
           onSubmit={formOnSubmitHandler}
           style={{
             display: "flex",
             flexDirection: "column",
             gap: "1em",
             width: "50vw",
           }}
         >
           <input
             type="text"
             name="name"
             placeholder="Name"
             onChange={inputNameOnChangeHandler}
             value={userRequest.name}
           />

           <input
             type="text"
             name="job"
             placeholder="Job"
             onChange={inputJobOnChangeHandler}
             value={userRequest.job}
           />

           <button type="submit">POST user</button>
         </form>

         {/* // TODO: RTK Query - POST todo (12) */}
         {/* Conditional rendering result di sini */}
         {!isError && data && (
           <>
             <p>Hasil kembalian dari API adalah:</p>
             <p>{JSON.stringify(data)}</p>
           </>
         )}
       </>
     );
   };

   export default FormPage;
   ```

   **(Sambil di-copy-paste sambil dibaca yah comment-nya !)**

Sampai pada langkah ini, artinya kita sudah berhasil menggunakan RTK Query untuk melakukan `POST /users` dari `https://reqres.in/api` yah !

Selamat, sampai pada titik ini artinya kita sudah mempelajari cara pakai `RTK` dan `RTK Query` **yang sederhana** dengan baik dan sudah menggunakan TypeScript yah (sambil belajar beberapa tipe data / utils pada TypeScript).

Selanjutnya sebenarnya masih ada cara penggunaan `RTK Query` untuk bisa melakukan automatic re-fetch (data bisa fetch ulang) ataupun menggunakan `cache` dengan baik.

Tapi itu untuk dipelajari secara mandiri yah.

Semoga materi ini bisa membantu teman-teman 🥰

Tetap semangat belajar !
