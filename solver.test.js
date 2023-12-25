const solver = require("./solver");
const words = require("./words.json");

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

  expect(
    result.attempts[0].possibilities
      .flatMap((x) => x.letters)
      .filter((x) => ["C", "H", "E", "K"].includes(x))
  ).toStrictEqual([]);

  expect(
    result.attempts[0].possibilities
      .map((x) => ({ value: x.value, letter: x.value[2] }))
      .filter((x) => ["E"].includes(x.letter))
  ).toStrictEqual([]);

  expect(
    result.attempts[1].possibilities
      .flatMap((x) => x.letters)
      .filter((x) => ["R", "I", "D"].includes(x))
  ).toStrictEqual([]);

  expect(
    result.attempts[1].possibilities
      .map((x) => ({ value: x.value, letter: x.value[0] }))
      .filter((x) => ["P"].includes(x.letter))
  ).toStrictEqual([]);

  expect(
    result.attempts[1].possibilities
      .map((x) => ({ value: x.value, letter: x.value[4] }))
      .every((x) => ["E"].includes(x.letter))
  ).toBe(true);

  expect(
    result.attempts[3].possibilities
      .flatMap((x) => x.letters)
      .filter((x) => ["C", "H", "I", "M"].includes(x))
  ).toStrictEqual([]);

  expect(
    result.attempts[3].possibilities
      .map((x) => ({ value: x.value, letter: x.value[4] }))
      .every((x) => ["E"].includes(x.letter))
  ).toBe(true);

  expect(
    result.attempts[4].possibilities
      .flatMap((x) => x.letters)
      .filter((x) => ["A"].includes(x))
  ).toStrictEqual([]);

  expect(result.attempts[4].possibilities.map((x) => x.value)).toStrictEqual([
    "SLOPE",
  ]);
});

test("boche is an attempt, goose is eliminated", () => {
  const local = {
    words: words,
    attempts: [
      {
        id: 1,
        value: "boche",
        letters: [
          { idx: 1, result: "NO", value: "B" },
          { idx: 2, result: "WARM", value: "O" },
          { idx: 3, result: "NO", value: "C" },
          { idx: 4, result: "NO", value: "H" },
          { idx: 5, result: "YES", value: "E" },
        ],
      },
    ],
  };

  const result = solver(local);

  expect(result.attempts.length).toBe(1);
  expect(
    result.attempts[0].possibilities
      .map((x) => ({ value: x.value, letter: x.value[1] }))
      .filter((x) => x.letter === "O")
  ).toStrictEqual([]);
  // expect(result.attempts[0].possibilities.map((x) => x.value)).not.toContain(
  //   "GOOSE"
  // );
});
