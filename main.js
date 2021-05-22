function stringMath(eq) {
  if (typeof eq !== "string")
    throw TypeError("The [String] argument is expected.");
  const mulDiv =
    /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([*/])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
  const plusMin =
    /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([+-])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
  const parentheses = /(\d)?\s*\(([^()]*)\)\s*/;
  var current;
  while (eq.search(/^\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*$/) === -1) {
    eq = fParentheses(eq);
    if (eq === current) throw new SyntaxError("The equation is invalid.");
    current = eq;
  }
  return +eq;

  function fParentheses(eq) {
    while (eq.search(parentheses) !== -1) {
      eq = eq.replace(parentheses, function (a, b, c) {
        c = fMulDiv(c);
        c = fPlusMin(c);
        return typeof b === "string" ? `${b}*${c}` : c;
      });
    }
    eq = fMulDiv(eq);
    eq = fPlusMin(eq);
    return eq;
  }

  function fMulDiv(eq) {
    while (eq.search(mulDiv) !== -1) {
      eq = eq.replace(mulDiv, function (a) {
        const sides = mulDiv.exec(a);
        const result =
          sides[2] === "*" ? sides[1] * sides[3] : sides[1] / sides[3];
        return result >= 0 ? `+${result}` : result;
      });
    }
    return eq;
  }

  function fPlusMin(eq) {
    eq = eq.replace(/([+-])([+-])(\d|\.)/g, function (a, b, c, d) {
      return `${b === c ? "+" : "-"}${d}`;
    });
    while (eq.search(plusMin) !== -1) {
      eq = eq.replace(plusMin, function (a) {
        const sides = plusMin.exec(a);
        return sides[2] === "+" ? +sides[1] + +sides[3] : sides[1] - sides[3];
      });
    }
    return eq;
  }
}

if (
  typeof module !== "undefined" &&
  typeof exports !== "undefined" &&
  module.exports
) {
  module.exports = stringMath;
}

// thanks to devrafalko for above code
// his repo https://github.com/devrafalko/string-math

/*
//vars


//funcs

function factorial(num) {
  let sum = 1;
  for (let i = num; i > 0; i--) {
    sum *= i;
  }
  return sum;
}
function miniReset() {

  leftNumber = mainDisplay.innerText;
  secondaryDisplay.innerText = leftNumber;

}



*/

const digitButtons = document.querySelectorAll(".numbers");
const funcButtons = document.querySelectorAll(".func");
const resultButton = document.getElementById("result");
const mainDisplay = document.getElementById("main-display");
const secondaryDisplay = document.getElementById("secondary-display");

digitButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (
      secondaryDisplay.innerText.charAt(
        secondaryDisplay.innerText.length - 1
      ) === "+" ||
      secondaryDisplay.innerText.charAt(
        secondaryDisplay.innerText.length - 1
      ) === "-" ||
      secondaryDisplay.innerText.charAt(
        secondaryDisplay.innerText.length - 1
      ) === "/" ||
      secondaryDisplay.innerText.charAt(
        secondaryDisplay.innerText.length - 1
      ) === "*"
    ) {
      secondaryDisplay.innerText += ` ${button.innerText} `;
    } else {
      secondaryDisplay.innerText += button.innerText;
    }
  })
);
funcButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (mainDisplay.innerText === "") {
      secondaryDisplay.innerText += ` ${button.innerText} `;
    } else {
      secondaryDisplay.innerText = mainDisplay.innerText;
      secondaryDisplay.innerText += ` ${button.innerText} `;
    }
  })
);

resultButton.addEventListener("click", () => {
  mainDisplay.innerText = stringMath(secondaryDisplay.innerText);
  secondaryDisplay.innerText = "";
});
