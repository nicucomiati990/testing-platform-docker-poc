import { readFileSync } from "node:fs";

const inputFileName = process.argv[2] ?? "";
const solutionFileName = process.argv[3] ?? "";

const inputFileContent = readFileSync(inputFileName, "utf-8");
const solutionFileContent = readFileSync(solutionFileName, "utf-8");

const inputSum = inputFileContent.split(" ").reduce((acc, curr) => {
  const currNumber = Number(curr);
  if (!isNaN(currNumber)) {
    acc += currNumber;
  }
  return acc;
}, 0);

const solutionSum = solutionFileContent.split(" ").reduce((acc, curr) => {
  const currNumber = Number(curr);
  if (!isNaN(currNumber)) {
    acc += currNumber;
  }
  return acc;
}, 0);

// output is the sum of the inputs and solutions
console.log(inputSum + solutionSum);
