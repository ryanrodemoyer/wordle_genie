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

function gameSearch() {
  const game = document.getElementById("wordle-app-game");
  if (game) {
    clearInterval(gameId);

    const board = document.querySelector("[class*='Board-module_board']");
    if (board) {
    }

    const rowsElement = document.querySelectorAll("[class*='Row-module_row']");
    if (rowsElement) {
      rowsElement.forEach((x) => {
        x.style.gridTemplateColumns = "repeat(6, 1fr)";
      });
    }

    const rowIds = ["Row 1", "Row 2", "Row 3", "Row 4", "Row 5", "Row 6"];
    const rows = [];
    rowIds.forEach((x, i) => {
      const d = document.querySelector(`div[aria-label="${x}"]`);

      const div = document.createElement("div");
      div.style.color = "white";
      div.textContent = `${words.length - answers.length} ${d.textContent}`;
      d.appendChild(div);

      rows[i + 1] = d;
    });

    const row1divs = document.querySelectorAll('div[aria-label="Row 1"] > div');
    if (row1divs) {
      // if (row1.length >= 5) {
      //   var fifthElement = elements[4]; // NodeList is zero-indexed, so the 5th element is at index 4
      //   fifthElement.parentNode.insertBefore(
      //     newElement,
      //     fifthElement.nextSibling
      //   );
      // }
    }
  }
}

function buttonSearch() {
  // alert("timer");
  const btn = document.querySelector("button[data-testid='Continue']");
  if (btn) {
    clearInterval(id);

    btn.addEventListener("click", (elem) => {
      adId = setInterval(adSearch, 500);
      gameId = setInterval(gameSearch, 500);
    });

    btn.click();
  } else {
    alert("not found");
  }
}

var id = setInterval(buttonSearch, 500);

document.addEventListener("DOMContentLoaded", (elem) => {});

// console.log("rodey");
// console.log(row1);

// // Select the element to observe
// var targetElement = document.getElementById("myElement");

// // Create a callback function to execute when mutations are observed
// var callback = function (mutationsList, observer) {
//   for (var mutation of mutationsList) {
//     if (mutation.type === "childList") {
//       console.log("A child node has been added or removed.");
//     } else if (mutation.type === "attributes") {
//       console.log("The " + mutation.attributeName + " attribute was modified.");
//     }
//   }
// };

// // Create an instance of MutationObserver with the callback
// var observer = new MutationObserver(callback);

// // Set up the observation options
// var config = {
//   attributes: true,
//   childList: true,
//   subtree: true,
// };

// // Start observing the target element for configured mutations
// observer.observe(targetElement, config);

// // Later, you can stop observing
// // observer.disconnect();
