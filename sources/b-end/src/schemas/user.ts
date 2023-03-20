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
