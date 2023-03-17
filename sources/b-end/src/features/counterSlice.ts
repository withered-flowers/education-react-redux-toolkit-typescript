// Import method yang dibutuhkan untuk membuat Slice
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Sekarang di sini kita akan membuat tipe data untuk duoCounter
type DuoCounter = {
  firstCounter: number;
  duoCounter: number;
};

// Di sini kita akan mendefinisikan initialState pada Slice
const initialState: DuoCounter = {
  firstCounter: 0,
  duoCounter: 0,
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

    incrementSecondCounterByAmount: (
      state,
      action: PayloadAction<number>
    ) => {},
  },
});

export default DuoCounter;
