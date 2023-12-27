// import words from "words";
// import answers from "answers";

const resultMap = {
  present: "WARM",
  absent: "NO",
  correct: "YES",
};

const rowConfig = [
  { id: 1, lbl: "Row 1", customId: "row-Row1" },
  { id: 2, lbl: "Row 2", customId: "row-Row2" },
  { id: 3, lbl: "Row 3", customId: "row-Row3" },
  { id: 4, lbl: "Row 4", customId: "row-Row4" },
  { id: 5, lbl: "Row 5", customId: "row-Row5" },
  { id: 6, lbl: "Row 6", customId: "row-Row6" },
];

const processBoard = function () {
  const rows = rowConfig
    .map((x) => {
      const res = document.querySelector(`div[aria-label="${x.lbl}"]`);

      const letters = Array.from(res.children).map((y, i) => {
        const state = y.firstChild.getAttribute("data-state");
        const value = y.firstChild.textContent.toUpperCase();
        const result = resultMap[state];
        return {
          row: x.id,
          idx: i + 1,
          value,
          result,
        };
      });

      return {
        id: x.id,
        customId: x.customId,
        value: res.textContent,
        letters: letters,
      };
    })
    .filter((x) => x.letters.every((y) => y.result));

  const attempts = rows;
  const solverResult = solver({
    words: window.words,
    attempts: attempts,
  });

  rows.forEach((x) => {
    const r = document.getElementById(x.customId);
    if (r) {
      const a = solverResult.attempts.find((y) => y.idx === x.id);
      if (a) {
        const guess = attempts
          .find((y) => y.id === x.id)
          .letters.every((y) => y.result === "YES");
        if (guess) {
          r.textContent = "winner!";
        } else {
          if (a.possibilities.length <= 6) {
            r.textContent = `${a.possibilities.length} - `;
            r.textContent += a.possibilities.map((y) => y.value).join(",");
          } else {
            r.textContent = `${a.possibilities.length} remaining words`;
          }
        }
      }
    }
  });

  const module = document.querySelector("#wordle-app-game");
  if (module) {
    module.style.height = "700px";
  }

  const board = document.querySelector("[class*='Board-module_board__']");
  if (board) {
    board.style.height = "500px";
  }
};

function gameInitialize(words) {
  // one time setup
  window.words = words;

  // get all default rows from the wordle board
  const rowsElement = document.querySelectorAll("[class*='Row-module_row']");
  if (rowsElement) {
    Array.from(rowsElement)
      .map((x) => {
        const lbl = x.getAttribute("aria-label").replace(" ", "");

        const selectorName = `row-${lbl}`;

        const div = document.createElement("div");
        div.style.color = "white";
        div.style.gridTemplateColumns = "1 / span 5";
        div.id = selectorName;
        div.textContent = " ";

        const res = {
          element: x,
          col: div,
        };
        return res;
      })
      .forEach((x) => {
        x.element.style.gridTemplateColumns = "repeat(5, 1fr)";
        x.element.parentNode.insertBefore(x.col, x.element.nextSibling);
      });

    setInterval(processBoard, 1000);
  }
}

function gameSearch() {
  const game = document.getElementById("wordle-app-game");
  if (game) {
    fetch(chrome.runtime.getURL("/includes/words.json"))
      .then((response) => response.json())
      .then((data) => gameInitialize(data))
      .catch((error) => {
        alert(
          `error downloading word file. refresh the page to try again. message: ${error}`
        );
      })
      .finally(() => clearInterval(intervalId_gameSearch));
  }
}

var intervalId_gameSearch = setInterval(gameSearch, 500);

function buttonSearch() {
  const buttonIds = [
    "button[data-testid='Continue']",
    "button[data-testid='See Stats']",
    "button[class*='Modal-module_closeIconButton']",
  ];

  buttonIds.forEach((x) => {
    const btn = document.querySelector(x);
    if (btn) {
      btn.click();
    }
  });

  clearInterval(intervalId_buttonSearch);
}

var intervalId_buttonSearch = setInterval(buttonSearch, 500);

function adSearch() {
  const ids = ["ad-top"];
  ids.forEach((x) => {
    const ad = document.getElementById(x);
    if (ad) {
      ad.style.minHeight = "0px";
    }
  });
}

var internalId_adSearch = setInterval(adSearch, 1000);
