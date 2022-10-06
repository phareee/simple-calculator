import React, { useState } from "react";
import "./App.css";

function App() {
  const [displayResult, setDisplayResult] = useState(false);
  const [cal, setCal] = useState({
    op1: "0",
    op2: null,
    operation: null,
  });

  const acOnclick = () => {
    if (displayResult) setDisplayResult(false);
    setCal({
      op1: "0",
      op2: null,
      operation: null,
    });
  };

  const calculate = (op1,op2,opr) => {
    if (opr === "+") return op1+op2
    else if (opr === "-") return op1-op2
    else if (opr === "x") return op1*op2
    else if (opr === "/") return op1/op2
  };

  const onOperationClick = (value) => {
    if (cal.op2 === null) {
      setCal({ ...cal, operation: value });
      return;
    } else onEqualClick(value);
  };

  const onEqualClick = (next) => {
    if (cal.operation === null) {
      if (!displayResult) setDisplayResult(true);
      return;
    }
      let op1 = parseFloat(cal.op1 ?? 0)
      let op2 = parseFloat(cal.op2 ?? 0)
      let result = calculate(op1,op2,cal.operation);

      if ((result.toString().split('.')[1] ?? "" ).length > 10){
        result = result.toFixed(10)
      }
      setCal({op1: result.toString(), op2: null, operation: next ?? null})
      setDisplayResult(true);
  }

  const onOperandClick = (value) => {
    let target = cal.operation === null ? "op1" : "op2";
    // console.log(cal[target]);
    if (value === "." && (cal[target] ?? "").includes(".")) return;
    if (value === "." && (cal[target] === null || displayResult)) {
      setCal({ ...cal, [target]: "0."});
    if (displayResult) setDisplayResult(false);
      return;
    }
    setCal({ ...cal, [target]: (cal[target] === "0") || displayResult ? value : (cal[target] ?? "") + value });
    if (displayResult) setDisplayResult(false);
  };

  return (
    <div className="App">
      <h1>Calculator</h1>
      <div className="calculator-container">
        <div className="display-row">
          <label>{cal.op2 || cal.op1}</label>
          </div>
        <div className="button-row">
          <button className="cal-btn" id="ac-btn" onClick={acOnclick}>
            AC
          </button>
          <button className="cal-btn opt-btn" onClick={() => onOperationClick("/")}>
           ÷
          </button>
          <button className="cal-btn opt-btn" onClick={() => onOperationClick("x")}>
          ×
          </button>
        </div>
        <div className="button-row">
          <button className="cal-btn" onClick={() => onOperandClick("7")}>
            7
          </button>
          <button className="cal-btn" onClick={() => onOperandClick("8")}>
            8
          </button>
          <button className="cal-btn" onClick={() => onOperandClick("9")}>
            9
          </button>
          <button className="cal-btn opt-btn" onClick={() => onOperationClick("-")}>
            -
          </button>
        </div>
        <div className="button-row">
          <button className="cal-btn" onClick={() => onOperandClick("4")}>
            4
          </button>
          <button className="cal-btn" onClick={() => onOperandClick("5")}>
            5
          </button>
          <button className="cal-btn" onClick={() => onOperandClick("6")}>
            6
          </button>
          <button className="cal-btn opt-btn" onClick={() => onOperationClick("+")}>
            +
          </button>
        </div>
        <div className="button-row">
          <div className="flex-column">
            <div className="button-row">
              <button
                className="cal-btn cal-btn-btm"
                onClick={() => onOperandClick("1")}
              >
                1
              </button>
              <button
                className="cal-btn cal-btn-btm"
                onClick={() => onOperandClick("2")}
              >
                2
              </button>
              <button
                className="cal-btn cal-btn-btm"
                onClick={() => onOperandClick("3")}
              >
                3
              </button>
            </div>
            <div className="button-row">
              <button
                className="cal-btn"
                id="zero-btn"
                onClick={() => onOperandClick("0")}
              >
                0
              </button>
              <button
                className="cal-btn cal-btn-btm"
                onClick={() => onOperandClick(".")}
              >
                .
              </button>
            </div>
          </div>
          <button
            className="cal-btn opt-btn"
            id="equal-sign"
            onClick={() => onEqualClick()}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
