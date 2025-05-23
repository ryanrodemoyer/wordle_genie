const solver = require('@rrodey/wordle-solver').solver;
const words = require('@rrodey/wordle-solver').words;

const resultMap = {
  present: 'WARM',
  absent: 'NO',
  correct: 'YES',
};

const rowConfig = [
  { id: 1, lbl: 'Row 1', customId: 'row-Row1' },
  { id: 2, lbl: 'Row 2', customId: 'row-Row2' },
  { id: 3, lbl: 'Row 3', customId: 'row-Row3' },
  { id: 4, lbl: 'Row 4', customId: 'row-Row4' },
  { id: 5, lbl: 'Row 5', customId: 'row-Row5' },
  { id: 6, lbl: 'Row 6', customId: 'row-Row6' },
];

document.addEventListener('DOMContentLoaded', function () {
  var link = document.getElementById('myLink');
  link.addEventListener('click', function () {
    showModal(
      'Modal Title',
      'This is my modal content. Add more content here to test scrolling...'
    );
  });
});

function showModal(titleText, content) {
  // Create modal container
  var modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.backgroundColor = 'white';
  modal.style.padding = '20px';
  modal.style.zIndex = '1000';
  modal.style.borderRadius = '5px';
  modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  modal.style.width = '300px';
  modal.style.height = '300px';
  modal.style.overflowY = 'auto';

  // Create modal background
  var modalBackground = document.createElement('div');
  modalBackground.style.position = 'fixed';
  modalBackground.style.top = '0';
  modalBackground.style.left = '0';
  modalBackground.style.width = '100%';
  modalBackground.style.height = '100%';
  modalBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modalBackground.style.zIndex = '999';

  // Create modal header
  var header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.style.marginBottom = '10px';

  // Create title
  var title = document.createElement('h2');
  title.textContent = titleText;
  title.style.flex = '1';
  title.style.margin = '0';

  // Create close button with SVG
  var closeButton = document.createElement('button');
  closeButton.innerHTML =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
  closeButton.style.border = 'none';
  closeButton.style.background = 'none';
  closeButton.style.cursor = 'pointer';
  closeButton.onclick = function () {
    closeModal();
  };

  // Append title and close button to header
  header.appendChild(title);
  header.appendChild(closeButton);

  // Append header to modal
  modal.appendChild(header);

  // Add content to modal
  var contentElement = document.createElement('div');
  contentElement.innerHTML = content;
  modal.appendChild(contentElement);

  // Append modal and background to body
  document.body.appendChild(modalBackground);
  document.body.appendChild(modal);

  // Close modal when clicking outside
  modalBackground.onclick = function () {
    closeModal();
  };

  function closeModal() {
    document.body.removeChild(modal);
    document.body.removeChild(modalBackground);
  }
}

const generateOutput = (possibilities) => {
  const array = possibilities
    .map((y) => y.value)
    .reduce((acc, curr) => {
      const letter = curr[0];
      if (acc.hasOwnProperty(letter)) {
        acc[letter].push(curr);
      } else {
        acc[letter] = [curr];
      }
      return acc;
    }, {});
  let output = '';
  Object.keys(array).forEach((y) => {
    output += `<p>${y} - ${array[y].join(', ')}</p><br />`;
  });

  return output;
};

const processBoard = function () {
  const rows = rowConfig
    .map((x) => {
      const res = document.querySelector(`div[aria-label="${x.lbl}"]`);

      const letters = Array.from(res.children).map((y, i) => {
        const state = y.firstChild.getAttribute('data-state');
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
    words,
    attempts: attempts,
  });

  rows.forEach((x) => {
    const r = document.getElementById(x.customId);
    if (r) {
      const a = solverResult.attempts.find((y) => y.idx === x.id);
      if (a) {
        const guess = attempts
          .find((y) => y.id === x.id)
          .letters.every((y) => y.result === 'YES');
        if (guess) {
          r.textContent = 'winner!';
        } else {
          r.textContent = `${a.possibilities.length} remaining words`;
          if (a.possibilities.length <= 300) {
            const swe = document.createElement('span');
            swe.textContent = ' view words';
            swe.style.color = 'red';
            swe.onclick = function (e) {
              e.preventDefault();
              const output = generateOutput(a.possibilities);
              showModal('Remaining Words', output);
            };
            r.append(swe);
          }
        }
      }
    }
  });

  const module = document.querySelector('#wordle-app-game');
  if (module) {
    module.style.height = '700px';
  }

  const board = document.querySelector("[class*='Board-module_board__']");
  if (board) {
    board.style.height = '500px';
  }
};

function gameInitialize() {
  // get all default rows from the wordle board
  const rowsElement = document.querySelectorAll("[class*='Row-module_row']");
  if (rowsElement) {
    Array.from(rowsElement)
      .map((x) => {
        const lbl = x.getAttribute('aria-label').replace(' ', '');

        const selectorName = `row-${lbl}`;

        const div = document.createElement('div');
        div.style.color = 'white';
        div.style.gridTemplateColumns = '1 / span 5';
        div.id = selectorName;
        div.textContent = ' ';

        const res = {
          element: x,
          col: div,
        };
        return res;
      })
      .forEach((x) => {
        x.element.style.gridTemplateColumns = 'repeat(5, 1fr)';
        x.element.parentNode.insertBefore(x.col, x.element.nextSibling);
      });

    setInterval(processBoard, 1000);
  }
}

function gameSearch() {
  const game = document.getElementById('wordle-app-game');
  if (game) {
    gameInitialize(words);
    clearInterval(intervalId_gameSearch);
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

function scrollToGame() {
  const game = document.querySelector('div[class^="App-module_gameContainer"');
  if (game) {
    game.scrollIntoView();
    clearInterval(intervalId_scrollToGame);
  }
}

var intervalId_scrollToGame = setInterval(scrollToGame, 500);

function fixFooter() {
  // the footer overlaps with the in-game keyboard
  // so this gets it back to the bottom of the page
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  if (main && footer) {
    main.style.removeProperty('max-height');
    footer.style.position = 'relative';

    clearInterval(intervalId_fixFooter);
  }
}

var intervalId_fixFooter = setInterval(fixFooter, 500);
