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
