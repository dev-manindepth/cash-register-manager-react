import { useState } from "react";
import "./styles.css";

export default function App() {
  const [billAmount, setBillAmount] = useState("");
  const [cashGiven, setCashGiven] = useState("");
  const [noOfNotes, setNoOfNotes] = useState([]);
  const [error, setError] = useState("");

  const billHanlder = (e) => {
    setNoOfNotes([])
    setBillAmount(e.target.value);
  };
  const cashHandler = (e) => {
    setNoOfNotes([])
    setCashGiven(e.target.value);
  };
  const denomination = [2000, 500, 100, 20, 10, 5, 1];
  const moneyChangeHanlder = () => {
    if (!billAmount || !cashGiven) {
      setNoOfNotes([]);
      return setError(
        "❌ Please fill the both Bill Amount And Cash Input field"
      );
    }
    if (billAmount && cashGiven) {
      if (isNaN(billAmount) || isNaN(cashGiven)) {
        setNoOfNotes([]);
        return setError(
          "❌ Please Enter valid Amount : Bill Amount and Cash should always be numerical value"
        );
      }
      if (parseInt(cashGiven, 10) < parseInt(billAmount, 10)) {
        setNoOfNotes([]);
        return setError(
          "❌ Cash Amount should be greater or equal to bill Amount"
        );
      }
      setError("");
      setNoOfNotes([]);
      let amountToBeReturned = cashGiven - billAmount;
      for (let i = 0; i < denomination.length; i++) {
        const notesCount = Math.trunc(amountToBeReturned / denomination[i]);

        amountToBeReturned = amountToBeReturned % denomination[i];
        setNoOfNotes((prevNotes) => [...prevNotes, notesCount]);
      }
    }
  };
  return (
    <div className="App">
      <h1 className="app-heading">Cash Register Manager</h1>
      <p>
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return
      </p>
      <h3>Bill Amount: </h3>
      <input className="center" value={billAmount} onChange={billHanlder} />
      <h3>Cash Given: </h3>
      <input className="center" value={cashGiven} onChange={cashHandler} />
      <div className="input-error center">{error}</div>
      <button onClick={moneyChangeHanlder}>Check</button>
      <table className="data-table center">
        <caption className="data-caption">Return Change</caption>
        <tbody>
          <tr>
            <th>No of Notes</th>

            {noOfNotes.length === 0
              ? denomination.map((note, index) => (
                  <td key={`$${index + 1}-{note}`}></td>
                ))
              : noOfNotes.map((note, index) => (
                  <td key={`$${index + 1}-{note}`}>{note}</td>
                ))}
          </tr>
          <tr>
            <th>Note</th>
            {denomination.map((note, index) => (
              <td key={`$${index + 1}-{note}`}>{note}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
