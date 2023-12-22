// alert("hey wordle");

var gameId = 0,
  adId = 0;

function adSearch() {
  const ids = ["ad-top"];
  ids.forEach((x) => {
    const ad = document.getElementById(x);
    if (ad) {
      ad.style.minHeight = "0px";
      // ad.parentElement.remove(ad);
    }
  });
}

function gameSearch() {
  const game = document.getElementById("wordle-app-game");
  if (game) {
    // alert("game found");

    clearInterval(gameId);

    const board = document.querySelector("[class*='Board-module_board']");
    if (board) {
      // board.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const rows = document.querySelector("[class*='Row-module_row']");
    if (rows) {
      rows.style.gridTemplateColumns = "repeat(6, 1fr)";
    }

    const row1 = document.querySelector('div[aria-label="Row 1"]');
    if (row1) {
      const div = document.createElement("div");
      div.style.color = "white";
      div.textContent = "1000";

      row1.appendChild(div);
    }

    const row1divs = document.querySelectorAll('div[aria-label="Row 1"] > div');
    if (row1) {
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
