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
      value: "chime",
      letters: [
        { idx: 1, result: "WARM", value: "L" },
        { idx: 2, result: "NO", value: "A" },
        { idx: 3, result: "WARM", value: "P" },
        { idx: 4, result: "WARM", value: "S" },
        { idx: 5, result: "YES", value: "E" },
      ],
    },
  ],
};

const solver = (config) => {
  let result = { attempts: [] };

  for (let i = 1; i <= config.attempts.length; i++) {
    const entry = { idx: i, possibilities: [...config.words] };
    result.attempts.push(entry);

    const attempts = config.attempts.filter((x) => x.id <= i);

    const grouped = attempts
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

    for (const attempt of attempts) {
      for (const letter of attempt.letters) {
        switch (letter.result) {
          case "YES":
            for (let j = entry.possibilities.length - 1; j >= 0; j--) {
              const check = entry.possibilities[j].letters.find(
                (y) => y.idx === letter.idx && y.value === letter.value
              );
              if (!check) {
                entry.possibilities.splice(j, 1);
              }
            }
            break;
          case "WARM":
          case "NO":
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

            const search = "PRIDE";

            if (letter.result === "WARM") {
              for (let j = entry.possibilities.length - 1; j >= 0; j--) {
                const word = entry.possibilities[j];
                if (word.value === search) {
                  console.log(word.value);
                }

                const check = entry.possibilities[j].letters
                  .filter((y) => filteredIndexes.includes(y.idx) === false)
                  .some((y) => y.value === letter.value);
                if (!check) {
                  if (entry.possibilities[j].value === search) {
                    console.log(`removing ${search}`);
                  }
                  entry.possibilities.splice(j, 1);
                }
              }
            } else {
              for (let j = entry.possibilities.length - 1; j >= 0; j--) {
                const word = entry.possibilities[j];
                if (word.value === search) {
                  console.log(word.value);
                }
                const check = entry.possibilities[j].letters
                  .filter((y) => filteredIndexes.includes(y.idx))
                  .some((y) => y.value === letter.value);
                if (check) {
                  if (entry.possibilities[j].value === search) {
                    console.log(`removing ${search}`);
                  }
                  entry.possibilities.splice(j, 1);
                }
              }
            }
            break;
        }
      }
    }
  }
  return result;
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
