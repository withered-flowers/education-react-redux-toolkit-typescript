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

  const inputAmountOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
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
