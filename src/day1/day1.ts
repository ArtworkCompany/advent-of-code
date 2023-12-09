import { readFile } from "../readFile";

const patternLeftToRight = /\d|one|two|three|four|five|six|seven|eight|nine/g;
const patternRightToLeft = /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g;

const isNumber = (digit: string): boolean => {
  return /^\d+$/.test(digit);
};

const reverseString = (str: string): string => {
  return str.split("").reverse().join("");
};

export const retrieveFirstAndLastDigitWrittenInLetterInTheLine = (
  line: string
): {
  firstDigit: string;
  lastDigit: string;
} => {
  const firstDigit = line.match(patternLeftToRight)!.at(0)!;
  const lastDigit = reverseString(line).match(patternRightToLeft)!.at(0)!;

  return {
    firstDigit: convertDigitWrittenInLetterToDigit(firstDigit),
    lastDigit: convertDigitWrittenInLetterToDigit(reverseString(lastDigit)),
  };
};

const convertDigitWrittenInLetterToDigit = (digit: string): string => {
  if (isNumber(digit)) return digit;

  const digitWrittenInLetter: Record<string, string> = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  return digitWrittenInLetter[digit];
};

const lines = await readFile("day1/day1.txt");

const sumOfDigits = lines.reduce((acc, line) => {
  const { firstDigit, lastDigit } =
    retrieveFirstAndLastDigitWrittenInLetterInTheLine(line);
  const digit = Number(`${firstDigit}${lastDigit}`);

  return acc + digit;
}, 0);

console.log(sumOfDigits);
