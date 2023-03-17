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

- Mengerti tentang React
- Mengerti tentang konsep Reducer dan bagaimana cara membuat Reducer Function
- Mengerti sedikit tentang dasar TypeScript
- [OPTIONAL] Mengerti penggunakan Redux (Non-Toolkit)
- [OPTIONAL] Sudah membaca tentang pembelajaran sebelumnya mengenai [React Router TypeScript ver](https://education.withered-flowers.dev/education-react-router-typescript/)

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

1.

## Redux Toolkit Query

## Let's Demo (RTK Query)
