// FUNCION, function: function -> function PNOMBRE Parametros
// PARAMETROS, (: PARAMETROS -> ( PARAMLIST )
// PARAMLIST, var: PARAMLIST -> var VARIABLE LIST
// VARIABLE, a..z: VARIABLE -> PNOMBRE : IDENTIPO
// PNOMBRE, a..z: PNOMBRE -> LETRA RESTOL
// RESTOL, a..z: RESTOL -> LETRA RESTOL
// RESTOL, (: RESTOL -> nil
// RESTOL, :: RESTOL -> nil
// LETRA, a..z: LETRA -> a..z
// IDENTIPO, integer: IDENTIPO -> integer
// IDENTIPO, real: IDENTIPO -> real
// IDENTIPO, boolean: IDENTIPO -> boolean
// IDENTIPO, string: IDENTIPO -> string
// LIST, ): LIST -> nil
// LIST, ;: LIST -> ; VARIABLE ; LIST

const parserTable = {
  S: {
    function: ["function", "PNOMBRE", "PARAMETROS"],
  },
  PARAMETROS: {
    "(": ["(", "PARAMLIST", ")"],
  },
  PARAMLIST: {
    var: ["var", "VARIABLE", "LIST"],
  },
  VARIABLE: {
    a: ["PNOMBRE", ":", "IDENTIPO"],
    b: ["PNOMBRE", ":", "IDENTIPO"],
    c: ["PNOMBRE", ":", "IDENTIPO"],
    d: ["PNOMBRE", ":", "IDENTIPO"],
    e: ["PNOMBRE", ":", "IDENTIPO"],
    f: ["PNOMBRE", ":", "IDENTIPO"],
    g: ["PNOMBRE", ":", "IDENTIPO"],
    h: ["PNOMBRE", ":", "IDENTIPO"],
    i: ["PNOMBRE", ":", "IDENTIPO"],
    j: ["PNOMBRE", ":", "IDENTIPO"],
    k: ["PNOMBRE", ":", "IDENTIPO"],
    l: ["PNOMBRE", ":", "IDENTIPO"],
    m: ["PNOMBRE", ":", "IDENTIPO"],
    n: ["PNOMBRE", ":", "IDENTIPO"],
    o: ["PNOMBRE", ":", "IDENTIPO"],
    p: ["PNOMBRE", ":", "IDENTIPO"],
    q: ["PNOMBRE", ":", "IDENTIPO"],
    r: ["PNOMBRE", ":", "IDENTIPO"],
    s: ["PNOMBRE", ":", "IDENTIPO"],
    t: ["PNOMBRE", ":", "IDENTIPO"],
    u: ["PNOMBRE", ":", "IDENTIPO"],
    v: ["PNOMBRE", ":", "IDENTIPO"],
    w: ["PNOMBRE", ":", "IDENTIPO"],
    x: ["PNOMBRE", ":", "IDENTIPO"],
    y: ["PNOMBRE", ":", "IDENTIPO"],
    z: ["PNOMBRE", ":", "IDENTIPO"],
  },
  PNOMBRE: {
    a: ["LETRA", "RESTOL"],
    b: ["LETRA", "RESTOL"],
    c: ["LETRA", "RESTOL"],
    d: ["LETRA", "RESTOL"],
    e: ["LETRA", "RESTOL"],
    f: ["LETRA", "RESTOL"],
    g: ["LETRA", "RESTOL"],
    h: ["LETRA", "RESTOL"],
    i: ["LETRA", "RESTOL"],
    j: ["LETRA", "RESTOL"],
    k: ["LETRA", "RESTOL"],
    l: ["LETRA", "RESTOL"],
    m: ["LETRA", "RESTOL"],
    n: ["LETRA", "RESTOL"],
    o: ["LETRA", "RESTOL"],
    p: ["LETRA", "RESTOL"],
    q: ["LETRA", "RESTOL"],
    r: ["LETRA", "RESTOL"],
    s: ["LETRA", "RESTOL"],
    t: ["LETRA", "RESTOL"],
    u: ["LETRA", "RESTOL"],
    v: ["LETRA", "RESTOL"],
    w: ["LETRA", "RESTOL"],
    x: ["LETRA", "RESTOL"],
    y: ["LETRA", "RESTOL"],
    z: ["LETRA", "RESTOL"],
  },
  RESTOL: {
    a: ["LETRA", "RESTOL"],
    b: ["LETRA", "RESTOL"],
    c: ["LETRA", "RESTOL"],
    d: ["LETRA", "RESTOL"],
    e: ["LETRA", "RESTOL"],
    f: ["LETRA", "RESTOL"],
    g: ["LETRA", "RESTOL"],
    h: ["LETRA", "RESTOL"],
    i: ["LETRA", "RESTOL"],
    j: ["LETRA", "RESTOL"],
    k: ["LETRA", "RESTOL"],
    l: ["LETRA", "RESTOL"],
    m: ["LETRA", "RESTOL"],
    n: ["LETRA", "RESTOL"],
    o: ["LETRA", "RESTOL"],
    p: ["LETRA", "RESTOL"],
    q: ["LETRA", "RESTOL"],
    r: ["LETRA", "RESTOL"],
    s: ["LETRA", "RESTOL"],
    t: ["LETRA", "RESTOL"],
    u: ["LETRA", "RESTOL"],
    v: ["LETRA", "RESTOL"],
    w: ["LETRA", "RESTOL"],
    x: ["LETRA", "RESTOL"],
    y: ["LETRA", "RESTOL"],
    z: ["LETRA", "RESTOL"],
    "(": [],
    ":": [],
  },
  LETRA: {
    a: ["a"],
    b: ["b"],
    c: ["c"],
    d: ["d"],
    e: ["e"],
    f: ["f"],
    g: ["g"],
    h: ["h"],
    i: ["i"],
    j: ["j"],
    k: ["k"],
    l: ["l"],
    m: ["m"],
    n: ["n"],
    o: ["o"],
    p: ["p"],
    q: ["q"],
    r: ["r"],
    s: ["s"],
    t: ["t"],
    u: ["u"],
    v: ["v"],
    w: ["w"],
    x: ["x"],
    y: ["y"],
    z: ["z"],
  },
  IDENTIPO: {
    integer: ["integer"],
    real: ["real"],
    boolean: ["boolean"],
    string: ["string"],
  },
  LIST: {
    ")": [],
    ";": [";", "VARIABLE", ";", "LIST"],
  },
};

const terminalTokens = new Set([
  "var",
  "(",
  ")",
  ":",
  "integer",
  "real",
  "boolean",
  "string",
  "function",
  ";",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "$",
]);

function isTerminal(token) {
  return terminalTokens.has(token);
}

export function analyzeSyntax(inputList) {
  let history = "";
  inputList.push("$");
  const stack = ["$", "S"];

  while (stack.length > 0) {
    const a = inputList[0];
    const X = stack[stack.length - 1];
    history += `Pila: ${stack} | Entrada: ${a}\n`;

    if (isTerminal(X)) {
      if (X === a) {
        stack.pop();
        inputList.shift();
      } else {
        return {
          success: false,
          message: `Error, se esperaba ${X}`,
          history: history,
        };
      }
    } else {
      try {
        if (Array.isArray(parserTable[X][a])) {
          stack.pop();
          stack.push(...parserTable[X][a].slice().reverse());
        } else {
          return {
            success: false,
            message: `Error, se esperaba ${toString(parserTable[X])}`,
            history: history,
          };
        }
      } catch (error) {
        return {
          success: false,
          message: `Error, se esperaba ${toString(parserTable[X])}`,
          history: history,
        };
      }
    }
  }

  return { success: true, message: "Gramatica correcta", history: history };
}

function reverseArray(array) {
  let leftIndex = 0;
  let rightIndex = array.length - 1;

  while (leftIndex < rightIndex) {
      let temp = array[leftIndex];
      array[leftIndex] = array[rightIndex];
      array[rightIndex] = temp;

      leftIndex++;
      rightIndex--;
  }

  return array;
}

export function separateElements(inputString) {
  const elements = [
    "function",
    "var",
    "(",
    ")",
    ":",
    "integer",
    "real",
    "boolean",
    "string",
    ";",
  ];
  const outputList = [];
  let currentWord = "";

  for (let char of inputString) {
    if (char === " ") {
      if (currentWord) {
        if (elements.includes(currentWord)) {
          outputList.push(currentWord);
        } else {
          outputList.push(...currentWord);
        }
        currentWord = "";
      }
    } else if (elements.includes(char)) {
      if (currentWord) {
        if (elements.includes(currentWord)) {
          outputList.push(currentWord);
        } else {
          outputList.push(...currentWord);
        }
        currentWord = "";
      }
      outputList.push(char);
    } else {
      currentWord += char;
    }
  }

  if (currentWord) {
    if (elements.includes(currentWord)) {
      outputList.push(currentWord);
    } else {
      outputList.push(...currentWord);
    }
  }

  return outputList;
}
