import { FormEvent, useState } from "react";

type FormState = {
  isError: boolean;
  isSuccess: boolean;
};

const FormPage = () => {
  const [formState, setFormState] = useState<FormState>({
    isError: false,
    isSuccess: false,
  });

  const formOnSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.clear();

    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
      reset: () => void;
    };

    const username = target.username.value;
    const password = target.password.value;

    if (username === "belajar" && password === "react-ts") {
      setFormState({
        isError: false,
        isSuccess: true,
      });

      localStorage.setItem("login", btoa(username + password));
    } else {
      setFormState({
        isSuccess: false,
        isError: true,
      });
    }

    target.reset();
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
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Lakukan Login</button>
      </form>

      {formState.isSuccess && (
        <p style={{ color: "#008744" }}>
          Login Berhasil, silahkan cek Local Storage
        </p>
      )}

      {formState.isError && <p style={{ color: "#D62D20" }}>Login Gagal</p>}
    </>
  );
};

export default FormPage;
