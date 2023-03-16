import { ChangeEvent, useState } from "react";

type DuoCounter = {
  firstCounter: number;
  secondCounter: number;
};

const CounterPage = () => {
  const [duoCounter, setDuoCounter] = useState<DuoCounter>({
    firstCounter: 0,
    secondCounter: 0,
  });

  const buttonFirstIncrementOnClickHandler = () => {
    setDuoCounter({
      ...duoCounter,
      firstCounter: duoCounter.firstCounter + 1,
    });
  };

  const [amount, setAmount] = useState<number>(0);

  const inputAmountOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const amountValue = event.currentTarget.value;
    const amounValueInNumber = parseInt(amountValue);
    setAmount(amounValueInNumber);
  };

  const buttonSecondIncrementOnClickHandler = () => {
    setDuoCounter({
      ...duoCounter,
      secondCounter: duoCounter.secondCounter + amount,
    });
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
