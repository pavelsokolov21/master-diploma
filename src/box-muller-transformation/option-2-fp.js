import {
  anyPass,
  equals,
  pipe,
  add,
  juxt,
  apply,
  applySpec,
  nth,
  prop,
  props,
  partialRight,
  lt,
  times,
  partial,
  unapply,
  identity,
  map,
} from "ramda";

const argsToList = unapply(identity);

const pow2 = partialRight(Math.pow, [2]);

function generateRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
const calculateS = pipe(argsToList, map(pow2), apply(add));
const isSInvalid = anyPass([lt(1), equals(0)]);
const calculateZ = (s, value) => value * Math.sqrt((-2 * Math.log10(s)) / s);
const getS = prop("s");

const generateQuantities = pipe(
  juxt([apply(generateRandomBetween), apply(generateRandomBetween)]),
  applySpec({
    x: nth(0),
    y: nth(1),
    s: apply(calculateS),
  })
);

const generateQuantitiesWhile = (interval) => {
  let values = generateQuantities(interval);

  while (pipe(getS, isSInvalid)(values)) {
    values = generateQuantities(interval);
  }
  return values;
};

export const generateRandomQuantities = pipe(
  generateQuantitiesWhile,
  applySpec({
    z0: pipe(props(["s", "x"]), apply(calculateZ)),
    z1: pipe(props(["s", "y"]), apply(calculateZ)),
  })
);

const thunkGenerateRandomQuantities = partial(generateRandomQuantities, [
  [-1, 1],
]);

export const generateRandomQuantitiesMany = times(
  thunkGenerateRandomQuantities
);
