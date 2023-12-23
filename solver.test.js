const solver = require("./solver");
const words = require("./words2");

const config = {
  words: words,
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

test("five attempts, target word is slope", () => {
  const result = solver(config);

  expect(result.attempts.length).toBe(5);
  expect(result.attempts[0].possibilities.length).toBe(4202);
  expect(result.attempts[1].possibilities.length).toBe(43);
  expect(result.attempts[2].possibilities.length).toBe(36);
  expect(result.attempts[3].possibilities.length).toBe(3);
  expect(result.attempts[4].possibilities.length).toBe(1);
});
