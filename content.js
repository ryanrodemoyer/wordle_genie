// import words from "words";
// import answers from "answers";

var gameId = 0;

function adSearch() {
  const ids = ["ad-top"];
  ids.forEach((x) => {
    const ad = document.getElementById(x);
    if (ad) {
      ad.style.minHeight = "0px";
    }
  });
}

const customRows = [];

function gameInitialize(words) {
  const board = document.querySelector("[class*='Board-module_board']");
  if (board) {
  }

  const rowsElement = document.querySelectorAll("[class*='Row-module_row']");
  if (rowsElement) {
    rowsElement.forEach((x) => {
      x.style.gridTemplateColumns = "repeat(6, 1fr)";

      const selectorName = `row${x
        .getAttribute("aria-label")
        .replace(" ", "")}`;
      const div = document.createElement("div");
      div.style.color = "white";
      div.style.gridTemplateColumns = "1 / span 6";
      div.id = selectorName;
      div.textContent = "custom row";
      x.parentNode.insertBefore(div, x.nextSibling);
      customRows[selectorName] = div;
    });
  }

  const customCols = [];

  const callback = function () {
    const rowIds = [
      { id: 1, val: "Row 1" },
      { id: 2, val: "Row 2" },
      { id: 3, val: "Row 3" },
      { id: 4, val: "Row 4" },
      { id: 5, val: "Row 5" },
      { id: 6, val: "Row 6" },
    ];
    const rows = rowIds.map((x) => {
      const d = document.querySelector(`div[aria-label="${x.val}"]`);

      const selectorName = `col${x.id}-custom`;
      const customColsCollection = document.querySelector(`#${selectorName}`);
      if (!customColsCollection) {
        // todo redo this using a row below to show the extra info
        // grid-template-columns: 1 / span 6
        const div = document.createElement("div");
        div.style.color = "white";
        div.id = selectorName;
        div.textContent = "";
        d.appendChild(div);
        customCols[x.id] = div;
      }

      const stateMap = {
        present: "WARM",
        absent: "NO",
        correct: "YES",
      };
      const letters = Array.from(d.children)
        .map((y, j) => {
          let val = null;
          try {
            val = y.firstChild.getAttribute("data-state");
          } catch (e) {
            return null;
          }

          if (val === "tbd") {
            throw new Error("wait longer");
          }

          return {
            idx: j + 1,
            value: y.firstChild.textContent.toUpperCase(),
            result: stateMap[val],
          };
        })
        .filter((y) => y != null);

      return {
        id: x.id,
        value: d.textContent.toUpperCase(),
        letters,
      };
    });

    const solverResult = solver({
      words,
      attempts: rows.filter((x) => x.value),
    });

    solverResult.attempts.forEach((y) => {
      const d = document.querySelector(`div[aria-label="Row ${y.idx}"]`);

      const div = customCols[y.idx];
      const divRow = customRows[`rowRow${y.idx}`];
      div.textContent = ` `;
      divRow.textContent = `${y.possibilities.length}`;
      if (y.possibilities.length <= 10) {
        divRow.textContent = `${y.possibilities.length} - `;

        // div.textContent += y.possibilities.map((x) => x.value).join(",");
        divRow.textContent += y.possibilities.map((x) => x.value).join(",");
      }
    });
  };

  setInterval(callback, 1000);

  const row1divs = document.querySelectorAll('div[aria-label="Row 1"] > div');
  if (row1divs) {
  }
}

function gameSearch() {
  const game = document.getElementById("wordle-app-game");
  if (game) {
    clearInterval(gameId);

    fetch(chrome.runtime.getURL("/words.json"))
      .then((response) => response.json())
      .then((data) => gameInitialize(data))
      .catch((error) => {
        console.error("Error reading JSON file:", error);
      });
  }
}

function buttonSearch() {
  const buttonIds = [
    "button[data-testid='Continue']",
    "button[data-testid='See Stats']",
  ];

  buttonIds.forEach((x) => {
    const btn = document.querySelector(x);
    if (btn) {
      clearInterval(id);

      btn.addEventListener("click", (elem) => {
        adId = setInterval(adSearch, 500);
        gameId = setInterval(gameSearch, 500);
      });

      btn.click();
    } else {
      // alert("not found");
    }
  });
}

var id = setInterval(buttonSearch, 500);
