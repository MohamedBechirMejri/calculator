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
  if (
    themeButton.innerHTML !=
    `<svg
 xmlns="http://www.w3.org/2000/svg"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 viewBox="0 0 64 64"
>
 <defs>
   <style>
     .cls-1 {
       fill: url(#linear-gradient);
     }
     .cls-2 {
       fill: url(#linear-gradient-2);
     }
     .cls-3 {
       fill: url(#linear-gradient-3);
     }
     .cls-4 {
       fill: url(#linear-gradient-4);
     }
     .cls-5 {
       fill: url(#linear-gradient-5);
     }
     .cls-6 {
       fill: url(#linear-gradient-6);
     }
   </style>
   <linearGradient
     id="linear-gradient"
     x1="25.29"
     y1="16.52"
     x2="35.01"
     y2="16.52"
     gradientUnits="userSpaceOnUse"
   >
     <stop offset="0" stop-color="#9f2fff" />
     <stop offset="1" stop-color="#0bb1d3" />
   </linearGradient>
   <linearGradient
     id="linear-gradient-2"
     x1="21.95"
     y1="19.38"
     x2="24.45"
     y2="19.38"
     xlink:href="#linear-gradient"
   />
   <linearGradient
     id="linear-gradient-3"
     x1="8.86"
     y1="26.16"
     x2="19.54"
     y2="26.16"
     xlink:href="#linear-gradient"
   />
   <linearGradient
     id="linear-gradient-4"
     x1="7.11"
     y1="31.47"
     x2="9.28"
     y2="31.47"
     xlink:href="#linear-gradient"
   />
   <linearGradient
     id="linear-gradient-5"
     x1="4.16"
     y1="24.05"
     x2="59.94"
     y2="24.05"
     xlink:href="#linear-gradient"
   />
   <linearGradient
     id="linear-gradient-6"
     x1="21.5"
     y1="48.12"
     x2="42.5"
     y2="48.12"
     xlink:href="#linear-gradient"
   />
 </defs>
 <g id="_21.moon" data-name="21.moon">
   <path
     class="cls-1"
     d="M33.75,17.3a1,1,0,0,0,.55-1.92c-1.57-.8-9.81-.55-8.94,2.14a1,1,0,0,0,.89.55A1,1,0,0,0,26.7,18,9.84,9.84,0,0,1,33.75,17.3Z"
   />
   <path
     class="cls-2"
     d="M22.73,18.41c-.92.65-1.22,2.1.2,2.25.55,0,.87-.51,1.22-.85C25.07,18.9,23.62,17.47,22.73,18.41Z"
   />
   <path
     class="cls-3"
     d="M19,24.59A8.4,8.4,0,0,0,9.1,26.82a1,1,0,0,0,1.53,1.29,6.42,6.42,0,0,1,4.88-2.26,6.63,6.63,0,0,1,2.62.56A1,1,0,1,0,19,24.59Z"
   />
   <path
     class="cls-4"
     d="M8.49,29.7c-1.41-.22-1.34,1.59-1.38,2.55a1,1,0,0,0,1,1c1.28,0,.91-1.51,1.14-2.36A1,1,0,0,0,8.49,29.7Z"
   />
   <path
     class="cls-5"
     d="M59.87,18.66a1,1,0,0,0-1.1-1.35c-6.37,1.28-12-5.69-9.53-11.66a1,1,0,0,0-1.1-1.35,10.65,10.65,0,0,0-8.89,9.76c-7.57-4.9-18.74-1.61-22.32,6.71C.8,19.64-.52,43.1,15.63,43.82a1,1,0,0,0,0-2C3,41.41,3,23.09,15.63,22.69a9.62,9.62,0,0,1,8.83,5.88,1,1,0,0,0,1.31.54,1,1,0,0,0,.54-1.3,11.6,11.6,0,0,0-7.37-6.62c4.74-9.83,19.52-9.82,24.26,0a11.59,11.59,0,0,0-7.36,6.62,1,1,0,0,0,1.84.76c4-9.53,18.34-6.69,18.39,3.68a9.57,9.57,0,0,1-9.56,9.57,1,1,0,0,0,0,2c10.06.13,15.37-12.5,8.34-19.56A10.6,10.6,0,0,0,59.87,18.66ZM53.2,22.84a11.46,11.46,0,0,0-8-2.07,15.47,15.47,0,0,0-4-5.24A8.62,8.62,0,0,1,46.87,6.7,10.73,10.73,0,0,0,57.26,19.42,8.64,8.64,0,0,1,53.2,22.84Z"
   />
   <path
     class="cls-6"
     d="M41.5,45.56H37.06v-8a1,1,0,1,0-2,0v9a1,1,0,0,0,1,1h3.39L32,57.08l-7.45-9.52h3.39a1,1,0,0,0,1-1v-9a1,1,0,0,0-2,0v8H22.5a1,1,0,0,0-.78,1.62l9.49,12.14a1,1,0,0,0,1.58,0l9.49-12.14A1,1,0,0,0,41.5,45.56Z"
   />
 </g>
</svg>
`
  ) {
    themeButton.innerHTML = `<svg
 xmlns="http://www.w3.org/2000/svg"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 viewBox="0 0 64 64"
>
 <defs>
   <style>
     .cls-1 {
       fill: url(#linear-gradient);
     }
     .cls-2 {
       fill: url(#linear-gradient-2);
     }
     .cls-3 {
       fill: url(#linear-gradient-3);
     }
     .cls-4 {
       fill: url(#linear-gradient-4);
     }
     .cls-5 {
       fill: url(#linear-gradient-5);
     }
     .cls-6 {
       fill: url(#linear-gradient-6);
     }
   </style>
   <linearGradient
     id="linear-gradient"
     x1="25.29"
     y1="16.52"
     x2="35.01"
     y2="16.52"
     gradientUnits="userSpaceOnUse"
   >
     <stop offset="0" stop-color="#9f2fff" />
     <stop offset="1" stop-color="#0bb1d3" />
   </linearGradient>
   <linearGradient
     id="linear-gradient-2"
     x1="21.95"
     y1="19.38"
     x2="24.45"
     y2="19.38"
     xlink:href="#linear-gradient"
   />
   <linearGradient
     id="linear-gradient-3"
     x1="8.86"
     y1="26.16"
     x2="19.54"
     y2="26.16"
     xlink:href="#linear-gradient"
   />
   <linearGradient
     id="linear-gradient-4"
     x1="7.11"
     y1="31.47"
     x2="9.28"
     y2="31.47"
     xlink:href="#linear-gradient"
   />
   <linearGradient
     id="linear-gradient-5"
     x1="4.16"
     y1="24.05"
     x2="59.94"
     y2="24.05"
     xlink:href="#linear-gradient"
   />
   <linearGradient
     id="linear-gradient-6"
     x1="21.5"
     y1="48.12"
     x2="42.5"
     y2="48.12"
     xlink:href="#linear-gradient"
   />
 </defs>
 <g id="_21.moon" data-name="21.moon">
   <path
     class="cls-1"
     d="M33.75,17.3a1,1,0,0,0,.55-1.92c-1.57-.8-9.81-.55-8.94,2.14a1,1,0,0,0,.89.55A1,1,0,0,0,26.7,18,9.84,9.84,0,0,1,33.75,17.3Z"
   />
   <path
     class="cls-2"
     d="M22.73,18.41c-.92.65-1.22,2.1.2,2.25.55,0,.87-.51,1.22-.85C25.07,18.9,23.62,17.47,22.73,18.41Z"
   />
   <path
     class="cls-3"
     d="M19,24.59A8.4,8.4,0,0,0,9.1,26.82a1,1,0,0,0,1.53,1.29,6.42,6.42,0,0,1,4.88-2.26,6.63,6.63,0,0,1,2.62.56A1,1,0,1,0,19,24.59Z"
   />
   <path
     class="cls-4"
     d="M8.49,29.7c-1.41-.22-1.34,1.59-1.38,2.55a1,1,0,0,0,1,1c1.28,0,.91-1.51,1.14-2.36A1,1,0,0,0,8.49,29.7Z"
   />
   <path
     class="cls-5"
     d="M59.87,18.66a1,1,0,0,0-1.1-1.35c-6.37,1.28-12-5.69-9.53-11.66a1,1,0,0,0-1.1-1.35,10.65,10.65,0,0,0-8.89,9.76c-7.57-4.9-18.74-1.61-22.32,6.71C.8,19.64-.52,43.1,15.63,43.82a1,1,0,0,0,0-2C3,41.41,3,23.09,15.63,22.69a9.62,9.62,0,0,1,8.83,5.88,1,1,0,0,0,1.31.54,1,1,0,0,0,.54-1.3,11.6,11.6,0,0,0-7.37-6.62c4.74-9.83,19.52-9.82,24.26,0a11.59,11.59,0,0,0-7.36,6.62,1,1,0,0,0,1.84.76c4-9.53,18.34-6.69,18.39,3.68a9.57,9.57,0,0,1-9.56,9.57,1,1,0,0,0,0,2c10.06.13,15.37-12.5,8.34-19.56A10.6,10.6,0,0,0,59.87,18.66ZM53.2,22.84a11.46,11.46,0,0,0-8-2.07,15.47,15.47,0,0,0-4-5.24A8.62,8.62,0,0,1,46.87,6.7,10.73,10.73,0,0,0,57.26,19.42,8.64,8.64,0,0,1,53.2,22.84Z"
   />
   <path
     class="cls-6"
     d="M41.5,45.56H37.06v-8a1,1,0,1,0-2,0v9a1,1,0,0,0,1,1h3.39L32,57.08l-7.45-9.52h3.39a1,1,0,0,0,1-1v-9a1,1,0,0,0-2,0v8H22.5a1,1,0,0,0-.78,1.62l9.49,12.14a1,1,0,0,0,1.58,0l9.49-12.14A1,1,0,0,0,41.5,45.56Z"
   />
 </g>
</svg>
`;
  } else {
    themeButton.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 64 64"
  >
    <defs>
      <style>
        .cls-1 {
          fill: url(#linear-gradient);
        }
        .cls-2 {
          fill: url(#linear-gradient-2);
        }
        .cls-3 {
          fill: url(#linear-gradient-3);
        }
        .cls-4 {
          fill: url(#linear-gradient-4);
        }
        .cls-5 {
          fill: url(#linear-gradient-5);
        }
        .cls-6 {
          fill: url(#linear-gradient-6);
        }
        .cls-7 {
          fill: url(#linear-gradient-7);
        }
        .cls-8 {
          fill: url(#linear-gradient-8);
        }
        .cls-9 {
          fill: url(#linear-gradient-9);
        }
      </style>
      <linearGradient
        id="linear-gradient"
        x1="17.71"
        y1="31.95"
        x2="46.29"
        y2="31.95"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#9f2fff" />
        <stop offset="1" stop-color="#0bb1d3" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-2"
        x1="31"
        y1="12.67"
        x2="33"
        y2="12.67"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-3"
        x1="42.89"
        y1="18.33"
        x2="48.46"
        y2="18.33"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-4"
        x1="47.83"
        y1="32"
        x2="54.82"
        y2="32"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-5"
        x1="42.88"
        y1="45.67"
        x2="48.46"
        y2="45.67"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-6"
        x1="31"
        y1="51.33"
        x2="33"
        y2="51.33"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-7"
        x1="15.54"
        y1="45.67"
        x2="21.12"
        y2="45.67"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-8"
        x1="9.15"
        y1="32"
        x2="16.19"
        y2="32"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-9"
        x1="15.54"
        y1="18.33"
        x2="21.12"
        y2="18.33"
        xlink:href="#linear-gradient"
      />
    </defs>
    <g id="_1.sun" data-name="1.sun">
      <path
        class="cls-1"
        d="M32,17.71A14.29,14.29,0,0,0,17.71,32c.66,18.91,27.92,18.91,28.58,0A14.29,14.29,0,0,0,32,17.71ZM32,44A12,12,0,0,1,20,32c.55-15.89,23.45-15.88,24,0A12,12,0,0,1,32,44Z"
      />
      <path
        class="cls-2"
        d="M32,16.19a1,1,0,0,0,1-1v-5a1,1,0,1,0-2,0v5A1,1,0,0,0,32,16.19Z"
      />
      <path
        class="cls-3"
        d="M43.88,21.12a1,1,0,0,0,.71-.3l3.57-3.56c.93-.9-.51-2.35-1.42-1.42l-3.56,3.57A1,1,0,0,0,43.88,21.12Z"
      />
      <path
        class="cls-4"
        d="M53.85,31h-5a1,1,0,0,0,0,2h5A1,1,0,0,0,53.85,31Z"
      />
      <path
        class="cls-5"
        d="M44.59,43.18c-.9-.93-2.35.51-1.41,1.41l3.56,3.57c.9.93,2.35-.51,1.42-1.42Z"
      />
      <path
        class="cls-6"
        d="M32,47.81a1,1,0,0,0-1,1v5a1,1,0,0,0,2,0v-5A1,1,0,0,0,32,47.81Z"
      />
      <path
        class="cls-7"
        d="M19.41,43.18l-3.57,3.56c-.93.9.51,2.35,1.42,1.42l3.56-3.57C21.75,43.69,20.31,42.24,19.41,43.18Z"
      />
      <path
        class="cls-8"
        d="M16.19,32a1,1,0,0,0-1-1h-5a1,1,0,1,0,0,2h5A1,1,0,0,0,16.19,32Z"
      />
      <path
        class="cls-9"
        d="M19.41,20.82c.9.93,2.34-.51,1.41-1.41l-3.56-3.57c-.9-.93-2.35.51-1.42,1.42Z"
      />
    </g>
  </svg>`;
  }
});
