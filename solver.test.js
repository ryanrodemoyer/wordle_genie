// const solver = require("./solver");
const words = require("./words2");

const wordIndex = (words) => {
  const index = words.map((x) => {
    return {
      value: x,
      letters: Array.from(x).reduce((acc, curr, j) => {
        acc.push({ idx: j + 1, value: curr });
        return acc;
      }, []),
    };
  });

  return index;
};

const config = {
  words: wordIndex(words),
  attempts: [
    {
      id: 1,
      value: "check",
      letters: [
        { idx: 1, result: "NO", value: "C" },
        { idx: 2, result: "NO", value: "H" },
        { idx: 3, result: "WARM", value: "E" },
        { idx: 4, result: "NO", value: "C" },
        { idx: 5, result: "NO", value: "K" },
      ],
    },
    {
      id: 2,
      value: "pride",
      letters: [
        { idx: 1, result: "WARM", value: "P" },
        { idx: 2, result: "NO", value: "R" },
        { idx: 3, result: "NO", value: "I" },
        { idx: 4, result: "NO", value: "D" },
        { idx: 5, result: "YES", value: "E" },
      ],
    },
    {
      id: 3,
      value: "chime",
      letters: [
        { idx: 1, result: "NO", value: "C" },
        { idx: 2, result: "NO", value: "H" },
        { idx: 3, result: "NO", value: "I" },
        { idx: 4, result: "NO", value: "M" },
        { idx: 5, result: "YES", value: "E" },
      ],
    },
    {
      id: 4,
      value: "lapse",
      letters: [
        { idx: 1, result: "WARM", value: "L" },
        { idx: 2, result: "NO", value: "A" },
        { idx: 3, result: "WARM", value: "P" },
        { idx: 4, result: "WARM", value: "S" },
        { idx: 5, result: "YES", value: "E" },
      ],
    },
    {
      id: 5,
      value: "slope",
      letters: [
        { idx: 1, result: "YES", value: "S" },
        { idx: 2, result: "YES", value: "L" },
        { idx: 3, result: "YES", value: "O" },
        { idx: 4, result: "YES", value: "P" },
        { idx: 5, result: "YES", value: "E" },
      ],
    },
  ],
};

const groupAtttempts = (attempts, i) => {
  const attemptsCumulative = attempts.filter((x) => x.id <= i);

  const grouped = attemptsCumulative
    .filter((x) => x.id <= i)
    .flatMap((x) => x.letters)
    .reduce((acc, curr) => {
      if (acc.hasOwnProperty(curr.value)) {
        if (acc[curr.value].find((x) => x.result !== curr.result)) {
          acc[curr.value].push(curr);
        }
      } else {
        acc[curr.value] = [curr];
      }
      return acc;
    }, []);
  return grouped;
};

const buildFilteredIndexes = (grouped, letter) => {
  const filteredIndexes = [];
  if (grouped[letter.value].length === 1) {
    if (letter.result === "WARM") {
      filteredIndexes.push(letter.idx);
    } else {
      filteredIndexes.push(...[1, 2, 3, 4, 5]);
    }
  } else {
    filteredIndexes.push(
      ...grouped[letter.value]
        .filter((x) => x.result != "YES")
        .map((x) => x.idx)
    );
  }
  return filteredIndexes;
};
const processYes = (entry, letter) => {
  for (let j = entry.possibilities.length - 1; j >= 0; j--) {
    const check = entry.possibilities[j].letters.find(
      (y) => y.idx === letter.idx && y.value === letter.value
    );
    if (!check) {
      entry.possibilities.splice(j, 1);
    }
  }
};

const processWarm = (entry, letter, filteredIndexes) => {
  for (let j = entry.possibilities.length - 1; j >= 0; j--) {
    const check = entry.possibilities[j].letters
      .filter((y) => filteredIndexes.includes(y.idx) === false)
      .some((y) => y.value === letter.value);
    if (!check) {
      entry.possibilities.splice(j, 1);
    }
  }
};

const processNo = (entry, letter, filteredIndexes) => {
  for (let j = entry.possibilities.length - 1; j >= 0; j--) {
    const check = entry.possibilities[j].letters
      .filter((y) => filteredIndexes.includes(y.idx))
      .some((y) => y.value === letter.value);
    if (check) {
      entry.possibilities.splice(j, 1);
    }
  }
};

const solverPrivate = (words, attempt, i) => {
  const entry = { idx: i, possibilities: [...words] };

  const grouped = groupAtttempts(config.attempts, i);

  for (const letter of attempt.letters) {
    const filteredIndexes = buildFilteredIndexes(grouped, letter);

    switch (letter.result) {
      case "YES":
        processYes(entry, letter);
        break;
      case "WARM":
        processWarm(entry, letter, filteredIndexes);
        break;
      case "NO":
        processNo(entry, letter, filteredIndexes);
        break;
    }
  }

  return entry;
};

const solver = (config) => {
  const results = config.attempts.map((attempt, i) =>
    solverPrivate(config.words, attempt, i + 1)
  );

  return { attempts: results };
};

test("first test", () => {
  const solverResult = solver(config);

  // console.dir(JSON.stringify(solverResult));
  console.dir(solverResult);
});

// test("second test", () => {
//   const results = words.filter(
//     (x) => x[0] === "T" && x[1] === "O" && x[2] === "U" && x[4] === "H"
//   );
//   console.log(results);
// });

test("grouped", () => {
  const arr = [1];
  const arr2 = [3, 2];

  arr.push(...arr2);

  console.dir(arr);
});

test("wordIndex", () => {
  const index = wordIndex(words);

  //   console.dir(JSON.stringify(index));
});

test("explore", () => {
  const no = config.attempts
    .flatMap((x) => x.letters)
    .filter((x) => x.result === "NO")
    .map((x) => x.value);

  //   console.dir(no);
});

// test("solver", () => {
//   const result = solver(config);
// });

// const result = {
//   attempts: [
//     {
//       id: 1,
//       possibilities: calculateRemainingWords(
//         words,
//         config.attempts.filter((x) => x.id <= id)
//       ),
//     },
//     {
//       id: 2,
//       possibilities: calculateRemainingWords(
//         words,
//         config.attempts.filter((x) => x.id <= id)
//       ),
//     },
//     {
//       id: 3,
//       possibilities: calculateRemainingWords(
//         words,
//         config.attempts.filter((x) => x.id <= id)
//       ),
//     },
//   ],
// };
