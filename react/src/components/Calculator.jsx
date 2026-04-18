import React, { useState, useEffect } from "react";
import CompButton from "./CompButton";
import "./Calculator.css";

function Calculator() {
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);
  //useEffect(() => {}, [op, nextValue, prevValue]);

  const CalculatorOperations = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };

  const performOperation = () => {
    let temp = CalculatorOperations[op](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOp(null);
    setNextValue(String(temp));
    setPrevValue(null);
  };

  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const insertDot = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };
  const percentage = () => {
    setNextValue(parseFloat(nextValue) / 100);
    if (prevValue && nextValue === "") {
      setPrevValue(parseFloat(prevValue) / 100);
    }
  };
  const changeSign = () => {
    setNextValue(parseFloat(nextValue) * -1);
  };
  const clearData = () => {
    setNextValue("0");
    setPrevValue(0);
  };

  const handleOperation = (value) => {
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperations) {
      if (op === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (op) {
        setOp(value);
      }
      if (prevValue && op && nextValue) {
        performOperation();
      }
    } else if (value === "c") {
      clearData();
    } else if (value === "\xB1") {
      changeSign();
    } else if (value === ".") {
      insertDot();
    } else if (value === "%") {
      percentage();
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-input">
        <div className="result">{nextValue} </div>
      </div>
      <div className="calculator-keypad">
        <div className="keys-function">
          <CompButton className="comp-button" keyValue={"c"} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={"\xB1"} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={"%"} onClick={handleOperation} />
        </div>
        <div className="keys-operators">
          <CompButton className="comp-button" keyValue={"+"} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={"-"} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={"*"} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={"/"} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={"="} onClick={handleOperation} />
        </div>
        <div className="keys-numbers">
          <CompButton className="comp-button" keyValue={9} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={8} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={7} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={6} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={5} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={4} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={3} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={2} onClick={handleOperation} />
          <CompButton className="comp-button" keyValue={1} onClick={handleOperation} />
          <CompButton className="key-dot comp-button" keyValue={"."} onClick={handleOperation} />
          <CompButton className="key-zero comp-button" keyValue={0} onClick={handleOperation} />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
