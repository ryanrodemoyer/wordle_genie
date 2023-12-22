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
      uniques: [...new Set(x)],
    };
  });

  return index;
};

const config = {
  words: wordIndex(words),
  attempts: [
    {
      id: 1,
      value: "built",
      letters: [
        { idx: 1, result: "NO", value: "B" },
        { idx: 2, result: "WARM", value: "U" },
        { idx: 3, result: "NO", value: "I" },
        { idx: 4, result: "NO", value: "L" },
        { idx: 5, result: "WARM", value: "T" },
      ],
    },
    {
      id: 2,
      value: "check",
      letters: [
        { idx: 1, result: "NO", value: "C" },
        { idx: 2, result: "WARM", value: "H" },
        { idx: 3, result: "NO", value: "E" },
        { idx: 4, result: "YES", value: "C" },
        { idx: 5, result: "NO", value: "K" },
      ],
    },
    // {
    //   id: 3,
    //   value: "tough",
    //   letters: [
    //     { idx: 1, result: "YES", value: "T" },
    //     { idx: 2, result: "YES", value: "O" },
    //     { idx: 3, result: "YES", value: "U" },
    //     { idx: 4, result: "NO", value: "G" },
    //     { idx: 5, result: "YES", value: "H" },
    //   ],
    // },
  ],
};

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

const solver = (config) => {
  let results = [...config.words];
  for (let i = 1; i <= config.attempts.length; i++) {
    const attempts = config.attempts.filter((x) => x.id <= i);
    for (const attempt of attempts) {
      for (let [k, letter] of attempt.letters.entries()) {
        switch (letter.result) {
          case "YES":
            for (let j = results.length - 1; j >= 0; j--) {
              const check =
                results[j].letters.find((y) => y.idx === letter.idx).value ===
                letter.value;
              if (!check) {
                results.splice(j, 1);
              }
            }
            break;
          case "WARM":
            for (let j = results.length - 1; j >= 0; j--) {
              const check = results[j].letters
                .filter((y) => y.idx !== letter.idx)
                .some((y) => y.value === letter.value);
              if (!check) {
                results.splice(j, 1);
              }
            }
            break;
        }
      }
    }
  }
  return results;
};

test("first test", () => {
  const solverResult = solver(config);

  console.dir(solverResult);
});

// test("second test", () => {
//   const results = words.filter(
//     (x) => x[0] === "T" && x[1] === "O" && x[2] === "U" && x[4] === "H"
//   );
//   console.log(results);
// });

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

test("solver", () => {
  const result = solver(config);
});
