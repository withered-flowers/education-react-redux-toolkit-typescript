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

  const inputNameOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
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
