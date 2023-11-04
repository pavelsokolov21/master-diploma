import { partialRight, curry, map } from "lodash";
import { pipe } from "../utils";

function generateRandomBetween(min, max, exclude) {
  let ranNum = Math.random() * (max - min) + min;

  if (ranNum === exclude) {
    ranNum = generateRandomBetween(min, max, exclude);
  }

  return ranNum;
}

const calculateZ = ({ r, phi }, fn) =>
  fn(2 * Math.PI * phi) * Math.sqrt(-2 * Math.log10(r));

const createArr = (n) => new Array(n);

const fill = (arr, value) => arr.fill(value);

const curriedGenerateNumber = curry(generateRandomBetween);
const curriedMap = curry(map);

const calculateZWithCos = partialRight(calculateZ, Math.cos);
const calculateZWithSin = partialRight(calculateZ, Math.sin);
const fillWithZero = partialRight(fill, 0);

const generateNumberWithMin = curriedGenerateNumber(0);
const generateNumberWithMinMax = generateNumberWithMin(1);
const generateNumberWithMinMaxExcluded = () => generateNumberWithMinMax(0);

const generateQuantities = () => ({
  r: generateNumberWithMinMaxExcluded(),
  phi: generateNumberWithMinMaxExcluded(),
});

const normallyQuantitiesFns = [calculateZWithCos, calculateZWithSin];

const mapWithNormallyQuantitiesFns = curriedMap(normallyQuantitiesFns);

const applyGeneratedQuantities = (quantities) =>
  mapWithNormallyQuantitiesFns((fn) => fn(quantities));

export const calculateNormallyDistributedQuantities = pipe(
  generateQuantities,
  applyGeneratedQuantities
);

const mapWithCalculatingQuantities = partialRight(map, () =>
  calculateNormallyDistributedQuantities()
);

export const calculateManyNormallyDistributedQuantities = pipe(
  createArr,
  fillWithZero,
  mapWithCalculatingQuantities
);
