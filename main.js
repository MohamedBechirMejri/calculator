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

String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

const digitButtons = document.querySelectorAll(".numbers");
const funcButtons = document.querySelectorAll(".func");
const resultButton = document.getElementById("result");
const mainDisplay = document.getElementById("main-display");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const githubButton = document.getElementById("github");
const githubLogo = document.getElementById("github-logo");
const factorialButton = document.getElementById("factorial");
const positiveNegativeButton = document.getElementById("positive-negative");

const themeButton = document.getElementById("theme");

const container = document.getElementById("container");
const screen = document.getElementById("screen");
const buttonsDiv = document.getElementById("buttons");
const buttons = document.querySelectorAll("button");
const h1 = document.querySelector("h1");
const img = document.querySelector("img");

function factorial(num) {
  let sum = 1;
  for (let i = num; i > 0; i--) {
    sum *= i;
  }
  mainDisplay.innerText = sum;
}

digitButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (
      mainDisplay.innerText.charAt(mainDisplay.innerText.length - 1) === "+" ||
      mainDisplay.innerText.charAt(mainDisplay.innerText.length - 1) === "-" ||
      mainDisplay.innerText.charAt(mainDisplay.innerText.length - 1) === "/" ||
      mainDisplay.innerText.charAt(mainDisplay.innerText.length - 1) === "*"
    ) {
      mainDisplay.innerText += ` ${button.innerText} `;
    } else {
      mainDisplay.innerText += button.innerText;
    }
  })
);
funcButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (mainDisplay.innerText === "") {
      mainDisplay.innerText += ` ${button.innerText} `;
    } else {
      mainDisplay.innerText += ` ${button.innerText} `;
    }
  })
);

resultButton.addEventListener("click", () => {
  mainDisplay.innerText = stringMath(mainDisplay.innerText);
});
clearButton.addEventListener("click", () => {
  mainDisplay.innerText = "";
});
backspaceButton.addEventListener("click", () => {
  mainDisplay.innerText = mainDisplay.innerText.slice(0, -1);
});
githubButton.addEventListener("click", () =>
  window.open("https://github.com/MohamedBechirMejri/", "_blank")
);
githubButton.addEventListener(
  "mouseenter",
  () => (githubLogo.style.fill = "#fff")
);
githubButton.addEventListener(
  "mouseleave",
  () => (githubLogo.style.fill = "#14ddb8")
);
factorialButton.addEventListener("click", () =>
  factorial(mainDisplay.innerText)
);
positiveNegativeButton.addEventListener(
  "click",
  () =>
    (mainDisplay.innerText = mainDisplay.innerText.splice(
      mainDisplay.innerText.lastIndexOf(" ") + 1,
      0,
      "-"
    ))
);

themeButton.addEventListener("click", () => {
  if (themeButton.innerHTML != `???`) {
    themeButton.innerHTML = `???`;
  } else {
    themeButton.innerHTML = `????`;
  }
  container.classList.toggle("dark");
  screen.classList.toggle("dark");
  buttonsDiv.classList.toggle("dark");
  h1.classList.toggle("dark");
  img.classList.toggle("dark");
  buttons.forEach((button) => button.classList.toggle("dark"));
});
