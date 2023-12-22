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
      value: "trust",
      letters: [
        { idx: 1, result: "YES", value: "T" },
        { idx: 2, result: "NO", value: "R" },
        { idx: 3, result: "YES", value: "U" },
        { idx: 4, result: "NO", value: "S" },
        { idx: 5, result: "NO", value: "T" },
      ],
    },
    {
      id: 2,
      value: "rifle",
      letters: [
        { idx: 1, result: "NO", value: "R" },
        { idx: 2, result: "NO", value: "I" },
        { idx: 3, result: "NO", value: "F" },
        { idx: 4, result: "NO", value: "L" },
        { idx: 5, result: "NO", value: "E" },
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
      for (const letter of attempt.letters) {
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

test("second test", () => {
  const results = words.filter(
    (x) => x[0] === "T" && x[1] === "O" && x[2] === "U" && x[4] === "H"
  );
  console.log(results);
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

test("solver", () => {
  const result = solver(config);
});
