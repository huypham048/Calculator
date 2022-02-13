const button = document.querySelector(".calc-buttons");
const screen = document.querySelector(".screen");
let previousOperator = null;
let buffer = "0";
let runningSum = 0;

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningSum = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, buffer.length - 1);
      }
      break;
    case "=":
      if (previousOperator === null) return;
      flushOperation(+buffer);
      previousOperator = null;
      buffer = "" + runningSum;
      runningSum = 0;
      break;
    default:
      doMath(symbol);
      break;
  }
}

function doMath(symbol) {
  if (buffer === "0") return;

  const intBuffer = +buffer;
  if (runningSum === 0) {
    runningSum = intBuffer;
    buffer = "0";
  } else {
    flushOperation(intBuffer);
    buffer = "" + runningSum;
    runningSum = 0;
  }
  previousOperator = symbol;
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningSum += intBuffer;
  } else if (previousOperator === "-") {
    runningSum -= intBuffer;
  } else if (previousOperator === "×") {
    runningSum *= intBuffer;
  } else if (previousOperator === "&divide;") {
    runningSum /= intBuffer;
  }
}

function init() {
  button.addEventListener("click", (e) => {
    let value = e.target.innerText;
    if (isNaN(value)) {
      handleSymbol(value);
    } else {
      handleNumber(value);
    }
    screen.innerText = buffer;
  });
}

init();
