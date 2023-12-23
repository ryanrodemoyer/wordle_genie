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

function gameInitialize(words) {
  const board = document.querySelector("[class*='Board-module_board']");
  if (board) {
  }

  const rowsElement = document.querySelectorAll("[class*='Row-module_row']");
  if (rowsElement) {
    rowsElement.forEach((x) => {
      x.style.gridTemplateColumns = "repeat(6, 1fr)";
    });
  }

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    // for(let mutation of mutationsList) {
    //     if (mutation.type === 'childList') {
    //         console.log('A child node has been added or removed.');
    //     }
    //     else if (mutation.type === 'attributes') {
    //         console.log(`The ${mutation.attributeName} attribute was modified.`);
    //     }
    // }

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

      const stateMap = {
        present: "WARM",
        absent: "NO",
        correct: "YES",
      };
      const letters = Array.from(d.children).map((y, j) => {
        const val = null;
        try {
          val = y.firstChild.getAttribute("data-state");
        } catch (e) {
          console.log(e);
        }

        return {
          idx: j + 1,
          value: y.firstChild.textContent.toUpperCase(),
          result: stateMap[val],
        };
      });

      return {
        id: x.id,
        value: d.textContent.toUpperCase(),
        letters,
      };
    });

    // alert(JSON.stringify(rows.filter((x) => x.value)));

    const solverResult = solver({
      words,
      attempts: rows.filter((x) => x.value),
    });

    solverResult.attempts.forEach((y) => {
      const d = document.querySelector(`div[aria-label="Row ${y.idx}"]`);

      const div = document.createElement("div");
      div.style.color = "white";
      div.textContent = y.possibilities.length;
      if (y.possibilities.length <= 5) {
        div.textContent += y.possibilities.map((x) => x.value).join(",");
      }
      d.appendChild(div);
    });
  };

  // Create an instance of MutationObserver with the callback
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(board, config);

  // setTimeout(() => {}, 1000);

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
